#!/usr/bin/env node
'use strict';
/*
 * pv2ascii.js —— 把 PV 视频「离线翻译」成字符画帧，产出 .asc 供前端播放。
 * 只在手机/Termux 上跑一次，不依赖 workerd / wrangler / 云端。
 *
 *   node pv2ascii.js --src ~/pv_originals --out ~/yueyue-frontend/public/pv
 *
 * 依赖：ffmpeg（Termux 里 pkg install ffmpeg），Node 18+。
 */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const zlib = require('zlib');

// 10 级灰阶：空格最暗 → @ 最亮。前端 lib/ascLoader.ts 必须用同一串。
const RAMP = ' .:-=+*#%@';

const USAGE = `
用法: node pv2ascii.js [选项]

  --src DIR       源 mp4 目录        (默认 ~/pv_originals)
  --out DIR       输出 .asc 目录     (默认 ~/yueyue-frontend/public/pv)
  --fps N         每秒抽帧           (默认 6)
  --cols N        字符列数           (默认 64)
  --rows N        字符行数           (默认 20)
  --seconds N     只取前 N 秒，0=全片 (默认 0)
  --preset lite   48x15 / 4fps，极限省
  --preset clip   默认网格 / 只取前 45 秒
  --only CODE     只转一个，如 PhiLia093
  --force         已存在的 .asc 也重转
  --help

输出格式（纯文本，gzip 后极小）:
  ASCIIPV1
  COLS 64 ROWS 20 FPS 6 FRAMES 0000001080
  a3c1f0|<第0行64字符>|<第1行>|...|<第19行>
  ... 每帧一行；行首 6 位 hex 是该帧主色（供「原片色」模式用）
`;

function parseArgs(argv) {
  const H = os.homedir();
  const a = {
    src: path.join(H, 'pv_originals'),
    out: path.join(H, 'yueyue-frontend', 'public', 'pv'),
    fps: 6, cols: 64, rows: 20, seconds: 0,
    only: '', force: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i], v = argv[i + 1];
    if (k === '--help') { console.log(USAGE); process.exit(0); }
    else if (k === '--force') a.force = true;
    else if (k === '--src' && v) { a.src = expand(v, H); i++; }
    else if (k === '--out' && v) { a.out = expand(v, H); i++; }
    else if (k === '--fps' && v) { a.fps = Math.max(1, +v || 6); i++; }
    else if (k === '--cols' && v) { a.cols = Math.max(8, +v || 64); i++; }
    else if (k === '--rows' && v) { a.rows = Math.max(4, +v || 20); i++; }
    else if (k === '--seconds' && v) { a.seconds = Math.max(0, +v || 0); i++; }
    else if (k === '--only' && v) { a.only = v; i++; }
    else if (k === '--preset' && v) {
      if (v === 'lite') { a.cols = 48; a.rows = 15; a.fps = 4; }
      if (v === 'clip') { a.seconds = 45; }
      i++;
    }
  }
  return a;
}
function expand(p, H) {
  if (p === '~') return H;
  if (p.startsWith('~/')) return path.join(H, p.slice(2));
  return path.resolve(p);
}
const hex2 = n => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');

/** 一帧 rgb24 → 字符行 + 主色 */
function frameToRow(buf, cols, rows) {
  let r = 0, g = 0, b = 0, n = 0;
  let r2 = 0, g2 = 0, b2 = 0, n2 = 0;
  const lines = new Array(rows);
  for (let y = 0; y < rows; y++) {
    let line = '';
    for (let x = 0; x < cols; x++) {
      const p = (y * cols + x) * 3;
      const R = buf[p], G = buf[p + 1], B = buf[p + 2];
      const luma = 0.299 * R + 0.587 * G + 0.114 * B;
      let k = Math.floor(luma / 256 * RAMP.length);
      if (k < 0) k = 0;
      if (k >= RAMP.length) k = RAMP.length - 1;
      line += RAMP[k];
      if (luma > 12) { r += R; g += G; b += B; n++; }
      if (luma > 60) { r2 += R; g2 += G; b2 += B; n2++; }
    }
    lines[y] = line;
  }
  // 优先取「亮部」平均色，暗场退回全帧；再归一化提亮，避免染色发灰
  let cr, cg, cb;
  if (n2 > (cols * rows) * 0.02) { cr = r2 / n2; cg = g2 / n2; cb = b2 / n2; }
  else if (n > 0) { cr = r / n; cg = g / n; cb = b / n; }
  else { cr = cg = cb = 0; }
  const mx = Math.max(cr, cg, cb, 1);
  const k = Math.min(2.4, 190 / mx);
  const tint = hex2(cr * k) + hex2(cg * k) + hex2(cb * k);
  return tint + '|' + lines.join('|');
}

function convert(file, a) {
  return new Promise((resolve, reject) => {
    const code = path.basename(file, path.extname(file));
    const dest = path.join(a.out, code + '.asc');
    if (!a.force && fs.existsSync(dest) && fs.statSync(dest).size > 80) {
      return resolve({ code, dest, frames: -1, skipped: true });
    }
    const vf = [
      `fps=${a.fps}`,
      `scale=${a.cols}:${a.rows}:force_original_aspect_ratio=decrease`,
      `pad=${a.cols}:${a.rows}:(ow-iw)/2:(oh-ih)/2:color=black`,
      'format=rgb24',
    ].join(',');
    const args = ['-v', 'error', '-i', file];
    if (a.seconds > 0) args.push('-t', String(a.seconds));
    args.push('-an', '-vf', vf, '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1');

    const ff = spawn('ffmpeg', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    const errs = [];
    ff.stderr.on('data', d => { if (errs.length < 6) errs.push(String(d).trim()); });

    const head = 'ASCIIPV1\n' +
      `COLS ${a.cols} ROWS ${a.rows} FPS ${a.fps} FRAMES `;
    const placeholder = '0000000000\n';
    const numOffset = Buffer.byteLength(head, 'utf8');
    fs.writeFileSync(dest, head + placeholder, 'utf8');
    const ws = fs.createWriteStream(dest, { flags: 'a', encoding: 'utf8' });

    const frameSize = a.cols * a.rows * 3;
    let pending = Buffer.alloc(0);
    let frames = 0;

    ff.stdout.on('data', chunk => {
      pending = pending.length ? Buffer.concat([pending, chunk]) : chunk;
      while (pending.length >= frameSize) {
        const f = pending.subarray(0, frameSize);
        pending = pending.subarray(frameSize);
        ws.write(frameToRow(f, a.cols, a.rows) + '\n');
        frames++;
      }
    });
    ff.on('error', e => { ws.end(); reject(new Error(`${code}: ${e.message}`)); });
    ff.on('close', codeExit => {
      ws.end(() => {
        if (codeExit !== 0 && frames === 0) {
          return reject(new Error(`${code}: ffmpeg ${codeExit} ${errs.join(' | ')}`));
        }
        // 回填真实帧数
        const fd = fs.openSync(dest, 'r+');
        const buf = Buffer.from(String(frames).padStart(10, '0'), 'utf8');
        fs.writeSync(fd, buf, 0, buf.length, numOffset);
        fs.closeSync(fd);
        resolve({ code, dest, frames, skipped: false });
      });
    });
  });
}

(async () => {
  const a = parseArgs(process.argv);
  if (!fs.existsSync(a.src)) { console.error(`✗ 源目录不存在: ${a.src}`); process.exit(1); }
  fs.mkdirSync(a.out, { recursive: true });
  let files = fs.readdirSync(a.src).filter(f => /\.mp4$/i.test(f)).sort();
  if (a.only) files = files.filter(f => path.basename(f, '.mp4') === a.only);
  if (!files.length) { console.error(`✗ ${a.src} 里没有 mp4`); process.exit(1); }

  console.log(`源   : ${a.src}  (${files.length} 个)`);
  console.log(`输出 : ${a.out}`);
  console.log(`网格 : ${a.cols}×${a.rows}  fps=${a.fps}  ${a.seconds ? '前 ' + a.seconds + 's' : '全片'}`);
  console.log('');

  const results = [];
  for (const f of files) {
    const full = path.join(a.src, f);
    process.stdout.write(`  ${path.basename(f, '.mp4').padEnd(16)} ... `);
    try {
      const r = await convert(full, a);
      const kb = (fs.statSync(r.dest).size / 1024).toFixed(0);
      console.log(r.skipped ? `跳过 (已有 ${kb} KB)` : `${r.frames} 帧  ${kb} KB ✓`);
      results.push(r);
    } catch (e) {
      console.log('失败 ✗  ' + e.message);
    }
  }

  let raw = 0, gz = 0, totalFrames = 0, srcBytes = 0;
  for (const f of files) srcBytes += fs.statSync(path.join(a.src, f)).size;
  for (const r of results) {
    const b = fs.readFileSync(r.dest);
    raw += b.length; gz += zlib.gzipSync(b, { level: 9 }).length;
    const m = /FRAMES\s+(\d+)/.exec(b.toString('utf8').split('\n')[1] || '');
    totalFrames += m ? +m[1] : 0;
  }
  const mb = n => (n / 1024 / 1024).toFixed(2) + ' MB';
  console.log('');
  console.log('════ 汇总 ════');
  console.log(`  .asc 文件 : ${results.length} 个，共 ${totalFrames} 帧`);
  console.log(`  源视频    : ${mb(srcBytes)}`);
  console.log(`  纯文本    : ${mb(raw)}`);
  console.log(`  gzip 后   : ${mb(gz)}   ← Worker 静态资源实际传输量`);
  console.log(`  缩小约    : ${(srcBytes / Math.max(gz, 1)).toFixed(0)}×`);
  console.log('');
  console.log('下一步：把 .asc 放进前端 public/pv 后 commit + push（CI 会随 Worker 一起部署）。');
  console.log('        前端已有兜底帧：.asc 缺失时仍显示程序生成的字符画，不会白屏。');
})();

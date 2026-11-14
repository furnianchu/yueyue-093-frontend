// 加载 pv2ascii.js 离线转出的 .asc 字符帧。
// 与 lib/asciiFrames.ts 的 Frame 结构完全一致，PVPlayer 可无缝混用；
// 该文件里的程序生成帧始终作为「.asc 尚未就绪 / 缺失」时的兜底。

export type AscFrame = { lines: string[]; shades: number[][] };
export type AscData = { frames: AscFrame[]; fps: number; tints: string[] };

/** 必须与 pv2ascii.js 里的 RAMP 逐字一致 */
const RAMP = ' .:-=+*#%@';

const cache = new Map<string, AscData | null>();
const inflight = new Map<string, Promise<AscData | null>>();

export const ascUrl = (id: string) => `/pv/${id}.asc`;

/** 同步取缓存；没有返回 undefined（调用方用兜底帧） */
export function getCached(id: string): AscData | undefined {
  return cache.get(id) ?? undefined;
}

/** 页面空闲时可提前预热，失败静默 */
export function prefetchAsc(id: string) { return loadAsc(id); }

function parse(text: string): AscData | null {
  const rows = text.split('\n');
  if (rows[0]?.trim() !== 'ASCIIPV1') return null;
  const fps = Number(/FPS\s+(\d+)/.exec(rows[1] || '')?.[1] ?? 6) || 6;
  const frames: AscFrame[] = [];
  const tints: string[] = [];
  for (let i = 2; i < rows.length; i++) {
    const line = rows[i];
    if (!line) continue;
    const parts = line.split('|');
    const tint = parts.shift() || '000000';
    const lines = parts;
    const shades = lines.map(row =>
      Array.from(row, ch => {
        const k = RAMP.indexOf(ch);
        return k < 0 ? 0 : k;   // 0..9，对应 css 里的 .shade-0 .. .shade-9
      })
    );
    frames.push({ lines, shades });
    tints.push(tint);
  }
  return frames.length ? { frames, fps, tints } : null;
}

/** 永不 throw：失败返回 null，播放器继续用程序生成帧 */
export function loadAsc(id: string): Promise<AscData | null> {
  const hit = cache.get(id);
  if (hit !== undefined) return Promise.resolve(hit);
  const running = inflight.get(id);
  if (running) return running;

  const p = fetch(ascUrl(id))
    .then(r => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
    .then(parse)
    .then(data => { cache.set(id, data); inflight.delete(id); return data; })
    .catch(() => { cache.set(id, null); inflight.delete(id); return null; });

  inflight.set(id, p);
  return p;
}

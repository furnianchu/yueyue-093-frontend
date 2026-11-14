// ASCII 逐帧动画引擎 —— 零字节外部资源，纯前端计算。
// 每个角色有一幅专属字符画 + 一种逐帧特效；配色由 THEMES 提供，
// 切换主题只换 CSS 变量，字符网格不重算。

export const COLS = 36;
export const ROWS = 16;

/** 特效层用轻量阶梯：宁可留白，也别把字符画主体淹了 */
const RAMP = '  .:+*#';

export type Fx =
  | 'ripple' | 'rise' | 'flicker' | 'grow' | 'flap'
  | 'slash' | 'weave' | 'float' | 'spin' | 'pulse';

export type AsciiTheme = {
  id: string;
  label: string;
  /** 四档色：暗 / 次 / 主 / 高亮 */
  c0: string; c1: string; c2: string; c3: string;
  glow: string;
};

/** 13 个角色各一套 + 3 套经典终端色。切换器按顺序循环。 */
export const THEMES: AsciiTheme[] = [
  { id: 'philia',  label: '昔涟 · 桃',     c0:'#1a2a24', c1:'#2f7d63', c2:'#5fe0ac', c3:'#ffd9ef', glow:'#5fe0ac' },
  { id: 'neikos',  label: '白厄 · 日',     c0:'#2a2418', c1:'#8a6a2c', c2:'#ffc857', c3:'#fff3d0', glow:'#ffc857' },
  { id: 'orexis',  label: '赛飞儿 · 金',   c0:'#2a1a20', c1:'#8a4a5c', c2:'#ff8fae', c3:'#ffe6a8', glow:'#ff8fae' },
  { id: 'skemma',  label: '那刻夏 · 枝',   c0:'#1c2418', c1:'#4f7a3c', c2:'#9fe36b', c3:'#e8ffcf', glow:'#9fe36b' },
  { id: 'epiei',   label: '遐蝶 · 蝶',     c0:'#1a1830', c1:'#5a4a9a', c2:'#b49bff', c3:'#ffe3fa', glow:'#b49bff' },
  { id: 'polemos', label: '万敌 · 刃',     c0:'#2a1414', c1:'#8f3030', c2:'#ff6b5e', c3:'#ffd9c0', glow:'#ff6b5e' },
  { id: 'kalos',   label: '阿格莱雅 · 织', c0:'#2a2410', c1:'#9a7a28', c2:'#ffd76a', c3:'#fff6d8', glow:'#ffd76a' },
  { id: 'hap',     label: '缇宝 · 泡',     c0:'#241a2c', c1:'#7a4f96', c2:'#e0a6ff', c3:'#fff0d9', glow:'#e0a6ff' },
  { id: 'eleos',   label: '风堇 · 风',     c0:'#14262a', c1:'#3b8a92', c2:'#8ff0e0', c3:'#e6fffb', glow:'#8ff0e0' },
  { id: 'hubris',  label: '刻律德菈 · 局', c0:'#201824', c1:'#6a3a7a', c2:'#d08cff', c3:'#ffe9c9', glow:'#d08cff' },
  { id: 'aporia',  label: '海瑟音 · 潮',   c0:'#101e2c', c1:'#2e6a94', c2:'#7cc8ff', c3:'#e6f6ff', glow:'#7cc8ff' },
  { id: 'ever',    label: '长夜月 · 夜',   c0:'#141428', c1:'#43437e', c2:'#9a9ae8', c3:'#f0eaff', glow:'#9a9ae8' },
  { id: 'danheng', label: '丹恒 · 归',     c0:'#122226', c1:'#2e6e66', c2:'#7fe0c0', c3:'#e8fff6', glow:'#7fe0c0' },
  { id: 'green',   label: '经典 · 磷绿',   c0:'#0a1a0e', c1:'#2f7a3e', c2:'#6dff8f', c3:'#e6ffe9', glow:'#6dff8f' },
  { id: 'amber',   label: '经典 · 琥珀',   c0:'#221608', c1:'#8a5a1c', c2:'#ffb64a', c3:'#fff0cf', glow:'#ffb64a' },
  { id: 'magenta', label: '本站 · 品红',   c0:'#220a18', c1:'#8a1e5c', c2:'#f00093', c3:'#ffd6ec', glow:'#f00093' },
];

/** 角色 id → 默认主题下标 */
export const THEME_FOR_HEIR: Record<string, number> = {
  NeiKos496: 1, PhiLia093: 0, OreXis945: 2, SkeMma720: 3,
  EpieiKeia216: 4, PoleMos600: 5, KaLos618: 6, HapLotes405: 7,
  EleOs252: 8, HubRis504: 9, ApoRia432: 10, Evernight: 11, DanHengPT: 12,
};

type Def = { art: string[]; fx: Fx; frames: number; fps: number; caption: string };

// 每幅画统一 34 列 × 14 行，renderFrame 会自动补齐/裁切。
const DEFS: Record<string, Def> = {
  PhiLia093: {
    fx: 'ripple', frames: 24, fps: 12, caption: '093 >> EGO :: 桃子。不哭。我在。明天见。',
    art: [
      '        .  *  .        .  *  .        ',
      '      .     ___     .      ___        ',
      '     *    .`   `.      .`   `.   *   ',
      '          /  o  \\      /  o  \\       ',
      '    .----(  093  )----(  EGO  )---.  ',
      '     `----.     ,----.     ,----\`    ',
      '           `._.\`      `._.\`         ',
      '      ~  ~   ~  ~  ~   ~  ~   ~     ',
      '      >>> DON`T CRY.  >>> I`M HERE.   ',
      '          >>> SEE YOU TOMORROW.      ',
      '    . . .   r i p p l e s   . . .   ',
      '        \\   |   /     \\   |   /     ',
      '         \\  |  /       \\  |  /      ',
      '      ____\\_|/___________\\_|/____   ',
    ],
  },
  NeiKos496: {
    fx: 'rise', frames: 20, fps: 11, caption: 'THE FIRST LIGHT :: 496 = perfect',
    art: [
      '                                  ',
      '          \\  |  /   *            ',
      '       *   \\ | /      .          ',
      '    .  ----  (*)  ----    *       ',
      '      *   / | \\    .             ',
      '          /  |  \\        *       ',
      '      .        *      .          ',
      '   ~~~~~~~~~~~  ~~~~~~~~~~~~~~   ',
      '  ______________________________  ',
      '   /   /   /  FIRST LIGHT  /     ',
      '  / 496 /  /  2^4(2^5-1)  /     ',
      '   /   /   /   /   /   /        ',
      '  __________________________  ',
      '      Smells like sunfire.        ',
    ],
  },
  OreXis945: {
    fx: 'flicker', frames: 18, fps: 13, caption: 'WHATEVER YOU JUST HID',
    art: [
      '        /\\   /\\        $          ',
      '       ( o   o )      .o.        ',
      '        \\  ^  /      (   )       ',
      '         |||         `---\`       ',
      '      .-\`   `-.        $         ',
      '     /  ~~~~   \\   .o.           ',
      '    |  OREXiS   |  (   )    $    ',
      '     \\  945    /   `---\`         ',
      '      `-.___.-\`      .o.         ',
      '   *   /  |  \\   *  (   )   *   ',
      '      /   |   \\     `---\`        ',
      '  >>> 300 THIEVES OF DOLOS >>>    ',
      '       "Nice try. No way!"         ',
      '    $ .o. $ .o. $ .o. $ .o.     ',
    ],
  },
  SkeMma720: {
    fx: 'grow', frames: 22, fps: 11, caption: 'DOUBT :: the wall was never locked',
    art: [
      '              ^                    ',
      '          ^   |   ^                ',
      '       \\  |  /  \\  |  /          ',
      '        \\ | /    \\ | /           ',
      '         \\|/      \\|/            ',
      '          +---------+             ',
      '          |  ?  ?   |             ',
      '          | SKEMMA  |             ',
      '          +----+----+             ',
      '               |                 ',
      '          /    |    \\            ',
      '      ~~ /     |     \\ ~~        ',
      '   "ALL FALSE, ONLY I AM REAL"  ',
      '      He checked. The wall.      ',
    ],
  },
  EpieiKeia216: {
    fx: 'flap', frames: 20, fps: 12, caption: '216 :: 遐蝶',
    art: [
      '                                  ',
      '      \\  .--.   |   .--.  /      ',
      '       \\/ .  \\  |  /  . \\/       ',
      '       ( ( o ) )|( ( o ) )       ',
      '        \\ `-`  /|\\  `-`  /       ',
      '    .----`---\`--+--`---\`----.    ',
      '   /    216   EPIEIKEIA     \\   ',
      '    `--------.  |  .--------\`    ',
      '             \\ | /               ',
      '              \\|/                ',
      '        *      +      *           ',
      '   ~  ~   ~    |    ~   ~   ~    ',
      '               V                 ',
      '        still, she waits.        ',
    ],
  },
  PoleMos600: {
    fx: 'slash', frames: 16, fps: 14, caption: 'POLEMOS600 :: 以身入局',
    art: [
      '                    /|             ',
      '                   / |   *         ',
      '       *          /  |             ',
      '                /    |             ',
      '      _________/     |______       ',
      '     |  POLEMOS 600  |      \\      ',
      '     |_______________|       >     ',
      '            |        \\     /       ',
      '            |         \\   /        ',
      '       ====/|\\====     \\ /         ',
      '          / | \\        /           ',
      '    ~~~~~/~~|~~\\~~~~~~/~~~~~      ',
      '      NO RETREAT   /   MYDEI       ',
      '        NO RETREAT.               ',
    ],
  },
  KaLos618: {
    fx: 'weave', frames: 20, fps: 11, caption: 'KALOS618 :: 致命浪漫',
    art: [
      '   +---+---+---+---+---+---+---+   ',
      '   |   |   |   |   |   |   |   |   ',
      '   +---+---+---+---+---+---+---+   ',
      '   |   | 6 |   | 1 |   | 8 |   |   ',
      '   +---+---+---+---+---+---+---+   ',
      '   |   |   | K | A | L |   |   |   ',
      '   +---+---+---+---+---+---+---+   ',
      '   |   |   |   | O |   |   |   |   ',
      '   +---+---+---+---+---+---+---+   ',
      '   \\   |   / \\   |   / \\   |   /   ',
      '    \\  |  /   \\  |  /   \\  |  /    ',
      '   ~~~~~~~~~~ GOLD THREAD ~~~~~~~  ',
      '        "FATAL ROMANCE"           ',
      '      woven, not written.         ',
    ],
  },
  HapLotes405: {
    fx: 'float', frames: 22, fps: 11, caption: '童言无忌 :: 405',
    art: [
      '        o      o        o          ',
      '      (  )   (   )    (  )         ',
      '       \\/     \\ /      \\/          ',
      '      .---.  .---.   .---.         ',
      '     / o o \\/ o o \\ / o o \\        ',
      '     |  ^  ||  ^  | |  ^  |        ',
      '      \\___/  \\___/   \\___/         ',
      '       |||    |||     |||          ',
      '   o  405  o  HAPLOTES  o   o     ',
      '     \\  |  /     \\  |  /          ',
      '   ~~~~~~~~~~~~~~~~~~~~~~~~~~~   ',
      '    "A CHILD`S WORDS COME TRUE" ',
      '       three little voices.       ',
      '   o       o        o       o     ',
    ],
  },
  EleOs252: {
    fx: 'spin', frames: 20, fps: 12, caption: 'ELEOS252 :: 有求必应',
    art: [
      '          .  *   .   *  .         ',
      '      *    \\  |  /    *           ',
      '        .   \\ | /   .             ',
      '      *   ---(+)---    *          ',
      '        .   / | \\   .             ',
      '      *    /  |  \\      *         ',
      '   ~~~~~~  ELEOS 252  ~~~~~~     ',
      '      (  (   ~ ~ ~   )  )         ',
      '       ( (  ELEOS  ) )            ',
      '        (  ( ~ ~ )  )             ',
      '          (  ~  )                 ',
      '     ASK, AND THE WIND RETURNS    ',
      '        ask, and it blows.        ',
      '   .   *    .    *    .    *     ',
    ],
  },
  HubRis504: {
    fx: 'weave', frames: 18, fps: 10, caption: '以身入局 :: HUBRIS504',
    art: [
      '     +----+----+----+----+        ',
      '     | R  |    | R  |    |        ',
      '     +----+----+----+----+        ',
      '     |    | Q  |    | R  |        ',
      '     +----+----+----+----+        ',
      '     | P  |    | P  |    |        ',
      '     +----+----+----+----+        ',
      '     |    | P  |    | K  |        ',
      '     +----+----+----+----+        ',
      '       H U B R I S   5 0 4        ',
      '   "ENTER THE BOARD, NOT WATCH"  ',
      '      the piece is the player.    ',
      '                                  ',
      '   *  +  *  +  *  +  *  +  *    ',
    ],
  },
  ApoRia432: {
    fx: 'ripple', frames: 24, fps: 12, caption: '海的女儿 :: APORIA432',
    art: [
      '      ~  ~   ~    ~    ~   ~  ~   ',
      '   ~~~  ~~~   ~~~  ~~~   ~~~  ~~~ ',
      '  ____    ____    ____    ____    ',
      ' /    \\__/    \\__/    \\__/    \\  ',
      '   .  .   .  <3>  .   .  .      ',
      '        \\   |   /                ',
      '         \\  |  /     .o.         ',
      '      A  P  O  R  I  A   4 3 2   ',
      '   ~~~~~~~~~~~~~~~~~~~~~~~~~~~   ',
      '     "DAUGHTER OF THE SEA"       ',
      '        no answer, only tide.     ',
      '   ~~~   ~~~   ~~~   ~~~   ~~~    ',
      '      ~  ~   ~    ~    ~   ~     ',
      '                                  ',
    ],
  },
  Evernight: {
    fx: 'pulse', frames: 20, fps: 10, caption: '天黑请闭眼 :: UNINDEXED',
    art: [
      '        .      *      .            ',
      '     *     .-`````-.      *        ',
      '       .-`   ___   `-.            ',
      '      /    .`   `.    \\     *     ',
      '     |    /  O    \\    |          ',
      '      \\    `.___.`    /          ',
      '       `-.         .-`      .     ',
      '          `-.....-`              ',
      '   ~~~~~~~~~~~~~~~~~~~~~~~~~~~   ',
      '      EVERNIGHT / CLOSE YOUR EYES ',
      '        UNINDEXED  /  no signal    ',
      '   .    *     .      *     .      ',
      '        close your eyes.          ',
      '                                  ',
    ],
  },
  DanHengPT: {
    fx: 'slash', frames: 18, fps: 12, caption: '归处 :: UNINDEXED',
    art: [
      '                    /              ',
      '                   /  *            ',
      '        *         /                ',
      '                /    ______        ',
      '      _________/    /HOME /        ',
      '     |  DANHENG    /HOME/  =====>  ',
      '     |____________/____/           ',
      '           |     /                ',
      '           |    /        .        ',
      '      ~~~~~|~~~ /~~~~~~~~~~~~~   ',
      '      WHERE THE LANCE FALLS, HOME  ',
      '      UNINDEXED  /  homebound      ',
      '   *        .          *          ',
      '                                  ',
    ],
  },
};

const DEFAULT: Def = {
  fx: 'pulse', frames: 16, fps: 11, caption: 'SIGNAL UNINDEXED',
  art: [
    '     +------------------------+    ',
    '     |                        |    ',
    '     |      .  *  .  *  .     |    ',
    '     |    *    SIGNAL    *    |    ',
    '     |      .  *  .  *  .     |    ',
    '     |                        |    ',
    '     |      [ UNINDEXED ]     |    ',
    '     |                        |    ',
    '     +------------------------+    ',
    '   ~~~~~~~~~~~~~~~~~~~~~~~~~~~   ',
    '     Nothing speaks officially.    ',
    '                                  ',
    '                                  ',
    '                                  ',
  ],
};

const defFor = (id: string): Def => DEFS[id] || DEFAULT;

export const frameCount = (id: string) => defFor(id).frames;
export const frameFps = (id: string) => defFor(id).fps;
export const captionOf = (id: string) => defFor(id).caption;

/** 补齐/裁到 COLS×ROWS；比 ROWS 短的画垂直居中，避免顶部贴边 */
function normalize(art: string[]): string[] {
  const src = art.slice(0, ROWS);
  const top = Math.floor((ROWS - src.length) / 2);
  const out: string[] = [];
  for (let y = 0; y < ROWS; y++) {
    const line = src[y - top] ?? '';
    out.push(line.length >= COLS ? line.slice(0, COLS) : line + ' '.repeat(COLS - line.length));
  }
  return out;
}

// ---- 特效场：返回 0..1 的强度，t 为 0..1 的循环相位 ----
function field(fx: Fx, x: number, y: number, t: number, f: number): number {
  const cx = (COLS - 1) / 2, cy = (ROWS - 1) / 2;
  const dx = x - cx, dy = (y - cy) * 1.7;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const ang = Math.atan2(dy, dx);
  const phase = t * Math.PI * 2;

  switch (fx) {
    case 'ripple': {
      const wave = Math.sin(dist * 0.85 - phase * 2.2);
      return Math.max(0, wave) * (1 - dist / 26) * 0.9;
    }
    case 'rise': {
      const horizon = 1 - y / ROWS;
      const beam = Math.exp(-Math.abs(dx) / (3 + 6 * horizon));
      const glow = Math.max(0, Math.sin((horizon - t * 1.4) * 5));
      return Math.min(1, beam * (0.35 + glow) * horizon);
    }
    case 'flicker': {
      const n = Math.sin(x * 12.9898 + y * 78.233 + f * 3.7) * 43758.5453;
      const r = n - Math.floor(n);
      return r > 0.86 ? 0.9 : 0.12;
    }
    case 'grow': {
      const depth = Math.abs(dx) / (1 + (ROWS - y) * 0.55);
      const growTo = (ROWS - y) * 0.9 + t * ROWS;
      return growTo > ROWS - 3 ? Math.max(0, 1 - depth / 4) * 0.85 : 0;
    }
    case 'flap': {
      const wing = Math.abs(Math.sin(phase)) * (COLS / 2);
      return Math.abs(dx) < wing && Math.abs(dy) < 4
        ? 0.35 + 0.5 * Math.abs(Math.sin(dist * 0.6 - phase)) : 0.05;
    }
    case 'slash': {
      const sweep = (t * (COLS + ROWS) - COLS * 0.4);
      const d = Math.abs((x + y * 0.65) - sweep);
      return Math.max(0, 1 - d / 3.2) * 0.95;
    }
    case 'weave': {
      const a = Math.sin((x + phase * 3) * 0.7);
      const b = Math.sin((y - phase * 2) * 0.9);
      return Math.max(0, a * b) * 0.7;
    }
    case 'float': {
      const col = (x * 7 + f * 0.37) % 11;
      const yy = (y + t * ROWS * (0.6 + col / 20)) % ROWS;
      return Math.exp(-Math.abs(yy - (ROWS - 2)) / 1.4) * 0.75;
    }
    case 'spin': {
      const a = ang + phase;
      const r = 5 + 3 * Math.sin(a * 3);
      return Math.max(0, 1 - Math.abs(dist - r) / 2.2) * 0.85;
    }
    case 'pulse':
    default:
      return Math.max(0, Math.sin(dist * 0.55 - phase * 1.6)) * (1 - dist / 24) * 0.8;
  }
}

const rampChar = (v: number) => RAMP[Math.min(RAMP.length - 1, Math.floor(v * (RAMP.length - 1) + 0.001))];

export type Frame = { lines: string[]; shades: number[][] };

/**
 * 渲染第 frameNo 帧。返回字符网格 + 每格色阶（0..3）。
 * 主体画保留原字符并给 2~3 档；空格处填特效粒子给 0~2 档。
 */
export function renderFrame(id: string, frameNo: number): Frame {
  const def = defFor(id);
  const base = normalize(def.art);
  const t = (frameNo % def.frames) / def.frames;
  // 保护带：主体字符及其左右各一格不撒粒子，免得文字被特效打断
  const protect: boolean[][] = base.map(row => {
    const p = Array<boolean>(COLS).fill(false);
    for (let x = 0; x < COLS; x++) {
      if (row[x] !== ' ') {
        p[x] = true;
        if (x > 0) p[x - 1] = true;
        if (x < COLS - 1) p[x + 1] = true;
      }
    }
    return p;
  });
  const lines: string[] = [];
  const shades: number[][] = [];

  for (let y = 0; y < ROWS; y++) {
    let line = '';
    const row: number[] = [];
    for (let x = 0; x < COLS; x++) {
      const ch = base[y][x];
      const v = field(def.fx, x, y, t, frameNo);
      if (ch !== ' ') {
        // 主体：轻微明暗呼吸，只在特效峰值处点几笔高光
        const breathe = 0.55 + 0.45 * Math.sin((x / COLS + t) * Math.PI * 2);
        line += ch;
        row.push(v > 0.82 ? 3 : breathe > 0.66 ? 2 : 1);
      } else {
        // 空白处只在高场强撒稀疏粒子，字周围与其余位置留白
        const c = !protect[y][x] && v > 0.58 ? rampChar(v) : ' ';
        line += c;
        row.push(c !== ' ' && v > 0.84 ? 2 : 1);
      }
    }
    lines.push(line);
    shades.push(row);
  }
  return { lines, shades };
}

/** 一次算好整个循环，避免播放时每帧重复计算 */
export function buildFrames(id: string): Frame[] {
  const n = frameCount(id);
  return Array.from({ length: n }, (_, i) => renderFrame(id, i));
}

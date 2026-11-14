'use client';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Heir } from '@/lib/heirs';
import {
  buildFrames, captionOf, frameFps,
  THEMES, THEME_FOR_HEIR, type Frame,
} from '@/lib/asciiFrames';
import { getCached, loadAsc, type AscData } from '@/lib/ascLoader';

/** 接口故意与原视频版完全一致 —— Experience.tsx 一行都不用改 */
export type PVHandle = {
  warmup: (h: Heir) => void;
  start: () => void;
};

type Props = { visible: boolean; heir: Heir | null };

const SPEEDS = [1, 2, 4];

const rgb = (h: string) => {
  const s = h.replace('#', '');
  return [0, 2, 4].map(i => parseInt(s.slice(i, i + 2), 16) || 0);
};
/** 把某个主色拉伸成一整套四档色，tint 一变整屏跟着变 */
function mix(h1: string, h2: string, t: number) {
  const a = rgb(h1), b = rgb(h2);
  return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, '0')).join('');
}

/** 把一行按连续色阶合并成若干 span，DOM 很轻 */
function Row({ line, shades }: { line: string; shades: number[] }) {
  const parts: { s: number; text: string }[] = [];
  for (let i = 0; i < line.length; i++) {
    const s = shades[i] ?? 0;
    const last = parts[parts.length - 1];
    if (last && last.s === s) last.text += line[i];
    else parts.push({ s, text: line[i] });
  }
  return (
    <span className="ascii-row">
      {parts.map((p, i) => <span key={i} className={`shade-${p.s}`}>{p.text}</span>)}
      {'\n'}
    </span>
  );
}

const PVPlayer = forwardRef<PVHandle, Props>(function PVPlayer({ visible, heir }, ref) {
  const [id, setId] = useState('PhiLia093');
  const [frames, setFrames] = useState<Frame[]>(() => buildFrames('PhiLia093'));
  const [tints, setTints] = useState<string[]>([]);
  const [fps, setFps] = useState(() => frameFps('PhiLia093'));
  const [frameNo, setFrameNo] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [themeIdx, setThemeIdx] = useState(0);
  const [tintMode, setTintMode] = useState(true);   // 默认跟着 PV 原片色调走
  const [reduced, setReduced] = useState(false);

  const frameRef = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const idRef = useRef('PhiLia093');
  const playingRef = useRef(false);
  const speedRef = useRef(1);

  const stop = useCallback(() => {
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
  }, []);

  const tick = useCallback((n: number, sp: number, f: number) => {
    stop();
    if (n < 2) return;
    const ms = Math.max(40, Math.round(1000 / (f * sp)));
    timer.current = setInterval(() => {
      frameRef.current = (frameRef.current + 1) % n;
      setFrameNo(frameRef.current);
    }, ms);
  }, [stop]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => { mq.removeEventListener?.('change', apply); stop(); };
  }, [stop]);

  /** 用真实 .asc 替换兜底帧；不重置播放指针，正在播就按新帧数重启节拍 */
  const applyAsc = useCallback((d: AscData, forId: string) => {
    if (idRef.current !== forId) return;
    setFrames(d.frames);
    setTints(d.tints);
    setFps(d.fps);
    setFrameNo(n => Math.min(n, Math.max(0, d.frames.length - 1)));
    if (playingRef.current) tick(d.frames.length, speedRef.current, d.fps);
  }, [tick]);

  useImperativeHandle(ref, () => ({
    warmup(h) {
      // 与点击同一个同步栈：先给一帧能看的东西，绝不白屏
      const nextId = h.id in THEME_FOR_HEIR ? h.id : 'PhiLia093';
      idRef.current = nextId;
      setId(nextId);
      const cached = getCached(nextId);
      if (cached) {
        setFrames(cached.frames); setTints(cached.tints); setFps(cached.fps);
      } else {
        setFrames(buildFrames(nextId)); setTints([]); setFps(frameFps(nextId));
        loadAsc(nextId).then(d => { if (d) applyAsc(d, nextId); });
      }
      frameRef.current = 0;
      setFrameNo(0);
      setPlaying(false); playingRef.current = false;
      setSpeed(1); speedRef.current = 1;
      setThemeIdx(THEME_FOR_HEIR[nextId] ?? 0);
      setTintMode(true);
      stop();
    },
    start() {
      if (reduced) { setPlaying(false); playingRef.current = false; return; }
      setPlaying(true); playingRef.current = true;
      tick(frames.length, speedRef.current, fps);
    },
  }), [frames, fps, reduced, stop, tick, applyAsc]);

  const togglePlay = () => {
    if (reduced) return;
    if (playing) { stop(); setPlaying(false); playingRef.current = false; }
    else { setPlaying(true); playingRef.current = true; tick(frames.length, speed, fps); }
  };

  const cycleSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next); speedRef.current = next;
    if (playing) tick(frames.length, next, fps);
  };

  const cycleTheme = (dir = 1) => {
    setTintMode(false);   // 手动挑主题 = 用主题色
    setThemeIdx(i => (i + dir + THEMES.length) % THEMES.length);
  };

  const theme = THEMES[themeIdx] ?? THEMES[0];
  const frame = frames[frameNo] ?? frames[0];
  const total = frames.length;

  // 原片色优先；全黑帧或用户切到主题时回落到主题主色
  const rawTint = tints[frameNo];
  const lum = rawTint ? rgb(rawTint).reduce((a, b) => a + b, 0) : 0;
  const base = (tintMode && rawTint && lum > 40) ? '#' + rawTint : theme.c2;
  const cssVars = {
    '--c0': mix(base, '#000000', 0.72),
    '--c1': mix(base, '#000000', 0.42),
    '--c2': base,
    '--c3': mix(base, '#ffffff', 0.58),
    '--aglow': base,
  } as CSSProperties;

  return (
    <div
      className={'pv-layer ascii-layer' + (visible ? ' show' : '')}
      aria-hidden={!visible}
      style={cssVars}
    >
      <div className="ascii-head">
        <p className="pv-label" style={{ color: heir?.color || theme.c2 }}>
          {heir?.signal} :: {heir?.name}
        </p>
        <span className="ascii-frame">
          FRAME {String(frameNo + 1).padStart(3, '0')}/{String(total).padStart(3, '0')}
        </span>
      </div>

      <pre className="ascii-screen" aria-label={`${heir?.name ?? '角色'} 的 PV 字符画`}>
        {frame && frame.lines.map((line, y) => (
          <Row key={y} line={line} shades={frame.shades[y]} />
        ))}
      </pre>

      <p className="ascii-caption">{captionOf(id)}</p>

      {/* 颜色控制器：原片色调 / 16 套主题 */}
      <div className="ascii-themes" role="group" aria-label="配色切换">
        <button className="pv-btn" onClick={() => cycleTheme(-1)} aria-label="上一个配色">◀</button>
        <span className="ascii-theme-name" style={{ color: theme.c2 }}>
          {tintMode ? '◈ 原片色调' : theme.label}
        </span>
        <button className="pv-btn" onClick={() => cycleTheme(1)} aria-label="下一个配色">▶</button>
        <span className="ascii-swatches" aria-hidden="true">
          {THEMES.map((t, i) => (
            <button
              key={t.id}
              className={'ascii-dot' + (!tintMode && i === themeIdx ? ' on' : '')}
              style={{ background: t.c2 }}
              onClick={() => { setTintMode(false); setThemeIdx(i); }}
              aria-label={t.label}
            />
          ))}
        </span>
        <button className="pv-btn" onClick={() => setTintMode(v => !v)}>
          {tintMode ? '◈ 原片色' : '◈ 主题色'}
        </button>
      </div>

      <div className="ascii-controls">
        <button className="pv-btn" onClick={togglePlay} disabled={reduced}>
          {reduced ? '▌ 已按系统设置定格' : playing ? '❚❚ 暂停' : '▶ 播放'}
        </button>
        <button className="pv-btn" onClick={cycleSpeed}>{speed}×</button>
        <button className="pv-btn" onClick={() => { frameRef.current = 0; setFrameNo(0); }}>↺ 回到首帧</button>
        <button className="pv-btn" onClick={() => window.location.reload()}>← 返回选择</button>
      </div>
    </div>
  );
});
export default PVPlayer;

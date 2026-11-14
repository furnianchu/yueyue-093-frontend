'use client';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Heir } from '@/lib/heirs';
import {
  buildFrames, captionOf, frameCount, frameFps,
  THEMES, THEME_FOR_HEIR, type Frame,
} from '@/lib/asciiFrames';

/** 接口故意与原视频版完全一致 —— Experience.tsx 一行都不用改 */
export type PVHandle = {
  warmup: (h: Heir) => void;
  start: () => void;
};

type Props = { visible: boolean; heir: Heir | null };

const SPEEDS = [1, 2, 4];

/** 把一行按连续色阶合并成若干 span，13×14 网格下 DOM 很轻 */
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
  const [frameNo, setFrameNo] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [themeIdx, setThemeIdx] = useState(0);
  const [reduced, setReduced] = useState(false);

  const frameRef = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
  }, []);

  const tick = useCallback((n: number, sp: number, fps: number) => {
    stop();
    const ms = Math.max(40, Math.round(1000 / (fps * sp)));
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

  useImperativeHandle(ref, () => ({
    warmup(h) {
      // 与点击同一个同步栈：预生成帧，避免切白后第一帧卡顿
      const nextId = h.id in THEME_FOR_HEIR ? h.id : 'PhiLia093';
      setId(nextId);
      setFrames(buildFrames(nextId));
      frameRef.current = 0;
      setFrameNo(0);
      setPlaying(false);
      setSpeed(1);
      setThemeIdx(THEME_FOR_HEIR[nextId] ?? 0);
      stop();
    },
    start() {
      if (reduced) { setPlaying(false); return; }   // 无障碍：定格第一帧
      setPlaying(true);
      tick(frameCount(id), 1, frameFps(id));
    },
  }), [id, reduced, stop, tick]);

  const togglePlay = () => {
    if (reduced) return;
    if (playing) { stop(); setPlaying(false); }
    else { setPlaying(true); tick(frameCount(id), speed, frameFps(id)); }
  };

  const cycleSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next);
    if (playing) tick(frameCount(id), next, frameFps(id));
  };

  const cycleTheme = (dir = 1) => {
    setThemeIdx(i => (i + dir + THEMES.length) % THEMES.length);
  };

  const theme = THEMES[themeIdx] ?? THEMES[0];
  const frame = frames[frameNo] ?? frames[0];
  const total = frameCount(id);
  const cssVars = {
    '--c0': theme.c0, '--c1': theme.c1, '--c2': theme.c2,
    '--c3': theme.c3, '--aglow': theme.glow,
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
          FRAME {String(frameNo + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
      </div>

      <pre className="ascii-screen" aria-label={`${heir?.name ?? '角色'} 的 ASCII 逐帧动画`}>
        {frame && frame.lines.map((line, y) => (
          <Row key={y} line={line} shades={frame.shades[y]} />
        ))}
      </pre>

      <p className="ascii-caption">{captionOf(id)}</p>

      {/* 颜色控制器 */}
      <div className="ascii-themes" role="group" aria-label="配色主题切换">
        <button className="pv-btn" onClick={() => cycleTheme(-1)} aria-label="上一个配色">◀</button>
        <span className="ascii-theme-name" style={{ color: theme.c2 }}>{theme.label}</span>
        <button className="pv-btn" onClick={() => cycleTheme(1)} aria-label="下一个配色">▶</button>
        <span className="ascii-swatches" aria-hidden="true">
          {THEMES.map((t, i) => (
            <button
              key={t.id}
              className={'ascii-dot' + (i === themeIdx ? ' on' : '')}
              style={{ background: t.c2 }}
              onClick={() => setThemeIdx(i)}
              aria-label={t.label}
            />
          ))}
        </span>
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

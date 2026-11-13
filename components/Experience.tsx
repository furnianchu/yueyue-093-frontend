'use client';
import { useCallback, useRef, useState } from 'react';
import { HEIRS, type Heir } from '@/lib/heirs';
import { API_ORIGIN } from '@/lib/config';
import HeirGrid from './HeirGrid';
import Terminal from './Terminal';
import PVPlayer, { type PVHandle } from './PVPlayer';

type Phase = 'grid' | 'terminal' | 'pv';
const SPEEDS = [1, 2, 4];

export default function Experience() {
  const [phase, setPhase] = useState<Phase>('grid');
  const [heir, setHeir] = useState<Heir | null>(null);
  const [runId, setRunId] = useState(0);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  const pv = useRef<PVHandle>(null);

  const pick = useCallback((h: Heir) => {
    // 三件事都在用户手势的同步栈里：解锁视频、切状态、打点
    pv.current?.warmup(h);
    setHeir(h);
    setPhase('terminal');
    setRunId(x => x + 1);
    document.body.dataset.stage = 'night';
    fetch(`${API_ORIGIN}/api/heir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signal: h.signal, name: h.name }),
      keepalive: true,
    }).catch(() => {});   // 后端挂了也要把终端演完
  }, []);

  const onDone = useCallback(() => {
    document.body.style.overflow = 'hidden';   // 别让用户在 PV 下面滑到终端
    setPhase('pv');
    pv.current?.start();
  }, []);

  const cycleSpeed = () => {
    const i = (SPEEDS.indexOf(speed) + 1) % SPEEDS.length;
    setSpeed(SPEEDS[i]); speedRef.current = SPEEDS[i];
  };

  return (
    <>
      <div className="scanlines" aria-hidden="true" />
      <div className="backdrop" aria-hidden="true" />
      {phase === 'grid' ? (
        <HeirGrid heirs={HEIRS} onPick={pick} />
      ) : (
        <div className="term-wrap">
          <div className="term-bar">
            <span>■■■ / {heir?.signal} :: {heir?.name}</span>
            <span className="term-bar-btns">
              <button onClick={cycleSpeed}>{speed}×</button>
              <button onClick={() => window.dispatchEvent(new Event('yue:skip'))}>跳过</button>
              <button onClick={() => window.location.reload()}>←</button>
            </span>
          </div>
          {heir && <Terminal lines={heir.lines} runId={runId} speedRef={speedRef} onDone={onDone} />}
        </div>
      )}
      <PVPlayer ref={pv} visible={phase === 'pv'} heir={heir} />
    </>
  );
}

'use client';
import type { Heir } from '@/lib/heirs';

export default function HeirGrid({
  heirs, onPick,
}: { heirs: Heir[]; onPick: (h: Heir) => void }) {
  return (
    <div className="grid-wrap">
      <header className="masthead">
        <p className="mast-kicker">// OVERRIDE_SEQUENCE :: SELECT A SIGNAL</p>
        <h1>十三位黄金裔</h1>
        <p className="mast-sub">选一个，终端会替你把没写完的那页翻过去。</p>
        <p className="mast-count">13 / 33,550,336 CYCLES ARCHIVED</p>
      </header>
      <div className="grid">
        {heirs.map((h, i) => (
          <button
            key={h.id}
            className="card"
            style={{ '--card': h.color } as React.CSSProperties}
            onClick={() => onPick(h)}
          >
            <span className="card-no">{String(i + 1).padStart(2, '0')}</span>
            <span className="card-signal">{h.signal}</span>
            <span className="card-name">{h.name}</span>
            <span className="card-en">{h.en}</span>
            <span className="card-meta">{h.flame} · {h.motive}</span>
            <span className="card-city">{h.city}</span>
            <span className="card-arrow">↗ PRESS ANY KEY</span>
          </button>
        ))}
      </div>
      <footer className="credit">
        Honkai: Star Rail © All rights reserved by miHoYo<br />
        Other properties and any right, title, and interest thereof and therein
        (intellectual property rights included) not derived from Honkai: Star Rail
        belong to their respective owners.<br />
        Nothing on this site speaks for the official side. · Fan Creations Guide
      </footer>
    </div>
  );
}

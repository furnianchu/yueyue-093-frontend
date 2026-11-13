'use client';
import { useEffect, useRef } from 'react';
import type { TLine, Tone } from '@/lib/heirs';

const CLS: Record<Tone, string> = {
  plain: 't-plain', ok: 't-ok', alert: 't-alert', info: 't-info',
  comment: 't-comment', aha: 't-aha', signal: 't-signal', prompt: 't-prompt',
};

type Props = {
  lines: TLine[];
  runId: number;
  speedRef: React.RefObject<number>;
  onDone: () => void;
};

export default function Terminal({ lines, runId, speedRef, onDone }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let cancelled = false;
    let skip = false;
    const onSkip = () => { skip = true; };
    window.addEventListener('yue:skip', onSkip);
    const wait = (ms: number) => new Promise<void>(r =>
      setTimeout(r, Math.max(0, ms / (speedRef.current || 1))));

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '_';
    const at = (p: HTMLElement) => { p.appendChild(cursor); window.scrollTo(0, document.body.scrollHeight); };

    (async () => {
      const root = box.current;
      if (!root) return;
      root.innerHTML = '';
      for (const L of lines) {
        if (cancelled) return;
        if (L.kind === 'stage') { document.body.dataset.stage = L.to; continue; }
        if (L.pause && !skip) await wait(L.pause);

        if (L.kind === 'blank') {
          const p = document.createElement('p'); p.className = 'row'; root.appendChild(p);
          at(p); await wait(90); continue;
        }

        const p = document.createElement('p');
        p.className = 'row' + (L.kind === 'text' && L.hang ? ' hang' : '');
        root.appendChild(p); at(p);

        if (L.kind === 'text') {
          for (const s of L.segs) {
            const sp = document.createElement('span');
            sp.className = CLS[s.t || 'plain'];
            p.appendChild(sp); at(p);
            if (skip) { sp.textContent = s.text; continue; }
            for (const ch of s.text) {
              if (cancelled) return;
              sp.append(ch);
              let d = ch === ' ' ? 5 : 18;
              if ('.?!~'.includes(ch)) d += 100;
              else if (',:;'.includes(ch)) d += 45;
              await wait(d);
            }
          }
        } else if (L.kind === 'progress') {
          const bar = document.createElement('span'); bar.className = 't-plain';
          p.appendChild(bar); at(p);
          const total = 16;
          const draw = (pct: number) => {
            const f = Math.round(total * pct / 100);
            bar.textContent = L.prefix + '[' + '#'.repeat(f) + '.'.repeat(total - f) + ']  ' + pct + '%';
            window.scrollTo(0, document.body.scrollHeight);
          };
          if (skip) draw(L.pct);
          else {
            const mid = L.stall ? 90 : L.pct;
            for (let n = 0; n <= mid; n += 3) { draw(n); await wait(28); }
            draw(mid);
            if (L.stall) { await wait(L.stall); for (let n = mid + 2; n <= L.pct; n += 2) { draw(n); await wait(40); } }
            draw(L.pct);
          }
          if (L.tail) {
            await wait(160);
            const sp = document.createElement('span');
            sp.className = CLS[L.tailTone || 'ok'];
            sp.textContent = ' >> ' + L.tail;
            p.appendChild(sp); at(p);
          }
        }
        await wait(130);
      }
      if (!cancelled) doneRef.current();
    })();

    return () => { cancelled = true; window.removeEventListener('yue:skip', onSkip); };
  }, [lines, runId, speedRef]);

  return <div ref={box} className="terminal" aria-live="polite" />;
}

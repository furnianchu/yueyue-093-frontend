'use client';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import type { Heir } from '@/lib/heirs';
import { pvUrl } from '@/lib/config';

export type PVHandle = {
  /** 必须在用户点击的同一个同步调用里执行，用来「解锁」移动端静音播放 */
  warmup: (h: Heir) => void;
  /** 终端跑完后：尝试带声音播放，失败则静音播放 + 显示取消静音按钮 */
  start: () => void;
};

type Props = { visible: boolean; heir: Heir | null };

const PVPlayer = forwardRef<PVHandle, Props>(function PVPlayer({ visible, heir }, ref) {
  const v = useRef<HTMLVideoElement>(null);
  const [needUnmute, setNeedUnmute] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [missing, setMissing] = useState(false);

  useImperativeHandle(ref, () => ({
    warmup(h) {
      const el = v.current; if (!el) return;
      setNeedUnmute(false); setBlocked(false); setMissing(false);
      el.muted = true;
      el.playsInline = true;   // iPhone 缺这个会强制全屏
      el.preload = 'auto';
      el.src = pvUrl(h.pv);
      el.load();
      const p = el.play();     // 手势内的静音 play，iOS 只允许这一种
      if (p && typeof p.then === 'function') {
        p.then(() => { el.pause(); el.currentTime = 0; }).catch(() => {});
      }
    },
    async start() {
      const el = v.current; if (!el) return;
      if (el.error) { setMissing(true); return; }   // 文件没放好就不要误弹播放按钮
      el.currentTime = 0;
      el.muted = false;
      try {
        await el.play();
      } catch {
        el.muted = true;
        try { await el.play(); setNeedUnmute(true); }
        catch { setBlocked(true); }   // iOS 低电量模式会走到这里，代码绕不过
      }
    },
  }), []);

  const unmute = () => {
    const el = v.current; if (!el) return;
    el.muted = false;
    setNeedUnmute(false);
    el.play().catch(() => setBlocked(true));
  };

  return (
    <div className={'pv-layer' + (visible ? ' show' : '')} aria-hidden={!visible}>
      {heir && <p className="pv-label" style={{ color: heir.color }}>{heir.signal} :: {heir.name}</p>}
      <video
        ref={v}
        className="pv-video"
        playsInline
        muted
        preload="auto"
        controls={visible}
        onError={() => setMissing(true)}
        onEnded={() => setNeedUnmute(false)}
      />
      {missing && visible && (
        <div className="pv-fallback">
          <p>▌ PV 文件未找到</p>
          <p className="mono">{heir ? pvUrl(heir.pv) : ''}</p>
          <p>把对应 mp4 放到该路径，或配置 NEXT_PUBLIC_PV_BASE 指向 R2。</p>
        </div>
      )}
      {blocked && visible && !missing && (
        <button className="pv-btn" onClick={() => { const el = v.current!; el.muted = false; el.play(); setBlocked(false); }}>
          ▶ 点击播放（若仍无声请关闭低电量模式）
        </button>
      )}
      {needUnmute && visible && !missing && <button className="pv-btn" onClick={unmute}>🔊 取消静音</button>}
      {visible && <button className="pv-back" onClick={() => window.location.reload()}>← 返回选择</button>}
    </div>
  );
});
export default PVPlayer;

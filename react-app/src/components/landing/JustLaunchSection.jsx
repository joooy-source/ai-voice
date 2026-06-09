import { useReveal } from '../../hooks/useScrollAnimations';
import { DownloadIcon } from './icons';
import './JustLaunchSection.css';

// 배너 좌/우 음파(소리 치듯) 막대 — 다운로드 유도 배너라 눈에 띄게
const WAVE = Array.from({ length: 22 }, (_, i) => {
  const t = i / 22;
  const h = 14 + Math.abs(Math.sin(t * Math.PI * 3) * 0.7 + Math.sin(t * Math.PI * 7) * 0.3) * 110;
  return { h, delay: (i % 11) * 0.09 };
});

function Wave({ side }) {
  return (
    <div className={`jl-wave jl-wave--${side}`} aria-hidden>
      {WAVE.map((b, i) => (
        <span
          key={i}
          className="jl-wave-bar"
          style={{ height: `${b.h}px`, animationDelay: `${b.delay}s` }}
        />
      ))}
    </div>
  );
}

export default function JustLaunchSection() {
  const ref = useReveal();
  return (
    <section className="justlaunch section" ref={ref}>
      <div className="jl-banner reveal">
        <div className="jl-glow" aria-hidden />
        <Wave side="left" />
        <Wave side="right" />
        <div className="jl-agent">
          <span className="jl-agent-icon" aria-hidden />
          <span className="jl-agent-text">Agent by</span>
          <span className="jl-agent-logo">OP.GG</span>
        </div>
        <div className="jl-head">
          <h2 className="jl-title grad-text">Just launch your game and it begins</h2>
          <p className="jl-sub">Get the desktop app, pick a voice, and play.</p>
        </div>
        <div className="jl-actions">
          <button type="button" className="btn btn-primary"><DownloadIcon /> Download Desktop App</button>
          <button type="button" className="btn btn-ghost">Browse all voices</button>
        </div>
      </div>
    </section>
  );
}

import { useReveal } from '../../hooks/useScrollAnimations';
import { DownloadIcon } from './icons';
import './JustLaunchSection.css';

// 매끄럽게 흐르는 음파 — 막대들이 연속 위상 지연으로 하나의 파동처럼 움직인다
const BAR_COUNT = 72;
const BARS = Array.from({ length: BAR_COUNT });

export default function JustLaunchSection() {
  const ref = useReveal();
  return (
    <section className="justlaunch section" ref={ref}>
      <div className="jl-banner reveal">
        <div className="jl-glow" aria-hidden />
        <div className="jl-wave" aria-hidden>
          {BARS.map((_, i) => (
            <span
              key={i}
              className="jl-wave-bar"
              style={{ animationDelay: `${(-i * 0.055).toFixed(3)}s` }}
            />
          ))}
        </div>
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

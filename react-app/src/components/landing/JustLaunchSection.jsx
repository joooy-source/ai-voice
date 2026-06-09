import { useReveal } from '../../hooks/useScrollAnimations';
import { DownloadIcon } from './icons';
import './JustLaunchSection.css';

export default function JustLaunchSection() {
  const ref = useReveal();
  return (
    <section className="justlaunch section" ref={ref}>
      <div className="jl-banner reveal">
        {/* 천천히 흐르며 번지는 오로라 */}
        <div className="jl-aurora" aria-hidden>
          <span className="jl-blob jl-blob-1" />
          <span className="jl-blob jl-blob-2" />
          <span className="jl-blob jl-blob-3" />
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

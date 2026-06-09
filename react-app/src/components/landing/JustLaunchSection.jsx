import { useReveal } from '../../hooks/useScrollAnimations';
import { DownloadIcon } from './icons';
import './JustLaunchSection.css';

// Figma 로고 에셋 (임시 URL · 약 7일)
const LOGO = 'https://www.figma.com/api/mcp/asset/cbf1a823-895a-457c-9e3e-ca3f00cb4e6f';

export default function JustLaunchSection() {
  const ref = useReveal();
  return (
    <section className="justlaunch section" ref={ref}>
      <div className="jl-banner reveal">
        {/* 좌우에서 퍼지는 동심원 링 */}
        <div className="jl-rings jl-rings--left" aria-hidden />
        <div className="jl-rings jl-rings--right" aria-hidden />
        <div className="jl-glow" aria-hidden />

        <div className="jl-agent">
          <img className="jl-agent-icon" src={LOGO} alt="" />
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

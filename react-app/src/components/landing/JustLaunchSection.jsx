import { useReveal } from '../../hooks/useScrollAnimations';
import { DownloadIcon } from './icons';
import './JustLaunchSection.css';

// Figma 로고 에셋 (임시 URL · 약 7일)
const AGENT_ICON = 'https://www.figma.com/api/mcp/asset/74d4d220-b4e3-42ab-828c-6e1cad80a882';
const OPGG_LOGO = 'https://www.figma.com/api/mcp/asset/8a6a569b-9c35-4a1e-8276-55722b745c8b';

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
          <img className="jl-agent-icon" src={AGENT_ICON} alt="" />
          <span className="jl-agent-text">Agent by</span>
          <img className="jl-agent-logo" src={OPGG_LOGO} alt="OP.GG" />
        </div>
        <div className="jl-head">
          <h2 className="jl-title grad-text">Just launch your game and it begins</h2>
          <p className="jl-sub">Get the desktop app, pick a voice, and play.</p>
        </div>
        <div className="jl-actions">
          <button type="button" className="btn btn-primary"><DownloadIcon /> Download Desktop App</button>
        </div>
      </div>
    </section>
  );
}

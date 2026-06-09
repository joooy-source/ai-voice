import { useReveal } from '../../hooks/useScrollAnimations';
import { DownloadIcon } from './icons';
import './FinalCtaSection.css';

export default function FinalCtaSection() {
  const ref = useReveal();
  return (
    <section className="finalcta" ref={ref}>
      {/* 다크 배경 위로 부드럽게 호흡하며 떠다니는 그라데이션 원 */}
      <div className="fc-orbs" aria-hidden>
        <span className="fc-orb fc-orb-1" />
        <span className="fc-orb fc-orb-2" />
        <span className="fc-orb fc-orb-3" />
      </div>
      <div className="fc-content reveal">
        <h2 className="fc-title grad-text">
          Experience a richer gaming journey
          <br />
          with your AI Voice Partner.
        </h2>
        <div className="fc-actions">
          <button type="button" className="btn btn-primary"><DownloadIcon /> Download Desktop App</button>
          <button type="button" className="btn btn-ghost">Browse all voices</button>
        </div>
      </div>
    </section>
  );
}

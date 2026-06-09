import { useReveal } from '../../hooks/useScrollAnimations';
import { DownloadIcon } from './icons';
import './FinalCtaSection.css';

export default function FinalCtaSection() {
  const ref = useReveal();
  return (
    <section className="finalcta" ref={ref}>
      <div className="fc-overlay" aria-hidden />
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

import { useReveal } from '../../hooks/useScrollAnimations';
import { ShieldIcon, SupportIcon, StarIcon } from './icons';
import './PremiumSection.css';

const CARDS = [
  { icon: <ShieldIcon width={24} height={24} />, title: 'Ad-free on OP.GG', desc: 'No ads across any OP.GG service.' },
  { icon: <SupportIcon width={24} height={24} />, title: 'Real-time AI coaching', desc: 'Live coaching from your AI, every match.' },
  { icon: <StarIcon width={24} height={24} />, title: 'Exclusive premium features', desc: 'First access to subscriber-only perks.' },
];

export default function PremiumSection() {
  const ref = useReveal();
  return (
    <section className="premium section" ref={ref}>
      <div className="premium-glow" aria-hidden />
      <div className="section-head reveal">
        <h2 className="section-title grad-text">
          Purchase an AI Voice to unlock
          <br />
          Premium subscription benefits
        </h2>
        <p className="section-sub">One subscription gets you the voice plus an ad-free OP.GG and premium features.</p>
      </div>
      <div className="premium-cards reveal-group">
        {CARDS.map(({ icon, title, desc }, i) => (
          <div className="premium-card" key={title} style={{ '--i': i }}>
            <span className="premium-icon">{icon}</span>
            <div className="premium-text">
              <h3 className="premium-card-title">{title}</h3>
              <p className="premium-card-desc">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

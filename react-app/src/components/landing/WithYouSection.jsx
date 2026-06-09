import { useReveal } from '../../hooks/useScrollAnimations';
import { ChatIcon, SupportIcon, AlertIcon } from './icons';
import './WithYouSection.css';

const FEATURES = [
  {
    icon: <ChatIcon width={24} height={24} />,
    title: 'Real-Time Interactive Chat',
    desc: 'Ask anything by voice while you play. The AI answers in real time, matching how you asked.',
  },
  {
    icon: <SupportIcon width={24} height={24} />,
    title: 'Real-Time Gameplay Support',
    desc: 'Your AI voice partner offers guidance based on the flow of the match and your current situation.',
  },
  {
    icon: <AlertIcon width={24} height={24} />,
    title: 'Personalized Match Alerts',
    desc: 'Voice guidance for objectives, item timings, and key moments — without ever leaving the game.',
  },
];

export default function WithYouSection() {
  const ref = useReveal();
  return (
    <section className="withyou section" ref={ref}>
      <h2 className="section-title grad-text reveal" style={{ textAlign: 'center' }}>
        Everything in your game — with you
      </h2>

      <div className="withyou-cards reveal-group">
        {FEATURES.map(({ icon, title, desc }, i) => (
          <div className="withyou-card" key={title} style={{ '--i': i }}>
            <span className="withyou-icon">{icon}</span>
            <h3 className="withyou-card-title">{title}</h3>
            <p className="withyou-card-desc">{desc}</p>
          </div>
        ))}
      </div>

      <div className="withyou-cta reveal">
        <button type="button" className="btn btn-primary">Use it free in the desktop app</button>
        <p className="withyou-note">Default voices are free.</p>
      </div>
    </section>
  );
}

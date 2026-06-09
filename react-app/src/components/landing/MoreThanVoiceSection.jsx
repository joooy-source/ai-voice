import { useReveal } from '../../hooks/useScrollAnimations';
import { PlayIcon, TimerIcon, CartIcon, EyeIcon, MicIcon, TagIcon, StarIcon, ShieldIcon } from './icons';
import './MoreThanVoiceSection.css';

const CARDS = [
  { icon: <PlayIcon width={24} height={24} />, title: 'Live briefings, just press play', desc: 'Start the match — your AI reads the flow and calls your next move.' },
  { icon: <TimerIcon width={24} height={24} />, title: 'Every objective & jungle timer', desc: 'Baron, Dragon, Herald, Voidgrubs — every timer, a beat early.' },
  { icon: <CartIcon width={24} height={24} />, title: 'The exact item to buy, now', desc: 'Reads the enemy comp, calls the item to buy right now.' },
  { icon: <EyeIcon width={24} height={24} />, title: 'Heads-up on enemy recalls', desc: 'Flags every enemy recall — never miss a push or gank.' },
  { icon: <MicIcon width={24} height={24} />, title: 'Ask hands-free, answered live', desc: "'What do I buy into this champ?' — answered in real time. Typing works too." },
  { icon: <TagIcon width={24} height={24} />, title: 'Skin sales & rankings on ask', desc: "'Any skins on sale?' — discounts and rankings, instantly." },
  { icon: <StarIcon width={24} height={24} />, title: "Your creator's vibe, never solo", desc: "Your streamer's style and memes hype you up — pentakills and all." },
  { icon: <ShieldIcon width={24} height={24} />, title: 'Ad-free OP.GG + member perks', desc: 'More than a voice — ad-free OP.GG and subscriber-only perks.' },
];

export default function MoreThanVoiceSection() {
  const ref = useReveal();
  return (
    <section className="mtv section" ref={ref}>
      <div className="section-head reveal">
        <h2 className="section-title grad-text">You get a lot more than a voice</h2>
        <p className="section-sub">Every match, your partner handles the things you keep forgetting.</p>
      </div>

      <div className="mtv-grid reveal-group">
        {CARDS.map(({ icon, title, desc }, i) => (
          <div className="mtv-card" key={title} style={{ '--i': i }}>
            <span className="mtv-icon">{icon}</span>
            <div className="mtv-text">
              <h3 className="mtv-card-title">{title}</h3>
              <p className="mtv-card-desc">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

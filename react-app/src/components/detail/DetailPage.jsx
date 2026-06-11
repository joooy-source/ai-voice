import { useEffect, useState } from 'react';
import Nav from '../landing/Nav';
import Footer from '../landing/Footer';
import { PlayIcon, PauseIcon, DownloadIcon } from '../landing/icons';
import { getVoice, PRICE } from '../../data/voices';
import './DetailPage.css';

const MENU = [
  { id: 'voice', label: 'Voice' },
  { id: 'profile', label: 'Profile' },
  { id: 'ingame', label: 'In-game' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
];

const FEATURES = [
  { title: 'Lane Coaching', desc: 'Real-time laning tips for your champion and role.' },
  { title: 'Real-Time Alerts', desc: 'Voice briefings on power spikes, recalls, and objective timers.' },
  { title: 'Combat Analysis', desc: 'Reads the map and guides whether to group or take vision.' },
  { title: 'Build Coaching', desc: 'The item path best suited for the current matchup.' },
];

const FAQS = [
  { q: 'Is the AI Voice feature safe regarding game policies?', a: "Yes. OP.GG complies with Riot Games' policies and operates within guidelines." },
  { q: 'How is this voice created?', a: 'Trained on the creator’s real voice data with their consent for a lively, accurate match.' },
  { q: 'Can I cancel anytime?', a: 'Yes — cancel anytime from My Account; access continues until the period ends.' },
];

const WAVE = Array.from({ length: 40 }, (_, i) => 6 + Math.abs(Math.sin(i * 0.7)) * 22);

export default function DetailPage({ id }) {
  const voice = getVoice(id);
  const [active, setActive] = useState('voice');
  const [playing, setPlaying] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [barShown, setBarShown] = useState(false);

  // 스크롤스파이: 보이는 섹션을 좌측 메뉴에 반영
  useEffect(() => {
    const els = MENU.map((m) => document.getElementById(`sec-${m.id}`)).filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace('sec-', ''));
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [id]);

  useEffect(() => {
    const onScroll = () => setBarShown(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (mid) => {
    const el = document.getElementById(`sec-${mid}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="detail">
      <Nav active="store" />

      {/* 풀스크린 Hero */}
      <header className="dt-hero">
        <div className="dt-hero-portrait" style={{ backgroundColor: voice.bg }}>
          <img src={voice.img} alt={voice.name} />
          <div className="dt-hero-fade-l" aria-hidden />
          <div className="dt-hero-fade-b" aria-hidden />
        </div>
        <div className="dt-hero-glow" aria-hidden />
        <div className="dt-hero-content">
          <p className="dt-hero-kicker">OP.GG AI Voice · {voice.team}</p>
          <h1 className="dt-hero-name grad-text">{voice.name}</h1>
          <p className="dt-hero-desc">
            Your AI partner in {voice.name}&apos;s voice — real-time calls, coaching, and the
            personality you love, in every game.
          </p>
          <a className="btn btn-linear download-cta dt-hero-cta" href="#pricing" onClick={(e) => { e.preventDefault(); go('pricing'); }}>
            <DownloadIcon width={18} height={18} /> Subscribe — {PRICE} / month
          </a>
        </div>
      </header>

      {/* 본문: 좌측 고정 메뉴 + 우측 섹션 */}
      <div className="dt-body">
        <aside className="dt-menu">
          <nav className="dt-menu-inner">
            {MENU.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`dt-menu-item ${active === m.id ? 'is-active' : ''}`}
                onClick={() => go(m.id)}
              >
                {m.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="dt-content">
          {/* Voice */}
          <section id="sec-voice" className="dt-sec">
            <h2 className="dt-sec-title">Voice Preview</h2>
            <div className="dt-preview">
              <button type="button" className="dt-preview-play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
                {playing ? <PauseIcon width={22} height={22} /> : <PlayIcon width={22} height={22} />}
              </button>
              <div className={`dt-wave ${playing ? 'is-playing' : ''}`}>
                {WAVE.map((h, i) => (
                  <span key={i} style={{ height: `${h}px`, animationDelay: `${(i % 10) * 0.07}s` }} />
                ))}
              </div>
            </div>
            <p className="dt-sec-text">Hear a sample of {voice.name}&apos;s AI voice before you subscribe.</p>
          </section>

          {/* Profile */}
          <section id="sec-profile" className="dt-sec">
            <h2 className="dt-sec-title">Meet your partner</h2>
            <p className="dt-sec-text">
              {voice.name} brings their signature energy to every match — hype on plays, calm reads
              under pressure, and the in-jokes you know and love.
            </p>
            <div className="dt-stats">
              <div className="dt-stat"><b>{voice.team}</b><span>Affiliation</span></div>
              <div className="dt-stat"><b>LoL</b><span>Game</span></div>
              <div className="dt-stat"><b>Realtime</b><span>Voice AI</span></div>
            </div>
          </section>

          {/* In-game */}
          <section id="sec-ingame" className="dt-sec">
            <h2 className="dt-sec-title">In-game coaching</h2>
            <div className="dt-features">
              {FEATURES.map((f) => (
                <div className="dt-feature" key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section id="sec-pricing" className="dt-sec">
            <h2 className="dt-sec-title">Ready to play together?</h2>
            <div className="dt-price-wrap">
              <div className="dt-price-glow" aria-hidden />
              <div className="price-card">
                <span className="price-spark price-spark-1" aria-hidden />
                <span className="price-spark price-spark-2" aria-hidden />
                <span className="price-spark price-spark-3" aria-hidden />
                <div className="price-badge">Subscriber</div>
                <p className="price-label">Monthly subscription</p>
                <p className="price-amount">{PRICE}<span> / month</span></p>
                <ul className="price-list">
                  <li>Real-time AI voice in {voice.name}&apos;s voice</li>
                  <li>Live coaching & call-outs every match</li>
                  <li>Ad-free OP.GG + subscriber perks</li>
                </ul>
                <button type="button" className="btn btn-linear download-cta price-cta">
                  <DownloadIcon width={18} height={18} /> Subscribe now
                </button>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="sec-faq" className="dt-sec">
            <h2 className="dt-sec-title">FAQ</h2>
            <div className="dt-faq">
              {FAQS.map((f, i) => (
                <div className={`dt-faq-item ${openFaq === i ? 'is-open' : ''}`} key={f.q}>
                  <button type="button" className="dt-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span>{f.q}</span>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                  <div className="dt-faq-a-wrap"><p className="dt-faq-a">{f.a}</p></div>
                </div>
              ))}
            </div>
            <p className="dt-note">
              Your subscription activates immediately upon payment and auto-renews monthly. You can
              cancel anytime via My Account.
            </p>
          </section>
        </div>
      </div>

      <Footer />

      {/* 플로팅 구독 바 */}
      <div className={`dt-bar ${barShown ? 'is-shown' : ''}`}>
        <div className="dt-bar-inner">
          <div className="dt-bar-info">
            <img src={voice.img} alt="" />
            <div>
              <p className="dt-bar-name">{voice.name}</p>
              <p className="dt-bar-price">{PRICE} / month</p>
            </div>
          </div>
          <button type="button" className="btn btn-linear download-cta">
            <DownloadIcon width={18} height={18} /> Subscribe now
          </button>
        </div>
      </div>
    </div>
  );
}

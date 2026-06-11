import Nav from '../landing/Nav';
import Footer from '../landing/Footer';
import { VOICES, PRICE, COMING_SOON } from '../../data/voices';
import './StorePage.css';

function ArrowBtn() {
  return (
    <span className="store-card-arrow" aria-hidden>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
      </svg>
    </span>
  );
}

export default function StorePage() {
  return (
    <div className="store">
      <Nav active="store" />

      <header className="store-hero">
        <div className="store-hero-glow" aria-hidden />
        <h1 className="store-title grad-text">Voice Store</h1>
        <p className="store-sub">Browse AI Voice products and choose a voice to start your subscription.</p>
      </header>

      <div className="store-controls">
        <div className="store-count">
          Pro Players <span className="store-count-badge">{VOICES.length}</span>
        </div>
        <div className="store-filters">
          <div className="store-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input type="text" placeholder="Search voices" aria-label="Search voices" />
          </div>
          <button type="button" className="store-sort">
            Newest
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
          </button>
        </div>
      </div>

      <div className="store-grid">
        {VOICES.map((v) => (
          <a key={v.id} className="store-card" href={`#/voice/${v.id}`}>
            <div className="store-card-img" style={{ backgroundColor: v.bg }}>
              <img src={v.storeImg || v.img} alt={v.name} loading="lazy" />
            </div>
            <div className="store-card-foot">
              <div className="store-card-label">
                <span className="store-card-name">{v.name}</span>
                <span className="store-card-price">{PRICE} / month</span>
                <span className="store-card-meet">Meet this partner</span>
              </div>
              <ArrowBtn />
            </div>
          </a>
        ))}
      </div>

      <div className="store-coming">
        {[0, 1].map((i) => (
          <div className="store-coming-card" key={i}>
            <img src={COMING_SOON} alt="Coming soon" loading="lazy" />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

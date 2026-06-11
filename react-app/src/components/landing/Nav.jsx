import { useScrolled } from '../../hooks/useScrollAnimations';
import { DownloadIcon } from './icons';
import './Nav.css';

// Figma 로고 에셋 (임시 URL · 약 7일 유효 → 영구 사용 시 public/ 에 저장 권장)
const LOGO = 'https://www.figma.com/api/mcp/asset/cbf1a823-895a-457c-9e3e-ca3f00cb4e6f';

export default function Nav({ active = 'voice' }) {
  const scrolled = useScrolled(20);
  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="nav-left">
          <a href="#/" aria-label="AI Voice home">
            <img className="nav-logo" src={LOGO} alt="AI Voice" />
          </a>
          <div className="nav-links">
            <a className={`nav-link ${active === 'voice' ? 'nav-link--active' : ''}`} href="#/">AI Voice</a>
            <a className={`nav-link ${active === 'store' ? 'nav-link--active' : ''}`} href="#/store">Store</a>
          </div>
        </div>
        <button type="button" className="nav-cta btn-linear download-cta">
          <DownloadIcon width={16} height={16} /> Download Desktop App
        </button>
      </div>
    </nav>
  );
}

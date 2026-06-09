import { useScrolled } from '../../hooks/useScrollAnimations';
import './Nav.css';

export default function Nav() {
  const scrolled = useScrolled(20);
  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <span className="nav-logo">OP.GG</span>
        <a className="nav-link nav-link--active" href="#hero">AI Voice</a>
        <a className="nav-link" href="#marquee">Store</a>
        <span className="nav-spacer" />
        <button type="button" className="nav-cta">Download Desktop App</button>
      </div>
    </nav>
  );
}

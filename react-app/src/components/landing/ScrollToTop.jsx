import { useScrolled } from '../../hooks/useScrollAnimations';
import { ArrowUpIcon } from './icons';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const visible = useScrolled(500);
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <button
      type="button"
      className={`to-top ${visible ? 'is-visible' : ''}`}
      onClick={toTop}
      aria-label="Back to top"
    >
      <ArrowUpIcon width={22} height={22} />
    </button>
  );
}

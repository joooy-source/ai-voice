import { useScrolled } from '../../hooks/useScrollAnimations';
import { ArrowUpIcon } from './icons';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const visible = useScrolled(500);
  const toTop = () => {
    // 위로 가는 동안 코치 영상 소리 끄기 (지나가며 소리 나는 것 방지)
    window.dispatchEvent(new Event('coach-silence'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
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

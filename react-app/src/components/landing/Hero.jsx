import { useParallax } from '../../hooks/useScrollAnimations';
import { DownloadIcon, ArrowDownIcon } from './icons';
import './Hero.css';

// 디자인의 waveform을 코드로 생성 — 각 막대는 계속 진동(소리 들리는 모션)
const BAR_COUNT = 88;
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / BAR_COUNT;
  // 두 개의 사인을 겹쳐 자연스러운 파형 높이를 만든다 (10~100%)
  const base =
    Math.abs(Math.sin(t * Math.PI * 4) * 0.6 + Math.sin(t * Math.PI * 9) * 0.4);
  return {
    height: 12 + base * 88,
    delay: (i % 16) * 0.07,
    opacity: 0.25 + base * 0.65,
  };
});

export default function Hero() {
  const waveRef = useParallax(0.3);

  return (
    <header className="hero" id="hero">
      <div className="hero-glow" aria-hidden />

      <div className="hero-wave" ref={waveRef} aria-hidden>
        {BARS.map((b, i) => (
          <span
            key={i}
            className="hero-wave-bar"
            style={{
              height: `${b.height}px`,
              opacity: b.opacity,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="hero-content">
        <h1 className="hero-title grad-text">
          our own AI voice partner
          <br />
          for more fun in every game
        </h1>
        <p className="hero-sub">
          Get real-time answers in your favorite creator&apos;s voice.
          <br />
          Your AI partner brings the fun and the info your play needs — at once.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn btn-primary">
            <DownloadIcon /> Download Desktop App
          </button>
          <button type="button" className="btn btn-ghost">Browse all voices</button>
        </div>
      </div>

      <a className="hero-scroll" href="#coach" aria-label="Scroll down">
        <ArrowDownIcon />
      </a>
    </header>
  );
}

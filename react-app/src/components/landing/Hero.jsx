import { DownloadIcon, ArrowDownIcon } from './icons';
import './Hero.css';

export default function Hero() {
  return (
    <header className="hero" id="hero">
      {/* 배경 영상 (음소거 자동재생 루프) */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src="/hero-orb.mp4"
      />
      {/* 배경이므로 블랙 딤 — 텍스트 가독성 확보 */}
      <div className="hero-dim" aria-hidden />

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

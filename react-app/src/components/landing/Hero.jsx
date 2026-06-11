import { useEffect, useRef, useState } from 'react';
import { DownloadIcon, ArrowDownIcon } from './icons';
import './Hero.css';

const SRC = `${import.meta.env.BASE_URL}hero-orb.mp4`;
const FADE = 0.7; // 루프 지점 크로스페이드 길이(초)

export default function Hero() {
  const aRef = useRef(null);
  const bRef = useRef(null);
  const [front, setFront] = useState('a');

  const scrollToCoach = () => {
    document.getElementById('coach')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 영상 2개를 번갈아 재생하며 루프 이음새를 크로스페이드로 가린다 → 자연스러운 무한루프
  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return undefined;
    let swapping = false;

    const onTime = (e) => {
      const v = e.target;
      const dur = v.duration;
      if (!dur || Number.isNaN(dur)) return;
      if (!swapping && v.currentTime >= dur - FADE) {
        swapping = true;
        const other = v === a ? b : a;
        other.currentTime = 0;
        other.play().catch(() => {});
        setFront(v === a ? 'b' : 'a');
      }
    };
    const onEnded = (e) => {
      e.target.pause();
      swapping = false;
    };

    [a, b].forEach((v) => {
      v.addEventListener('timeupdate', onTime);
      v.addEventListener('ended', onEnded);
    });
    a.play().catch(() => {});

    return () => {
      [a, b].forEach((v) => {
        v.removeEventListener('timeupdate', onTime);
        v.removeEventListener('ended', onEnded);
      });
    };
  }, []);

  return (
    <header className="hero" id="hero">
      <video
        ref={aRef}
        className={`hero-video ${front === 'a' ? 'is-front' : ''}`}
        muted
        playsInline
        preload="auto"
        src={SRC}
      />
      <video
        ref={bRef}
        className={`hero-video ${front === 'b' ? 'is-front' : ''}`}
        muted
        playsInline
        preload="auto"
        src={SRC}
      />
      {/* 배경 딤 (약 40%) */}
      <div className="hero-dim" aria-hidden />

      <div className="hero-content">
        <h1 className="hero-title">
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
          <button type="button" className="btn btn-motion download-cta">
            <DownloadIcon /> Download Desktop App
          </button>
        </div>
      </div>

      <button type="button" className="hero-scroll" onClick={scrollToCoach} aria-label="Scroll to coach section">
        <ArrowDownIcon />
      </button>
    </header>
  );
}

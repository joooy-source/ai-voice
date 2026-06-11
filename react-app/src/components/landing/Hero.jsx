import { useEffect, useRef, useState } from 'react';
import { DownloadIcon, ArrowDownIcon, MuteIcon } from './icons';
import './Hero.css';

const SRC = `${import.meta.env.BASE_URL}hero-orb.mp4`;
// 히어로 진입 시 자동 재생되는 보이스 (하단 스피커 버튼으로 on/off)
// ?v= : public 파일은 파일명이 그대로라 캐시가 남음 → 교체 시 버전 올려 캐시 무력화
const AUDIO = `${import.meta.env.BASE_URL}voice/hero-voice.mp3?v=2`;
const FADE = 0.7; // 루프 지점 크로스페이드 길이(초)

export default function Hero() {
  const aRef = useRef(null);
  const bRef = useRef(null);
  const audioRef = useRef(null);
  const heroRef = useRef(null);
  const [front, setFront] = useState('a');
  const [playing, setPlaying] = useState(false); // 소리 켜짐 의도
  const [inView, setInView] = useState(true);
  const inViewRef = useRef(true);

  const toggleSound = () => setPlaying((p) => !p);

  // 히어로는 sticky라 IntersectionObserver로는 "항상 보임"으로 잡힘 →
  // 스크롤 위치로 판단: 약 반 화면 이상 내려가면(콘텐츠가 덮으면) 음성 정지
  useEffect(() => {
    const update = () => {
      const visible = window.scrollY < window.innerHeight * 0.55;
      setInView(visible);
      inViewRef.current = visible;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing && inView) el.play().catch(() => {});
    else el.pause();
  }, [playing, inView]);

  // 진입 즉시 재생 시도 — 막히면 첫 인터랙션(움직임/스크롤/클릭/키) 때 소리 켜기
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return undefined;
    let done = false;
    const EVENTS = ['pointerdown', 'pointermove', 'mousemove', 'keydown', 'touchstart', 'wheel', 'scroll'];
    const cleanup = () => EVENTS.forEach((e) => window.removeEventListener(e, enable));
    const enable = () => {
      if (done || !inViewRef.current) return; // 히어로 안 보이면 켜지 않음
      const p = el.play();
      if (p && p.then) {
        p.then(() => { done = true; setPlaying(true); cleanup(); }).catch(() => {});
      }
    };
    enable();
    EVENTS.forEach((e) => window.addEventListener(e, enable, { passive: true }));
    return cleanup;
  }, []);

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
    <header className="hero" id="hero" ref={heroRef}>
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

      {/* 우측 하단 사운드 버튼 (아이콘만) */}
      <button
        type="button"
        className={`hero-sound ${playing ? 'is-playing' : ''}`}
        onClick={toggleSound}
        aria-label={playing ? 'Stop AI voice' : 'Play title in AI voice'}
      >
        {playing ? (
          <span className="hero-sound-bars" aria-hidden>
            <i /><i /><i /><i />
          </span>
        ) : (
          <MuteIcon width={22} height={22} />
        )}
      </button>
      <audio ref={audioRef} src={AUDIO} preload="auto" onEnded={() => setPlaying(false)} />

      <a className="hero-scroll" href="#coach" aria-label="Scroll down">
        <ArrowDownIcon />
      </a>
    </header>
  );
}

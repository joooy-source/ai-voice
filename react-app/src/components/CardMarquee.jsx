import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useScrollAnimations';
import { getVoice } from '../data/voices';
import './CardMarquee.css';

// 카드 이미지 — Figma 디자인의 임시 에셋 URL (약 7일간 유효).
// 영구적으로 쓰려면 public/ 에 이미지를 받아 경로를 교체하세요.
const VOICE_CARDS = [
  { id: 'drx-vincenzo', src: 'https://www.figma.com/api/mcp/asset/58f2f870-3760-4136-b212-75b49d12af49', bg: '#242430', name: 'DRX Vincenzo' },
  { id: 'drx-ucal', src: 'https://www.figma.com/api/mcp/asset/1ded3ce6-fd94-4961-8699-861b7f993332', bg: '#2a2a34', name: 'DRX Ucal' },
  { id: 'drx-willer', src: 'https://www.figma.com/api/mcp/asset/326fb409-5d8e-4c56-8554-dbe3c7d14038', bg: '#26222e', name: 'DRX Willer' },
  { id: 'drx-andil', src: 'https://www.figma.com/api/mcp/asset/bcfc4a75-9cbe-4afc-9967-d31d249cf965', bg: '#2b2b36', name: 'DRX Andil' },
  { id: 'drx-lazyfeel', src: 'https://www.figma.com/api/mcp/asset/6d419085-34a3-470b-8711-6ffc8e8683df', bg: '#26222e', name: 'DRXLazyfeel' },
  { id: 'drx-rich', src: 'https://www.figma.com/api/mcp/asset/f588e805-c5af-47cc-949d-1f6e4e9e95ad', bg: '#2b2b36', name: 'DRXRich' },
  { id: 'doublelift', src: 'https://www.figma.com/api/mcp/asset/003c300c-6fb7-4cf3-9d2f-872b2c63afa3', bg: '#1f1f27', name: 'Doublelift' },
  { id: 'jankos', src: 'https://www.figma.com/api/mcp/asset/e1c52722-d915-4886-98fc-c906507b3e15', bg: '#1f1f27', name: 'Jankos' },
  { id: 'noarmwhatley', src: 'https://www.figma.com/api/mcp/asset/dc45b29c-1446-4672-bc54-faf12646b811', bg: '#242430', name: 'NoArmWhatley' },
  { id: 'alois', src: 'https://www.figma.com/api/mcp/asset/560fcc79-ff14-43ce-8122-f1b98b32a039', bg: '#2a2a34', name: 'Alois' },
  { id: 'fanfan', src: 'https://www.figma.com/api/mcp/asset/90169fa5-602b-49c7-b18d-89bcc2fb446d', bg: '#1f1f27', name: 'fanfan' },
  { id: 'typical-gamer', src: 'https://www.figma.com/api/mcp/asset/c564d3f6-ba86-47f4-8eb4-e4b99ca3374a', bg: '#2e2535', name: 'Typical Gamer' },
  { id: 'neekolul', src: 'https://www.figma.com/api/mcp/asset/1dfeae40-58ba-491f-8feb-a95769e93a06', bg: '#2e2535', name: 'Neekolul' },
];

const SAMPLE_AUDIO = `${import.meta.env.BASE_URL}voice/ai-voice.mp3`;

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function CardMarquee() {
  // 끊김 없는 무한 스크롤을 위해 카드 목록을 두 번 렌더링한다.
  const loop = [...VOICE_CARDS, ...VOICE_CARDS];
  const ref = useReveal();
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(null);

  // rAF 기반 스크롤 — 마우스가 가쪽일수록 그 방향으로 더 빠르게
  useEffect(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const BASE = 1.3; // 비호버 시 기본 자동 스크롤 속도(px/frame)
    const BOOST = 4; // 가쪽으로 갈수록 빨라지는 정도
    const DEAD = 0.22; // 가운데 정지 구간(절반 폭 비율) → 카드 호버 시 멈춤
    let x = 0;
    let half = track.scrollWidth / 2;
    let hovering = false;
    let factor = 0; // -1(왼쪽)…0…1(오른쪽)
    let raf = 0;

    const measure = () => { half = track.scrollWidth / 2; };
    const tick = () => {
      // 비호버: 천천히 자동 스크롤 / 호버: 가운데 정지, 가쪽일수록 그 방향으로 빠르게
      const v = hovering ? factor * BOOST : BASE;
      x -= v;
      if (x <= -half) x += half;
      else if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      const r = vp.getBoundingClientRect();
      const s = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
      hovering = true;
      if (Math.abs(s) < DEAD) factor = 0; // 가운데(카드 호버) → 정지
      else factor = Math.sign(s) * ((Math.abs(s) - DEAD) / (0.5 - DEAD));
    };
    const onLeave = () => { hovering = false; factor = 0; };

    measure();
    raf = requestAnimationFrame(tick);
    vp.addEventListener('mousemove', onMove);
    vp.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      vp.removeEventListener('mousemove', onMove);
      vp.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // 가운데 재생 버튼 → 샘플 보이스 재생 (디테일 이동 X)
  const playSample = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    const a = audioRef.current;
    if (!a) return;
    if (playing === key) {
      a.pause();
      setPlaying(null);
      return;
    }
    a.currentTime = 0;
    a.play().catch(() => {});
    setPlaying(key);
  };

  return (
    <section className="marquee-section" ref={ref}>
      <div className="marquee-heading reveal">
        <h2 className="marquee-title">Meet your AI voice partners</h2>
        <p className="marquee-subtitle">
          New voice partners are on the way. Browse the store to see what's available.
        </p>
      </div>

      <a href="#/store" className="marquee-cta reveal">Browse all voices</a>

      <div className="marquee-viewport reveal" ref={viewportRef}>
        <div className="marquee-track" ref={trackRef}>
          {loop.map((card, i) => (
            <a
              key={i}
              href={`#/voice/${card.id}`}
              className="marquee-card"
              style={{ backgroundColor: card.bg }}
              aria-hidden={i >= VOICE_CARDS.length ? 'true' : undefined}
              tabIndex={i >= VOICE_CARDS.length ? -1 : undefined}
            >
              <img className="marquee-card-img" src={getVoice(card.id).storeImg || card.src} alt="" loading="lazy" />
              <div className="marquee-card-overlay">
                <button
                  type="button"
                  className="marquee-card-play"
                  onClick={(e) => playSample(e, i)}
                  aria-label={playing === i ? 'Pause sample' : 'Play sample'}
                >
                  {playing === i ? <PauseIcon /> : <PlayIcon />}
                </button>
                <div className="marquee-card-bottom">
                  <span className="marquee-card-text">
                    <span className="marquee-card-name">{card.name}</span>
                    <span className="marquee-card-link">Meet this partner</span>
                  </span>
                  <span className="marquee-card-arrow"><ArrowIcon /></span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <audio ref={audioRef} src={SAMPLE_AUDIO} onEnded={() => setPlaying(null)} preload="none" />
    </section>
  );
}

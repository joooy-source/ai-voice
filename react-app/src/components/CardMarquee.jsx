import { useReveal } from '../hooks/useScrollAnimations';
import './CardMarquee.css';

// 카드 이미지 — Figma 디자인의 임시 에셋 URL (약 7일간 유효).
// 영구적으로 쓰려면 public/ 에 이미지를 받아 경로를 교체하세요.
// name 은 이미지에 맞게 수정하세요 (호버 시 표시).
const VOICE_CARDS = [
  { src: 'https://www.figma.com/api/mcp/asset/58f2f870-3760-4136-b212-75b49d12af49', bg: '#242430', name: 'Zeus' },
  { src: 'https://www.figma.com/api/mcp/asset/1ded3ce6-fd94-4961-8699-861b7f993332', bg: '#2a2a34', name: 'Oner' },
  { src: 'https://www.figma.com/api/mcp/asset/326fb409-5d8e-4c56-8554-dbe3c7d14038', bg: '#26222e', name: 'Faker' },
  { src: 'https://www.figma.com/api/mcp/asset/bcfc4a75-9cbe-4afc-9967-d31d249cf965', bg: '#2b2b36', name: 'Gumayusi' },
  { src: 'https://www.figma.com/api/mcp/asset/6d419085-34a3-470b-8711-6ffc8e8683df', bg: '#26222e', name: 'Keria' },
  { src: 'https://www.figma.com/api/mcp/asset/f588e805-c5af-47cc-949d-1f6e4e9e95ad', bg: '#2b2b36', name: 'Chovy' },
  { src: 'https://www.figma.com/api/mcp/asset/003c300c-6fb7-4cf3-9d2f-872b2c63afa3', bg: '#1f1f27', name: 'Doublelift' },
  { src: 'https://www.figma.com/api/mcp/asset/e1c52722-d915-4886-98fc-c906507b3e15', bg: '#1f1f27', name: 'Caps' },
  { src: 'https://www.figma.com/api/mcp/asset/dc45b29c-1446-4672-bc54-faf12646b811', bg: '#242430', name: 'Ruler' },
  { src: 'https://www.figma.com/api/mcp/asset/560fcc79-ff14-43ce-8122-f1b98b32a039', bg: '#2a2a34', name: 'Knight' },
  { src: 'https://www.figma.com/api/mcp/asset/90169fa5-602b-49c7-b18d-89bcc2fb446d', bg: '#1f1f27', name: 'Bin' },
  { src: 'https://www.figma.com/api/mcp/asset/c564d3f6-ba86-47f4-8eb4-e4b99ca3374a', bg: '#2e2535', name: 'ShowMaker' },
  { src: 'https://www.figma.com/api/mcp/asset/1dfeae40-58ba-491f-8feb-a95769e93a06', bg: '#2e2535', name: 'Canyon' },
];

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
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

  return (
    <section className="marquee-section" ref={ref}>
      <div className="marquee-heading reveal">
        <h2 className="marquee-title">Meet your AI voice partners</h2>
        <p className="marquee-subtitle">
          New voice partners are on the way. Browse the store to see what's available.
        </p>
      </div>

      <button type="button" className="marquee-cta reveal">Browse all voices</button>

      <div className="marquee-viewport reveal">
        <div className="marquee-track">
          {loop.map((card, i) => (
            <div
              key={i}
              className="marquee-card"
              style={{ backgroundColor: card.bg }}
              aria-hidden={i >= VOICE_CARDS.length ? 'true' : undefined}
            >
              <img className="marquee-card-img" src={card.src} alt="" loading="lazy" />
              <div className="marquee-card-overlay">
                <span className="marquee-card-play"><PlayIcon /></span>
                <div className="marquee-card-bottom">
                  <span className="marquee-card-text">
                    <span className="marquee-card-name">{card.name}</span>
                    <span className="marquee-card-link">Meet this partner</span>
                  </span>
                  <span className="marquee-card-arrow"><ArrowIcon /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

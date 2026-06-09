import './CardMarquee.css';

// 카드 이미지 — Figma 디자인의 임시 에셋 URL (약 7일간 유효).
// 영구적으로 쓰려면 public/ 에 이미지를 받아 경로를 교체하세요.
// name 은 이미지에 맞게 수정하세요 (호버 시 표시).
const VOICE_CARDS = [
  { src: 'https://www.figma.com/api/mcp/asset/3fca7fc4-a20d-4fc3-9398-669c40ada7cf', bg: '#242430', name: 'Doublelift' },
  { src: 'https://www.figma.com/api/mcp/asset/0a1f255f-3958-42c4-9a4c-d6da21d2daf3', bg: '#2a2a34', name: 'Faker' },
  { src: 'https://www.figma.com/api/mcp/asset/8643a42e-e4ee-4912-a865-0e255d61b02e', bg: '#26222e', name: 'Caps' },
  { src: 'https://www.figma.com/api/mcp/asset/856fccb6-5708-4b05-aa75-2de5eb579d60', bg: '#2b2b36', name: 'Chovy' },
  { src: 'https://www.figma.com/api/mcp/asset/0b8a8e5e-3c2b-4c28-aa12-b68f6eb7939e', bg: '#26222e', name: 'Keria' },
  { src: 'https://www.figma.com/api/mcp/asset/b5523068-aaeb-461d-9de8-fb7e8c38d4a2', bg: '#2b2b36', name: 'Ruler' },
  { src: 'https://www.figma.com/api/mcp/asset/fbdb08d6-65e1-4994-895e-f061f763d478', bg: '#1f1f27', name: 'Caps' },
  { src: 'https://www.figma.com/api/mcp/asset/b9edbd1b-078a-4810-b4e3-a216a6037935', bg: '#242430', name: 'Zeus' },
  { src: 'https://www.figma.com/api/mcp/asset/b7702eaa-a4e3-4b9b-b7e3-0fe1dfb4c3be', bg: '#2a2a34', name: 'Oner' },
  { src: 'https://www.figma.com/api/mcp/asset/864f29ce-4c93-41b0-af15-5c8092c7a73e', bg: '#1f1f27', name: 'Gumayusi' },
  { src: 'https://www.figma.com/api/mcp/asset/d1c9e655-d092-4405-9daf-7dde6009abd5', bg: '#2e2535', name: 'Knight' },
  { src: 'https://www.figma.com/api/mcp/asset/955c6ede-5a00-42fe-b247-382a679d34eb', bg: '#2e2535', name: 'Bin' },
];

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
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

  return (
    <section className="marquee-section">
      <div className="marquee-heading">
        <h2 className="marquee-title">Meet your AI voice partners</h2>
        <p className="marquee-subtitle">
          New voice partners are on the way. Browse the store to see what's available.
        </p>
      </div>

      <button type="button" className="marquee-cta">Browse all voices</button>

      <div className="marquee-viewport">
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

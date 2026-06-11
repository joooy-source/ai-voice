// 공용 보이스 데이터 (마퀴/스토어/디테일 공유)
const A = 'https://www.figma.com/api/mcp/asset/';
// 디테일 히어로 이미지는 public/detail-hero/ 에 영구 저장 (GitHub Pages 서브경로 대응)
const H = `${import.meta.env.BASE_URL}detail-hero/`;

export const PRICE = '₩29,000';

export const VOICES = [
  { id: 'drx-vincenzo', name: 'DRX Vincenzo', team: 'DRX', img: `${A}58f2f870-3760-4136-b212-75b49d12af49`, hero: `${H}drx-vincenzo-hero.png`, bg: '#242430' },
  { id: 'drx-ucal', name: 'DRX Ucal', team: 'DRX', img: `${A}1ded3ce6-fd94-4961-8699-861b7f993332`, hero: `${H}drx-ucal-hero.png`, bg: '#2a2a34' },
  { id: 'drx-willer', name: 'DRX Willer', team: 'DRX', img: `${A}326fb409-5d8e-4c56-8554-dbe3c7d14038`, hero: `${H}drx-willer-hero.png`, bg: '#26222e' },
  { id: 'drx-andil', name: 'DRX Andil', team: 'DRX', img: `${A}bcfc4a75-9cbe-4afc-9967-d31d249cf965`, hero: `${H}drx-andil-hero.png`, bg: '#2b2b36' },
  { id: 'drx-lazyfeel', name: 'DRX Lazyfeel', team: 'DRX', img: `${A}6d419085-34a3-470b-8711-6ffc8e8683df`, hero: `${H}drx-lazyfeel-hero.png`, bg: '#26222e' },
  { id: 'drx-rich', name: 'DRX Rich', team: 'DRX', img: `${A}f588e805-c5af-47cc-949d-1f6e4e9e95ad`, hero: `${H}drx-rich-hero.png`, bg: '#2b2b36' },
  { id: 'doublelift', name: 'Doublelift', team: 'Creator', img: `${A}003c300c-6fb7-4cf3-9d2f-872b2c63afa3`, hero: `${H}doublelift-hero.png`, bg: '#1f1f27', videos: [
    'https://s-agent-static.op.gg/videos/doublelift/d2edae93-d63a-4081-8471-cfdd27dbccfc/index.m3u8',
    'https://s-agent-static.op.gg/videos/doublelift/15c9bcd8-7b71-49b6-8a07-c317e1f73ba9/index.m3u8',
    'https://s-agent-static.op.gg/videos/doublelift/5f8fa3a8-cfb2-4644-8da2-f6a41a42d565/index.m3u8',
  ] },
  { id: 'jankos', name: 'Jankos', team: 'Creator', img: `${A}e1c52722-d915-4886-98fc-c906507b3e15`, hero: `${H}jankos-hero.png`, bg: '#1f1f27' },
  { id: 'noarmwhatley', name: 'NoArmWhatley', team: 'Creator', img: `${A}dc45b29c-1446-4672-bc54-faf12646b811`, hero: `${H}noarmwhatley-hero.png`, bg: '#242430' },
  { id: 'alois', name: 'Alois', team: 'Creator', img: `${A}560fcc79-ff14-43ce-8122-f1b98b32a039`, hero: `${H}alois-hero.png`, bg: '#2a2a34' },
  { id: 'fanfan', name: 'fanfan', team: 'Creator', img: `${A}90169fa5-602b-49c7-b18d-89bcc2fb446d`, hero: `${H}fanfan-hero.png`, bg: '#1f1f27' },
  { id: 'typical-gamer', name: 'Typical Gamer', team: 'Creator', img: `${A}c564d3f6-ba86-47f4-8eb4-e4b99ca3374a`, hero: `${H}typical-gamer-hero.png`, bg: '#2e2535' },
  { id: 'neekolul', name: 'Neekolul', team: 'Creator', img: `${A}1dfeae40-58ba-491f-8feb-a95769e93a06`, hero: `${H}neekolul-hero.png`, bg: '#2e2535' },
];

export const getVoice = (id) => VOICES.find((v) => v.id === id) || VOICES[0];

// 보이스별 디테일 페이지 카피 (Figma 디자인 기준). 미지정 보이스는 기본값 사용.
const DETAILS = {
  doublelift: {
    duo: 'Your new duo,',
    role: 'NA LCS legend · AD Carry · Bottom lane (Marksman)',
    heroSub: 'His voice in your headset — coaching every game you queue.',
    language: 'English',
    bio: [
      'Born in California, Yiliang "Peter" Peng is one of the greatest AD carries in North American League history. A multi-time LCS champion and Split MVP, he defined an era with one legendary line — "Everyone else is trash." The arrogance was always half a joke aimed at himself, and fans fell in love with the blend of swagger, self-deprecation, and razor-sharp game sense.',
      'This AI voice persona brings that signature Doublelift energy straight into your games. Relaxed Californian confidence, dry-but-warm humor, and decisive shotcalls that drop in the half-second before a teamfight. It reads your Baron timer, catches the enemy ADC’s recall to whisper "next wave is free," nails your Infinity Edge spike, and when you throw a fight it steadies your mental with a casual "I’ve griefed worse, believe me."',
    ],
    personality: ['Unshakable confidence', 'Cocky but warm', 'Sharp macro brain', 'Dry, warm humor', 'Underdog grit'],
    why: 'If solo queue feels lonely, this isn’t just a voice-alert pack — it’s bringing a friend to the next seat. The confidence of one of NA’s best ADCs nudges you forward every round with "that’s free, let’s go," handles your timers, enemy recall windows, and item builds, and when you throw, it steadies your mental with a joke instead of a flame.',
    catchphrases: ['"Everyone else is trash."', '"Trust me — that’s free."', '"Hold your spacing. This game is ours."'],
    panelQuote: '"Everyone else is trash. But you? You’re the exception."',
  },
};

const DEFAULTS = (v) => ({
  duo: 'Your new duo,',
  role: `${v.team} · AI Voice partner`,
  heroSub: `${v.name}’s voice in your headset — coaching every game you queue.`,
  language: 'English',
  bio: [
    `${v.name} brings their signature energy to every match — hype on plays, calm reads under pressure, and the personality fans know and love.`,
    `This AI voice persona drops decisive shotcalls in the half-second before a teamfight, reads your objective timers, catches enemy recalls, and steadies your mental when a game goes sideways.`,
  ],
  personality: ['Confident', 'Sharp game sense', 'Warm humor', 'Clutch under pressure'],
  why: `Solo queue feels less lonely with ${v.name} in the next seat — nudging you forward, handling your timers and item builds, and keeping your mental in check round after round.`,
  catchphrases: ['"Let’s run it."', '"That’s free — go."', '"Hold your spacing."'],
  panelQuote: `"Bring ${v.name} into your next game."`,
});

export const getDetail = (v) => ({ ...DEFAULTS(v), ...(DETAILS[v.id] || {}) });

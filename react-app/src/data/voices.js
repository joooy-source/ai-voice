// 공용 보이스 데이터 (마퀴/스토어/디테일 공유)
const A = 'https://www.figma.com/api/mcp/asset/';

export const PRICE = '₩29,000';

export const VOICES = [
  { id: 'drx-vincenzo', name: 'DRX Vincenzo', team: 'DRX', img: `${A}58f2f870-3760-4136-b212-75b49d12af49`, bg: '#242430' },
  { id: 'drx-ucal', name: 'DRX Ucal', team: 'DRX', img: `${A}1ded3ce6-fd94-4961-8699-861b7f993332`, bg: '#2a2a34' },
  { id: 'drx-willer', name: 'DRX Willer', team: 'DRX', img: `${A}326fb409-5d8e-4c56-8554-dbe3c7d14038`, bg: '#26222e' },
  { id: 'drx-andil', name: 'DRX Andil', team: 'DRX', img: `${A}bcfc4a75-9cbe-4afc-9967-d31d249cf965`, bg: '#2b2b36' },
  { id: 'drx-lazyfeel', name: 'DRX Lazyfeel', team: 'DRX', img: `${A}6d419085-34a3-470b-8711-6ffc8e8683df`, bg: '#26222e' },
  { id: 'drx-rich', name: 'DRX Rich', team: 'DRX', img: `${A}f588e805-c5af-47cc-949d-1f6e4e9e95ad`, bg: '#2b2b36' },
  { id: 'doublelift', name: 'Doublelift', team: 'Creator', img: `${A}003c300c-6fb7-4cf3-9d2f-872b2c63afa3`, hero: `${A}e03cdbdf-821b-4311-9cfd-36ddb87aad02`, bg: '#1f1f27' },
  { id: 'jankos', name: 'Jankos', team: 'Creator', img: `${A}e1c52722-d915-4886-98fc-c906507b3e15`, bg: '#1f1f27' },
  { id: 'noarmwhatley', name: 'NoArmWhatley', team: 'Creator', img: `${A}dc45b29c-1446-4672-bc54-faf12646b811`, bg: '#242430' },
  { id: 'alois', name: 'Alois', team: 'Creator', img: `${A}560fcc79-ff14-43ce-8122-f1b98b32a039`, bg: '#2a2a34' },
  { id: 'fanfan', name: 'fanfan', team: 'Creator', img: `${A}90169fa5-602b-49c7-b18d-89bcc2fb446d`, bg: '#1f1f27' },
  { id: 'typical-gamer', name: 'Typical Gamer', team: 'Creator', img: `${A}c564d3f6-ba86-47f4-8eb4-e4b99ca3374a`, bg: '#2e2535' },
  { id: 'neekolul', name: 'Neekolul', team: 'Creator', img: `${A}1dfeae40-58ba-491f-8feb-a95769e93a06`, bg: '#2e2535' },
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

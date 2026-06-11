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
  { id: 'doublelift', name: 'Doublelift', team: 'Creator', img: `${A}003c300c-6fb7-4cf3-9d2f-872b2c63afa3`, bg: '#1f1f27' },
  { id: 'jankos', name: 'Jankos', team: 'Creator', img: `${A}e1c52722-d915-4886-98fc-c906507b3e15`, bg: '#1f1f27' },
  { id: 'noarmwhatley', name: 'NoArmWhatley', team: 'Creator', img: `${A}dc45b29c-1446-4672-bc54-faf12646b811`, bg: '#242430' },
  { id: 'alois', name: 'Alois', team: 'Creator', img: `${A}560fcc79-ff14-43ce-8122-f1b98b32a039`, bg: '#2a2a34' },
  { id: 'fanfan', name: 'fanfan', team: 'Creator', img: `${A}90169fa5-602b-49c7-b18d-89bcc2fb446d`, bg: '#1f1f27' },
  { id: 'typical-gamer', name: 'Typical Gamer', team: 'Creator', img: `${A}c564d3f6-ba86-47f4-8eb4-e4b99ca3374a`, bg: '#2e2535' },
  { id: 'neekolul', name: 'Neekolul', team: 'Creator', img: `${A}1dfeae40-58ba-491f-8feb-a95769e93a06`, bg: '#2e2535' },
];

export const getVoice = (id) => VOICES.find((v) => v.id === id) || VOICES[0];

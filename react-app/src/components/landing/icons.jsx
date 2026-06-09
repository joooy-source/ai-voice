/* 디자인의 이미지 아이콘들을 외부 에셋 의존 없이 인라인 SVG로 대체한다. */
const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const DownloadIcon = (p) => (
  <svg {...base} {...p}>
    <g className="dl-arrow"><path d="M12 3v12" /><path d="m7 11 5 5 5-5" /></g>
    <path d="M5 21h14" />
  </svg>
);

export const ArrowDownIcon = (p) => (
  <svg {...base} {...p}><path d="M12 5v14" /><path d="m6 13 6 6 6-6" /></svg>
);

export const ArrowUpIcon = (p) => (
  <svg {...base} {...p}><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></svg>
);

export const PlayIcon = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}><path d="M8 5v14l11-7z" /></svg>
);

export const PauseIcon = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
);

const SPEAKER = 'M13 4.2 7.6 8.5H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h3.6L13 19.8a1 1 0 0 0 1.6-.78V4.98A1 1 0 0 0 13 4.2Z';

export const VolumeIcon = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d={SPEAKER} />
  </svg>
);

export const MuteIcon = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <defs>
      <mask id="mute-slash">
        <rect x="0" y="0" width="24" height="24" fill="#fff" />
        <line x1="3.2" y1="3.2" x2="20.8" y2="20.8" stroke="#000" strokeWidth="3.6" strokeLinecap="round" />
      </mask>
    </defs>
    <path d={SPEAKER} mask="url(#mute-slash)" />
    <line x1="3.2" y1="3.2" x2="20.8" y2="20.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ChatIcon = (p) => (
  <svg {...base} {...p}><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" /></svg>
);

export const SupportIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" /></svg>
);

export const AlertIcon = (p) => (
  <svg {...base} {...p}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
);

export const PlusIcon = (p) => (
  <svg {...base} {...p}><path d="M12 5v14" /><path d="M5 12h14" /></svg>
);

export const MicIcon = (p) => (
  <svg {...base} {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></svg>
);

export const TimerIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2" /><path d="M9 2h6" /></svg>
);

export const CartIcon = (p) => (
  <svg {...base} {...p}><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.5 13h11l2-9H6" /></svg>
);

export const EyeIcon = (p) => (
  <svg {...base} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
);

export const TagIcon = (p) => (
  <svg {...base} {...p}><path d="M20 12 12 20l-8-8V4h8z" /><circle cx="8" cy="8" r="1.5" /></svg>
);

export const StarIcon = (p) => (
  <svg {...base} {...p}><path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18l-5.8 3 1.1-6.5L2.6 9.8l6.5-.9z" /></svg>
);

export const ShieldIcon = (p) => (
  <svg {...base} {...p}><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" /></svg>
);

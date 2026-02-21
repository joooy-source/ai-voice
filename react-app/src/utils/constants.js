export const EVENT_DURATION = 30;

export const STORAGE_KEY = 'cyber-checkin-event';

export const MILESTONES = [
  { day: 3, reward: '100 코인', icon: '🪙', tier: 'common' },
  { day: 7, reward: '레어 스킨', icon: '🎨', tier: 'rare' },
  { day: 14, reward: '500 코인', icon: '💰', tier: 'epic' },
  { day: 21, reward: '에픽 무기', icon: '⚔️', tier: 'epic' },
  { day: 30, reward: '레전더리 세트', icon: '👑', tier: 'legendary' },
];

export const MILESTONE_DAYS = MILESTONES.map((m) => m.day);

export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

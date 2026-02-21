import { EVENT_DURATION } from './constants';

export function getTodayStr() {
  const d = new Date();
  return formatDate(d);
}

export function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

export function getDayIndex(eventStartDate, dateStr) {
  const start = new Date(eventStartDate + 'T00:00:00');
  const target = new Date(dateStr + 'T00:00:00');
  const diff = Math.floor((target - start) / (1000 * 60 * 60 * 24));
  return diff;
}

export function getTodayIndex(eventStartDate) {
  return getDayIndex(eventStartDate, getTodayStr());
}

export function calculateStreak(eventStartDate, checkedDates) {
  const today = getTodayStr();
  const todayIdx = getDayIndex(eventStartDate, today);
  const checkedSet = new Set(checkedDates);

  let streak = 0;
  let checkDay = today;

  if (!checkedSet.has(checkDay)) {
    checkDay = addDays(today, -1);
    if (!checkedSet.has(checkDay)) {
      return 0;
    }
  }

  while (checkedSet.has(checkDay)) {
    const idx = getDayIndex(eventStartDate, checkDay);
    if (idx < 0) break;
    streak++;
    checkDay = addDays(checkDay, -1);
  }

  return streak;
}

export function getDaysRemaining(eventStartDate) {
  const todayIdx = getTodayIndex(eventStartDate);
  return Math.max(0, EVENT_DURATION - todayIdx);
}

export function getEventDates(eventStartDate) {
  const dates = [];
  for (let i = 0; i < EVENT_DURATION; i++) {
    dates.push(addDays(eventStartDate, i));
  }
  return dates;
}

export function getStartingWeekday(eventStartDate) {
  const d = new Date(eventStartDate + 'T00:00:00');
  return d.getDay();
}

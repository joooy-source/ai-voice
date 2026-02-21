import { STORAGE_KEY } from './constants';
import { getTodayStr } from './dateUtils';

const CURRENT_VERSION = 1;

export function loadEventData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.version === CURRENT_VERSION) {
        return data;
      }
    }
  } catch {
    // corrupted data, reset
  }
  return null;
}

export function initEventData() {
  const existing = loadEventData();
  if (existing) return existing;

  const data = {
    version: CURRENT_VERSION,
    eventStartDate: getTodayStr(),
    checkedDates: [],
  };
  saveEventData(data);
  return data;
}

export function saveEventData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

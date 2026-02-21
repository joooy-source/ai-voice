import { WEEKDAYS } from '../utils/constants';
import {
  getEventDates,
  getStartingWeekday,
  getTodayStr,
  getDayIndex,
} from '../utils/dateUtils';
import DayCell from './DayCell';
import './CalendarGrid.css';

export default function CalendarGrid({ eventStartDate, checkedDates, justCheckedDay }) {
  const dates = getEventDates(eventStartDate);
  const startWeekday = getStartingWeekday(eventStartDate);
  const today = getTodayStr();
  const checkedSet = new Set(checkedDates);

  const emptyCells = Array.from({ length: startWeekday }, (_, i) => (
    <div key={`empty-${i}`} className="calendar-empty" />
  ));

  return (
    <div className="calendar-section">
      <h2 className="calendar-title">출석 캘린더</h2>
      <div className="calendar-grid">
        {WEEKDAYS.map((day) => (
          <div key={day} className="weekday-header">{day}</div>
        ))}
        {emptyCells}
        {dates.map((dateStr, idx) => {
          const dayNumber = idx + 1;
          const isChecked = checkedSet.has(dateStr);
          const isToday = dateStr === today;

          let status;
          if (isToday && isChecked) {
            status = 'today-checked';
          } else if (isToday) {
            status = 'today';
          } else if (isChecked) {
            status = 'checked';
          } else if (dateStr < today) {
            status = 'missed';
          } else {
            status = 'future';
          }

          return (
            <DayCell
              key={dateStr}
              dayNumber={dayNumber}
              status={status}
              justChecked={justCheckedDay === dayNumber}
            />
          );
        })}
      </div>
    </div>
  );
}

import { MILESTONE_DAYS } from '../utils/constants';
import './DayCell.css';

export default function DayCell({ dayNumber, status, justChecked }) {
  const isMilestone = MILESTONE_DAYS.includes(dayNumber);
  const isChecked = status === 'checked' || status === 'today-checked';

  return (
    <div
      className={`day-cell day-${status} ${justChecked ? 'just-checked' : ''} ${isMilestone ? 'milestone' : ''}`}
    >
      <span className="day-number">{dayNumber}</span>

      {isChecked && (
        <svg className="check-icon" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {isMilestone && !isChecked && (
        <span className="milestone-star">★</span>
      )}

      {justChecked && <div className="burst-effect" />}
    </div>
  );
}

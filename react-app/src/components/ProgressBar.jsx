import { MILESTONE_DAYS, EVENT_DURATION } from '../utils/constants';
import './ProgressBar.css';

export default function ProgressBar({ totalCheckIns }) {
  const percent = Math.min((totalCheckIns / EVENT_DURATION) * 100, 100);

  return (
    <div className="progress-container">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
        {MILESTONE_DAYS.map((day) => {
          const pos = (day / EVENT_DURATION) * 100;
          const reached = totalCheckIns >= day;
          return (
            <div
              key={day}
              className={`milestone-marker ${reached ? 'reached' : ''}`}
              style={{ left: `${pos}%` }}
            >
              <div className="marker-diamond" />
              <span className="marker-label">{day}</span>
            </div>
          );
        })}
      </div>
      <div className="progress-info">
        <span>{totalCheckIns}일 달성</span>
        <span>{EVENT_DURATION}일</span>
      </div>
    </div>
  );
}

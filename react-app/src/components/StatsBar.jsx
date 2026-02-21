import './StatsBar.css';

export default function StatsBar({ streak, totalCheckIns, daysRemaining }) {
  return (
    <div className="stats-bar">
      <div className="stat-card stat-streak">
        <span className="stat-value">{streak}</span>
        <span className="stat-label">연속 출석</span>
      </div>
      <div className="stat-card stat-total">
        <span className="stat-value">{totalCheckIns}<span className="stat-unit">/30</span></span>
        <span className="stat-label">총 출석</span>
      </div>
      <div className="stat-card stat-remaining">
        <span className="stat-value">{daysRemaining}</span>
        <span className="stat-label">남은 일수</span>
      </div>
    </div>
  );
}

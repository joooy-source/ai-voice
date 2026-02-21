import { MILESTONES } from '../utils/constants';
import './MilestoneRewards.css';

export default function MilestoneRewards({ totalCheckIns }) {
  return (
    <div className="milestone-section">
      <h2 className="milestone-title">마일스톤 보상</h2>
      <div className="milestone-scroll">
        {MILESTONES.map((ms) => {
          const reached = totalCheckIns >= ms.day;
          return (
            <div
              key={ms.day}
              className={`reward-card tier-${ms.tier} ${reached ? 'reached' : 'locked'}`}
            >
              <div className="reward-icon">{ms.icon}</div>
              <div className="reward-day">Day {ms.day}</div>
              <div className="reward-name">{ms.reward}</div>
              {reached ? (
                <div className="reward-badge">획득!</div>
              ) : (
                <div className="reward-lock">🔒</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

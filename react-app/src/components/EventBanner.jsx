import { getTodayIndex } from '../utils/dateUtils';
import { EVENT_DURATION } from '../utils/constants';
import './EventBanner.css';

export default function EventBanner({ eventStartDate }) {
  const todayIdx = getTodayIndex(eventStartDate);
  const dDay = EVENT_DURATION - todayIdx;
  const isEnded = todayIdx >= EVENT_DURATION;

  return (
    <header className="event-banner">
      <div className="banner-bg" />
      <div className="banner-content">
        <p className="banner-subtitle">DAILY CHECK-IN EVENT</p>
        <h1 className="banner-title">사이버 출석 이벤트</h1>
        <div className="banner-dday">
          {isEnded ? (
            <span className="dday-ended">EVENT ENDED</span>
          ) : (
            <span className="dday-active">D-{dDay}</span>
          )}
        </div>
      </div>
      <div className="banner-line banner-line-left" />
      <div className="banner-line banner-line-right" />
    </header>
  );
}

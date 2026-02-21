import { useState } from 'react';
import './CheckInButton.css';

export default function CheckInButton({ onCheckIn, isTodayChecked, isEventEnded }) {
  const [bursting, setBursting] = useState(false);

  const handleClick = () => {
    if (isTodayChecked || isEventEnded) return;
    setBursting(true);
    onCheckIn();
    setTimeout(() => setBursting(false), 700);
  };

  let label;
  let btnClass = 'checkin-btn';

  if (isEventEnded) {
    label = '이벤트 종료';
    btnClass += ' ended';
  } else if (isTodayChecked) {
    label = '오늘 출석 완료!';
    btnClass += ' completed';
  } else {
    label = '출석 체크!';
    btnClass += ' active';
  }

  return (
    <div className="checkin-container">
      <button className={btnClass} onClick={handleClick} disabled={isTodayChecked || isEventEnded}>
        <span className="btn-text">{label}</span>
        {bursting && <div className="btn-burst" />}
      </button>
    </div>
  );
}

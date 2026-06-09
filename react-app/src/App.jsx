import { useState, useEffect } from 'react';
import { initEventData, saveEventData } from './utils/storage';
import {
  getTodayStr,
  getTodayIndex,
  calculateStreak,
  getDaysRemaining,
  addDays,
} from './utils/dateUtils';
import { EVENT_DURATION } from './utils/constants';
import EventBanner from './components/EventBanner';
import StatsBar from './components/StatsBar';
import ProgressBar from './components/ProgressBar';
import CalendarGrid from './components/CalendarGrid';
import MilestoneRewards from './components/MilestoneRewards';
import CheckInButton from './components/CheckInButton';
import CardMarquee from './components/CardMarquee';
import './App.css';

function App() {
  const [eventData, setEventData] = useState(null);
  const [justCheckedDay, setJustCheckedDay] = useState(null);

  useEffect(() => {
    const data = initEventData();
    setEventData(data);
  }, []);

  if (!eventData) return null;

  const { eventStartDate, checkedDates } = eventData;
  const today = getTodayStr();
  const todayIndex = getTodayIndex(eventStartDate);
  const isTodayChecked = checkedDates.includes(today);
  const isEventEnded = todayIndex >= EVENT_DURATION;
  const streak = calculateStreak(eventStartDate, checkedDates);
  const totalCheckIns = checkedDates.length;
  const daysRemaining = getDaysRemaining(eventStartDate);

  const handleCheckIn = () => {
    if (isTodayChecked || isEventEnded) return;
    if (todayIndex < 0) return;

    const newCheckedDates = [...checkedDates, today];
    const newData = { ...eventData, checkedDates: newCheckedDates };
    saveEventData(newData);
    setEventData(newData);

    setJustCheckedDay(todayIndex + 1);
    setTimeout(() => setJustCheckedDay(null), 800);
  };

  return (
    <div className="app">
      <EventBanner eventStartDate={eventStartDate} />
      <div className="app-sections">
        <StatsBar
          streak={streak}
          totalCheckIns={totalCheckIns}
          daysRemaining={daysRemaining}
        />
        <ProgressBar totalCheckIns={totalCheckIns} />
        <CalendarGrid
          eventStartDate={eventStartDate}
          checkedDates={checkedDates}
          justCheckedDay={justCheckedDay}
        />
        <CheckInButton
          onCheckIn={handleCheckIn}
          isTodayChecked={isTodayChecked}
          isEventEnded={isEventEnded}
        />
        <MilestoneRewards totalCheckIns={totalCheckIns} />
      </div>
      <CardMarquee />
    </div>
  );
}

export default App;

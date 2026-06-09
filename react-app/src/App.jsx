import Nav from './components/landing/Nav';
import Hero from './components/landing/Hero';
import CoachSection from './components/landing/CoachSection';
import CardMarquee from './components/CardMarquee';
import WithYouSection from './components/landing/WithYouSection';
import PlayByPlaySection from './components/landing/PlayByPlaySection';
import MoreThanVoiceSection from './components/landing/MoreThanVoiceSection';
import JustLaunchSection from './components/landing/JustLaunchSection';
import FaqSection from './components/landing/FaqSection';
import FinalCtaSection from './components/landing/FinalCtaSection';
import { useHeroSnap, useSmoothScroll } from './hooks/useScrollAnimations';
import './App.css';

function App() {
  // 관성 스무스 스크롤(버터 느낌) + Hero 구간 자석 스냅
  useSmoothScroll();
  useHeroSnap({ debounce: 90 });
  return (
    <div className="app">
      <Nav />
      <Hero />
      {/* Hero 위로 슉 올라와 덮는 콘텐츠 (parallax reveal-over) */}
      <div className="below-hero">
        <CoachSection />
        <div id="marquee">
          <CardMarquee />
        </div>
        <WithYouSection />
        <PlayByPlaySection />
        <MoreThanVoiceSection />
        <JustLaunchSection />
        <FaqSection />
        <FinalCtaSection />
      </div>
    </div>
  );
}

export default App;

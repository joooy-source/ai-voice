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
import Footer from './components/landing/Footer';
import ScrollToTop from './components/landing/ScrollToTop';
import { useHeroSnap, useLinearButtons } from './hooks/useScrollAnimations';
import './App.css';

function App() {
  // Hero → 다음 섹션 구간만 자석 스냅 (나머지는 네이티브 스크롤)
  useHeroSnap({ debounce: 90 });
  useLinearButtons();
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
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
}

export default App;

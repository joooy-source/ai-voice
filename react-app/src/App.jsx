import { useEffect, useState } from 'react';
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
import StorePage from './components/store/StorePage';
import DetailPage from './components/detail/DetailPage';
import { useHeroSnap } from './hooks/useScrollAnimations';
import './App.css';

// 간단한 해시 라우팅 ('' | '#/' → 홈, '#/store', '#/voice/:id')
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => {
      setHash(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash;
}

function Home() {
  // Hero → 다음 섹션 구간만 자석 스냅 (나머지는 네이티브 스크롤)
  useHeroSnap({ debounce: 90 });
  return (
    <div className="app">
      <Nav active="voice" />
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

function App() {
  const hash = useHashRoute();

  if (hash.startsWith('#/voice/')) {
    const id = hash.slice('#/voice/'.length);
    return <DetailPage id={id} />;
  }
  if (hash.startsWith('#/store')) {
    return <StorePage />;
  }
  return <Home />;
}

export default App;

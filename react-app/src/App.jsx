import Nav from './components/landing/Nav';
import Hero from './components/landing/Hero';
import CoachSection from './components/landing/CoachSection';
import CardMarquee from './components/CardMarquee';
import WithYouSection from './components/landing/WithYouSection';
import PlayByPlaySection from './components/landing/PlayByPlaySection';
import MoreThanVoiceSection from './components/landing/MoreThanVoiceSection';
import JustLaunchSection from './components/landing/JustLaunchSection';
import PremiumSection from './components/landing/PremiumSection';
import FaqSection from './components/landing/FaqSection';
import FinalCtaSection from './components/landing/FinalCtaSection';
import './App.css';

function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <CoachSection />
      <div id="marquee">
        <CardMarquee />
      </div>
      <WithYouSection />
      <PlayByPlaySection />
      <MoreThanVoiceSection />
      <JustLaunchSection />
      <PremiumSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
}

export default App;

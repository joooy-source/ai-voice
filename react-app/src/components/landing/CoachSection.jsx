import { useEffect, useRef, useState } from 'react';
import { useReveal, useInView } from '../../hooks/useScrollAnimations';
import { PlayIcon, PauseIcon, VolumeIcon, MuteIcon } from './icons';
import './CoachSection.css';

const BASE = import.meta.env.BASE_URL; // public/demo 에 영상을 넣으면 자동 재생

const TABS = [
  {
    title: 'Lane Coaching',
    desc: 'Real-time advice on the laning tips that matter for your champion and role — last-hitting (CS), syncing skill combos with allies, managing mana, and preparing for the enemy jungler.',
    video: `${BASE}demo/lane-coaching.mp4`,
  },
  {
    title: 'Real-Time Alerts',
    desc: 'Overlay and voice briefings on enemy power spikes (when they finish key items), enemy recalls, and spawn timers for major objectives like Dragon.',
    video: `${BASE}demo/real-time-alerts.mp4`,
  },
  {
    title: 'Combat Analysis',
    desc: 'Reads the whole map and guides your direction — whether to group with your team or take vision to contest objectives like the Rift Herald.',
    video: `${BASE}demo/combat-analysis.mp4`,
  },
  {
    title: 'Build Coaching',
    desc: "Recommends the item path best suited for survival or damage, adapting to the current game state and the enemy champions you're up against.",
    video: `${BASE}demo/build-coaching.mp4`,
  },
];

const CLIP_SECONDS = 7; // 영상이 없을 때 게이지가 채워지는 시간

export default function CoachSection() {
  const ref = useReveal();
  const [gridRef, inView] = useInView();
  const videoRef = useRef(null);
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // 디폴트 음소거
  const [progress, setProgress] = useState(0); // 0~1 현재 탭 진행도

  // 게이지 진행 + 자동 다음 탭 (영상이 없어도 동작하는 타이머 기반)
  useEffect(() => {
    if (!isPlaying || !inView) return undefined;
    let raf = 0;
    let start = null;
    const startedAt = progress; // 일시정지 후 이어서 재생
    const tick = (now) => {
      if (start === null) start = now;
      const elapsed = (now - start) / 1000;
      const next = Math.min(startedAt + elapsed / CLIP_SECONDS, 1);
      setProgress(next);
      if (next >= 1) {
        setProgress(0);
        setActive((a) => (a + 1) % TABS.length);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // progress 를 의존성에서 제외: 재생 토글/탭 변경 때만 재시작
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, active, inView]);

  // 실제 <video> 가 있으면 함께 제어
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
    if (isPlaying) v.play().catch(() => {});
    else v.pause();
  }, [isMuted, isPlaying, active]);

  const selectTab = (i) => {
    setActive(i);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <section className="coach section" id="coach" ref={ref}>
      <div className="section-head reveal">
        <h2 className="section-title grad-text">Meet your in-game coach, feature by feature</h2>
        <p className="section-sub">From lane coaching to real-time alerts, combat analysis, and build help.</p>
      </div>

      <div className="coach-grid reveal" ref={gridRef}>
        {/* 영상 플레이어 */}
        <div className="coach-player">
          <video
            ref={videoRef}
            className="coach-video"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            key={active}
            src={TABS[active].video}
          />

          <div className="coach-nowplaying">
            <span className="coach-dot" />
            Now playing: {TABS[active].title}
          </div>

          <div className="coach-controls">
            <button
              type="button"
              className="coach-ctrl"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <PauseIcon width={18} height={18} /> : <PlayIcon width={18} height={18} />}
            </button>
            <button
              type="button"
              className="coach-ctrl"
              onClick={() => setIsMuted((m) => !m)}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MuteIcon width={18} height={18} /> : <VolumeIcon width={18} height={18} />}
            </button>
          </div>
        </div>

        {/* 우측 패널: 선택 시 보라 박스 + 게이지 바 */}
        <div className="coach-tabs">
          {TABS.map((tab, i) => {
            const isActive = i === active;
            return (
              <button
                type="button"
                key={tab.title}
                className={`coach-tab ${isActive ? 'is-active' : ''}`}
                onClick={() => selectTab(i)}
              >
                <span className="coach-tab-head">
                  <span className="coach-tab-dot" />
                  {tab.title}
                </span>
                <span className="coach-tab-desc">{tab.desc}</span>
                {isActive && (
                  <span className="coach-gauge">
                    <span
                      className="coach-gauge-fill"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

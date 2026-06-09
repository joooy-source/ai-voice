import { useEffect, useRef, useState } from 'react';
import { useReveal, useInView } from '../../hooks/useScrollAnimations';
import { PlayIcon, PauseIcon, VolumeIcon, MuteIcon } from './icons';
import './CoachSection.css';

const BASE = import.meta.env.BASE_URL;
// 영상은 1개만 넣으면 됩니다 → public/demo/coach.mp4
// 각 탭의 start(초)만 실제 영상의 챕터 시작 시간으로 맞춰주세요. (자를 필요 없음)
const VIDEO_SRC = `${BASE}demo/coach.mp4`;

const TABS = [
  {
    title: 'Lane Coaching',
    desc: 'Real-time advice on the laning tips that matter for your champion and role — last-hitting (CS), syncing skill combos with allies, managing mana, and preparing for the enemy jungler.',
    start: 0,
  },
  {
    title: 'Real-Time Alerts',
    desc: 'Overlay and voice briefings on enemy power spikes (when they finish key items), enemy recalls, and spawn timers for major objectives like Dragon.',
    start: 8,
  },
  {
    title: 'Combat Analysis',
    desc: 'Reads the whole map and guides your direction — whether to group with your team or take vision to contest objectives like the Rift Herald.',
    start: 16,
  },
  {
    title: 'Build Coaching',
    desc: "Recommends the item path best suited for survival or damage, adapting to the current game state and the enemy champions you're up against.",
    start: 24,
  },
];

const CLIP_SECONDS = 7; // 영상이 없을 때 게이지가 채워지는 시간(폴백)

export default function CoachSection() {
  const ref = useReveal();
  const [gridRef, inView] = useInView();
  const videoRef = useRef(null);
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // 디폴트 음소거
  const [progress, setProgress] = useState(0); // 0~1 현재 챕터 진행도
  const [hasVideo, setHasVideo] = useState(false);

  // 영상이 있을 때: 실제 재생시간으로 챕터/게이지 동기화
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    const onTime = () => {
      const t = v.currentTime;
      const dur = v.duration || 0;
      let idx = 0;
      for (let i = 0; i < TABS.length; i++) {
        if (t + 0.05 >= TABS[i].start) idx = i;
      }
      setActive(idx);
      const start = TABS[idx].start;
      const end = idx + 1 < TABS.length ? TABS[idx + 1].start : (dur || start + CLIP_SECONDS);
      setProgress(end > start ? Math.min(Math.max((t - start) / (end - start), 0), 1) : 0);
    };
    const onReady = () => setHasVideo(true);
    const onError = () => setHasVideo(false);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadeddata', onReady);
    v.addEventListener('error', onError);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadeddata', onReady);
      v.removeEventListener('error', onError);
    };
  }, []);

  // 재생/일시정지/음소거 + 화면 밖이면 정지
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
    if (isPlaying && inView) v.play().catch(() => {});
    else v.pause();
  }, [isMuted, isPlaying, inView]);

  // 영상이 없을 때만: 타이머 기반 게이지 + 자동 다음 탭
  useEffect(() => {
    if (hasVideo || !isPlaying || !inView) return undefined;
    let raf = 0;
    let start = null;
    const startedAt = progress;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasVideo, isPlaying, active, inView]);

  const selectTab = (i) => {
    setActive(i);
    setProgress(0);
    setIsPlaying(true);
    const v = videoRef.current;
    if (v && hasVideo) {
      v.currentTime = TABS[i].start;
      v.play().catch(() => {});
    }
  };

  return (
    <section className="coach section" id="coach" ref={ref}>
      <div className="section-head reveal">
        <h2 className="section-title grad-text">Meet your in-game coach, feature by feature</h2>
        <p className="section-sub">From lane coaching to real-time alerts, combat analysis, and build help.</p>
      </div>

      <div className="coach-grid reveal" ref={gridRef}>
        {/* 단일 영상 — 탭 클릭 시 해당 챕터로 seek */}
        <div className="coach-player">
          <video
            ref={videoRef}
            className="coach-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src={VIDEO_SRC}
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
                    <span className="coach-gauge-fill" style={{ width: `${progress * 100}%` }} />
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

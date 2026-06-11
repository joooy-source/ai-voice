import { useEffect, useRef, useState } from 'react';
import { useReveal, useInView } from '../../hooks/useScrollAnimations';
import { PlayIcon, PauseIcon, VolumeIcon, MuteIcon, MaximizeIcon, PipIcon } from './icons';
import './CoachSection.css';

// 영상 소스 — HLS(.m3u8) 또는 mp4 URL, 혹은 public/demo/coach.mp4
const VIDEO_SRC = 'https://s-agent-static.op.gg/videos/intro/index.m3u8';

// hls.js 를 CDN 에서 1회 로드 (Chrome/FF 등 HLS 네이티브 미지원 브라우저용)
function loadHls() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.Hls) return Promise.resolve(window.Hls);
  if (window.__hlsPromise) return window.__hlsPromise;
  window.__hlsPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.17/dist/hls.min.js';
    s.async = true;
    s.onload = () => resolve(window.Hls);
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return window.__hlsPromise;
}

const TABS = [
  {
    title: 'Lane Coaching',
    desc: 'Real-time advice on the laning tips that matter for your champion and role — last-hitting (CS), syncing skill combos with allies, managing mana, and preparing for the enemy jungler.',
    start: 7,
  },
  {
    title: 'Real-Time Alerts',
    desc: 'Overlay and voice briefings on enemy power spikes (when they finish key items), enemy recalls, and spawn timers for major objectives like Dragon.',
    start: 23,
  },
  {
    title: 'Combat Analysis',
    desc: 'Reads the whole map and guides your direction — whether to group with your team or take vision to contest objectives like the Rift Herald.',
    start: 41,
  },
  {
    title: 'Build Coaching',
    desc: "Recommends the item path best suited for survival or damage, adapting to the current game state and the enemy champions you're up against.",
    start: 64.5,
  },
];

const CLIP_SECONDS = 7; // 영상이 없을 때 게이지가 채워지는 시간(폴백)

export default function CoachSection() {
  const ref = useReveal();
  const [gridRef, inView] = useInView();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // 음소거로 시작 → 첫 동작에 소리 켜짐
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0); // 0~1 현재 챕터 진행도
  const [hasVideo, setHasVideo] = useState(false);
  const inViewRef = useRef(false);
  useEffect(() => { inViewRef.current = inView; }, [inView]);

  // 첫 사용자 동작(클릭/키/터치 — 히어로 아래 화살표 포함)에 소리 켜기.
  // 스크롤만으론 브라우저가 소리 재생을 막아서, 동작 한 번이 필요.
  useEffect(() => {
    let done = false;
    const onAct = () => {
      if (done) return;
      done = true;
      setIsMuted(false);
      const v = videoRef.current;
      if (v && inViewRef.current && isPlaying) { v.muted = false; v.play().catch(() => {}); }
      cleanup();
    };
    const evs = ['pointerdown', 'keydown', 'touchstart'];
    const cleanup = () => evs.forEach((e) => window.removeEventListener(e, onAct));
    evs.forEach((e) => window.addEventListener(e, onAct));
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 볼륨 반영
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.volume = volume;
  }, [volume]);

  const toggleFullscreen = () => {
    const el = playerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else el.requestFullscreen?.();
  };
  const togglePip = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else await v.requestPictureInPicture?.();
    } catch { /* 미지원/거부 시 무시 */ }
  };
  const onVolume = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) setIsMuted(false);
  };

  // 소스 연결 (HLS는 hls.js, Safari/일반 mp4는 직접)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    let hls;
    const isHls = VIDEO_SRC.endsWith('.m3u8');
    if (!isHls) {
      v.src = VIDEO_SRC;
    } else if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = VIDEO_SRC; // Safari 네이티브 HLS
    } else {
      loadHls()
        .then((Hls) => {
          if (Hls && Hls.isSupported()) {
            hls = new Hls({ enableWorker: true });
            hls.loadSource(VIDEO_SRC);
            hls.attachMedia(v);
          } else {
            v.src = VIDEO_SRC;
          }
        })
        .catch(() => setHasVideo(false));
    }
    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  // 실제 재생시간으로 챕터/게이지 동기화
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    const onTime = () => {
      const t = v.currentTime;
      const dur = v.duration;
      const n = TABS.length;
      // 현재 시간이 속한 챕터 (시작 전 0~7초는 첫 탭으로 간주)
      let idx = 0;
      for (let i = 0; i < n; i++) if (t + 0.05 >= TABS[i].start) idx = i;
      setActive(idx);
      const start = TABS[idx].start;
      const end = idx + 1 < n
        ? TABS[idx + 1].start
        : (dur && isFinite(dur) ? dur : start + CLIP_SECONDS);
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

  // 재생/일시정지/음소거 + 화면 밖이면 정지. 소리 재생이 막히면 음소거로라도 재생.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
    if (isPlaying && inView) {
      v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
    } else {
      v.pause();
    }
  }, [isMuted, isPlaying, inView, hasVideo]);

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

      <div className="coach-media reveal" ref={gridRef}>
        {/* 영상 — 풀폭, 탭 클릭 시 해당 챕터로 seek */}
        <div className="coach-player" ref={playerRef}>
          <video
            ref={videoRef}
            className="coach-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
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
            <div className={`coach-vol ${isMuted ? '' : 'open'}`}>
              <button
                type="button"
                className="coach-vol-btn"
                onClick={() => setIsMuted((m) => !m)}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MuteIcon width={18} height={18} /> : <VolumeIcon width={18} height={18} />}
              </button>
              {!isMuted && (
                <input
                  type="range"
                  className="coach-slider"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={onVolume}
                  aria-label="Volume"
                />
              )}
            </div>
            <button type="button" className="coach-ctrl" onClick={togglePip} aria-label="Picture in picture (16:9)">
              <PipIcon width={18} height={18} />
            </button>
            <button type="button" className="coach-ctrl" onClick={toggleFullscreen} aria-label="Fullscreen">
              <MaximizeIcon width={18} height={18} />
            </button>
          </div>
        </div>

        {/* 하단 탭 한 줄: 선택 시 보라 테두리 + 하단 게이지 */}
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
                <span className="coach-tab-title">{tab.title}</span>
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

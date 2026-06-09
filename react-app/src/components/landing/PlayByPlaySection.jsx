import { useEffect, useRef, useState } from 'react';
import { useReveal, useInView } from '../../hooks/useScrollAnimations';
import { PlayIcon, PauseIcon, VolumeIcon, MuteIcon } from './icons';
import './PlayByPlaySection.css';

const CALLOUTS = [
  { time: '0:00', label: 'Build Coaching', text: 'Best starting items for this matchup — locked in before you load.' },
  { time: '1:13', label: 'Matchup analysis', text: "Your lane matchup is analyzed. Here's how to play it out." },
  { time: '4:15', label: 'Objective', text: 'Dragon in 30 seconds — clear the wave and group up.' },
  { time: '5:40', label: 'Vision', text: 'Enemy mid placed a Control Ward in the river — take the long way when you roam.' },
  { time: '6:20', label: 'Recall alert', text: 'Enemy Fiora just recalled — shove the wave and look for Herald.' },
  { time: '7:00', label: 'Threat spotted', text: "Enemy Xerath just finished Zhonya's — keep your distance until it's down." },
];

// 짧은 막대 waveform
const WAVE = [10, 20, 32, 16, 40, 24, 12, 34, 20, 28, 14, 38, 22, 16, 30, 12, 26, 18, 34, 14, 24, 10, 30, 18, 38, 16];

const CLIP_SECONDS = 6; // 콜아웃당 재생 시간 (링이 차는 시간)
const RING_R = 30; // 64px 링 (디자인)
const RING_C = 2 * Math.PI * RING_R;

export default function PlayByPlaySection() {
  const ref = useReveal();
  // 섹션이 충분히 보일 때만 타이머 시작 (도착 전 미리 재생 방지)
  const [bodyRef, inView] = useInView({ threshold: 0.45 });
  const audioRef = useRef(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // 원형 타이머 진행 + 자동 다음 (02 Coach 와 동일한 타이머 기반)
  useEffect(() => {
    if (!playing || !inView) return undefined;
    let raf = 0;
    let start = null;
    const from = progress;
    const tick = (now) => {
      if (start === null) start = now;
      const elapsed = (now - start) / 1000;
      const next = Math.min(from + elapsed / CLIP_SECONDS, 1);
      setProgress(next);
      if (next >= 1) {
        setProgress(0);
        setActive((a) => (a + 1) % CALLOUTS.length);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, active, inView]);

  // 실제 오디오가 있으면 함께 제어
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = muted;
    if (playing) el.play().catch(() => {});
    else el.pause();
  }, [muted, playing, active]);

  const select = (i) => {
    setActive(i);
    setProgress(0);
    setPlaying(true);
  };

  const current = CALLOUTS[active];

  return (
    <section className="pbp section" ref={ref}>
      <div className="pbp-bg" aria-hidden />

      <div className="section-head reveal">
        <h2 className="section-title grad-text">It briefs you the whole game — automatically</h2>
        <p className="section-sub">Every call-out fires automatically, timed to the match.</p>
      </div>

      <div className="pbp-body reveal" ref={bodyRef}>
        {/* 좌측: 플레이어 */}
        <div className="pbp-left">
          <div className="pbp-player">
            <div className="pbp-player-glow" aria-hidden />
            <p className="pbp-player-time">{current.time}&nbsp;&nbsp;·&nbsp;&nbsp;{current.label}</p>
            <p className="pbp-player-text">{current.text}</p>
            <div className="pbp-voice">
              <VolumeIcon width={26} height={26} />
              <div className={`pbp-wave ${playing ? 'is-playing' : ''}`}>
                {WAVE.map((h, i) => (
                  <span key={i} className="pbp-wave-bar" style={{ height: `${h}px`, animationDelay: `${(i % 8) * 0.08}s` }} />
                ))}
              </div>
            </div>

            <div className="pbp-controls">
              <button type="button" className="pbp-ctrl" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
                {playing ? <PauseIcon width={18} height={18} /> : <PlayIcon width={18} height={18} />}
              </button>
              <button type="button" className="pbp-ctrl" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Unmute' : 'Mute'}>
                {muted ? <MuteIcon width={18} height={18} /> : <VolumeIcon width={18} height={18} />}
              </button>
            </div>
          </div>

          {/* 진행 표시 */}
          <div className="pbp-scrub">
            {CALLOUTS.map((_, i) => (
              <span key={i} className={`pbp-scrub-seg ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}>
                {i === active && <span className="pbp-scrub-fill" style={{ width: `${progress * 100}%` }} />}
              </span>
            ))}
          </div>
        </div>

        {/* 우측: 원형 타임라인 + 콜아웃 리스트 (클릭 가능) */}
        <div className="pbp-right">
          <div className="pbp-timeline">
            <span className="pbp-rail" />
            {CALLOUTS.map((c, i) => (
              <button
                type="button"
                key={i}
                className={`pbp-node ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
                onClick={() => select(i)}
                aria-label={`${c.label} ${c.time}`}
              >
                {i === active && (
                  <svg className="pbp-ring" width="64" height="64" viewBox="0 0 64 64" aria-hidden>
                    <circle cx="32" cy="32" r={RING_R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                    <circle
                      cx="32"
                      cy="32"
                      r={RING_R}
                      fill="none"
                      stroke="var(--primary-400)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={RING_C}
                      strokeDashoffset={RING_C * (1 - progress)}
                      transform="rotate(-90 32 32)"
                    />
                  </svg>
                )}
                <span className="pbp-node-time">{c.time}</span>
              </button>
            ))}
          </div>

          <div className="pbp-list">
            {CALLOUTS.map((c, i) => (
              <button
                type="button"
                key={i}
                className={`pbp-item ${i === active ? 'is-active' : ''}`}
                onClick={() => select(i)}
              >
                <span className="pbp-item-label">{c.label}</span>
                <span className="pbp-item-text">{c.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}voice/playbyplay.mp3`} preload="none" />
    </section>
  );
}

import { useScrollProgress } from '../../hooks/useScrollAnimations';
import { VolumeIcon } from './icons';
import './PlayByPlaySection.css';

const CALLOUTS = [
  { time: '0:00', label: 'Build Coaching', text: 'Best starting items for this matchup — locked in before you load.' },
  { time: '1:13', label: 'Matchup analysis', text: "Your lane matchup is analyzed. Here's how to play it out." },
  { time: '4:15', label: 'Objective', text: 'Dragon in 30 seconds — clear the wave and group up.' },
  { time: '5:40', label: 'Vision', text: 'Enemy mid placed a Control Ward in the river — take the long way when you roam.' },
  { time: '6:20', label: 'Recall alert', text: 'Enemy Fiora just recalled — shove the wave and look for Herald.' },
  { time: '7:00', label: 'Threat spotted', text: "Enemy Xerath just finished Zhonya's — keep your distance until it's down." },
];

// 짧은 막대 waveform (재생 표시용)
const WAVE = [10, 20, 32, 16, 40, 24, 12, 34, 20, 28, 14, 38, 22, 16, 30, 12, 26, 18, 34, 14, 24, 10, 30, 18, 38, 16];

export default function PlayByPlaySection() {
  const [ref, progress] = useScrollProgress();
  const active = Math.min(CALLOUTS.length - 1, Math.floor(progress * CALLOUTS.length));
  const current = CALLOUTS[active];

  return (
    <section className="pbp" ref={ref}>
      <div className="pbp-bg" aria-hidden />
      <div className="pbp-sticky">
        <div className="section-head">
          <h2 className="section-title grad-text">It briefs you the whole game — automatically</h2>
          <p className="section-sub">Every call-out fires automatically, timed to the match.</p>
        </div>

        <div className="pbp-body">
          {/* 좌측: 고정 플레이어 */}
          <div className="pbp-left">
            <div className="pbp-player">
              <div className="pbp-player-glow" aria-hidden />
              <p className="pbp-player-time">{current.time}&nbsp;&nbsp;·&nbsp;&nbsp;{current.label}</p>
              <p className="pbp-player-text">{current.text}</p>
              <div className="pbp-voice">
                <VolumeIcon width={26} height={26} />
                <div className="pbp-wave">
                  {WAVE.map((h, i) => (
                    <span key={i} className="pbp-wave-bar" style={{ height: `${h}px`, animationDelay: `${(i % 8) * 0.08}s` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* 스크럽 진행 표시 */}
            <div className="pbp-scrub">
              {CALLOUTS.map((_, i) => (
                <span
                  key={i}
                  className={`pbp-scrub-seg ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* 우측: 타임라인 + 콜아웃 리스트 */}
          <div className="pbp-right">
            <div className="pbp-timeline">
              <span className="pbp-rail" />
              {CALLOUTS.map((c, i) => (
                <span key={i} className={`pbp-node ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}>
                  {c.time}
                </span>
              ))}
            </div>
            <div className="pbp-list">
              {CALLOUTS.map((c, i) => (
                <div key={i} className={`pbp-item ${i === active ? 'is-active' : ''}`}>
                  <p className="pbp-item-label">{c.label}</p>
                  <p className="pbp-item-text">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

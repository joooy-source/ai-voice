import { useEffect, useRef, useState } from 'react';
import Nav from '../landing/Nav';
import Footer from '../landing/Footer';
import { PlayIcon, PauseIcon, DownloadIcon, VolumeIcon, MuteIcon, MaximizeIcon, PipIcon } from '../landing/icons';
import { VOICES, getVoice, getDetail, PRICE } from '../../data/voices';
import { useHeroSnap } from '../../hooks/useScrollAnimations';
import './DetailPage.css';

// hls.js 를 CDN 에서 1회 로드 (HLS 네이티브 미지원 브라우저용)
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

const MENU = [
  { id: 'profile', label: 'Profile' },
  { id: 'voice', label: 'Voice' },
  { id: 'ingame', label: 'In-game' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
];

const SAMPLES = [
  { label: 'Voice sample 01', dur: '0:08' },
  { label: 'Voice sample 02', dur: '0:11' },
  { label: 'Voice sample 03', dur: '0:06' },
];
const durSec = (s) => { const [m, ss] = s.split(':').map(Number); return m * 60 + ss; };
const WAVE_N = 40;

const videoLabel = (i) => `Live Play video 0${i + 1}`;
const COACHING = ['Lane & build coaching', 'Combat analysis', 'Real-time alerts'];
const MEMBERSHIP = ['Ad-free across OP.GG', 'Subscriber badge', 'Exclusive perks'];

const FAQS = [
  { q: 'Q. Is the AI Voice feature safe regarding game policies?', a: "Yes. OP.GG complies with Riot Games' policies and operates within the provided guidelines, so you can use AI Voice without risk to your account." },
  { q: 'Q. How are the voices in the AI Voice Store created?', a: 'Each voice is trained on the creator’s real voice data, recorded and used with their explicit consent for a lively, accurate match.' },
  { q: 'Q. Can I register my own voice in the Voice Store?', a: 'Creator voice registration is rolling out gradually. Stay tuned to OP.GG announcements for how to apply.' },
];

const NOTES = [
  {
    title: 'License',
    items: [
      'This voice is available for personal (non-commercial) use only.',
      'The license is tied to a single purchasing account. Transferring, lending, or reselling the voice to others is strictly prohibited.',
      'Use for streaming or video content creation is permitted; however, direct commercial use, such as sponsored advertisements or paid promotions, requires a separate agreement.',
    ],
  },
  {
    title: 'Refund Policy',
    items: [
      'Your subscription activates immediately upon payment and automatically renews on a monthly basis (or the selected billing cycle).',
      'Due to the nature of digital products, refunds for the current billing cycle are restricted if the voice has been used after payment.',
      'You can cancel your subscription at any time via [My Account > Subscription]. No further charges will apply starting from the next billing date.',
    ],
  },
  {
    title: 'Copyright / Rights Notice',
    items: [
      'The names, likenesses, and voice rights of the voice models are officially provided under license agreements with OP.GG or the respective rights holders.',
      'The generated voice content does not imply endorsement, sponsorship, or official statements by the rights holders (influencers).',
      'Use for impersonation, spreading false information, political campaigning, hate speech, discrimination, or the creation of illegal content is strictly prohibited.',
    ],
  },
];

const EMPTY = [];
const wave = (seed, n = 44) => Array.from({ length: n }, (_, i) => 4 + Math.abs(Math.sin((i + seed) * 0.6)) * 22);

const ArrowRight = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
  </svg>
);
const Check = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const Chevron = (p) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default function DetailPage({ id }) {
  const voice = getVoice(id);
  const d = getDetail(voice);
  const [active, setActive] = useState('profile');
  const [sample, setSample] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [prog, setProg] = useState(0); // 활성 샘플 재생 진행도 0~1
  const [openFaq, setOpenFaq] = useState(-1);
  const [barShown, setBarShown] = useState(false);
  const cardRef = useRef(null);

  const others = VOICES.filter((v) => v.id !== voice.id).slice(0, 5);

  // Hero → 본문 자석 스냅 (다음 섹션이 위로 착 붙도록)
  useHeroSnap({ selector: '.dt-below', debounce: 90 });

  // 홀로그래픽 카드: 포인터를 따라 3D 틸트 + 포일 반사
  const onCardMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.setProperty('--rx', `${(px - 0.5) * 9}deg`);
    el.style.setProperty('--ry', `${(0.5 - py) * 9}deg`);
  };
  const onCardLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  };

  // ===== In-game 영상 (HLS, 섹션 진입 시 소리 재생 + 게이지) =====
  const videos = voice.videos || EMPTY;
  const hasVids = videos.length > 0;
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const ingameActive = active === 'ingame'; // in-game 섹션이 활성일 때만 재생/소리
  const [vIdx, setVIdx] = useState(0);
  const [vPlaying, setVPlaying] = useState(true);
  const [vMuted, setVMuted] = useState(false); // 디폴트: 소리 ON
  const [vVol, setVVol] = useState(1);
  const [vProg, setVProg] = useState(0);

  // 선택된 영상 소스 연결 (탭 변경 시 재연결)
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !hasVids) return undefined;
    const src = videos[vIdx];
    let hls;
    if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = src; // Safari 네이티브 HLS
    } else {
      loadHls()
        .then((Hls) => {
          if (Hls && Hls.isSupported()) {
            hls = new Hls({ enableWorker: true });
            hls.loadSource(src);
            hls.attachMedia(v);
          } else {
            v.src = src;
          }
        })
        .catch(() => {});
    }
    return () => { if (hls) hls.destroy(); };
  }, [vIdx, hasVids, videos]);

  // 볼륨 반영
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.volume = vVol;
  }, [vVol]);

  // 게이지(진행도) + 끝나면 다음 영상으로
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !hasVids) return undefined;
    const onTime = () => {
      const d = v.duration;
      setVProg(d && isFinite(d) ? Math.min(v.currentTime / d, 1) : 0);
    };
    const onEnded = () => { setVProg(0); setVIdx((i) => (i + 1) % videos.length); };
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', onEnded);
    };
  }, [hasVids, videos]);

  // 재생/일시정지/음소거 + 화면 안에서만 재생 (진입 시 소리 시도, 막히면 음소거 폴백)
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !hasVids) return;
    v.muted = vMuted;
    if (vPlaying && ingameActive) {
      const p = v.play();
      if (p && p.catch) {
        p.catch(() => {
          v.muted = true;
          setVMuted(true);
          v.play().catch(() => {});
        });
      }
    } else {
      v.pause();
    }
  }, [vMuted, vPlaying, ingameActive, hasVids, vIdx]);

  const selectVideo = (i) => {
    setVIdx(i);
    setVProg(0);
    setVPlaying(true);
  };
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
    } catch { /* 미지원/거부 무시 */ }
  };
  const onVol = (e) => {
    const val = Number(e.target.value);
    setVVol(val);
    if (val > 0 && vMuted) setVMuted(false);
  };

  useEffect(() => {
    const els = MENU.map((m) => document.getElementById(`sec-${m.id}`)).filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace('sec-', ''));
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [id]);

  useEffect(() => {
    const onScroll = () => setBarShown(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 보이스 샘플 진행도(파형 채움) — 재생 중 duration 동안 0→1, 끝나면 정지
  const progRef = useRef(0);
  useEffect(() => {
    if (!playing) return undefined;
    const total = durSec(SAMPLES[sample].dur);
    const startP = progRef.current;
    let raf = 0;
    let startT = null;
    const tick = (now) => {
      if (startT === null) startT = now;
      const p = Math.min(startP + (now - startT) / 1000 / total, 1);
      progRef.current = p >= 1 ? 0 : p;
      setProg(progRef.current);
      if (p >= 1) setPlaying(false);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, sample]);

  const go = (mid) => {
    const el = document.getElementById(`sec-${mid}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="detail">
      <Nav active="store" />

      {/* ===== 01 Hero ===== */}
      <header className="dt-hero">
        <div className="dt-hero-portrait" style={{ backgroundColor: voice.bg }}>
          <img src={voice.hero || voice.img} alt={voice.name} />
        </div>
        <div className="dt-hero-fade-l" aria-hidden />
        <div className="dt-hero-fade-b" aria-hidden />
        <div className="dt-hero-glow" aria-hidden />
        <div className="dt-hero-glow dt-hero-glow-b" aria-hidden />

        <div className="dt-shell dt-hero-shell">
          <div className="dt-hero-content">
            <p className="dt-hero-kicker">OP.GG AI Voice</p>
            <p className="dt-hero-duo">{d.duo}</p>
            <h1 className="dt-hero-name grad-text">{voice.name}</h1>
            <p className="dt-hero-role">{d.role}</p>
            <p className="dt-hero-sub">{d.heroSub}</p>
            <div className="dt-hero-cta">
              <button type="button" className="dt-btn-primary" onClick={() => go('pricing')}>
                Subscribe — {PRICE} / month
              </button>
              <button type="button" className="dt-btn-ghost" onClick={() => go('voice')}>
                <span className="dt-btn-ghost-play"><PlayIcon width={11} height={11} /></span> Hear voice
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero 위로 슉 올라와 덮는 콘텐츠 */}
      <div className="dt-below">

      {/* ===== 본문: 좌측 상단 고정 메뉴 + 우측 섹션 ===== */}
      <div className="dt-shell dt-body">
        <aside className="dt-menu">
          <nav className="dt-menu-inner">
            {MENU.map((m) => (
              <button key={m.id} type="button" className={`dt-menu-item ${active === m.id ? 'is-active' : ''}`} onClick={() => go(m.id)}>
                {m.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="dt-content">
          {/* 03 Profile */}
          <section id="sec-profile" className="dt-sec">
            <div className="dt-profile">
              <div className="dt-profile-img" style={{ backgroundColor: voice.bg }}>
                <img src={voice.thumb || voice.img} alt={voice.name} />
              </div>
              <div className="dt-profile-main">
                <h2 className="dt-sec-title grad-text">Meet your partner — {voice.name}</h2>
                <div className="dt-meta-row">
                  <div className="dt-meta">
                    <span className="dt-meta-k">Supported languages</span>
                    <span className="dt-meta-v">{d.language}</span>
                  </div>
                  <div className="dt-meta">
                    <span className="dt-meta-k">Supported games</span>
                    <span className="dt-meta-v"><span className="dt-game-badge">LoL</span></span>
                  </div>
                </div>
                <div className="dt-divider" />
                <div className="dt-bio">
                  {d.bio.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <div className="dt-personality">
                  <span className="dt-label">Personality</span>
                  <div className="dt-chips">
                    {d.personality.map((c) => <span className="dt-chip" key={c}>{c}</span>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="dt-why">
              <h3>Why this partner</h3>
              <p>{d.why}</p>
            </div>
          </section>

          {/* 06 Voice */}
          <section id="sec-voice" className="dt-sec">
            <div className="dt-voice">
              <div className="dt-voice-head">
                <h2 className="dt-sec-title grad-text">How it sounds<br />in your game</h2>
                <p className="dt-sec-sub">The same voice that calls your game in real time.</p>
                <div className="dt-cphrase">
                  <span className="dt-label">Catchphrases &amp; personality</span>
                  <div className="dt-chips">
                    {d.catchphrases.map((c) => <span className="dt-quote-chip" key={c}>{c}</span>)}
                  </div>
                </div>
              </div>
              <div className="dt-samples">
                {SAMPLES.map((s, i) => {
                  const on = sample === i && playing;
                  const isActive = sample === i;
                  return (
                    <button
                      key={s.label}
                      type="button"
                      className={`dt-sample ${isActive ? 'is-active' : ''}`}
                      onClick={() => { if (isActive) { setPlaying((p) => !p); } else { setSample(i); progRef.current = 0; setProg(0); setPlaying(true); } }}
                    >
                      <span className={`dt-sample-play ${on ? 'is-playing' : ''}`}>
                        {on ? <PauseIcon width={18} height={18} /> : <PlayIcon width={18} height={18} />}
                      </span>
                      <span className="dt-sample-name">{s.label}</span>
                      <span className="dt-sample-wave">
                        {wave(i * 3, WAVE_N).map((h, j) => (
                          <i
                            key={j}
                            style={{
                              height: `${h}px`,
                              background: isActive && j / WAVE_N <= prog ? 'var(--primary-400)' : 'rgba(255, 255, 255, 0.22)',
                            }}
                          />
                        ))}
                      </span>
                      <span className="dt-sample-dur">{s.dur}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 02 In-game / Coach */}
          <section id="sec-ingame" className="dt-sec">
            <h2 className="dt-sec-title grad-text">Watch them play alongside a real match</h2>
            <p className="dt-sec-sub">Real in-game footage of the AI calling objectives, recalls, and fights as they happen.</p>
            <div className="dt-video">
              <div className="dt-video-stage" ref={playerRef} style={{ backgroundColor: voice.bg }}>
                {hasVids ? (
                  <>
                    <video ref={videoRef} className="dt-video-el" autoPlay loop={false} playsInline preload="metadata" />
                    <span className="dt-video-caption"><i className="dt-dot" /> Now showing: {videoLabel(vIdx)}</span>
                    <div className="dt-video-ctrls">
                      <button type="button" className="dt-vctrl" onClick={() => setVPlaying((p) => !p)} aria-label={vPlaying ? 'Pause' : 'Play'}>
                        {vPlaying ? <PauseIcon width={18} height={18} /> : <PlayIcon width={18} height={18} />}
                      </button>
                      <div className={`dt-vvol ${vMuted ? '' : 'open'}`}>
                        <button type="button" className="dt-vctrl" onClick={() => setVMuted((m) => !m)} aria-label={vMuted ? 'Unmute' : 'Mute'}>
                          {vMuted ? <MuteIcon width={18} height={18} /> : <VolumeIcon width={18} height={18} />}
                        </button>
                        {!vMuted && (
                          <input type="range" className="dt-vslider" min="0" max="1" step="0.05" value={vVol} onChange={onVol} aria-label="Volume" />
                        )}
                      </div>
                      <button type="button" className="dt-vctrl" onClick={togglePip} aria-label="Picture in picture">
                        <PipIcon width={18} height={18} />
                      </button>
                      <button type="button" className="dt-vctrl" onClick={toggleFullscreen} aria-label="Fullscreen">
                        <MaximizeIcon width={18} height={18} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button type="button" className="dt-video-play" aria-label="Play"><PlayIcon width={26} height={26} /></button>
                    <span className="dt-video-caption"><i className="dt-dot" /> Now showing: {videoLabel(vIdx)}</span>
                  </>
                )}
              </div>
              <div className="dt-video-tabs" style={{ gridTemplateColumns: `repeat(${videos.length}, 1fr)` }}>
                {videos.map((src, i) => (
                  <button key={src + i} type="button" className={`dt-video-tab ${vIdx === i ? 'is-active' : ''}`} onClick={() => selectVideo(i)}>
                    <span className="dt-video-tab-label">{videoLabel(i)}</span>
                    {vIdx === i && (
                      <span className="dt-video-gauge" aria-hidden>
                        <span className="dt-video-gauge-fill" style={{ width: `${(hasVids ? vProg : 0) * 100}%` }} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 07 Pricing */}
          <section id="sec-pricing" className="dt-sec">
            <h2 className="dt-sec-title grad-text">Pricing</h2>
            <div className="price-tilt" onMouseMove={onCardMove} onMouseLeave={onCardLeave}>
            <div className="price-card" ref={cardRef}>
              <span className="price-foil" aria-hidden />
              <span className="price-glare" aria-hidden />
              <span className="price-glow price-glow-1" aria-hidden />
              <span className="price-glow price-glow-2" aria-hidden />
              <div className="price-top">
                <div className="price-id">
                  <img className="price-avatar" src={voice.priceImg || voice.thumb || voice.img} alt="" style={{ backgroundColor: voice.bg }} />
                  <div className="price-id-text">
                    <p className="price-kicker">Ready to play together?</p>
                    <p className="price-name">{voice.name}</p>
                    <p className="price-quote">{d.panelQuote}</p>
                  </div>
                </div>
                <div className="price-amount-box">
                  <p className="price-amount-label">Monthly subscription</p>
                  <p className="price-amount">{PRICE}<span> / month</span></p>
                </div>
              </div>
              <div className="price-divider" />
              <div className="price-lists">
                <div className="price-list-col">
                  <span className="price-list-title">In-game coaching</span>
                  <ul>{COACHING.map((c) => <li key={c}><Check className="price-check" /> {c}</li>)}</ul>
                </div>
                <div className="price-list-col">
                  <span className="price-list-title">Membership</span>
                  <ul>{MEMBERSHIP.map((c) => <li key={c}><Check className="price-check" /> {c}</li>)}</ul>
                </div>
              </div>
              <div className="price-divider" />
              <div className="price-actions">
                <button type="button" className="dt-btn-ghost price-dl"><DownloadIcon width={18} height={18} /> Download Desktop App</button>
                <button type="button" className="dt-btn-primary price-sub">Subscribe now <ArrowRight /></button>
              </div>
              <p className="price-foot">Free to download. Works inside OP.GG Desktop while you play League of Legends.</p>
            </div>
            </div>

            <div className="dt-more">
              <div className="dt-more-head">
                <h3>More voices</h3>
                <a href="#/store" className="dt-more-link">Browse all voices <ArrowRight /></a>
              </div>
              <div className="dt-more-rail">
                {others.map((v) => (
                  <a key={v.id} href={`#/voice/${v.id}`} className="dt-more-card">
                    <div className="dt-more-img" style={{ backgroundColor: v.bg }}>
                      <img src={v.storeImg || v.thumb || v.img} alt={v.name} loading="lazy" />
                    </div>
                    <div className="dt-more-foot">
                      <span className="dt-more-name">{v.name}</span>
                      <span className="dt-more-price">{PRICE} / month</span>
                      <span className="dt-more-arrow"><ArrowRight /></span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* 09 FAQ */}
          <section id="sec-faq" className="dt-sec">
            <div className="dt-faq-head">
              <h2 className="dt-sec-title grad-text">FAQ</h2>
              <button type="button" className="dt-btn-ghost dt-contact">Contact Us</button>
            </div>
            <div className="dt-faq">
              {FAQS.map((f, i) => (
                <div className={`dt-faq-item ${openFaq === i ? 'is-open' : ''}`} key={f.q}>
                  <button type="button" className="dt-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span>{f.q}</span>
                    <Chevron className="dt-faq-chev" />
                  </button>
                  <div className="dt-faq-a-wrap"><p className="dt-faq-a">{f.a}</p></div>
                </div>
              ))}
            </div>
          </section>

          {/* 08 Important notes */}
          <section className="dt-sec dt-notes-sec">
            <h2 className="dt-sec-title grad-text">Important notes</h2>
            {NOTES.map((g) => (
              <div className="dt-notes-group" key={g.title}>
                <h3>{g.title}</h3>
                <ul>{g.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
              </div>
            ))}
          </section>
        </div>
      </div>

      <Footer />
      </div>

      {/* 플로팅 구독 바 */}
      <div className={`dt-bar ${barShown ? 'is-shown' : ''}`}>
        <div className="dt-shell dt-bar-inner">
          <div className="dt-bar-id">
            <img src={voice.priceImg || voice.thumb || voice.img} alt="" style={{ backgroundColor: voice.bg }} />
            <div>
              <p className="dt-bar-name">{voice.name}</p>
              <p className="dt-bar-price">{PRICE} / month</p>
            </div>
          </div>
          <div className="dt-bar-actions">
            <button type="button" className="dt-btn-ghost">Download Desktop App</button>
            <button type="button" className="dt-btn-primary" onClick={() => go('pricing')}>Subscribe now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 요소가 뷰포트에 들어오면 `is-visible` 클래스를 붙여 reveal 애니메이션을 트리거한다.
 * 자식의 stagger 지연은 CSS `--i` 변수로 제어한다.
 */
export function useReveal({ threshold = 0.1, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove('is-visible');
          }
        });
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);
  return ref;
}

/** 스크롤에 따라 요소를 `factor` 비율로 세로 이동시키는 패럴랙스. */
export function useParallax(factor = 0.3) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    let raf = 0;
    let base = 0;
    const measure = () => {
      base = el.getBoundingClientRect().top + window.scrollY;
    };
    const update = () => {
      const delta = (window.scrollY - base) * factor;
      el.style.transform = `translate3d(0, ${delta}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      measure();
      update();
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [factor]);
  return ref;
}

/**
 * 섹션을 스크롤하는 동안의 진행도(0~1)를 반환한다.
 * 섹션 상단이 뷰포트 상단에 닿는 순간 0, 섹션 하단이 뷰포트 하단에 닿을 때 1.
 */
export function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(total > 0 ? scrolled / total : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, progress];
}

/**
 * Hero가 sticky로 덮이는 구간(스냅 지점이 없는 영역)에서 스크롤이 멈추면
 * 가까운 쪽(Hero 전체 / 다음 섹션 전체)으로 자동 정렬해 "반쯤 걸림"을 방지한다.
 */
export function useHeroSnap({ navHeight = 72, debounce = 140, selector = '.below-hero' } = {}) {
  useEffect(() => {
    if (prefersReduced()) return undefined;
    let timer = 0;
    let snapping = false;
    const onScroll = () => {
      if (snapping) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const below = document.querySelector(selector);
        if (!below) return;
        const target = below.offsetTop - navHeight; // 다음 섹션이 정렬되는 스크롤 위치
        const y = window.scrollY;
        if (y > 8 && y < target - 8) {
          const dest = y < target / 2 ? 0 : target;
          snapping = true;
          window.scrollTo({ top: dest, behavior: 'smooth' });
          setTimeout(() => {
            snapping = false;
          }, 600);
        }
      }, debounce);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, [navHeight, debounce, selector]);
}

/**
 * 관성(inertia) 스무스 스크롤 — 마우스 휠을 가로채 목표 위치로 부드럽게 lerp 이동한다.
 * (op.gg/ai 같은 버터 느낌). 터치/리듀스드모션에서는 네이티브 스크롤을 그대로 둔다.
 */
export function useSmoothScroll({ lerp = 0.09 } = {}) {
  useEffect(() => {
    if (prefersReduced()) return undefined;
    if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return undefined;

    let target = window.scrollY;
    let current = target;
    let raf = 0;
    let running = false;

    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    const loop = () => {
      current += (target - current) * lerp;
      if (Math.abs(target - current) < 0.4) {
        current = target;
        window.scrollTo(0, current);
        running = false;
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(loop);
    };

    const onWheel = (e) => {
      if (e.ctrlKey) return; // 핀치 줌은 통과
      e.preventDefault();
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      target = Math.min(Math.max(target + delta, 0), maxScroll());
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    // 휠 외(키보드·스크롤바·프로그램 스크롤)로 움직이면 목표를 동기화
    const onScroll = () => {
      if (!running) {
        target = window.scrollY;
        current = target;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [lerp]);
}

/** 요소가 화면에 보이는 동안만 true. (보일 때만 타이머/애니메이션을 돌려 성능 확보) */
export function useInView({ threshold = 0.15 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/** 페이지 스크롤 시 true가 되어 nav 배경 처리를 제어한다. */
export function useScrolled(offset = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return scrolled;
}

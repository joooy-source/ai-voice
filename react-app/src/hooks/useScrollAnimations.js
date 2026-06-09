import { useEffect, useRef, useState } from 'react';

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 요소가 뷰포트에 들어오면 `is-visible` 클래스를 붙여 reveal 애니메이션을 트리거한다.
 * 자식의 stagger 지연은 CSS `--i` 변수로 제어한다.
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
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

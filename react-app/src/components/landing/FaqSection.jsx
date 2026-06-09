import { useState } from 'react';
import { useReveal } from '../../hooks/useScrollAnimations';
import './FaqSection.css';

const FAQS = [
  {
    q: 'Q. Is the AI Voice feature safe regarding game policies?',
    a: 'Yes. AI Voice runs as an overlay companion and never modifies game files or memory, so it stays within game policies.',
  },
  {
    q: 'Q. How are the voices in the AI Voice Store created?',
    a: 'Voices are produced with the creator’s explicit consent through a licensed recording and synthesis process.',
  },
  {
    q: 'Q. Can I register my own voice in the Voice Store?',
    a: 'Creator submissions are opening soon. Verified creators will be able to register and monetize their own voices.',
  },
];

export default function FaqSection() {
  const ref = useReveal();
  const [open, setOpen] = useState(0);
  return (
    <section className="faq section" ref={ref}>
      <div className="faq-grid reveal">
        <div className="faq-left">
          <div className="faq-head">
            <h2 className="section-title grad-text" style={{ textAlign: 'left' }}>
              Frequently
              <br />
              asked questions
            </h2>
            <p className="faq-sub">
              If you have any further questions, please contact us via the &apos;Contact Us&apos; button below.
            </p>
          </div>
          <button type="button" className="btn btn-primary faq-contact">Contact Us</button>
        </div>

        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.q}>
                <button type="button" className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{item.q}</span>
                  <span className="faq-chevron" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div className="faq-a-wrap">
                  <p className="faq-a">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

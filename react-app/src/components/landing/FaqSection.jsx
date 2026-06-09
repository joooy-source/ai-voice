import { useState } from 'react';
import { useReveal } from '../../hooks/useScrollAnimations';
import './FaqSection.css';

const FAQS = [
  {
    q: 'Q. Is the AI Voice feature safe regarding game policies?',
    a: "A. Yes. OP.GG complies with Riot Games' policies. The feature is developed to operate within guidelines and does not directly interfere with gameplay, so you can use it with peace of mind.",
  },
  {
    q: 'Q. How are the voices in the AI Voice Store created?',
    a: 'A. We train our AI using actual voice data from collaborating streamers, pro gamers, and influencers to provide lively voices that closely mimic their real speech patterns.',
  },
  {
    q: 'Q. Can I register my own voice in the Voice Store?',
    a: "A. If you are interested in a Voice Partnership, please send us a proposal via the 'Contact Us' button.",
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
          <button type="button" className="btn btn-ghost faq-contact">Contact Us</button>
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

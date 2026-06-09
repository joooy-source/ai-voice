import './Footer.css';

const OPGG_LOGO = 'https://www.figma.com/api/mcp/asset/8a6a569b-9c35-4a1e-8276-55722b745c8b';

const COLUMNS = [
  { title: 'OP.GG', links: ['About', 'Company', 'Blog', 'Logo History'] },
  {
    title: 'Products',
    links: [
      'League of Legends', 'Overwatch', 'PUBG', 'Clash Royale', 'Fortnite',
      'Dota2 Autochess', 'Brawlstars', 'OP.GG Talk', 'OP.GG Play', 'IFI.GG',
    ],
  },
  { title: 'Apps', links: ['OP.GG Android App', 'OP.GG iOS App', 'IFI.GG Android App', 'IFI.GG iOS App'] },
  { title: 'Resources', links: ['Privacy Policy', 'Help', 'Feedback', 'Terms of Service'] },
  { title: 'More', links: ['Business', 'Advertise'] },
];

const SOCIALS = [
  {
    label: 'YouTube',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#FF0000" />
        <path d="M10 8.3v7.4l6.2-3.7z" fill="#fff" />
      </svg>
    ),
  },
  {
    label: 'X',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#000" />
        <path d="M7 7l10 10M17 7L7 17" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <defs>
          <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FEDA75" />
            <stop offset="0.45" stopColor="#FA7E1E" />
            <stop offset="0.75" stopColor="#D62976" />
            <stop offset="1" stopColor="#962FBF" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
        <rect x="6.3" y="6.3" width="11.4" height="11.4" rx="3.4" fill="none" stroke="#fff" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2.9" fill="none" stroke="#fff" strokeWidth="1.6" />
        <circle cx="15.7" cy="8.3" r="1" fill="#fff" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#1877F2" />
        <path d="M14.6 12.5h1.7l.33-2.2h-2.03V8.86c0-.6.22-1.06 1.1-1.06h1.02V5.84c-.5-.06-1.05-.1-1.6-.1-1.78 0-3.02 1.07-3.02 3v1.56H10v2.2h1.9V19h2.7z" fill="#fff" />
      </svg>
    ),
  },
  {
    label: 'Overwolf',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#1b1d2b" />
        <path d="M12 5.5l5 3v4c0 3-2.2 5.4-5 6-2.8-.6-5-3-5-6v-4z" fill="none" stroke="#6e4fff" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="12" cy="11.5" r="1.7" fill="#6e4fff" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <img className="footer-logo" src={OPGG_LOGO} alt="OP.GG" />
          <div className="footer-cols">
            {COLUMNS.map((col) => (
              <nav className="footer-col" key={col.title}>
                <h3 className="footer-col-title">{col.title}</h3>
                <ul className="footer-links">
                  {col.links.map((link) => (
                    <li key={link}><a href="#">{link}</a></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2012–2024 OP.GG. OP.GG isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the
            views or opinions of Riot Games or anyone officially involved in producing or managing
            League of Legends.
          </p>
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="footer-social">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

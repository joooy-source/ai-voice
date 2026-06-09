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
    path: 'M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12zM9.8 15.3V8.7l5.7 3.3z',
  },
  { label: 'X', path: 'M4 3h3.5l4 5.5L16 3h3l-6 8 6.5 10H16l-4.5-6.3L6 21H3l6.7-9z' },
  {
    label: 'Instagram',
    path: 'M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zm3.3 15A3.3 3.3 0 0 1 17 20.3H7A3.3 3.3 0 0 1 3.7 17V7A3.3 3.3 0 0 1 7 3.7h10A3.3 3.3 0 0 1 20.3 7zm-2.8-9.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z',
  },
  { label: 'Facebook', path: 'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z' },
  { label: 'Overwolf', path: 'M12 2 3 7v6c0 4.5 3.8 8.5 9 9 5.2-.5 9-4.5 9-9V7zm0 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z' },
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

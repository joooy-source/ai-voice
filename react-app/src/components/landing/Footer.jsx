import './Footer.css';

const OPGG_LOGO = 'https://www.figma.com/api/mcp/asset/8a6a569b-9c35-4a1e-8276-55722b745c8b';

const COLUMNS = [
  { title: 'OP.GG', links: [{ label: 'About OP.GG' }, { label: 'Company' }, { label: 'Blog' }] },
  {
    title: 'Products',
    links: [
      { label: 'League of Legends', game: true },
      { label: 'Teamfight Tactics', game: true },
      { label: 'Valorant', game: true },
      { label: 'Overwatch', game: true },
      { label: 'PUBG', game: true },
    ],
  },
  {
    title: 'Apps',
    links: [
      { label: 'OP.GG for Mobile', game: true },
      { label: 'Gigs', game: true },
      { label: 'Esports', game: true },
      { label: 'TalkG', game: true },
    ],
  },
  { title: 'Resources', links: [{ label: 'Privacy Policy' }, { label: 'Help' }, { label: 'Email Feedback' }, { label: 'FAQ/Feedback' }] },
  { title: 'More', links: [{ label: 'Business' }, { label: 'Advertise' }, { label: 'Recruit' }] },
];

const GameIcon = (
  <svg className="footer-game" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path d="M11.6866 3.00391C11.6867 3.00572 11.6887 3.0067 11.6905 3.00684C12.8789 3.09499 13.8547 3.99459 14.0049 5.17285L14.6465 10.2119C14.8348 11.6921 13.6598 12.9995 12.1407 13C11.1527 13 10.2848 12.4398 9.87115 11.6094C9.73533 11.3367 9.47754 11.125 9.17291 11.125H6.82721C6.52262 11.125 6.26476 11.3367 6.12897 11.6094C5.7154 12.4396 4.84816 12.9998 3.86041 13C2.341 12.9999 1.16532 11.6923 1.35358 10.2119L1.99518 5.17285C2.14542 3.99457 3.12117 3.09497 4.30963 3.00684L4.31647 3H11.6827C11.6847 3 11.6866 3.00188 11.6866 3.00391ZM4.83307 5.66699C4.64916 5.66721 4.50006 5.81604 4.50006 6V6.83301H3.66705C3.48296 6.83301 3.33307 6.9829 3.33307 7.16699V7.5C3.33307 7.68409 3.48296 7.83301 3.66705 7.83301H4.50006V8.66699C4.50024 8.8508 4.64927 8.99978 4.83307 9H5.16705C5.35092 8.99986 5.49989 8.85085 5.50006 8.66699V7.83301H6.33307C6.51716 7.83301 6.66705 7.68409 6.66705 7.5V7.16699C6.66705 6.9829 6.51716 6.83301 6.33307 6.83301H5.50006V6C5.50006 5.81599 5.35103 5.66713 5.16705 5.66699H4.83307ZM11.0001 5.83301C10.1718 5.83305 9.50024 6.50475 9.50006 7.33301C9.50006 8.16141 10.1717 8.83297 11.0001 8.83301C11.8285 8.83301 12.5001 8.16143 12.5001 7.33301C12.4999 6.50473 11.8284 5.83301 11.0001 5.83301Z" fill="#7B7A8E" />
  </svg>
);

const YouTubeIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M18.2812 0C21.75 0 24 2.25 24 5.71875V18.2812C24 21.75 21.75 24 18.2812 24H5.71875C2.25 24 0 21.75 0 18.2812V5.71875C0 2.25 2.25 0 5.71875 0H18.2812Z" fill="#E42B28" />
    <path d="M12.0052 17.9995H11.9945C11.9961 17.9995 11.9978 17.9985 11.9994 17.9985C12.0013 17.9985 12.0033 17.9995 12.0052 17.9995ZM11.9994 5.6665C14.5031 5.66667 17.6558 5.79133 18.3129 5.88818C19.4529 6.07286 20.0727 6.58381 20.4027 7.90967C20.5137 8.3559 20.6664 10.7986 20.6664 11.731V11.9351C20.6664 12.8672 20.5137 15.3094 20.4027 15.7563C20.0727 17.0822 19.4529 17.5931 18.3129 17.7778C17.6558 17.8747 14.5031 17.9984 11.9994 17.9985C9.49606 17.9983 6.34515 17.8747 5.68787 17.7778C4.5475 17.5932 3.92807 17.0824 3.59802 15.7563C3.48701 15.3098 3.33337 12.8672 3.33337 11.9351V11.731C3.33338 10.7986 3.48701 8.35568 3.59802 7.90967C3.92807 6.58371 4.54753 6.07279 5.68787 5.88818C6.34525 5.79135 9.49612 5.66671 11.9994 5.6665ZM10.2006 14.2759L14.8041 11.7466L10.2006 9.33447V14.2759Z" fill="white" />
  </svg>
);

const XIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M18.2812 0C21.75 0 24 2.25 24 5.71875V18.2812C24 21.75 21.75 24 18.2812 24H5.71875C2.25 24 0 21.75 0 18.2812V5.71875C0 2.25 2.25 0 5.71875 0H18.2812Z" fill="#1E2022" />
    <path d="M4.55642 5L10.3316 12.7218L4.52002 19H5.82807L10.9162 13.5032L15.0271 19H19.4782L13.3779 10.8439L18.7874 5H17.4793L12.7936 10.0623L9.00746 5H4.55642ZM6.47996 5.96341H8.52475L17.5544 18.0366H15.5096L6.47996 5.96341Z" fill="white" />
  </svg>
);

const InstagramIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M18.2812 0C21.75 0 24 2.25 24 5.71875V18.2812C24 21.75 21.75 24 18.2812 24H5.71875C2.25 24 0 21.75 0 18.2812V5.71875C0 2.25 2.25 0 5.71875 0H18.2812Z" fill="url(#paint0_linear_28_629)" />
    <mask id="mask0_28_629" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <path fillRule="evenodd" clipRule="evenodd" d="M18.2812 0C21.75 0 24 2.25 24 5.71875V18.2812C24 21.75 21.75 24 18.2812 24H5.71875C2.25 24 0 21.75 0 18.2812V5.71875C0 2.25 2.25 0 5.71875 0H18.2812Z" fill="white" />
    </mask>
    <g mask="url(#mask0_28_629)">
      <circle cx="7.24219" cy="18.1875" r="16.9219" fill="url(#paint1_radial_28_629)" />
    </g>
    <g filter="url(#filter0_d_28_629)">
      <rect x="3.98438" y="4.07812" width="16.0781" height="15.9844" rx="4.26562" stroke="white" strokeWidth="1.64062" />
    </g>
    <g filter="url(#filter1_d_28_629)">
      <circle cx="12.0469" cy="12.1406" r="3.84375" stroke="white" strokeWidth="1.64062" />
    </g>
    <g filter="url(#filter2_d_28_629)">
      <circle cx="16.7578" cy="7.35938" r="1.125" fill="white" />
    </g>
    <defs>
      <filter id="filter0_d_28_629" x="2.16406" y="2.25781" width="19.7188" height="19.625" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="0.5" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.130633 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_28_629" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_28_629" result="shape" />
      </filter>
      <filter id="filter1_d_28_629" x="6.38281" y="6.47656" width="11.3281" height="11.3281" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="0.5" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.130633 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_28_629" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_28_629" result="shape" />
      </filter>
      <filter id="filter2_d_28_629" x="14.6328" y="5.23438" width="4.25" height="4.25" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="0.5" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.130633 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_28_629" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_28_629" result="shape" />
      </filter>
      <linearGradient id="paint0_linear_28_629" x1="-0.468511" y1="2.11914" x2="6.17978" y2="30.7512" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4E60D3" />
        <stop offset="0.148736" stopColor="#913BAF" />
        <stop offset="0.315836" stopColor="#D52D88" />
        <stop offset="0.493765" stopColor="#D72E85" />
        <stop offset="0.81651" stopColor="#E6366D" />
        <stop offset="1" stopColor="#F26D4F" />
      </linearGradient>
      <radialGradient id="paint1_radial_28_629" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8.16347 24.0786) rotate(15.5573) scale(21.8308 20.5579)">
        <stop stopColor="#FED980" />
        <stop offset="0.372276" stopColor="#FCAE49" />
        <stop offset="0.555546" stopColor="#F06745" />
        <stop offset="1" stopColor="#E83D5C" stopOpacity="0.01" />
      </radialGradient>
    </defs>
  </svg>
);

const FacebookIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path d="M19 16H14V24H10V16H5V4H19V16Z" fill="white" />
    <path fillRule="evenodd" clipRule="evenodd" d="M24 12.144C24 5.51726 18.6268 0.144043 12 0.144043C5.37321 0.144043 0 5.51726 0 12.144C0 18.1333 4.3875 23.0978 10.125 23.9989V15.6139H7.07732V12.144H10.125V9.50029C10.125 6.49333 11.917 4.83101 14.6577 4.83101C15.9707 4.83101 17.3443 5.06565 17.3443 5.06565V8.01904H15.8304C14.3405 8.01904 13.8745 8.94369 13.8745 9.89404V12.144H17.2023L16.6709 15.6139H13.875V23.9999C19.6125 23.0994 24 18.1349 24 12.144Z" fill="#1877F2" />
  </svg>
);

const OverwolfIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M18.2812 0C21.75 0 24 2.25 24 5.71875V18.2812C24 21.75 21.75 24 18.2812 24H5.71875C2.25 24 0 21.75 0 18.2812V5.71875C0 2.25 2.25 0 5.71875 0H18.2812Z" fill="#1E2022" />
    <path fillRule="evenodd" clipRule="evenodd" d="M19.3661 12.4304C19.7475 12.6612 20.0031 12.8159 19.9999 12.8159C19.6778 13.3152 19.0406 13.3544 19.0178 13.3526C19.1837 13.5634 19.4751 13.9404 19.5444 14.049C18.9099 14.353 18.0664 14.6441 17.7477 14.754C17.6617 14.7837 17.614 14.8002 17.6188 14.8002C17.6285 14.8002 16.4752 14.1403 14.4039 14.383C13.7246 13.3672 12.6626 12.6845 11.8183 12.6215C11.8183 12.6215 14.726 14.9279 14.3688 21.0011C13.3972 17.5867 11.0881 13.3608 6.40569 12.7575C7.17005 11.9879 8.14934 11.49 9.20282 11.3355C6.9437 10.4839 4 11.3592 4 11.3592C4 11.3592 4.58453 10.4693 5.88086 9.7282C6.76505 9.21771 7.72447 8.86302 8.7201 8.67857C8.7201 8.67857 7.84421 8.01046 4.80307 8.73517C5.97571 7.69132 7.4098 7.01607 8.93776 6.78835C8.94235 6.24681 9.06671 5.71363 9.30123 5.2301C9.53578 4.74657 9.87418 4.32567 10.2903 4C10.7284 4.97855 11.2359 5.92186 11.8086 6.82212C11.8101 6.82574 11.9813 6.90992 12.2488 7.04137C13.1249 7.47192 15.033 8.40968 15.386 8.68589C15.8878 9.08194 16.0164 9.8244 16.1029 10.3233C16.1087 10.3567 16.1143 10.389 16.1198 10.42C16.1282 10.4708 18.2682 11.7659 19.3661 12.4304ZM13.552 10.1225C13.5419 10.1254 13.5353 10.1272 13.5324 10.128C14.5496 10.9038 15.1508 10.8162 15.1508 10.8162C15.1508 10.8162 15.1455 10.0367 14.8823 9.93355C14.6108 9.82662 13.7025 10.0805 13.552 10.1225Z" fill="white" />
  </svg>
);

const SOCIALS = [
  { label: 'YouTube', icon: YouTubeIcon },
  { label: 'X', icon: XIcon },
  { label: 'Instagram', icon: InstagramIcon },
  { label: 'Facebook', icon: FacebookIcon },
  { label: 'Overwolf', icon: OverwolfIcon },
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
                    <li key={link.label}>
                      <a href="#">{link.label}{link.game && GameIcon}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2012–2026 OP.GG. OP.GG is not endorsed by Riot Games and does not reflect the views or
            opinions of Riot Games or anyone officially involved in producing or managing League of
            Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot
            Games, Inc. League of Legends © Riot Games, Inc.
          </p>
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="footer-social">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

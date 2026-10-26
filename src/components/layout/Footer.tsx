import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { IconCall, IconEmailOutline, IconFax, IconLocation } from '../common/BrandIcons';
import './Footer.css';

interface FooterProps {
  onNavigate?: (page: 'home' | 'privacy' | 'terms' | 'contact' | 'about' | 'articles' | 'products') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, direction, t } = useLanguage();

  return (
    <footer className="rasco-footer" dir={direction}>
      {/* Frame 1984077530: Inner Rounded Card with Linear Gradient */}
      <div className="footer-inner-card">
        {/* Golden Horse Outline Watermark */}
        <div className="footer-horse-watermark" aria-hidden="true">
          <svg
            width="480"
            height="680"
            viewBox="0 0 559 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M594.599 219.404C608.135 239.772 614.707 264.446 624.688 285.738C632.177 308.457 636.204 331.717 641.759 353.093C646.742 374.72 646.413 396.171 648.753 415.447C650.765 434.94 652.22 452.686 650.765 468.491C650.274 484.407 649.717 498.205 649.314 509.629C648.444 532.411 647.91 545.378 647.91 545.378L650.564 545.793C650.564 545.793 653.183 532.99 656.602 510.151C658.165 498.603 660.088 484.646 662.32 468.655C665.496 452.505 665.898 434.108 664.846 413.878C663.558 393.824 665.295 371.506 661.43 348.499C657.051 325.647 654.548 300.376 646.703 276.086C636.607 252.779 629.953 226.204 615.914 203.674C602.332 180.768 589.013 156.819 570.321 138.057C553.253 117.423 532.089 102.949 512.186 87.621C491.39 74.4242 470.454 61.8816 449.247 53.2296C428.268 43.8083 407.22 37.6586 387.089 33.9714C367.248 28.6927 347.952 27.7245 330.513 25.0586C260.042 20.1866 214.379 33.5647 214.379 33.5161L214.607 36.6373C214.607 36.5843 260.363 31.9864 328.215 43.1717C344.954 47.0799 363.472 49.5336 382.133 56.121C401.294 61.1521 420.675 68.9907 440.531 78.0583C460.345 86.8385 479.722 99.2263 498.883 112.083C516.979 126.924 536.414 140.736 551.517 160.219C568.955 177.046 581.702 198.691 594.599 219.404ZM428.036 728.821C447.096 715.208 466.806 698.665 485.68 678.805C503.022 659.154 523.706 635.585 538.967 610.235C554.87 584.416 568.282 555.307 575.427 523.502C583.006 491.755 584.437 458.177 581.133 424.86C573.737 358.508 550.495 292.462 517.9 241.881C483.544 192.219 443.839 150.21 404.122 127.464C363.948 104.244 327.121 92.3295 301.136 85.7421C275.094 79.4288 259.791 77.877 259.791 77.877C259.791 77.877 275.044 77.7974 301.775 81.573C328.173 86.0692 366.807 92.4046 409.437 114.744C430.609 125.642 452.972 141.058 473.336 160.905C493.455 179.981 515.177 201.985 532.878 228.9C568.592 282.979 593.265 350.259 602.491 421.977C611.535 494.571 590.294 569.57 554.747 623.166C536.697 651.258 518.175 672.793 496.991 693.594C476.31 713.113 455.011 728.976 434.705 741.885C393.456 767.337 355.306 778.027 328.919 783.019C302.44 788.138 286.959 787.462 286.959 787.462C286.959 787.462 302.44 786.467 328.107 778.474C353.759 770.786 389.371 755.002 428.036 728.821ZM3.37946 399.111C9.32526 372.925 26.0175 355.445 36.6711 335.886C47.7581 299.248 54.6439 260.692 67.402 224.303C73.4406 205.84 80.8486 187.992 88.6899 170.065C95.8465 153.902 104.419 138.211 116.334 123.449C119.583 106.11 122.554 87.9084 124.635 70.1667C126.423 51.218 127.61 31.7786 124.272 14.9078L121.436 0L132.573 3.13453C152.074 8.59454 170.14 16.6984 186.627 29.462C202.932 41.6906 217.269 60.2989 220.422 82.665L217.768 83.3857C211.957 63.0311 197.76 48.3576 181.641 38.9363C169.335 31.6858 155.799 26.9022 142.333 23.3874C146.701 39.5243 148.461 55.8071 148.573 71.5858C149.057 92.6522 147.204 112.874 144.047 133.742L143.432 137.796L139.958 142.093C120.566 166.475 103.924 201.742 88.7634 235.192C73.9241 269.344 56.0443 303.002 44.9999 339.392L44.7949 340.174L44.3616 340.736C31.7389 360.246 18.064 379.676 18.3193 402.197C17.7932 413.148 18.7294 424.227 21.5881 434.21C23.1897 439.122 24.447 443.928 26.5746 448.088C28.3811 451.824 31.236 456.682 32.4042 457.571C35.3791 460.657 38.7408 462.253 43.5647 465.153C47.8199 468.005 52.2068 469.804 56.5975 471.634C65.197 475.556 73.9744 477.488 81.9318 476.179C98.3494 474.796 111.68 454.702 118.748 432.411L120.075 432.592L121.467 432.804C122.086 445.475 119.637 458.075 114.697 470.379C109.212 482.192 99.1076 493.01 86.4849 497.507C73.9319 502.445 60.9649 500.274 49.762 496.83C44.1605 494.894 38.4429 492.833 33.4604 489.827C28.884 487.316 22.2574 484.597 17.3599 479.265C10.683 472.183 8.05634 466.462 5.26721 459.406C2.84174 452.584 1.21698 445.793 0.601929 438.892C-0.825562 425.222 0.362061 411.787 3.37946 399.111ZM183.513 393.47C201.528 375.543 217.946 354.481 230.568 332.336L235.969 322.861L244.247 328.56C252.796 334.608 262.286 339.533 269.326 348.327C277.4 355.904 283.345 366.148 288.626 376.325C299.187 397.193 302.506 421.327 302.274 443.875C302.185 489.655 288.487 531.991 270.789 570.56C266.032 580.31 260.827 589.765 255.195 598.886C249.384 607.224 243.899 616.084 239.876 623.869C235.211 631.681 230.019 639.281 227.891 648.954C225.149 658.203 220.986 667.037 220.278 677.179C219.068 687.055 216.46 696.826 216.661 707.074C216.777 717.216 214.967 727.534 215.837 737.751C215.93 758.446 218.174 779.168 221.238 799.996C213.919 780.605 208.932 759.989 205.667 738.901C203.517 728.45 203.106 717.605 202.418 706.808C201.188 696.043 203.06 685.15 203.381 674.119C203.381 663.036 206.878 652.456 209.099 641.478C210.812 630.293 215.915 620.363 220.642 610.226C225.42 599.536 230.406 591.255 235.621 582.705C240.034 574.632 244.17 566.011 248.197 556.97C263.702 521.168 274.719 481.918 275.771 443.53C276.204 433.887 275.156 424.639 273.988 415.363C272.181 406.344 270.286 397.515 266.649 389.398C262.947 381.56 259.059 373.421 253.025 367.434C249.551 362.642 244.746 359.083 240.174 355.387C225.447 374.437 209.447 391.344 191.567 405.743C180.132 412.719 169.293 420.509 156.948 424.586C145.401 430.859 132.117 430.939 119.974 432.685C131.838 427.592 143.707 424.899 153.974 417.008C164.968 411.079 174.093 401.649 183.513 393.47Z"
              fill="#C9A55A"
            />
          </svg>
        </div>

        {/* Top 3-Column Content Row */}
        <div className="footer-grid-row">
          {/* Column 1: Rasco Brand & About */}
          <div className="footer-col footer-col-brand">
            <div className="footer-logo-wrapper">
              <img
                src="/icons/logo-white.png"
                alt="Rasco - رمز الشرق"
                className="footer-brand-logo"
              />
            </div>
            <p className="footer-about-text">
              {t('footerDesc')}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col footer-col-links">
            <h3 className="footer-col-title">{t('quickLinks')}</h3>
            <ul className="footer-links-list">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) {
                      onNavigate('home');
                    } else {
                      window.location.hash = '';
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {t('navHome')}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) {
                      onNavigate('about');
                    }
                  }}
                >
                  {t('navAbout')}
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) {
                      onNavigate('products');
                    } else {
                      window.location.hash = '#products';
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {t('navProducts')}
                </a>
              </li>
              <li>
                <a
                  href="#articles"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) {
                      onNavigate('articles');
                    } else {
                      window.location.hash = '#articles';
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {language === 'ar' ? 'مركز المعرفة' : 'Knowledge Center'}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) {
                      onNavigate('contact');
                    } else {
                      window.location.hash = '#contact';
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {t('navContact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-col footer-col-contact">
            <h3 className="footer-col-title">{t('contactInfo')}</h3>
            <ul className="footer-contact-list">
              {/* Phone */}
              <li className="footer-contact-item">
                <span className="contact-icon" aria-hidden="true">
                  <IconCall size={18} color="#C9A55A" />
                </span>
                <a href="tel:+966505289728" className="contact-link" dir="ltr">
                  +966 50 528 9728
                </a>
              </li>

              {/* Email */}
              <li className="footer-contact-item">
                <span className="contact-icon" aria-hidden="true">
                  <IconEmailOutline size={18} color="#C9A55A" />
                </span>
                <a href="mailto:info@ramzalsherq.com" className="contact-link" dir="ltr">
                  info@ramzalsherq.com
                </a>
              </li>

              {/* Office Landline / Fax */}
              <li className="footer-contact-item">
                <span className="contact-icon" aria-hidden="true">
                  <IconFax size={18} color="#C9A55A" />
                </span>
                <a href="tel:+966112690407" className="contact-link" dir="ltr">
                  +966 11 2690407
                </a>
              </li>

              {/* Address */}
              <li className="footer-contact-item">
                <span className="contact-icon" aria-hidden="true">
                  <IconLocation size={18} color="#C9A55A" />
                </span>
                <span className="contact-link">
                  {language === 'ar' ? 'طريق الجنادرية، الرمال، الرياض' : 'Al Jenadriyah Rd, Ar Rimal, Riyadh'}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Spacing column for the golden horse art */}
          <div className="footer-col footer-col-art-spacer" aria-hidden="true" />
        </div>

        {/* Golden Horizontal Accent Divider Line */}
        <div className="footer-gold-divider" aria-hidden="true" />

        {/* Bottom Bar: Copyright on one side, Social in Center, Legal on the other */}
        <div className="footer-bottom-row">
          {/* Copyright Text */}
          <div className="footer-copyright">
            {language === 'ar'
              ? '© 2026 رمز الشرق. جميع الحقوق محفوظة.'
              : '© 2026 Ramz Al Sharq. All rights reserved.'}
          </div>

          {/* Social Media Rounded Buttons in Center */}
          <div className="footer-social-icons">
            {/* 1. Threads / @ */}
            <a href="#social" className="footer-social-btn" aria-label="Threads">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
              </svg>
            </a>

            {/* 2. X (Twitter) */}
            <a href="#social" className="footer-social-btn" aria-label="X">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* 3. YouTube */}
            <a href="#social" className="footer-social-btn" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* 4. WhatsApp */}
            <a href="https://wa.me/966505289728" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="WhatsApp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 2C6.51 2 2.016 6.494 2.016 12.016c0 1.956.564 3.782 1.54 5.334L2 22l4.82-1.508c1.492.894 3.238 1.408 5.211 1.408 5.521 0 10.016-4.494 10.016-10.016C22.047 6.494 17.552 2 12.031 2zm5.823 14.167c-.244.685-1.42 1.309-1.956 1.385-.506.072-1.164.103-3.376-.81-2.825-1.167-4.636-4.047-4.778-4.234-.138-.187-1.144-1.524-1.144-2.907 0-1.383.725-2.062.981-2.343.256-.282.564-.352.75-.352.188 0 .376.002.54.01.173.008.406-.065.635.485.244.582.83 2.022.902 2.17.072.148.12.322.02.52-.098.198-.148.322-.294.492-.148.172-.31.385-.444.516-.148.148-.302.308-.13.604.172.296.764 1.258 1.637 2.035 1.122.998 2.068 1.309 2.363 1.457.296.148.468.124.64-.074.172-.198.74-8.62.938-1.158.198-.296.396-.248.666-.148.27.098 1.714.808 2.01 9.56.296.148.492.222.564.346.072.124.072.718-.172 1.403z"/>
              </svg>
            </a>

            {/* 5. Instagram */}
            <a href="#social" className="footer-social-btn" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* 6. Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>
          </div>

          {/* Legal Links */}
          <div className="footer-legal-links">
            <a
              href="#privacy"
              className="footer-legal-link"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate('privacy');
                } else {
                  window.location.hash = '#privacy';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              {t('privacyPolicy')}
            </a>
            <a
              href="#terms"
              className="footer-legal-link"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate('terms');
                } else {
                  window.location.hash = '#terms';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              {t('termsConditions')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

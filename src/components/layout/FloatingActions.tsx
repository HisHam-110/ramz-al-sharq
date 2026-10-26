import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './FloatingActions.css';

// Official WhatsApp Vector Icon Component
const WhatsAppVector: React.FC<{ size?: number; color?: string }> = ({
  size = 28,
  color = '#FFFFFF',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="floating-whatsapp-svg"
    aria-hidden="true"
  >
    <path
      d="M14.5817 11.985C14.333 11.8608 13.1097 11.2625 12.882 11.1792C12.6534 11.0967 12.4876 11.0558 12.321 11.3042C12.156 11.5517 11.6788 12.1092 11.5339 12.2742C11.3891 12.44 11.2434 12.46 10.9947 12.3367C10.746 12.2117 9.94388 11.9508 8.99353 11.1075C8.25419 10.4509 7.75431 9.64002 7.60946 9.39169C7.46461 9.14419 7.59439 9.01002 7.71831 8.88669C7.83051 8.77585 7.96783 8.59752 8.09175 8.45335C8.21651 8.30835 8.25754 8.20502 8.34127 8.03919C8.42416 7.87419 8.38313 7.73002 8.32034 7.60585C8.25754 7.48169 7.76018 6.26252 7.55336 5.76669C7.35073 5.28419 7.14559 5.35003 6.9932 5.34169C6.84835 5.33503 6.68256 5.33336 6.51594 5.33336C6.35015 5.33336 6.08053 5.39503 5.85279 5.64336C5.62504 5.89086 4.98199 6.49002 4.98199 7.70919C4.98199 8.92752 5.87372 10.105 5.99764 10.2709C6.1224 10.4359 7.75264 12.9375 10.2487 14.01C10.8423 14.265 11.3053 14.4175 11.6671 14.5308C12.2632 14.72 12.8058 14.6933 13.2337 14.6292C13.7118 14.5583 14.7057 14.03 14.9133 13.4517C15.121 12.8733 15.121 12.3775 15.0582 12.2742C14.9962 12.1708 14.8312 12.1092 14.5817 11.985ZM10.0418 18.1542H10.0385C8.55626 18.1543 7.10128 17.7577 5.82599 17.0058L5.52372 16.8275L2.39135 17.6458L3.22699 14.6058L3.03022 14.2942C2.20165 12.9811 1.76332 11.4614 1.76588 9.91085C1.76672 5.36919 5.48018 1.6742 10.0452 1.6742C12.2557 1.6742 14.3339 2.53253 15.8963 4.08919C16.6672 4.85304 17.2782 5.76146 17.694 6.76189C18.1098 7.76232 18.3221 8.83489 18.3186 9.91752C18.3161 14.4592 14.6035 18.1542 10.0418 18.1542ZM17.0861 2.9067C16.1636 1.98247 15.0659 1.24965 13.8567 0.7507C12.6475 0.251754 11.3508 -0.00339687 10.0418 3.41479e-05C4.55328 3.41479e-05 0.0862428 4.44586 0.0837309 9.91002C0.0837309 11.6567 0.541739 13.3617 1.41338 14.8642L0 20L5.27923 18.6217C6.73916 19.4133 8.37513 19.8281 10.0377 19.8283H10.0418C15.5296 19.8283 19.9974 15.3825 20 9.91752C20.004 8.61525 19.7486 7.32511 19.2484 6.12172C18.7483 4.91833 18.0133 3.82559 17.0861 2.9067Z"
      fill={color}
    />
  </svg>
);

export const FloatingActions: React.FC = () => {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Toggle visibility when scrolled past 250px
      if (scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Calculate progress (0 to 100)
      if (docHeight > 0) {
        const progress = Math.min(Math.max((scrollY / docHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Circular progress math: circumference for r = 24
  const radius = 24;
  const circumference = 2 * Math.PI * radius; // ~150.796
  const strokeDashoffset = circumference - (circumference * scrollProgress) / 100;

  return (
    <>
      {/* 1. Floating WhatsApp Button (Bottom Right) */}
      <div className="floating-whatsapp-container">
        {/* Hover Tooltip */}
        <div className="floating-whatsapp-tooltip" role="tooltip">
          <span className="floating-tooltip-dot"></span>
          <span className="floating-tooltip-text">{t('whatsappFloatingTooltip')}</span>
        </div>

        {/* Pulse Glow Effect */}
        <div className="floating-whatsapp-pulse"></div>

        {/* Main WhatsApp Action Link */}
        <a
          href="https://wa.me/966505289728"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp-btn"
          aria-label={t('whatsappFloatingTooltip')}
        >
          <WhatsAppVector size={30} color="#FFFFFF" />
        </a>
      </div>

      {/* 2. Floating Scroll To Top Button (Bottom Left) */}
      <div
        className={`floating-scroll-container ${showScrollTop ? 'visible' : ''}`}
        aria-hidden={!showScrollTop}
      >
        {/* Tooltip on hover */}
        <div className="floating-scroll-tooltip" role="tooltip">
          <span>{t('scrollTopFloatingTooltip')}</span>
        </div>

        <button
          type="button"
          className="floating-scroll-btn"
          onClick={scrollToTop}
          aria-label="التمرير إلى أعلى الصفحة"
        >
          {/* Circular Scroll Progress Track */}
          <svg className="floating-progress-ring" width="56" height="56" viewBox="0 0 56 56">
            <circle
              className="floating-progress-bg"
              cx="28"
              cy="28"
              r={radius}
            />
            <circle
              className="floating-progress-bar"
              cx="28"
              cy="28"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>

          {/* Up Arrow Icon */}
          <div className="floating-scroll-icon-wrap">
            <ArrowUp size={20} className="floating-scroll-arrow" />
          </div>
        </button>
      </div>
    </>
  );
};

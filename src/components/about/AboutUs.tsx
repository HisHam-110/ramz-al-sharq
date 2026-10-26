import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './AboutUs.css';

export const AboutUs: React.FC = () => {
  const { language, direction } = useLanguage();
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1400;
    const startValue = 1;
    const endValue = 25;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (endValue - startValue) * easeOut);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="about" className="about-section" dir={direction} aria-label={language === 'en' ? 'About Us - Our Heritage' : 'من نحن - تراثنا العريق'}>
      <div className="about-container">
        
        {/* Visual Composition (Horse Image + Gold Frame + Glass Badge) */}
        <div className="about-visual-col">
          <div className="about-visual-wrapper">
            {/* Offset Gold Border Frame */}
            <div className="about-gold-frame" aria-hidden="true" />

            {/* Horse Image Box */}
            <div className="about-image-box">
              <img
                src="/images/about-horse-clean@2x.png"
                alt={language === 'en' ? 'Purebred horse at Ramz Al Sharq stable' : 'خيل أصيل في اسطبل رمز الشرق'}
                className="about-horse-img"
                loading="lazy"
              />
              <div className="about-image-overlay" aria-hidden="true" />
            </div>

            {/* Glassmorphic Experience Badge */}
            <div className="about-experience-badge">
              <div className="badge-number-row">
                <span className="badge-plus">+</span>
                <span className="badge-number">{count}</span>
              </div>
              <div className="badge-label-col">
                {language === 'en' ? (
                  <>
                    <span>Years of Expertise</span>
                    <span>in the Equine World</span>
                  </>
                ) : (
                  <>
                    <span>عاما من الخبرة في عالم</span>
                    <span>الخيول</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content & Feature Cards */}
        <div className="about-content-col">
          <span className="about-subtitle">
            {language === 'en' ? 'Our Rich Heritage' : 'تراثنا العريق'}
          </span>
          <h2 className="about-title">
            {language === 'en' ? 'About Us' : 'من نحن'}
          </h2>
          <p className="about-description">
            {language === 'en'
              ? 'Ramz Al Sharq Trading Co. is a leading Saudi company specializing in providing the finest veterinary medicines, feeds, and nutritional vitamins for horses in Saudi Arabia.'
              : 'شركة رمز الشرق المحدودة هي شركة سعودية رائدة متخصصة في توفير أفضل الأدوية والأعلاف والفيتامينات الغذائية للخيول في المملكة العربية السعودية.'}
          </p>

          {/* Cards Row: Vision & Mission */}
          <div className="about-cards-row">
            
            {/* Vision Card (Blue) */}
            <div className="about-card about-card-vision">
              <div className="about-card-icon-wrap vision-icon-wrap" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#154C9D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" fill="#154C9D" />
                </svg>
              </div>
              <h3 className="about-card-title vision-title">
                {language === 'en' ? 'Our Vision' : 'رؤيتنا'}
              </h3>
              <p className="about-card-text">
                {language === 'en'
                  ? 'To be the premier choice and trusted partner for horse owners and breeders across the Kingdom.'
                  : 'أن نكون الخيار الأول والشريك الموثوق لمربي الخيول في المملكة.'}
              </p>
            </div>

            {/* Mission Card (Green) */}
            <div className="about-card about-card-mission">
              <div className="about-card-icon-wrap mission-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00A86B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  <line x1="8" y1="11" x2="16" y2="11" />
                  <line x1="8" y1="15" x2="13" y2="15" />
                </svg>
              </div>
              <h3 className="about-card-title mission-title">
                {language === 'en' ? 'Our Mission' : 'رسالتنا'}
              </h3>
              <p className="about-card-text">
                {language === 'en'
                  ? 'Delivering superior-grade products from top international brands accompanied by unparalleled service.'
                  : 'تقديم منتجات عالية الجودة من أفضل العلامات التجارية العالمية مع خدمة متميزة.'}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};


import React, { useEffect, useState } from 'react';
import { VisionMissionValues } from '../components/about/VisionMissionValues';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Partners } from '../components/home/Partners';
import { useLanguage } from '../context/LanguageContext';
import '../components/about/AboutUs.css';
import './AboutPage.css';

interface AboutPageProps {
  onBackToHome?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome }) => {
  const { language, direction } = useLanguage();
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Smooth count-up animation from 1 to 25 upon entering page or refresh
    let startTimestamp: number | null = null;
    const duration = 1400; // 1.4 seconds
    const startValue = 1;
    const endValue = 25;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
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
    <div className="about-page-wrapper" dir={direction}>
      {/* Main Section 1: The "من نحن" Design from Figma */}
      <section className="about-section about-section-standalone" aria-label="من نحن - تراثنا العريق">
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
                  alt={language === 'ar' ? 'خيل أصيل في اسطبل رمز الشرق' : 'Arabian horse at Ramz Al Sharq stable'}
                  className="about-horse-img"
                  loading="lazy"
                />
                <div className="about-image-overlay" aria-hidden="true" />
              </div>

              {/* Glassmorphic Experience Badge */}
              <div className="about-experience-badge">
                <div className="badge-number-row" dir="ltr">
                  <span className="badge-plus">+</span>
                  <span className="badge-number">{count}</span>
                </div>
                <div className="badge-label-col">
                  <span>{language === 'ar' ? 'عاماً من الخبرة في عالم' : 'Years of Excellence in'}</span>
                  <span>{language === 'ar' ? 'الخيول' : 'Equestrian Care'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content & Feature Cards */}
          <div className="about-content-col">
            <span className="about-subtitle">
              {language === 'ar' ? 'تراثنا العريق' : 'Our Rich Heritage'}
            </span>
            <h2 className="about-title">
              {language === 'ar' ? 'من نحن' : 'About Us'}
            </h2>
            <p className="about-description">
              {language === 'ar'
                ? 'شركة رمز الشرق المحدودة هي شركة سعودية رائدة متخصصة في توفير أفضل الأدوية والأعلاف والفيتامينات الغذائية للخيول في المملكة العربية السعودية.'
                : 'Ramz Al Sharq Ltd. is a leading Saudi company specializing in importing and supplying top-tier equine feeds, veterinary supplements, and premium equestrian gear across the Kingdom.'}
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
                  {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
                </h3>
                <p className="about-card-text">
                  {language === 'ar'
                    ? 'أن نكون الخيار الأول والشريك الموثوق لمربي وملاك الخيول في المملكة.'
                    : 'To be the premier choice and trusted partner for horse owners and equestrian clubs in KSA.'}
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
                  {language === 'ar' ? 'رسالتنا' : 'Our Mission'}
                </h3>
                <p className="about-card-text">
                  {language === 'ar'
                    ? 'تقديم منتجات عالية الجودة من أفضل العلامات التجارية العالمية مع خدمة متميزة.'
                    : 'Delivering world-class products from globally renowned manufacturers backed by expert advisory.'}
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Main Section 2: Vision, Mission & Core Values */}
      <VisionMissionValues />

      {/* Main Section 3: Why Choose Us */}
      <WhyChooseUs />

      {/* Main Section 4: Global Partners */}
      <Partners />

      {/* Return to Home Button */}
      {onBackToHome && (
        <div className="about-back-home-box">
          <button
            type="button"
            onClick={onBackToHome}
            className="about-back-home-btn"
          >
            <span>{direction === 'rtl' ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home Page'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

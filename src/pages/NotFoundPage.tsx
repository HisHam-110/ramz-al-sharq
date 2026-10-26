import React, { useEffect } from 'react';
import { Home, PhoneCall, Compass, Package, BookOpen, MapPin, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './NotFoundPage.css';

interface NotFoundPageProps {
  onBackToHome: () => void;
  onNavigate: (page: string) => void;
  attemptedPath?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onBackToHome,
  onNavigate,
  attemptedPath,
}) => {
  const { language, direction } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = language === 'en' ? '404 - Page Not Found | Ramz Al Sharq' : '404 - الصفحة غير موجودة | رمز الشرق';
  }, [language]);

  const displayPath = attemptedPath || (typeof window !== 'undefined' ? (window.location.hash || window.location.pathname) : '');

  return (
    <div className="not-found-wrapper" dir={direction} id="not-found-page">
      {/* Background Ambience */}
      <div className="not-found-bg-decor" aria-hidden="true">
        <div className="not-found-glow-orb-1" />
        <div className="not-found-glow-orb-2" />
        <img
          src="/icons/Vector.svg"
          alt=""
          className="not-found-horse-silhouette"
        />
      </div>

      <div className="not-found-card">
        {/* Top Gold Pill Badge */}
        <div className="not-found-badge">
          <span className="not-found-badge-dot" />
          <span>
            {language === 'en' ? 'Error 404 • Page Not Found' : 'خطأ 404 • الصفحة غير متوفرة'}
          </span>
        </div>

        {/* 404 Big Numbers Graphic */}
        <div className="not-found-digits-wrapper" aria-label="404">
          <span className="not-found-digit">4</span>
          <div className="not-found-zero-symbol">
            <div className="not-found-inner-icon">
              <Compass size={48} strokeWidth={2.2} />
            </div>
          </div>
          <span className="not-found-digit">4</span>
        </div>

        {/* Headline & Description */}
        <h1 className="not-found-title">
          {language === 'en'
            ? 'Oops! We couldn’t find that page'
            : 'عذراً، لم نتمكن من العثور على الصفحة المطلوبة!'}
        </h1>

        <p className="not-found-desc">
          {language === 'en'
            ? 'The link you followed may be broken, misspelled, or the page may have been relocated. You can return to our homepage or discover our trusted equine products below.'
            : 'يبدو أن الرابط الذي حاولت الوصول إليه غير صحيح أو تم تغيير مساره. لا تقلق، يمكنك العودة للصفحة الرئيسية أو استكشاف منتجاتنا وخدماتنا المعتمدة أدناه.'}
        </p>

        {/* Display Attempted Path if Available */}
        {displayPath && displayPath !== '#' && (
          <div className="not-found-path-box">
            <span className="not-found-path-label">
              {language === 'en' ? 'Attempted Route:' : 'المسار المطلوب:'}
            </span>
            <code className="not-found-path-code">{displayPath}</code>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="not-found-actions">
          <button
            type="button"
            className="not-found-btn not-found-btn-primary"
            onClick={onBackToHome}
          >
            <Home size={18} strokeWidth={2.3} />
            <span>{language === 'en' ? 'Back to Homepage' : 'العودة للرئيسية'}</span>
          </button>

          <button
            type="button"
            className="not-found-btn not-found-btn-secondary"
            onClick={() => onNavigate('contact')}
          >
            <PhoneCall size={18} strokeWidth={2.3} />
            <span>{language === 'en' ? 'Contact Support' : 'تواصل معنا'}</span>
          </button>

          <button
            type="button"
            className="not-found-btn not-found-btn-outline"
            onClick={() => onNavigate('products')}
          >
            <Package size={18} strokeWidth={2.3} />
            <span>{language === 'en' ? 'Browse Products' : 'تصفح المنتجات'}</span>
          </button>
        </div>

        {/* Suggested Helpful Pages */}
        <div className="not-found-suggestions">
          <div className="not-found-suggestions-title">
            {language === 'en' ? 'Quick helpful destinations:' : 'صفحات مقترحة قد تهمك:'}
          </div>

          <div className="not-found-grid">
            {/* 1. Products */}
            <div
              className="not-found-suggestion-card"
              onClick={() => onNavigate('products')}
              role="button"
              tabIndex={0}
            >
              <div className="not-found-card-icon">
                <Package size={20} />
              </div>
              <h3 className="not-found-card-name">
                {language === 'en' ? 'All Products' : 'منتجات الخيل'}
              </h3>
              <p className="not-found-card-sub">
                {language === 'en' ? 'Feeds & supplements' : 'أعلاف ومكملات معتمدة'}
              </p>
            </div>

            {/* 2. Knowledge Center */}
            <div
              className="not-found-suggestion-card"
              onClick={() => onNavigate('articles')}
              role="button"
              tabIndex={0}
            >
              <div className="not-found-card-icon">
                <BookOpen size={20} />
              </div>
              <h3 className="not-found-card-name">
                {language === 'en' ? 'Knowledge Center' : 'مركز المعرفة'}
              </h3>
              <p className="not-found-card-sub">
                {language === 'en' ? 'Veterinary equine tips' : 'مقالات وإرشادات بيطرية'}
              </p>
            </div>

            {/* 3. About Us */}
            <div
              className="not-found-suggestion-card"
              onClick={() => onNavigate('about')}
              role="button"
              tabIndex={0}
            >
              <div className="not-found-card-icon">
                <Info size={20} />
              </div>
              <h3 className="not-found-card-name">
                {language === 'en' ? 'About Rasco' : 'عن رمز الشرق'}
              </h3>
              <p className="not-found-card-sub">
                {language === 'en' ? 'Our legacy & mission' : 'ريادتنا وقيمنا الراسخة'}
              </p>
            </div>

            {/* 4. Locations & Branches */}
            <div
              className="not-found-suggestion-card"
              onClick={() => onNavigate('contact')}
              role="button"
              tabIndex={0}
            >
              <div className="not-found-card-icon">
                <MapPin size={20} />
              </div>
              <h3 className="not-found-card-name">
                {language === 'en' ? 'Our Branches' : 'فروعنا والصيدليات'}
              </h3>
              <p className="not-found-card-sub">
                {language === 'en' ? 'Locations across Riyadh' : 'المقر الرئيسي وفروع الرياض'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

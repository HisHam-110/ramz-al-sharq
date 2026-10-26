import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './Header.css';

interface HeaderProps {
  onLanguageChange?: (lang: 'AR' | 'EN') => void;
  onNavigate?: (page: 'home' | 'privacy' | 'terms' | 'contact' | 'about' | 'articles' | 'products') => void;
}

export const Header: React.FC<HeaderProps> = ({ onLanguageChange, onNavigate }) => {
  const { language, direction, setLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('home');
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const handleLangToggle = (lang: 'AR' | 'EN') => {
    const newLang = lang.toLowerCase() as 'ar' | 'en';
    setLanguage(newLang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveNav('home');
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const productCategories = [
    { title: t('catDropdownFeeds'), desc: t('catDropdownFeedsDesc') },
    { title: t('catDropdownSaddles'), desc: t('catDropdownSaddlesDesc') },
    { title: t('catDropdownCare'), desc: t('catDropdownCareDesc') },
    { title: t('catDropdownStables'), desc: t('catDropdownStablesDesc') },
  ];

  return (
    <header className="rasco-header" dir={direction}>
      {/* ================= TOP BAR (White) ================= */}
      <div className="top-bar-wrapper">
        <div className="top-bar-container">
          
          {/* 1. Right Side: Logo (In RTL DOM order, 1st child is on the far right; in LTR, on far left) */}
          <div className="header-logo-section">
            <a href="/" className="logo-link" onClick={handleHomeClick} aria-label="الصفحة الرئيسية - Rasco">
              <img
                src="/icons/logo 6.png"
                alt="Rasco Logo"
                className="logo-img"
              />
            </a>
          </div>

          {/* 2. Center: Search Bar */}
          <div className="header-search-section">
            <div className="search-box">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon-wrapper" aria-hidden="true">
                <Search className="search-icon" size={19} strokeWidth={1.5} />
              </span>
            </div>
          </div>

          {/* 3. Left Side: Actions (WhatsApp contact + Language switcher) */}
          <div className="header-actions-section">
            {/* WhatsApp Contact Button */}
            <a
              href="https://wa.me/966505289728"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
              aria-label={language === 'ar' ? 'تواصل معنا عبر واتساب' : 'Contact us on WhatsApp'}
            >
              {/* WhatsApp Outline Icon from public/icons/whatsapp.svg */}
              <svg
                className="whatsapp-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.3789 2.27907 14.6926 2.78382 15.8877C3.06278 16.5481 3.20226 16.8784 3.21953 17.128C3.2368 17.3776 3.16334 17.6521 3.01642 18.2012L2 22L5.79877 20.9836C6.34788 20.8367 6.62244 20.7632 6.87202 20.7805C7.12161 20.7977 7.45185 20.9372 8.11235 21.2162C9.30745 21.7209 10.6211 22 12 22Z"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                  stroke="currentColor"
                />
                <path
                  d="M8.58815 12.3773L9.45909 11.2956C9.82616 10.8397 10.2799 10.4153 10.3155 9.80826C10.3244 9.65494 10.2166 8.96657 10.0008 7.58986C9.91601 7.04881 9.41086 7 8.97332 7C8.40314 7 8.11805 7 7.83495 7.12931C7.47714 7.29275 7.10979 7.75231 7.02917 8.13733C6.96539 8.44196 7.01279 8.65187 7.10759 9.07169L7.10759 9.07169C7.51023 10.8548 8.45481 12.6158 9.91948 14.0805C11.3842 15.5452 13.1452 16.4898 14.9283 16.8924C15.3481 16.9872 15.558 17.0346 15.8627 16.9708C16.2477 16.8902 16.7072 16.5229 16.8707 16.165C17 15.8819 17 15.5969 17 15.0267V15.0267C17 14.5891 16.9512 14.084 16.4101 13.9992C15.0334 13.7834 14.3451 13.6756 14.1917 13.6845C13.5847 13.7201 13.1603 14.1738 12.7044 14.5409L11.6227 15.4118"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="currentColor"
                />
              </svg>
              <span>{t('contactUs')}</span>
            </a>

            {/* Language Switcher Capsule: forced LTR so [ AR  EN ] displays AR on left, EN on right */}
            <div className="lang-switcher" role="group" aria-label="اختيار اللغة" dir="ltr">
              <button
                id="lang-btn-ar"
                type="button"
                className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
                onClick={() => handleLangToggle('AR')}
                aria-pressed={language === 'ar'}
              >
                AR
              </button>
              <button
                id="lang-btn-en"
                type="button"
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => handleLangToggle('EN')}
                aria-pressed={language === 'en'}
              >
                EN
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM BAR (Blue Navigation) ================= */}
      <nav className="nav-bar-wrapper">
        <div className="nav-bar-container">
          
          <div className="nav-center-group">
            {/* Right Decorative Horse Silhouette (Flanking on its right) */}
            <div className="horse-silhouette horse-silhouette-right" aria-hidden="true">
              <img src="/icons/Vector.svg" alt="" className="horse-vector" />
            </div>

            {/* Navigation Links in exact order */}
            <ul className="nav-links-list">
              <li className="nav-item">
                <a
                  href="#home"
                  className={`nav-link ${activeNav === 'home' ? 'active' : ''}`}
                  onClick={handleHomeClick}
                >
                  {t('navHome')}
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#about"
                  className={`nav-link ${activeNav === 'about' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav('about');
                    if (onNavigate) {
                      onNavigate('about');
                    }
                  }}
                >
                  {t('navAbout')}
                </a>
              </li>

              <li
                className="nav-item dropdown-parent"
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onMouseLeave={() => setIsProductsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`nav-link dropdown-toggle ${activeNav === 'products' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveNav('products');
                    if (onNavigate) {
                      onNavigate('products');
                    } else {
                      window.location.hash = '#products';
                    }
                  }}
                  aria-expanded={isProductsDropdownOpen}
                >
                  <ChevronDown className={`chevron-icon ${isProductsDropdownOpen ? 'rotated' : ''}`} size={14} strokeWidth={2.4} />
                  <span>{t('navProducts')}</span>
                </button>

                {/* Dropdown Menu */}
                {isProductsDropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-grid">
                      {productCategories.map((cat, idx) => (
                        <a
                          href="#products"
                          key={idx}
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsProductsDropdownOpen(false);
                            setActiveNav('products');
                            if (onNavigate) {
                              onNavigate('products');
                            } else {
                              window.location.hash = '#products';
                            }
                          }}
                        >
                          <div className="dropdown-item-title">{cat.title}</div>
                          <div className="dropdown-item-desc">{cat.desc}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              <li className="nav-item">
                <a
                  href="#articles"
                  className={`nav-link ${activeNav === 'articles' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav('articles');
                    if (onNavigate) {
                      onNavigate('articles');
                    } else {
                      window.location.hash = '#articles';
                    }
                  }}
                >
                  {t('navArticles')}
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#contact"
                  className={`nav-link ${activeNav === 'contact' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav('contact');
                    if (onNavigate) {
                      onNavigate('contact');
                    } else {
                      window.location.hash = '#contact';
                    }
                  }}
                >
                  {t('navContact')}
                </a>
              </li>
            </ul>

            {/* Left Decorative Horse Silhouette */}
            <div className="horse-silhouette horse-silhouette-left" aria-hidden="true">
              <img src="/icons/Vector.svg" alt="" className="horse-vector" />
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
};

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Categories.css';

interface CategoryItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: React.ReactNode;
}

export const Categories: React.FC = () => {
  const { language, direction, t } = useLanguage();

  const categories: CategoryItem[] = [
    {
      id: 'supplements',
      titleAr: 'مكملات غذائية',
      titleEn: 'Nutritional Supplements',
      descAr: 'مكملات غذائية متخصصة لدعم المناعة، تحسين الأداء، وتعزيز صحة المفاصل والعضلات للخيل.',
      descEn: 'Specialized nutritional supplements supporting immunity, peak performance, and joint health.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          stroke="#154C9D"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 2h6v2.5H9z" />
          <rect x="5.5" y="4.5" width="13" height="16.5" rx="3.5" />
          <path d="M12 9.5v6.5M8.75 12.75h6.5" />
        </svg>
      ),
    },
    {
      id: 'feeds',
      titleAr: 'أعلاف الخيل',
      titleEn: 'Horse Feeds',
      descAr: 'أعلاف متكاملة وغنية بالعناصر الغذائية الأساسية لضمان صحة الخيل، نشاطه، والحفاظ على لياقته اليومية.',
      descEn: 'Balanced, nutrient-rich feeds ensuring equine vitality, energy, and optimal fitness.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          stroke="#154C9D"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 21c3-4 6.5-8.5 12-14l2-2" />
          <path d="M9.5 14c-1.8-1.8-1.2-4.5 1-5.5s4.5 1 3.5 3.5-3 2.5-4.5 2z" />
          <path d="M13.5 10c-1.8-1.8-1.2-4.5 1-5.5s4.5 1 3.5 3.5-3 2.5-4.5 2z" />
          <path d="M13.5 17c-1.8-1.8-1.2-4.5 1-5.5s4.5 1 3.5 3.5-3 2.5-4.5 2z" />
          <path d="M5.5 18c1.8 1.8 4.5 1.2 5.5-1s-1-4.5-3.5-3.5-2.5 3-2 4.5z" />
        </svg>
      ),
    },
    {
      id: 'horseshoes',
      titleAr: 'حذوات وحدائد',
      titleEn: 'Horseshoes & Hoof Care',
      descAr: 'حذوات وحدائد متينة مصممة بعناية لتوفير الحماية، التوازن، ودعم حركة الخيل بأفضل أداء ممكن.',
      descEn: 'Durable horseshoes engineered for superior protection, balance, and natural movement.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          stroke="#154C9D"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4.5 4.5C4.5 3.7 5.5 3 6.5 3.2C10 4 14 4 17.5 3.2C18.5 3 19.5 3.7 19.5 4.5C19.5 13.5 19 20.5 12 21C5 20.5 4.5 13.5 4.5 4.5Z" />
          <path d="M8.5 4.5C8.5 11 9 16.5 12 17C15 16.5 15.5 11 15.5 4.5" />
          <circle cx="7" cy="8.5" r="0.8" fill="#154C9D" />
          <circle cx="7" cy="12.5" r="0.8" fill="#154C9D" />
          <circle cx="8" cy="16" r="0.8" fill="#154C9D" />
          <circle cx="17" cy="8.5" r="0.8" fill="#154C9D" />
          <circle cx="17" cy="12.5" r="0.8" fill="#154C9D" />
          <circle cx="16" cy="16" r="0.8" fill="#154C9D" />
        </svg>
      ),
    },
    {
      id: 'accessories',
      titleAr: 'مستلزمات وإكسسوارات',
      titleEn: 'Stable & Tack Accessories',
      descAr: 'مجموعة متنوعة من مستلزمات الخيل عالية الجودة التي تجمع بين الأناقة، الراحة، والعملية لتلبية جميع الاحتياجات اليومية.',
      descEn: 'Premium riding gear and stable accessories combining comfort, elegance, and durability.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          stroke="#154C9D"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9.5" y="2" width="5" height="3" rx="1" />
          <path d="M12 5v2" />
          <path d="M5.5 18C5 11 7 7 12 7C17 7 19 11 18.5 18" />
          <path d="M4 18h16v2.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V18z" />
          <line x1="7" y1="18.5" x2="17" y2="18.5" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="categories-section" dir={direction}>
      <div className="categories-container">
        {/* Section Header */}
        <div className="categories-header">
          <h2 className="categories-title">{t('categoriesTitle')}</h2>
          <p className="categories-subtitle">
            {t('categoriesSubtitle')}
          </p>
        </div>

        {/* 4 Category Cards in a Row */}
        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <div className="category-icon-wrapper">
                {cat.icon}
              </div>
              <h3 className="category-card-title">
                {language === 'ar' ? cat.titleAr : cat.titleEn}
              </h3>
              <p className="category-card-desc">
                {language === 'ar' ? cat.descAr : cat.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

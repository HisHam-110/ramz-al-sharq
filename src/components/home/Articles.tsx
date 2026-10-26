import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Articles.css';

export interface ArticleItem {
  id: string | number;
  tagAr: string;
  tagEn: string;
  tagType: 'tech' | 'nutrition' | 'health';
  dateAr: string;
  dateEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  authorAr: string;
  authorEn: string;
  authorRoleAr: string;
  authorRoleEn: string;
  image: string;
  content?: string;
  summary?: string;
  rawItem?: any;
}

interface ArticlesProps {
  onViewAll?: () => void;
  onSelectArticle?: (article: any) => void;
}

const API_BASE_URL = 'https://www.ramzelsharq.com/dashboard/api';

const FALLBACK_ARTICLES: ArticleItem[] = [
  {
    id: '3023',
    tagAr: 'الصحة والتغذية',
    tagEn: 'Health & Nutrition',
    tagType: 'nutrition',
    dateAr: '٢١ يوليو ٢٠٢٦',
    dateEn: 'July 21, 2026',
    titleAr: 'كيفية تجهيز الحصان لفصل الربيع ودعم صحة الجهاز الهضمي والعضلات',
    titleEn: 'Prepare Your Horse for Spring with Digestive and Muscle Support',
    descriptionAr:
      'تعرف على أفضل الطرق لتجهيز حصانك لموسم الربيع من خلال دعم صحة الجهاز الهضمي، وتنظيم التغذية، وتعزيز بنية العضلات والأداء البدني.',
    descriptionEn:
      'Learn the best practices to prepare your horse for spring with targeted digestive health, nutritional balance, and muscle stamina.',
    authorAr: 'Briony Witherow',
    authorEn: 'Briony Witherow',
    authorRoleAr: 'أخصائية تغذية خيل معتمدة',
    authorRoleEn: 'Registered Equine Nutritionist',
    image: 'https://equineproducts-ukltd.com/cdn/shop/articles/Equine_Products_-_Emma_Carmichael_Eventing-81_-_website_resize.jpg?v=1771868497&width=1750',
  },
  {
    id: '3022',
    tagAr: 'الصحة والتغذية',
    tagEn: 'Health & Nutrition',
    tagType: 'health',
    dateAr: '١٥ يوليو ٢٠٢٦',
    dateEn: 'July 15, 2026',
    titleAr: 'كيفية تعويد الخيول على عشب الربيع مع الحفاظ على صحة الجهاز الهضمي',
    titleEn: "Introducing Spring Grass: How to Support Your Horse's Digestive Health",
    descriptionAr:
      'دليل إرشادي علمي لإدخال الأعشاب الطازجة في روتين الخيل الغذائي تدريجيًا لمنع الاضطرابات المعوية والحفاظ على التوازن الهضمي.',
    descriptionEn:
      'Comprehensive veterinary guidelines on gradually transitioning horses onto spring pasture while safeguarding hindgut flora.',
    authorAr: 'Briony Witherow',
    authorEn: 'Briony Witherow',
    authorRoleAr: 'أخصائية تغذية خيل معتمدة',
    authorRoleEn: 'Registered Equine Nutritionist',
    image: 'https://equineproducts-ukltd.com/cdn/shop/articles/Horse_grass_4-16-9-rectangle_7d0e2be5-26fa-49b4-963d-c0945aa7145c.jpg?v=1776173333&width=1750',
  },
  {
    id: '3020',
    tagAr: 'سلالات الخيل',
    tagEn: 'Horse Breeds',
    tagType: 'tech',
    dateAr: '١٠ يوليو ٢٠٢٦',
    dateEn: 'July 10, 2026',
    titleAr: 'تاريخ وأصل الخيل العربي: أصالة وعراقة عبر الأجيال',
    titleEn: 'Arabian Horse History and Origin',
    descriptionAr:
      'استكشف التاريخ العريق للخيل العربي الأصيل ومميزاته الفريدة التي جعلته أيقونة للجمال والشجاعة والسرعة عبر العصور.',
    descriptionEn:
      'Explore the ancient legacy of the Purebred Arabian horse, its distinct noble traits, stamina, and enduring cultural impact.',
    authorAr: 'رمز الشرق',
    authorEn: 'Ramz Al Sharq',
    authorRoleAr: 'فريق خبراء الفروسية',
    authorRoleEn: 'Equestrian Editorial Team',
    image: 'https://alexarabians.com/wp-content/uploads/2015/07/arabian-horses-in-desert.jpg?w=715&h=508',
  },
];

function formatArabicDate(dateStr?: string): string {
  if (!dateStr) return '١٢ مايو ٢٠٢٦';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function formatEnglishDate(dateStr?: string): string {
  if (!dateStr) return 'May 12, 2026';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, '').trim();
}

export const Articles: React.FC<ArticlesProps> = ({ onViewAll, onSelectArticle }) => {
  const { language, direction, t } = useLanguage();
  const [articles, setArticles] = useState<ArticleItem[]>(FALLBACK_ARTICLES);

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/articles?lang=${language}&locale=${language}&pageSize=10`);
        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`);
        }
        const data = await response.json();
        const items = data?.data?.items || data?.items || [];

        if (items.length > 0 && isMounted) {
          const mapped: ArticleItem[] = items.map((item: any) => {
            const enTrans = item.translations?.find((tr: any) => tr.languageCode === 'en' || tr.locale === 'en') || {};
            const arTrans = item.translations?.find((tr: any) => tr.languageCode === 'ar' || tr.locale === 'ar') || {};

            const catName = item.articleCategoryName || item.categoryName || (language === 'ar' ? 'عام' : 'General');
            let bType: 'health' | 'nutrition' | 'tech' = 'tech';
            const catLower = (catName || '').toLowerCase();
            if (catLower.includes('صحة') || catLower.includes('health') || catLower.includes('بيطر')) {
              bType = 'health';
            } else if (catLower.includes('تغذية') || catLower.includes('nutrition') || catLower.includes('علف')) {
              bType = 'nutrition';
            }

            const rawSummary = item.summary || item.shortDescription || (item.content ? stripHtml(item.content).slice(0, 160) + '...' : '');
            const rawEnSummary = enTrans.summary || enTrans.shortDescription || (enTrans.content ? stripHtml(enTrans.content).slice(0, 160) + '...' : rawSummary);
            const rawArSummary = arTrans.summary || arTrans.shortDescription || (arTrans.content ? stripHtml(arTrans.content).slice(0, 160) + '...' : rawSummary);

            const titleAr = arTrans.title || item.titleAr || (language === 'ar' ? item.title : 'مقال متميز');
            const titleEn = enTrans.title || item.titleEn || (language === 'en' ? item.title : 'Featured Article');

            const authorName = item.author || (language === 'ar' ? 'رمز الشرق' : 'Ramz Al Sharq');

            return {
              id: item.id,
              tagAr: arTrans.articleCategoryName || catName,
              tagEn: enTrans.articleCategoryName || catName,
              tagType: bType,
              dateAr: formatArabicDate(item.createdAt || item.date),
              dateEn: formatEnglishDate(item.createdAt || item.date),
              titleAr,
              titleEn,
              descriptionAr: rawArSummary,
              descriptionEn: rawEnSummary,
              authorAr: arTrans.author || authorName,
              authorEn: enTrans.author || authorName,
              authorRoleAr: language === 'ar' ? 'خبير فروسية معتمد' : 'Certified Equestrian Expert',
              authorRoleEn: 'Certified Equestrian Expert',
              image: item.imageUrl || '/images/articles/article-1.png',
              content: item.content,
              summary: rawSummary,
              rawItem: item,
            };
          });

          setArticles(mapped);
        }
      } catch (err) {
        console.warn('Could not fetch home carousel articles from API, using fallback:', err);
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, [language]);

  const displayedArticles = articles.slice(0, 3);

  return (
    <section className="articles-section-modern" id="articles" dir={direction}>
      {/* Decorative ambient background glows */}
      <div className="modern-articles-glow" aria-hidden="true" />

      <div className="articles-container">
        {/* Top Header Row with Title & View All */}
        <div className="modern-articles-header">
          <div className="articles-title-box">
            <span className="articles-badge-eyebrow">
              <span className="eyebrow-sparkle">✦</span>
              {language === 'ar' ? 'المدونة والمعرفة' : 'Blog & Knowledge'}
            </span>
            <h2 className="articles-title">{t('articlesTitle')}</h2>
            <div className="articles-title-underline" aria-hidden="true" />
          </div>

          <div className="modern-header-actions">
            <a
              href="#articles"
              className="articles-view-all"
              onClick={(e) => {
                if (onViewAll) {
                  e.preventDefault();
                  onViewAll();
                }
              }}
            >
              <span>{language === 'ar' ? 'عرض جميع المقالات' : 'View All Articles'}</span>
              <span className="view-all-arrow-wrap">
                {direction === 'rtl' ? (
                  <svg
                    className="view-all-arrow"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                ) : (
                  <svg
                    className="view-all-arrow"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </span>
            </a>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="modern-articles-grid">
          {displayedArticles.map((item, idx) => (
            <article
              key={item.id || idx}
              className="modern-article-card"
              onClick={() => {
                if (onSelectArticle) {
                  onSelectArticle({
                    id: item.id,
                    title: language === 'ar' ? item.titleAr : item.titleEn,
                    titleAr: item.titleAr,
                    titleEn: item.titleEn,
                    category: language === 'ar' ? item.tagAr : item.tagEn,
                    badgeLabel: language === 'ar' ? item.tagAr : item.tagEn,
                    badgeType: item.tagType,
                    image: item.image,
                    author: {
                      name: language === 'ar' ? item.authorAr : item.authorEn,
                      role: language === 'ar' ? item.authorRoleAr : item.authorRoleEn,
                    },
                    excerpt: language === 'ar' ? item.descriptionAr : item.descriptionEn,
                    content: item.content,
                    timeDate: language === 'ar' ? item.dateAr : item.dateEn,
                  });
                } else if (onViewAll) {
                  onViewAll();
                }
              }}
            >
              {/* Card Thumbnail Area */}
              <div className="modern-card-thumb-wrap">
                <img
                  src={item.image}
                  alt={language === 'ar' ? item.titleAr : item.titleEn}
                  className="modern-card-img"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/articles/article-1.png';
                  }}
                />
                <div className="modern-thumb-gradient" aria-hidden="true" />

                {/* Floating Category Tag */}
                <span className={`modern-card-category cat-${item.tagType}`}>
                  <span className="cat-dot" />
                  {language === 'ar' ? item.tagAr : item.tagEn}
                </span>

                {/* Reading Time Badge */}
                <div className="modern-read-time-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{language === 'ar' ? '٤ دقائق قراءة' : '4 min read'}</span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="modern-card-body">
                {/* Date Row */}
                <div className="modern-date-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>{language === 'ar' ? item.dateAr : item.dateEn}</span>
                </div>

                {/* Title */}
                <h3 className="modern-card-title">
                  {language === 'ar' ? item.titleAr : item.titleEn}
                </h3>

                {/* Excerpt */}
                <p className="modern-card-excerpt">
                  {language === 'ar' ? item.descriptionAr : item.descriptionEn}
                </p>

                {/* Card Footer: Author + Read Button */}
                <div className="modern-card-footer">
                  <div className="modern-author-box">
                    <div className="modern-author-avatar">
                      <span>
                        {(language === 'ar' ? item.authorAr : item.authorEn).slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="modern-author-info">
                      <div className="modern-author-name-row">
                        <span className="modern-author-name" title={language === 'ar' ? item.authorAr : item.authorEn}>
                          {language === 'ar' ? item.authorAr : item.authorEn}
                        </span>
                        <svg
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="#154c9d"
                          aria-label="Verified"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.6l-3.9-3.9 1.41-1.41 2.49 2.49 6.09-6.09 1.41 1.41-7.5 7.5z" />
                        </svg>
                      </div>
                      <span className="modern-author-role">
                        {language === 'ar' ? item.authorRoleAr : item.authorRoleEn}
                      </span>
                    </div>
                  </div>

                  {/* Read CTA Button */}
                  <div className="modern-card-read-cta">
                    <span className="modern-cta-text">{t('readMore')}</span>
                    <span className="modern-cta-circle">
                      {direction === 'rtl' ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};



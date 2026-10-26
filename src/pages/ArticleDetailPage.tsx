import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  Maximize2,
  X as CloseIcon,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Eye,
  Activity,
  Award,
  Stethoscope,
  Droplets,
  BookOpen,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Product } from './ProductsPage';
import './ArticleDetailPage.css';

const API_BASE_URL = 'https://www.ramzelsharq.com/dashboard/api';

export interface ArticleData {
  id: string | number;
  title: string;
  category: string;
  badgeLabel: string;
  badgeType?: string;
  timeDate?: string;
  image: string;
  author?: {
    name: string;
    role?: string;
    avatar?: string;
  };
  content?: string;
  excerpt?: string;
}

interface ArticleDetailPageProps {
  article?: ArticleData | null;
  onBackToArticles?: () => void;
  onBackToHome?: () => void;
  onSelectArticle?: (article: ArticleData) => void;
  onSelectProduct?: (product: Product) => void;
  onViewAllProducts?: () => void;
}

// Clean helper to parse and structure date/time, eliminating BiDi number scrambled rendering
export interface ParsedArticleDateTime {
  date: string;
  time: string;
  period: string;
}

export const parseArticleDateTime = (rawTimeDate?: string, language: string = 'ar'): ParsedArticleDateTime => {
  const defaultDate = language === 'ar' ? '9 مارس 2026' : 'March 9, 2026';
  const defaultTime = '10:32';
  const defaultPeriod = language === 'ar' ? 'صباحاً' : 'AM';

  if (!rawTimeDate) {
    return { date: defaultDate, time: defaultTime, period: defaultPeriod };
  }

  // Strip emojis like 🕒 ⏰ ⏱️
  let text = rawTimeDate.replace(/[🕒⏰⏱️]/g, ' ').trim();

  // Extract period
  let period = defaultPeriod;
  if (/pm|مساءً|مساء/i.test(text)) {
    period = language === 'ar' ? 'مساءً' : 'PM';
    text = text.replace(/pm|مساءً|مساء/gi, ' ');
  } else if (/am|صباحاً|صباح/i.test(text)) {
    period = language === 'ar' ? 'صباحاً' : 'AM';
    text = text.replace(/am|صباحاً|صباح/gi, ' ');
  } else if (/\bم\b/.test(text)) {
    period = language === 'ar' ? 'مساءً' : 'PM';
    text = text.replace(/\bم\b/g, ' ');
  } else if (/\bص\b/.test(text)) {
    period = language === 'ar' ? 'صباحاً' : 'AM';
    text = text.replace(/\bص\b/g, ' ');
  }

  // Extract time HH:mm
  let time = defaultTime;
  const timeMatch = text.match(/\b(\d{1,2}:\d{2}(?::\d{2})?)\b/);
  if (timeMatch) {
    time = timeMatch[1];
    text = text.replace(timeMatch[0], ' ');
  }

  // Clean date part
  let date = text.replace(/[•\-\/|]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!date) {
    date = defaultDate;
  }

  return { date, time, period };
};

// Default Hoof Care Article matching the user's screenshot exactly
export const DEFAULT_HOOF_CARE_ARTICLE_AR: ArticleData = {
  id: 'hoof-care-essentials',
  title: 'أساسيات العناية بحوافر الخيل للحفاظ على صحة الحصان',
  category: 'الصحة',
  badgeLabel: 'الصحة',
  badgeType: 'health',
  timeDate: '9 مارس 2026 • 10:32 صباحاً',
  image: '/images/articles/saudi-cup-hoof-care.jpg',
  author: {
    name: 'أ.م.د. عمرو بكر',
    role: 'استشاري جراحة ورعاية خيول',
  },
  excerpt: 'تعتبر حوافر الخيل من أهم أجزاء جسم الحصان، فهي المسؤولة عن حمل وزن الحصان بالكامل أثناء الحركة والجري.',
};

export const DEFAULT_HOOF_CARE_ARTICLE_EN: ArticleData = {
  id: 'hoof-care-essentials',
  title: 'Essential Horse Hoof Care for Peak Health & Athletic Longevity',
  category: 'Health',
  badgeLabel: 'Health',
  badgeType: 'health',
  timeDate: 'March 9, 2026 • 10:32 AM',
  image: '/images/articles/saudi-cup-hoof-care.jpg',
  author: {
    name: 'Dr. Amr Bakr',
    role: 'Equine Podiatry & Surgery Consultant',
  },
  excerpt: 'Equine hooves bear the horse full body weight across every stride, making regular podiatric care indispensable for soundness.',
};

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onBackToArticles,
  onBackToHome,
  onSelectArticle,
  onSelectProduct,
  onViewAllProducts,
}) => {
  const { language, direction } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<ArticleData[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article?.id]);

  const activeArticle = article || (language === 'ar' ? DEFAULT_HOOF_CARE_ARTICLE_AR : DEFAULT_HOOF_CARE_ARTICLE_EN);

  // Fetch real related articles dynamically from the API & cache
  useEffect(() => {
    let isMounted = true;

    const loadRelated = async () => {
      // 1. Try reading from sessionStorage cache first for instantaneous 0ms display
      try {
        const cachedStr = sessionStorage.getItem(`rasco_articles_${language}`);
        if (cachedStr) {
          const items = JSON.parse(cachedStr);
          if (Array.isArray(items) && items.length > 0) {
            const mapped = items
              .filter((it: any) => String(it.id) !== String(activeArticle.id))
              .slice(0, 3)
              .map((it: any) => ({
                id: it.id,
                title: it.title,
                category: it.category || (language === 'ar' ? 'الصحة' : 'Health'),
                badgeLabel: it.badgeLabel || it.category || (language === 'ar' ? 'الصحة' : 'Health'),
                badgeType: it.badgeType || 'health',
                timeDate: it.date ? `${it.date} • 10:32 ${language === 'ar' ? 'صباحاً' : 'AM'}` : (language === 'ar' ? '12 مارس 2026 • 10:32 صباحاً' : 'March 12, 2026 • 10:32 AM'),
                image: it.imageUrl || it.image || '/images/articles/article-1.png',
                author: {
                  name: it.author?.name || it.author || (language === 'ar' ? 'رمز الشرق' : 'Rasco'),
                },
                excerpt: it.excerpt || it.summary || '',
                content: it.content,
              }));

            if (isMounted && mapped.length > 0) {
              setRelatedArticles(mapped);
            }
          }
        }
      } catch (_e) {
        // ignore storage errors
      }

      // 2. Fetch fresh live articles from API
      try {
        const res = await fetch(`${API_BASE_URL}/articles?lang=${language}&locale=${language}&pageSize=15`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.success && data.data && Array.isArray(data.data.items)) {
            const apiItems: ArticleData[] = data.data.items
              .filter((it: any) => String(it.id) !== String(activeArticle.id))
              .slice(0, 3)
              .map((it: any) => {
                const catName = it.articleCategoryName || it.categoryName || (language === 'ar' ? 'الصحة والتغذية' : 'Health & Nutrition');
                return {
                  id: it.id,
                  title: it.title,
                  category: catName,
                  badgeLabel: catName,
                  badgeType: 'health',
                  timeDate: it.date ? `${new Date(it.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')} • 10:32 ${language === 'ar' ? 'صباحاً' : 'AM'}` : (language === 'ar' ? '12 مارس 2026 • 10:32 صباحاً' : 'March 12, 2026 • 10:32 AM'),
                  image: it.imageUrl || '/images/articles/article-1.png',
                  author: {
                    name: it.author || (language === 'ar' ? 'رمز الشرق' : 'Rasco'),
                  },
                  excerpt: it.summary || (it.content ? it.content.replace(/<[^>]*>/g, '').slice(0, 115) + '...' : ''),
                  content: it.content,
                };
              });

            if (isMounted && apiItems.length > 0) {
              setRelatedArticles(apiItems);
            }
          }
        }
      } catch (err) {
        console.warn('Could not load related articles from API:', err);
      }
    };

    loadRelated();

    return () => {
      isMounted = false;
    };
  }, [language, activeArticle.id]);

  // Social sharing action
  const handleShare = (platform: 'whatsapp' | 'x' | 'facebook' | 'copy') => {
    const url = window.location.href;
    const text = activeArticle.title;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'x':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }
        break;
    }
  };

  // Related products (matching the screenshot cards)
  const relatedProducts: Product[] = [
    {
      id: 'breeze-up',
      name: 'Anti-Sweat & Winter Rugs',
      englishName: 'Anti-Sweat & Winter Rugs',
      description: language === 'ar' ? 'غطاء واقي ممتاز ومريح للحصان يوفر الدفء والراحة القصوى بعد التدريب.' : 'Premium protective fleece blanket providing comfort and thermal balance.',
      imageUrl: '/images/products/breeze-up.jpg',
      categoryId: 10,
      categoryName: language === 'ar' ? 'مستلزمات الخيل' : 'Horse Equipment',
      agentName: 'EQUINE PRODUCTS',
      isBestSeller: true,
    },
    {
      id: 'freedom-cubes-1',
      name: 'Freedom Cubes',
      englishName: 'Freedom Cubes',
      description: language === 'ar' ? 'مكعبات أعلاف عالية الطاقة والغنية بالألياف والمعادن لخيول السباق والقفز.' : 'High-energy fiber-rich feed cubes for high-performance horses.',
      imageUrl: '/images/products/freedom-cubes.jpg',
      categoryId: 30,
      categoryName: language === 'ar' ? 'الأعلاف والمكملات' : 'Feed & Supplements',
      agentName: 'GAIN',
      isBestSeller: true,
    },
    {
      id: 'optima-bcaa',
      name: 'Optima BCAA Powder',
      englishName: 'Optima BCAA Powder',
      description: language === 'ar' ? 'مكمل أحماض أمينية سريع الامتصاص لتسريع الاستشفاء العضلي وتقوية الأوتار.' : 'Fast-absorbing branched chain amino acids for muscular recovery.',
      imageUrl: '/images/products/optima-bcaa.jpg',
      categoryId: 30,
      categoryName: language === 'ar' ? 'الأعلاف والمكملات' : 'Feed & Supplements',
      agentName: 'EQUINE PRODUCTS',
      isBestSeller: true,
    },
    {
      id: 'freedom-cubes-2',
      name: 'Freedom Cubes',
      englishName: 'Freedom Cubes',
      description: language === 'ar' ? 'تركيبة غذائية فريدة لدعم الجهاز الهضمي والنشاط العضلي المتوازن.' : 'Specialized formulation supporting healthy digestion and stamina.',
      imageUrl: '/images/products/freedom-cubes.jpg',
      categoryId: 30,
      categoryName: language === 'ar' ? 'الأعلاف والمكملات' : 'Feed & Supplements',
      agentName: 'GAIN',
      isBestSeller: true,
    },
  ];

  return (
    <div className="article-detail-page" dir={direction}>
      {/* 1. Breadcrumb Navigation */}
      <nav className="article-breadcrumb-nav" aria-label="Breadcrumb">
        <div className="article-container">
          <ol className="article-breadcrumbs">
            <li>
              <button 
                type="button" 
                onClick={onBackToHome}
                className="breadcrumb-link"
              >
                {language === 'ar' ? 'الرئيسية' : 'Home'}
              </button>
            </li>
            <li className="breadcrumb-separator" aria-hidden="true">
              {direction === 'rtl' ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
            </li>
            <li>
              <button 
                type="button" 
                onClick={onBackToArticles}
                className="breadcrumb-link"
              >
                {language === 'ar' ? 'المقالات' : 'Articles'}
              </button>
            </li>
            <li className="breadcrumb-separator" aria-hidden="true">
              {direction === 'rtl' ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
            </li>
            <li className="breadcrumb-current" aria-current="page">
              {activeArticle.title}
            </li>
          </ol>
        </div>
      </nav>

      <main className="article-main-content">
        <div className="article-container">
          
          {/* 2. Top Centered Header */}
          <header className="article-hero-header">
            <h1 className="article-headline">
              {activeArticle.title}
            </h1>

            <div className="article-meta-row">
              {(() => {
                const { date, time, period } = parseArticleDateTime(activeArticle.timeDate, language);
                return (
                  <div
                    className="article-meta-datetime"
                    role="group"
                    aria-label={language === 'ar' ? 'تاريخ وتوقيت النشر' : 'Publication Date and Time'}
                  >
                    <Clock size={16} className="article-meta-clock-icon" aria-hidden="true" />
                    <span className="article-meta-date">{date}</span>
                    <span className="article-meta-dot" aria-hidden="true">•</span>
                    <span className="article-meta-time">
                      <span className="meta-time-digits" dir="ltr">{time}</span>
                      <span className="meta-time-period">{period}</span>
                    </span>
                  </div>
                );
              })()}
            </div>

            <div className="article-badge-wrap">
              <span className="article-category-pill">
                {activeArticle.badgeLabel || activeArticle.category || (language === 'ar' ? 'الصحة' : 'Health')}
              </span>
            </div>
          </header>

          {/* 3. Hero Featured Image (Clean, sharp, no blur) */}
          <div 
            className="article-featured-image-box"
            onClick={() => setIsLightboxOpen(true)}
            role="button"
            tabIndex={0}
            title={language === 'ar' ? 'انقر لتكبير الصورة بالحجم الكامل' : 'Click to zoom image full size'}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setIsLightboxOpen(true);
            }}
          >
            <img 
              src={activeArticle.image || '/images/articles/saudi-cup-hoof-care.jpg'} 
              alt={activeArticle.title}
              className="article-featured-img"
              loading="eager"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/articles/saudi-cup-hoof-care.jpg';
              }}
            />

            {/* Zoom hint badge */}
            <div className="article-img-details-badge">
              <Maximize2 size={13} />
              <span>{language === 'ar' ? 'تكبير الصورة' : 'Zoom Image'}</span>
            </div>
          </div>

          {/* 4. Article Body Content */}
          <article className="article-body-wrapper">
            {activeArticle.content ? (
              <div 
                className="article-html-body"
                dangerouslySetInnerHTML={{ __html: activeArticle.content }}
              />
            ) : (
              <div className="article-structured-body">
                {language === 'ar' ? (
                  <>
                    {/* المحور الأول: المقدمة */}
                    <section className="article-section">
                      <div className="section-header-tag">
                        <BookOpen size={15} />
                        <span>نظرة تمهيدية</span>
                      </div>
                      <h2 className="article-section-heading">المقدمة</h2>
                      
                      <div className="article-lead-box">
                        <p className="article-lead-text">
                          تعتبر حوافر الخيل من أهم الأعضاء الحيوية في بنية الحصان التشريحية، فهي المسؤولة عن حمل كامل وزن الجسم وامتصاص الصدمات الهائلة الناتجة عن الجري والقفز.
                        </p>
                      </div>

                      <p className="article-paragraph">
                        تتكون الحوافر من نسيج قرني معقد وديناميكي يحتاج إلى عناية بيطرية مستمرة وتغذية متوازنة للحفاظ على مرونته وصلابته وحمايته من التفتت.
                      </p>

                      <div className="article-callout-warning">
                        <AlertCircle size={22} className="warning-icon" />
                        <div>
                          <h4 className="warning-title">تنبيه هام للفرسان</h4>
                          <p className="warning-desc">
                            إهمال العناية اليومية بالحوافر قد يؤدي إلى مضاعفات بالغة الخطورة مثل التشققات العميقة، تعفن النسر، أو التهاب الصفائح الحساسة (Laminitis)، مما يهدد مسيرة الحصان الرياضية.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* المحور الثاني: أهمية العناية بالحوافر */}
                    <section className="article-section">
                      <div className="section-header-tag">
                        <Activity size={15} />
                        <span>الأثر الصحي والبدني</span>
                      </div>
                      <h2 className="article-section-heading">لماذا تعتبر العناية بالحوافر مهمة؟</h2>
                      <p className="article-paragraph">
                        الحوافر السليمة تمنح الحصان ثباتاً مثالياً وتوازناً ديناميكياً يحمي المفاصل والأوتار العلوية من الإجهاد الزائد أثناء السباقات والتدريب المكثف.
                      </p>

                      <div className="article-benefits-grid">
                        <div className="benefit-card">
                          <div className="benefit-icon-wrap">
                            <CheckCircle2 size={20} />
                          </div>
                          <div className="benefit-content">
                            <h4 className="benefit-title">استقامة التوازن الحركي</h4>
                            <p className="benefit-desc">الحفاظ على التماثل والتوزيع المثالي للوزن أثناء الوثب والركض السريع.</p>
                          </div>
                        </div>

                        <div className="benefit-card">
                          <div className="benefit-icon-wrap">
                            <ShieldCheck size={20} />
                          </div>
                          <div className="benefit-content">
                            <h4 className="benefit-title">درع واقٍ ضد الإصابات</h4>
                            <p className="benefit-desc">تقليل مخاطر التشققات الجدارية والالتهابات البكتيرية المزمنة في باطن القدم.</p>
                          </div>
                        </div>

                        <div className="benefit-card">
                          <div className="benefit-icon-wrap">
                            <Sparkles size={20} />
                          </div>
                          <div className="benefit-content">
                            <h4 className="benefit-title">أعلى معدلات الأداء الرياضي</h4>
                            <p className="benefit-desc">تعزيز مرونة الخطوة وتقليل المجهود العضلي للحصان أثناء المنافسات الدولية.</p>
                          </div>
                        </div>

                        <div className="benefit-card">
                          <div className="benefit-icon-wrap">
                            <Award size={20} />
                          </div>
                          <div className="benefit-content">
                            <h4 className="benefit-title">إطالة العمر الافتراضي للحافر</h4>
                            <p className="benefit-desc">حماية النسيج الكيراتيني وتقوية جدار الحافر ضد عوامل التآكل والاحتكاك.</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* المحور الثالث: خطوات العناية اليومية */}
                    <section className="article-section">
                      <div className="section-header-tag highlight-tag">
                        <Sparkles size={15} />
                        <span>الروتين العملي اليومي</span>
                      </div>
                      <h2 className="article-section-heading">خطوات العناية اليومية بحوافر الخيل</h2>
                      <p className="article-paragraph">
                        العناية المنتظمة يجب أن تكون طقساً يومياً ثابتاً قبل وبعد كل جلسة تدريب، باتباع الخطوات الثلاث المتتالية:
                      </p>

                      <div className="article-steps-grid">
                        {/* خطوة 1 */}
                        <div className="step-process-card">
                          <div className="step-card-header">
                            <span className="step-badge">خطوة 01</span>
                            <div className="step-icon-circle">
                              <Sparkles size={20} />
                            </div>
                          </div>
                          <h3 className="step-card-title">تنظيف الحوافر (Hoof Picking)</h3>
                          <p className="step-card-desc">
                            استخدام مِعكاف الحوافر المتخصص بلطف لإزالة بقايا الطين والأحجار الصغيرة المضغوطة حول النسر (Frog) والأخاديد الجانبية لمنع ضغطها على الأنسجة الحساسة.
                          </p>
                        </div>

                        {/* خطوة 2 */}
                        <div className="step-process-card">
                          <div className="step-card-header">
                            <span className="step-badge">خطوة 02</span>
                            <div className="step-icon-circle">
                              <Eye size={20} />
                            </div>
                          </div>
                          <h3 className="step-card-title">الفحص البصري الدقيق</h3>
                          <p className="step-card-desc">
                            معاينة دقيقة لباطن القدم والخط الأبيض والحافة التاجية، للتأكد من عدم وجود روائح غير معتادة، أو شقوق طولية، أو مؤشرات حرارة غير طبيعية في الكبسولة.
                          </p>
                        </div>

                        {/* خطوة 3 */}
                        <div className="step-process-card">
                          <div className="step-card-header">
                            <span className="step-badge">خطوة 03</span>
                            <div className="step-icon-circle">
                              <Droplets size={20} />
                            </div>
                          </div>
                          <h3 className="step-card-title">الحفاظ على الجفاف والتهوية</h3>
                          <p className="step-card-desc">
                            الرطوبة الزائدة والفرش المبلل هي العدو الأول للحافر. احرص على نظافة وجفاف الإسطبل، واستخدام زيوت الترطيب المتوازنة في الأجواء الحارة والجافة.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* المحور الرابع: دور البيطار المتخصص */}
                    <section className="article-section">
                      <div className="article-expert-card">
                        <div className="expert-header-row">
                          <div className="expert-badge">
                            <Stethoscope size={18} />
                            <span>توجيهات البيطار المتخصص</span>
                          </div>
                          <span className="expert-interval-pill">زيارة دورية كل 6 - 8 أسابيع</span>
                        </div>

                        <h3 className="expert-card-heading">دور البيطار في العناية بالحوافر</h3>
                        <p className="expert-card-intro">
                          البيطار المحترف هو الركن الأساسي في الحفاظ على التوازن الميكانيكي للحصان. التقليم المنتظم ليس مجرد تقصير للحافر بل إعادة ضبط للزوايا الهندسية الحركية:
                        </p>

                        <div className="expert-points-list">
                          <div className="expert-point-item">
                            <CheckCircle2 size={18} className="expert-check" />
                            <span>الحفاظ على الزاوية الطبيعية وتماثل المحور بين الحافر والمفصل</span>
                          </div>
                          <div className="expert-point-item">
                            <CheckCircle2 size={18} className="expert-check" />
                            <span>منع التشققات والانحرافات الجانبية وتآكل جدار الحافر غير المتساوي</span>
                          </div>
                          <div className="expert-point-item">
                            <CheckCircle2 size={18} className="expert-check" />
                            <span>تحسين مرونة الحركة وامتصاص الصدمات لحماية أوتار القوائم</span>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* المحور الخامس: استخدام حدوات الخيل */}
                    <section className="article-section">
                      <div className="article-shoes-card">
                        <div className="shoes-icon-wrap">
                          <Award size={26} />
                        </div>
                        <div className="shoes-content">
                          <h3 className="shoes-title">استخدام حدوات الخيل المخصصة</h3>
                          <p className="shoes-desc">
                            في حالات المنافسات الرياضية والعمل على الأرضيات الصلبة، توفر الحدوات حماية لا غنى عنها لجدار الحافر. تتنوع مواصفات الحدوات (ألمنيوم للسرعة، حديد للمتانة، حدوات علاجية لتقويم الاتزان) بحسب استشارة البيطار واستخدام الحصان.
                          </p>
                        </div>
                      </div>
                    </section>
                  </>
                ) : (
                  <>
                    {/* Section 1: Introduction */}
                    <section className="article-section">
                      <div className="section-header-tag">
                        <BookOpen size={15} />
                        <span>Overview</span>
                      </div>
                      <h2 className="article-section-heading">Introduction</h2>
                      
                      <div className="article-lead-box">
                        <p className="article-lead-text">
                          Equine hooves are among the most pivotal biological structures in the horse anatomy, bearing full body mass and dissipating immense ground reaction forces.
                        </p>
                      </div>

                      <p className="article-paragraph">
                        Consistent podiatric care combined with tailored equine nutrition preserves natural hoof elasticity and structural soundness.
                      </p>

                      <div className="article-callout-warning">
                        <AlertCircle size={22} className="warning-icon" />
                        <div>
                          <h4 className="warning-title">Important Veterinary Notice</h4>
                          <p className="warning-desc">
                            Neglecting hoof hygiene can trigger severe conditions including deep wall fissures, thrush, and laminitis, severely impairing athletic longevity.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Section 2: Why Hoof Care is Paramount */}
                    <section className="article-section">
                      <div className="section-header-tag">
                        <Activity size={15} />
                        <span>Biomechanical Impact</span>
                      </div>
                      <h2 className="article-section-heading">Why is Hoof Care Paramount?</h2>
                      
                      <div className="article-benefits-grid">
                        <div className="benefit-card">
                          <div className="benefit-icon-wrap">
                            <CheckCircle2 size={20} />
                          </div>
                          <div className="benefit-content">
                            <h4 className="benefit-title">Biomechanical Balance</h4>
                            <p className="benefit-desc">Ensures symmetry and optimal weight distribution across stride transitions.</p>
                          </div>
                        </div>

                        <div className="benefit-card">
                          <div className="benefit-icon-wrap">
                            <ShieldCheck size={20} />
                          </div>
                          <div className="benefit-content">
                            <h4 className="benefit-title">Injury Prevention</h4>
                            <p className="benefit-desc">Protects against chronic hoof capsule cracks, abscesses, and infections.</p>
                          </div>
                        </div>

                        <div className="benefit-card">
                          <div className="benefit-icon-wrap">
                            <Sparkles size={20} />
                          </div>
                          <div className="benefit-content">
                            <h4 className="benefit-title">Peak Athletic Performance</h4>
                            <p className="benefit-desc">Maximizes stamina, stride efficiency, and agility in high-stakes competition.</p>
                          </div>
                        </div>

                        <div className="benefit-card">
                          <div className="benefit-icon-wrap">
                            <Award size={20} />
                          </div>
                          <div className="benefit-content">
                            <h4 className="benefit-title">Hoof Wall Longevity</h4>
                            <p className="benefit-desc">Reinforces keratin horn density and natural resistance against abrasion.</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 3: Daily Care Steps */}
                    <section className="article-section">
                      <div className="section-header-tag highlight-tag">
                        <Sparkles size={15} />
                        <span>Daily Stable Protocol</span>
                      </div>
                      <h2 className="article-section-heading">Daily Hoof Care Protocol</h2>

                      <div className="article-steps-grid">
                        <div className="step-process-card">
                          <div className="step-card-header">
                            <span className="step-badge">Step 01</span>
                            <div className="step-icon-circle">
                              <Sparkles size={20} />
                            </div>
                          </div>
                          <h3 className="step-card-title">Hoof Picking</h3>
                          <p className="step-card-desc">
                            Gently clear foreign debris, packed mud, and small stones from the collateral sulci and frog before and after every training session.
                          </p>
                        </div>

                        <div className="step-process-card">
                          <div className="step-card-header">
                            <span className="step-badge">Step 02</span>
                            <div className="step-icon-circle">
                              <Eye size={20} />
                            </div>
                          </div>
                          <h3 className="step-card-title">Visual Inspection</h3>
                          <p className="step-card-desc">
                            Inspect the sole, white line, and coronary band for signs of heat, foul odor, discharge, or structural micro-cracks.
                          </p>
                        </div>

                        <div className="step-process-card">
                          <div className="step-card-header">
                            <span className="step-badge">Step 03</span>
                            <div className="step-icon-circle">
                              <Droplets size={20} />
                            </div>
                          </div>
                          <h3 className="step-card-title">Moisture Management</h3>
                          <p className="step-card-desc">
                            Excess moisture weakens the horn capsule. Maintain clean, dry bedding with balanced aeration and quality conditioning balms.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Section 4: The Farrier's Role */}
                    <section className="article-section">
                      <div className="article-expert-card">
                        <div className="expert-header-row">
                          <div className="expert-badge">
                            <Stethoscope size={18} />
                            <span>Professional Guidance</span>
                          </div>
                          <span className="expert-interval-pill">Every 6 - 8 Weeks</span>
                        </div>

                        <h3 className="expert-card-heading">The Farrier's Essential Role</h3>
                        <p className="expert-card-intro">
                          A certified farrier ensures anatomical breakover balance, precision trimming, and tailored shoeing:
                        </p>

                        <div className="expert-points-list">
                          <div className="expert-point-item">
                            <CheckCircle2 size={18} className="expert-check" />
                            <span>Preserving correct dorsal hoof-pastern axis alignment</span>
                          </div>
                          <div className="expert-point-item">
                            <CheckCircle2 size={18} className="expert-check" />
                            <span>Preventing flares, underrun heels, and unbalanced wall growth</span>
                          </div>
                          <div className="expert-point-item">
                            <CheckCircle2 size={18} className="expert-check" />
                            <span>Optimizing fluid movement and tendon shock absorption</span>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 5: Horseshoes */}
                    <section className="article-section">
                      <div className="article-shoes-card">
                        <div className="shoes-icon-wrap">
                          <Award size={26} />
                        </div>
                        <div className="shoes-content">
                          <h3 className="shoes-title">Shoeing & Protective Equipment</h3>
                          <p className="shoes-desc">
                            Tailored aluminum or steel shoes protect against ground abrasion and provide essential traction depending on surface and workload.
                          </p>
                        </div>
                      </div>
                    </section>
                  </>
                )}
              </div>
            )}

            {/* 5. Share Row (مشاركة المقال) */}
            <div className="article-share-section">
              <div className="share-section-title-wrap">
                <span className="share-section-title">
                  {language === 'ar' ? 'مشاركة المقال' : 'Share Article'}
                </span>
              </div>
              <div className="share-buttons-row">
                {/* 1. WhatsApp */}
                <button
                  type="button"
                  className="share-btn share-btn-wa"
                  onClick={() => handleShare('whatsapp')}
                  title={language === 'ar' ? 'مشاركة عبر واتساب' : 'Share on WhatsApp'}
                  aria-label="Share on WhatsApp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 2C6.495 2 2 6.494 2 12.03c0 1.942.553 3.754 1.512 5.295L2.14 22l4.825-1.347a9.988 9.988 0 0 0 5.066 1.377h.004c5.536 0 10.03-4.495 10.03-10.03 0-2.68-1.043-5.197-2.937-7.091A9.97 9.97 0 0 0 12.031 2zm5.834 14.184c-.244.686-1.42 1.319-1.956 1.365-.494.043-.984.14-3.21-.782-2.735-1.13-4.5-3.89-4.636-4.07-.137-.18-1.109-1.474-1.109-2.812 0-1.338.7-1.996.95-2.268.25-.272.545-.34.726-.34.182 0 .363.003.522.011.169.008.396-.064.62.474.226.545.772 1.884.84 2.02.068.136.113.295.023.475-.091.18-.136.295-.272.454-.136.159-.286.355-.408.477-.136.136-.277.284-.119.555.159.272.704 1.159 1.51 1.876 1.037.923 1.91 1.209 2.182 1.345.272.136.431.114.59-.068.16-.182.682-.795.864-1.068.181-.272.363-.227.613-.136.25.091 1.589.749 1.862.885.272.136.454.204.522.318.068.113.068.658-.176 1.344z"/>
                  </svg>
                </button>

                {/* 2. Twitter / X */}
                <button
                  type="button"
                  className="share-btn share-btn-x"
                  onClick={() => handleShare('x')}
                  title={language === 'ar' ? 'مشاركة عبر منصة X' : 'Share on X'}
                  aria-label="Share on X"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>

                {/* 3. Facebook */}
                <button
                  type="button"
                  className="share-btn share-btn-fb"
                  onClick={() => handleShare('facebook')}
                  title={language === 'ar' ? 'مشاركة عبر فيسبوك' : 'Share on Facebook'}
                  aria-label="Share on Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </button>

                {/* 4. Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn share-btn-insta"
                  title={language === 'ar' ? 'انستغرام' : 'Instagram'}
                  aria-label="Visit Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* 5. Copy Link */}
                <button
                  type="button"
                  className="share-btn share-btn-copy"
                  onClick={() => handleShare('copy')}
                  title={copied ? (language === 'ar' ? 'تم نسخ الرابط!' : 'Copied!') : (language === 'ar' ? 'نسخ الرابط' : 'Copy Link')}
                  aria-label="Copy link"
                >
                  {copied ? <Check size={18} className="text-white" /> : <Share2 size={18} />}
                </button>
              </div>
            </div>

          </article>

          {/* 6. Related Articles Section ("مقالات مشابهة") */}
          <section className="article-related-section">
            <h2 className="related-section-title">
              {language === 'ar' ? 'مقالات مشابهة' : 'Related Articles'}
            </h2>

            <div className="related-articles-grid">
              {relatedArticles.map((relItem) => (
                <div 
                  key={relItem.id}
                  className="related-article-card"
                  onClick={() => {
                    if (onSelectArticle) {
                      onSelectArticle(relItem);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && onSelectArticle) onSelectArticle(relItem);
                  }}
                >
                  <div className="related-card-image-box">
                    <img 
                      src={relItem.image || '/images/articles/article-1.png'} 
                      alt={relItem.title} 
                      className="related-card-img"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/articles/article-1.png';
                      }}
                    />
                    <span className="related-card-badge">
                      {relItem.badgeLabel}
                    </span>
                  </div>

                  <div className="related-card-body">
                    <h3 className="related-card-title">{relItem.title}</h3>
                    <p className="related-card-excerpt">{relItem.excerpt}</p>

                    <div className="related-card-footer">
                      <span className="related-author-name">{relItem.author?.name}</span>
                      <div className="related-author-avatar" aria-hidden="true">
                        <span className="avatar-dot" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Related Products Section ("منتجات مشابهة") */}
          <section className="article-products-section">
            <div className="products-section-header">
              <h2 className="related-products-title">
                {language === 'ar' ? 'منتجات مشابهة' : 'Related Products'}
              </h2>
              <button 
                type="button" 
                className="view-more-link"
                onClick={onViewAllProducts}
              >
                <span>{language === 'ar' ? 'عرض المزيد' : 'View More'}</span>
              </button>
            </div>

            <div className="related-products-grid">
              {relatedProducts.map((prod) => (
                <div key={prod.id} className="related-product-card">
                  <div className="product-card-img-wrap">
                    <img 
                      src={prod.imageUrl} 
                      alt={language === 'ar' ? prod.name : prod.englishName} 
                      className="product-card-thumb"
                      loading="lazy"
                    />
                  </div>

                  <div className="product-card-info">
                    <h3 className="product-card-name">
                      {language === 'ar' ? prod.name : prod.englishName}
                    </h3>
                    <p className="product-card-desc">
                      {prod.description}
                    </p>

                    <button
                      type="button"
                      className="product-detail-cta"
                      onClick={() => {
                        if (onSelectProduct) {
                          onSelectProduct(prod);
                        }
                      }}
                    >
                      {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Lightbox modal for full-screen high-resolution viewing */}
      {isLightboxOpen && (
        <div 
          className="article-lightbox-modal"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button 
            type="button" 
            className="lightbox-close-btn"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close"
          >
            <CloseIcon size={26} />
          </button>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <img 
              src={activeArticle.image || '/images/articles/saudi-cup-hoof-care.jpg'} 
              alt={activeArticle.title}
              className="lightbox-img"
            />
          </div>
        </div>
      )}
    </div>
  );
};

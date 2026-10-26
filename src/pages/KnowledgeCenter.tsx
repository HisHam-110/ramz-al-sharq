import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Loader2, X, Clock, Calendar, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import tackCardImg from '../assets/images/unsplash_SvMPccIOyxg.png';
import './KnowledgeCenter.css';

export interface ArticleItem {
  id: string | number;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  badgeLabel: string;
  badgeType: 'health' | 'nutrition' | 'training' | string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  date?: string;
  readingTime?: string | number;
}

export interface CategoryItem {
  id: string;
  label: string;
  count: number;
}

interface KnowledgeCenterProps {
  onBackToHome?: () => void;
  onNavigateToContact?: () => void;
  initialArticles?: ArticleItem[];
  onSelectArticle?: (article: ArticleItem) => void;
}

const API_BASE_URL = 'https://www.ramzelsharq.com/dashboard/api';
const ITEMS_PER_PAGE = 6;

// Helper to strip HTML tags for clean excerpts
function stripHtml(html: string): string {
  if (!html) return '';
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

// Module-level in-memory cache for instantaneous zero-latency page transitions
const articlesMemoryCache: { [lang: string]: { data: ArticleItem[]; timestamp: number } } = {};
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

const getSampleArticles = (language: string): ArticleItem[] => {
  return language === 'ar' ? [
    {
      id: 'hoof-care-essentials',
      badgeLabel: 'الصحة',
      badgeType: 'health',
      category: 'الصحة والتغذية',
      title: 'أساسيات العناية بحوافر الخيل للحفاظ على صحة الحصان',
      excerpt: 'تعتبر حوافر الخيل من أهم أجزاء جسم الحصان، فهي المسؤولة عن حمل وزن الحصان بالكامل أثناء الحركة والجري.',
      author: { name: 'أ.م.د. عمرو بكر' },
      image: '/images/articles/saudi-cup-hoof-care.jpg',
    },
    {
      id: 2,
      badgeLabel: 'التغذية',
      badgeType: 'nutrition',
      category: 'الصحة والتغذية',
      title: 'دليل المبتدئين في التحول الرقمي للمؤسسات',
      excerpt: 'كيف يمكن للمؤسسات التقليدية تبني الحلول الرقمية دون فقدان جوهرها التشغيلي وتحقيق كفاءة أعلى.',
      author: { name: 'م.عمرو بكر' },
      image: tackCardImg,
    },
    {
      id: 3,
      badgeLabel: 'التدريب',
      badgeType: 'training',
      category: 'سلالات الخيل',
      title: 'دليل المبتدئين في التحول الرقمي للمؤسسات',
      excerpt: 'كيف يمكن للمؤسسات التقليدية تبني الحلول الرقمية دون فقدان جوهرها التشغيلي وتحقيق كفاءة أعلى.',
      author: { name: 'م.عمرو بكر' },
      image: tackCardImg,
    },
    {
      id: 4,
      badgeLabel: 'الصحة',
      badgeType: 'health',
      category: 'الرعاية البيطرية',
      title: 'دليل المبتدئين في التحول الرقمي للمؤسسات',
      excerpt: 'كيف يمكن للمؤسسات التقليدية تبني الحلول الرقمية دون فقدان جوهرها التشغيلي وتحقيق كفاءة أعلى.',
      author: { name: 'م.عمرو بكر' },
      image: tackCardImg,
    },
    {
      id: 5,
      badgeLabel: 'التدريب',
      badgeType: 'training',
      category: 'سلالات الخيل',
      title: 'دليل المبتدئين في التحول الرقمي للمؤسسات',
      excerpt: 'كيف يمكن للمؤسسات التقليدية تبني الحلول الرقمية دون فقدان جوهرها التشغيلي وتحقيق كفاءة أعلى.',
      author: { name: 'م.عمرو بكر' },
      image: tackCardImg,
    },
    {
      id: 6,
      badgeLabel: 'التغذية',
      badgeType: 'nutrition',
      category: 'الصحة والتغذية',
      title: 'دليل المبتدئين في التحول الرقمي للمؤسسات',
      excerpt: 'كيف يمكن للمؤسسات التقليدية تبني الحلول الرقمية دون فقدان جوهرها التشغيلي وتحقيق كفاءة أعلى.',
      author: { name: 'م.عمرو بكر' },
      image: tackCardImg,
    },
  ] : [
    {
      id: 'hoof-care-essentials',
      badgeLabel: 'Health',
      badgeType: 'health',
      category: 'Health & Nutrition',
      title: 'Essential Horse Hoof Care for Peak Health & Athletic Longevity',
      excerpt: 'Equine hooves bear the horse full body weight across every stride, making regular podiatric care indispensable for soundness.',
      author: { name: 'Dr. Amr Bakr' },
      image: '/images/articles/saudi-cup-hoof-care.jpg',
    },
    {
      id: 2,
      badgeLabel: 'Nutrition',
      badgeType: 'nutrition',
      category: 'Health & Nutrition',
      title: 'Essential Dietary Supplements for Arabian Horses',
      excerpt: 'Understanding key micro-nutrients, amino acids, and hydration strategies during endurance seasons.',
      author: { name: 'Dr. Marcus Vance' },
      image: tackCardImg,
    },
    {
      id: 3,
      badgeLabel: 'Breeds',
      badgeType: 'training',
      category: 'Horse Breeds',
      title: 'Purebred Arabian Bloodlines & Performance History',
      excerpt: 'Exploring genealogical heritage, anatomical stamina, and preservation of premier purebred lines.',
      author: { name: 'Tariq Al-Mansoor' },
      image: tackCardImg,
    },
    {
      id: 4,
      badgeLabel: 'Veterinary',
      badgeType: 'health',
      category: 'Veterinary Care',
      title: 'Preventative Joint & Hoof Care for Champion Horses',
      excerpt: 'Proven veterinary protocols for ligament health, injury rehabilitation, and seasonal vaccinations.',
      author: { name: 'Dr. Sarah Collins' },
      image: tackCardImg,
    },
    {
      id: 5,
      badgeLabel: 'Training',
      badgeType: 'training',
      category: 'Horse Breeds',
      title: 'Championship Preparation: Endurance Training Principles',
      excerpt: 'Gradual cardiovascular conditioning, recovery electrolytes, and biomechanical posture drills.',
      author: { name: 'Tariq Al-Mansoor' },
      image: tackCardImg,
    },
    {
      id: 6,
      badgeLabel: 'Nutrition',
      badgeType: 'nutrition',
      category: 'Health & Nutrition',
      title: 'Digestive Health & Gastric Ulcer Prevention in Stabled Horses',
      excerpt: 'Nutritional strategies to protect digestive mucosa, balance microflora, and enhance feed absorption.',
      author: { name: 'Dr. Marcus Vance' },
      image: tackCardImg,
    },
  ];
};

export const KnowledgeCenter: React.FC<KnowledgeCenterProps> = ({
  onBackToHome: _onBackToHome,
  onNavigateToContact,
  initialArticles,
  onSelectArticle,
}) => {
  const { language, direction } = useLanguage();

  // Instant cache read for 0ms render
  const getCachedArticles = (): ArticleItem[] | null => {
    if (initialArticles && initialArticles.length > 0) return initialArticles;
    
    // 1. Check memory cache
    const mem = articlesMemoryCache[language];
    if (mem && mem.data && mem.data.length > 0) {
      return mem.data;
    }

    // 2. Check session storage cache
    try {
      const stored = sessionStorage.getItem(`rasco_articles_${language}`);
      const storedTime = sessionStorage.getItem(`rasco_articles_time_${language}`);
      if (stored && storedTime) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          articlesMemoryCache[language] = { data: parsed, timestamp: parseInt(storedTime, 10) };
          return parsed;
        }
      }
    } catch (_e) {
      // ignore storage errors
    }
    return null;
  };

  const initialCached = getCachedArticles();
  const [articles, setArticles] = useState<ArticleItem[]>(initialCached || []);
  const [isLoading, setIsLoading] = useState<boolean>(!initialCached || initialCached.length === 0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fetch articles with Stale-While-Revalidate & 12s timeout
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const fetchArticles = async () => {
      // Check if cache is fresh (< 15 mins)
      const mem = articlesMemoryCache[language];
      const isCacheFresh = mem && (Date.now() - mem.timestamp < CACHE_TTL_MS);

      if (mem && mem.data.length > 0) {
        setArticles(mem.data);
        setIsLoading(false);
        if (isCacheFresh) {
          clearTimeout(timeoutId);
          return; // Cache is fully fresh, no need to stress the server
        }
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/articles?lang=${language}&locale=${language}&pageSize=20`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`);
        }
        const data = await response.json();
        
        if (data && data.success && data.data && Array.isArray(data.data.items)) {
          const apiItems: ArticleItem[] = data.data.items.map((item: any) => {
            const catName = item.articleCategoryName || item.categoryName || (language === 'ar' ? 'عام' : 'General');
            
            let bType: 'health' | 'nutrition' | 'training' = 'training';
            const catLower = catName.toLowerCase();
            if (catLower.includes('صحة') || catLower.includes('بيطر') || catLower.includes('health') || catLower.includes('veterinary')) {
              bType = 'health';
            } else if (catLower.includes('تغذية') || catLower.includes('nutrition')) {
              bType = 'nutrition';
            }

            const cleanSummary = item.summary || item.shortDescription || (item.content ? stripHtml(item.content).slice(0, 115) + '...' : '');

            return {
              id: item.id,
              title: item.title,
              excerpt: cleanSummary,
              content: item.content,
              category: catName,
              badgeLabel: catName,
              badgeType: bType,
              image: item.imageUrl || tackCardImg,
              author: {
                name: item.author || (language === 'ar' ? 'رمز الشرق' : 'Rasco'),
              },
              date: item.date || item.createdAt,
              readingTime: item.readingTime || '5',
            };
          });

          if (isMounted) {
            setArticles(apiItems);
            setIsLoading(false);
            // Save to memory cache & session storage
            articlesMemoryCache[language] = { data: apiItems, timestamp: Date.now() };
            try {
              sessionStorage.setItem(`rasco_articles_${language}`, JSON.stringify(apiItems));
              sessionStorage.setItem(`rasco_articles_time_${language}`, Date.now().toString());
            } catch (_e) {
              // ignore
            }
          }
        }
      } catch (err: any) {
        clearTimeout(timeoutId);
        console.warn('Articles API slow or timed out, using cached/sample articles:', err);
        if (isMounted) {
          setArticles((prev) => (prev && prev.length > 0 ? prev : getSampleArticles(language)));
          setIsLoading(false);
        }
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [language]);

  // Compute dynamic categories with live counts from loaded articles
  const categories: CategoryItem[] = useMemo(() => {
    const catMap = new Map<string, number>();
    articles.forEach((a) => {
      const c = a.category || (language === 'ar' ? 'عام' : 'General');
      catMap.set(c, (catMap.get(c) || 0) + 1);
    });

    const dynamicCats: CategoryItem[] = [
      { id: 'all', label: language === 'ar' ? 'الكل' : 'All', count: articles.length },
    ];

    catMap.forEach((count, label) => {
      dynamicCats.push({ id: label, label, count });
    });

    return dynamicCats;
  }, [articles, language]);

  // Filter articles based on active category & search query
  const filteredArticles = useMemo(() => {
    return articles.filter((item) => {
      const matchesCat =
        activeCategory === 'all' ||
        item.category === activeCategory ||
        item.badgeLabel === activeCategory ||
        (activeCategory === 'nutrition' && (item.category.includes('تغذية') || item.badgeLabel.includes('تغذية') || item.category.toLowerCase().includes('nutrition'))) ||
        (activeCategory === 'training' && (item.category.includes('تدريب') || item.category.includes('سلالات') || item.category.toLowerCase().includes('breed') || item.category.toLowerCase().includes('training'))) ||
        (activeCategory === 'health' && (item.category.includes('صحة') || item.category.includes('بيطر') || item.category.toLowerCase().includes('health') || item.category.toLowerCase().includes('vet')));

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const mainEl = document.querySelector('.kc-articles-col');
    if (mainEl) {
      mainEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="knowledge-center-page" dir={direction}>
      
      {/* =========================================================================
          HERO BANNER (مركز المعرفة + البحث + التصنيفات السريعة)
          ========================================================================= */}
      <section className="kc-hero-banner" aria-label={language === 'ar' ? 'مركز المعرفة' : 'Knowledge Center'}>
        <div className="kc-hero-overlay" />
        <div className="kc-hero-content">
          <h1 className="kc-hero-title">
            {language === 'ar' ? 'مركز المعرفة' : 'Knowledge Center'}
          </h1>

          {/* Search Box */}
          <div className="kc-search-wrapper">
            <input
              type="text"
              className="kc-search-input"
              placeholder={language === 'ar' ? 'ابحث عن مقالات رعاية الخيل، السلالات، أو نصائح الخبراء...' : 'Search horse care articles, breeds, or expert advice...'}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              aria-label={language === 'ar' ? 'ابحث في مركز المعرفة' : 'Search knowledge center'}
            />
            <div className="kc-search-icon" aria-hidden="true">
              <Search size={18} strokeWidth={2.4} />
            </div>
          </div>

          {/* Quick Filter Topic Pills */}
          <div className="kc-quick-topics">
            <button
              type="button"
              className={`kc-topic-pill ${activeCategory === 'الصحة والتغذية' || activeCategory === 'nutrition' ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(activeCategory === 'nutrition' || activeCategory === 'الصحة والتغذية' ? 'all' : (language === 'ar' ? 'الصحة والتغذية' : 'nutrition'));
                setCurrentPage(1);
              }}
            >
              {language === 'ar' ? 'التغذية' : 'Nutrition'}
            </button>
            <button
              type="button"
              className={`kc-topic-pill ${activeCategory === 'سلالات الخيل' || activeCategory === 'training' ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(activeCategory === 'training' || activeCategory === 'سلالات الخيل' ? 'all' : (language === 'ar' ? 'سلالات الخيل' : 'training'));
                setCurrentPage(1);
              }}
            >
              {language === 'ar' ? 'سلالات الخيل' : 'Horse Breeds'}
            </button>
            <button
              type="button"
              className={`kc-topic-pill ${activeCategory === 'الرعاية البيطرية' || activeCategory === 'health' ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(activeCategory === 'health' || activeCategory === 'الرعاية البيطرية' ? 'all' : (language === 'ar' ? 'الرعاية البيطرية' : 'health'));
                setCurrentPage(1);
              }}
            >
              {language === 'ar' ? 'البيطرة' : 'Veterinary Care'}
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN LAYOUT: SIDEBAR + ARTICLES GRID
          ========================================================================= */}
      <main className="kc-main-container">
        <div className="kc-layout-grid">
          
          {/* 1. SIDEBAR: Categories + Order CTA Widget */}
          <aside className="kc-sidebar-col" aria-label={language === 'ar' ? 'تصنيفات المقالات والمعلومات' : 'Article Categories & Info'}>
            
            {/* Widget A: Categories */}
            <div className="kc-widget kc-categories-widget">
              <h2 className="kc-widget-title">
                {language === 'ar' ? 'تصنيفات المقالات' : 'Article Categories'}
              </h2>
              <ul className="kc-categories-list">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        className={`kc-category-item ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setCurrentPage(1);
                        }}
                      >
                        <span className="kc-cat-label">{cat.label}</span>
                        <span className="kc-cat-count">{cat.count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Widget B: CTA Card */}
            <div className="kc-widget kc-order-widget">
              <h3 className="kc-order-title">
                {language === 'ar' ? 'اطلب الآن' : 'Order Now'}
              </h3>
              <p className="kc-order-desc">
                {language === 'ar'
                  ? 'هل تبحث عن نصيحة مخصصة لخيلك؟ خبراؤنا هنا لمساعدتك في اختيار المعدات والأنظمة الغذائية'
                  : 'Looking for tailored advice for your horses? Our experts are here to assist with premium gear and nutritional care.'}
              </p>
              <button
                type="button"
                className="kc-order-btn"
                onClick={() => {
                  if (onNavigateToContact) {
                    onNavigateToContact();
                  } else {
                    window.location.hash = '#contact';
                  }
                }}
              >
                <span>{language === 'ar' ? 'تواصل الآن' : 'Contact Now'}</span>
                {direction === 'rtl' ? (
                  <ArrowLeft size={16} strokeWidth={2.4} className="kc-order-arrow" />
                ) : (
                  <ArrowRight size={16} strokeWidth={2.4} className="kc-order-arrow" />
                )}
              </button>
            </div>

          </aside>

          {/* 2. ARTICLES GRID + Pagination */}
          <section className="kc-articles-col" aria-label={language === 'ar' ? 'قائمة المقالات' : 'Articles List'}>
            
            {isLoading ? (
              <div className="kc-loading-state">
                <Loader2 size={36} className="kc-spinner" />
                <p>{language === 'ar' ? 'جاري تحميل المقالات من الخادم...' : 'Loading articles from server...'}</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="kc-empty-state">
                <p>{language === 'ar' ? 'لا توجد مقالات مطابقة لبحثك في هذا التصنيف.' : 'No articles match your search in this category.'}</p>
                <button
                  type="button"
                  className="kc-reset-btn"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                >
                  {language === 'ar' ? 'عرض جميع المقالات' : 'View All Articles'}
                </button>
              </div>
            ) : (
              <div className="kc-articles-grid">
                {paginatedArticles.map((article) => (
                  <article
                    key={article.id}
                    className="kc-article-card"
                    onClick={() => {
                      if (onSelectArticle) {
                        onSelectArticle(article);
                      } else {
                        setSelectedArticle(article);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (onSelectArticle) {
                          onSelectArticle(article);
                        } else {
                          setSelectedArticle(article);
                        }
                      }
                    }}
                  >
                    
                    {/* Card Media Header */}
                    <div className="kc-card-image-box">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="kc-card-img"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = tackCardImg;
                        }}
                      />
                      <span className={`kc-card-badge badge-${article.badgeType}`}>
                        {article.badgeLabel}
                      </span>
                    </div>

                    {/* Card Content Body */}
                    <div className="kc-card-body">
                      <h3 className="kc-card-title">{article.title}</h3>
                      <p className="kc-card-excerpt">{article.excerpt}</p>

                      {/* Author Row at Bottom */}
                      <div className="kc-card-footer">
                        <span className="kc-author-name">{article.author.name}</span>
                        <div className="kc-author-avatar" aria-hidden="true">
                          {article.author.avatar ? (
                            <img src={article.author.avatar} alt={article.author.name} />
                          ) : (
                            <span className="kc-avatar-circle" />
                          )}
                        </div>
                      </div>
                    </div>

                  </article>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {!isLoading && totalPages > 1 && (
              <div className="kc-pagination-container" aria-label={language === 'ar' ? 'صفحات المقالات' : 'Article Pages'}>
                <button
                  type="button"
                  className="kc-page-btn kc-page-nav"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  aria-label={language === 'ar' ? 'الصفحة السابقة' : 'Previous page'}
                >
                  {direction === 'rtl' ? <ChevronLeft size={16} /> : <ChevronLeft size={16} />}
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`kc-page-btn ${currentPage === p ? 'active' : ''}`}
                    onClick={() => handlePageChange(p)}
                  >
                    {p}
                  </button>
                ))}

                <button
                  type="button"
                  className="kc-page-btn kc-page-nav"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  aria-label={language === 'ar' ? 'الصفحة التالية' : 'Next page'}
                >
                  {direction === 'rtl' ? <ChevronRight size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>
            )}

          </section>

        </div>
      </main>

      {/* =========================================================================
          ARTICLE READING MODAL (Full article preview)
          ========================================================================= */}
      {selectedArticle && (
        <div className="kc-modal-overlay" onClick={() => setSelectedArticle(null)} dir={direction}>
          <div className="kc-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="kc-modal-close"
              onClick={() => setSelectedArticle(null)}
              aria-label={language === 'ar' ? 'إغلاق المقال' : 'Close Article'}
            >
              <X size={22} />
            </button>

            <div className="kc-modal-header">
              <span className={`kc-card-badge badge-${selectedArticle.badgeType}`}>
                {selectedArticle.badgeLabel}
              </span>
              <h2 className="kc-modal-title">{selectedArticle.title}</h2>
              <div className="kc-modal-meta">
                <span className="kc-meta-item">
                  <User size={15} />
                  <span>{selectedArticle.author.name}</span>
                </span>
                {selectedArticle.date && (
                  <span className="kc-meta-item">
                    <Calendar size={15} />
                    <span>{new Date(selectedArticle.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</span>
                  </span>
                )}
                {selectedArticle.readingTime && (
                  <span className="kc-meta-item">
                    <Clock size={15} />
                    <span>{selectedArticle.readingTime} {language === 'ar' ? 'دقائق قراءة' : 'min read'}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="kc-modal-image-box">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = tackCardImg;
                }}
              />
            </div>

            <div className="kc-modal-body">
              {selectedArticle.content ? (
                <div
                  className="kc-modal-html-content"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />
              ) : (
                <p className="kc-modal-fallback-text">{selectedArticle.excerpt}</p>
              )}
            </div>

            <div className="kc-modal-footer">
              <button
                type="button"
                className="kc-modal-done-btn"
                onClick={() => setSelectedArticle(null)}
              >
                {language === 'ar' ? 'إغلاق المقال' : 'Close Article'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

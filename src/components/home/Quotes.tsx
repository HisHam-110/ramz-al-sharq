import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Quotes.css';

interface QuoteItem {
  id: string | number;
  image: string;
  quoteAr: string;
  quoteEn: string;
  authorAr: string;
  authorEn: string;
  titleAr: string;
  titleEn: string;
  initialsAr: string;
  initialsEn: string;
}

const API_BASE_URL = 'https://www.ramzelsharq.com/dashboard/api';

// Curated designations and fallback initials for famous equestrian figures in the API
const AUTHOR_METADATA: Record<string, { titleAr: string; titleEn: string; initialsAr: string; initialsEn: string }> = {
  'أمبر سنتي': {
    titleAr: 'مؤلفة ومدربة فروسية عالمية',
    titleEn: 'Renowned Equestrian Author & Clinician',
    initialsAr: 'أ.س',
    initialsEn: 'AS',
  },
  'Amber Senti': {
    titleAr: 'مؤلفة ومدربة فروسية عالمية',
    titleEn: 'Renowned Equestrian Author & Clinician',
    initialsAr: 'أ.س',
    initialsEn: 'AS',
  },
  'توم دورانس': {
    titleAr: 'رائد فن ترويض وسلوك الخيل الطبيعي',
    titleEn: 'Legendary Natural Horsemanship Pioneer',
    initialsAr: 'ت.د',
    initialsEn: 'TD',
  },
  'Tom Dorrance': {
    titleAr: 'رائد فن ترويض وسلوك الخيل الطبيعي',
    titleEn: 'Legendary Natural Horsemanship Pioneer',
    initialsAr: 'ت.د',
    initialsEn: 'TD',
  },
  'بام براون': {
    titleAr: 'شاعرة وكاتبة ملهمة في أدب الخيل',
    titleEn: 'Inspirational Equestrian Poet & Author',
    initialsAr: 'ب.ب',
    initialsEn: 'PB',
  },
  'Pam Brown': {
    titleAr: 'شاعرة وكاتبة ملهمة في أدب الخيل',
    titleEn: 'Inspirational Equestrian Poet & Author',
    initialsAr: 'ب.ب',
    initialsEn: 'PB',
  },
  'سي. جويبيل سي': {
    titleAr: 'فيلسوفة وكاتبة في فلسفة الفروسية',
    titleEn: 'Equestrian Literary Philosopher',
    initialsAr: 'س.ج',
    initialsEn: 'CJ',
  },
  'C. JoyBell C': {
    titleAr: 'فيلسوفة وكاتبة في فلسفة الفروسية',
    titleEn: 'Equestrian Literary Philosopher',
    initialsAr: 'س.ج',
    initialsEn: 'CJ',
  },
  'باك برانامان': {
    titleAr: 'أسطورة تدريب وتوجيه سلوك الخيل',
    titleEn: 'World-Renowned Horse Clinician & Master',
    initialsAr: 'ب.ب',
    initialsEn: 'BB',
  },
  'Buck Brannaman': {
    titleAr: 'أسطورة تدريب وتوجيه سلوك الخيل',
    titleEn: 'World-Renowned Horse Clinician & Master',
    initialsAr: 'ب.ب',
    initialsEn: 'BB',
  },
};

// Fallback high-res cards matching live API if connection is offline
const FALLBACK_QUOTES: QuoteItem[] = [
  {
    id: 6,
    image: 'https://i.pinimg.com/736x/1f/e6/9e/1fe69e45ee1c339b7eab3892e43d5501.jpg',
    quoteAr: 'الحصان، بجماله الذي لا يضاهى، وقوته التي لا تقاس، ورشاقته التي لا مثيل لها، لا يزال متواضعاً بما يكفي لحمل رجل على ظهره.',
    quoteEn: 'The horse, with beauty unsurpassed, strength immeasurable, and grace unlike any other, still remains humble enough to carry a man upon his back.',
    authorAr: 'أمبر سنتي',
    authorEn: 'Amber Senti',
    titleAr: 'مؤلفة ومدربة فروسية عالمية',
    titleEn: 'Renowned Equestrian Author & Clinician',
    initialsAr: 'أ.س',
    initialsEn: 'AS',
  },
  {
    id: 5,
    image: 'https://i.pinimg.com/1200x/af/b5/a2/afb5a298e0745026ef8932bce018bae4.jpg',
    quoteAr: 'مهما طالت حياتك، ومهما تعلمت، سيجد الحصان دائماً طريقة ليعلمك شيئاً جديداً عن نفسك.',
    quoteEn: 'No matter how long you live, no matter how much you learn, a horse will always find a way to teach you something new about yourself.',
    authorAr: 'توم دورانس',
    authorEn: 'Tom Dorrance',
    titleAr: 'رائد فن ترويض وسلوك الخيل الطبيعي',
    titleEn: 'Legendary Natural Horsemanship Pioneer',
    initialsAr: 'ت.د',
    initialsEn: 'TD',
  },
  {
    id: 4,
    image: 'https://i.pinimg.com/1200x/cf/dc/b8/cfdcb85c4981b84969b8991ea19a51d1.jpg',
    quoteAr: 'يمكن للحصان أن يمنح فارسه السرعة والقوة التي يفتقر إليها، لكن الفارس الحكيم يتذكر أنها ليست أكثر من مجرد قرض، ويجب سداده بالاحترام والمحبة.',
    quoteEn: 'A horse can lend its rider the speed and strength he or she lacks, but the rider who is wise remembers it is no more than a loan, and one that must be repaid with respect and love.',
    authorAr: 'بام براون',
    authorEn: 'Pam Brown',
    titleAr: 'شاعرة وكاتبة ملهمة في أدب الخيل',
    titleEn: 'Inspirational Equestrian Poet & Author',
    initialsAr: 'ب.ب',
    initialsEn: 'PB',
  },
];

export const Quotes: React.FC = () => {
  const { language, direction, t } = useLanguage();
  const [quotes, setQuotes] = useState<QuoteItem[]>(FALLBACK_QUOTES);

  useEffect(() => {
    let isMounted = true;
    const fetchQuotes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/quotes?lang=${language}&locale=${language}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const items = data?.data?.items || data?.items || [];
        const activeItems = items.filter((item: any) => item.isActive !== false);

        if (activeItems.length > 0 && isMounted) {
          const mapped: QuoteItem[] = activeItems.map((item: any, idx: number) => {
            const enTrans = item.translations?.find((tr: any) => tr.languageCode === 'en' || tr.locale === 'en') || {};
            const arTrans = item.translations?.find((tr: any) => tr.languageCode === 'ar' || tr.locale === 'ar') || {};

            const rawAr = arTrans.content || item.content || '';
            const rawEn = enTrans.content || item.content || '';
            const cleanAr = rawAr.replace(/^[«"'\s]+|[»"'\s]+$/g, '').trim();
            const cleanEn = rawEn.replace(/^[«"'\s]+|[»"'\s]+$/g, '').trim();

            const authorAr = (arTrans.author || item.author || 'خبير فروسية').trim();
            const authorEn = (enTrans.author || item.author || 'Equestrian Expert').trim();

            const meta = AUTHOR_METADATA[authorAr] || AUTHOR_METADATA[authorEn] || {};

            const wordsAr = authorAr.split(/\s+/).filter(Boolean);
            const initialsAr = meta.initialsAr || (wordsAr.length >= 2 ? `${wordsAr[0][0]}.${wordsAr[1][0]}` : authorAr.slice(0, 2));

            const wordsEn = authorEn.split(/\s+/).filter(Boolean);
            const initialsEn = meta.initialsEn || (wordsEn.length >= 2 ? `${wordsEn[0][0]}${wordsEn[1][0]}`.toUpperCase() : authorEn.slice(0, 2).toUpperCase());

            const titleAr = meta.titleAr || (language === 'ar' ? 'خبير ومستشار فروسية معتمد' : 'Certified Equestrian Consultant');
            const titleEn = meta.titleEn || 'Certified Equestrian Consultant';

            // Card fallback images in case external URL fails
            const fallbackCardImg = `/images/quotes/quote-card-${(idx % 3) + 1}.jpg`;

            return {
              id: item.id,
              image: item.imageUrl || fallbackCardImg,
              quoteAr: cleanAr || rawAr,
              quoteEn: cleanEn || rawEn,
              authorAr,
              authorEn,
              titleAr,
              titleEn,
              initialsAr,
              initialsEn,
            };
          });

          // Pick the 3 quotes to display
          setQuotes(mapped.slice(0, 3));
        }
      } catch (err) {
        console.warn('Could not fetch live quotes from API, using fallback:', err);
      }
    };

    fetchQuotes();

    return () => {
      isMounted = false;
    };
  }, [language]);

  return (
    <section className="quotes-section" dir={direction} aria-label={t('quotesTitle')}>
      {/* Background Overlay */}
      <div className="quotes-bg-overlay" aria-hidden="true" />

      <div className="quotes-container">
        {/* Info Column (First in reading flow) */}
        <div className="quotes-info-column">
          {/* Category Tag */}
          <div className="quotes-category-badge">
            <span className="badge-sparkle">✦</span>
            <span>{language === 'ar' ? 'فلسفة ورؤية الفروسية' : 'Equestrian Philosophy'}</span>
          </div>

          {/* Main Gold Quote Badge */}
          <div className="quotes-main-badge" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 56 56" fill="none">
              <path
                d="M18.877 27.1368H7.93366C8.12033 16.2401 10.267 14.4434 16.9637 10.4768C17.7337 10.0101 17.9903 9.0301 17.5237 8.23676C17.0803 7.46676 16.077 7.2101 15.307 7.67676C7.42033 12.3434 4.66699 15.1901 4.66699 28.7468V41.3234C4.66699 45.3134 7.91033 48.5334 11.877 48.5334H18.877C22.9837 48.5334 26.087 45.4301 26.087 41.3234V34.3234C26.087 30.2401 22.9837 27.1368 18.877 27.1368Z"
                fill="white"
              />
              <path
                d="M44.123 27.1368H33.1796C33.3663 16.2401 35.513 14.4434 42.2096 10.4768C42.9796 10.0101 43.2363 9.0301 42.7696 8.23676C42.303 7.46676 41.323 7.2101 40.5296 7.67676C32.643 12.3434 29.8896 15.1901 29.8896 28.7701V41.3468C29.8896 45.3368 33.133 48.5568 37.0996 48.5568H44.0996C48.2063 48.5568 51.3096 45.4534 51.3096 41.3468V34.3468C51.333 30.2401 48.2296 27.1368 44.123 27.1368Z"
                fill="white"
              />
            </svg>
          </div>

          <h2 className="quotes-heading">
            {language === 'ar' ? (
              <>
                أقوال وحكم من عالم
                <br />
                <span className="quotes-heading-highlight">الخيل والفروسية</span>
              </>
            ) : (
              <>
                Wisdom & Insights from the
                <br />
                <span className="quotes-heading-highlight">Equestrian World</span>
              </>
            )}
          </h2>

          <div className="quotes-heading-underline" aria-hidden="true" />

          <p className="quotes-paragraph">
            {language === 'ar' ? (
              <>
                الخيل ليست مجرد وسيلة أو رفيق، بل هي رمزٌ للأصالة، القوة، والوفاء.
                <br />
                منذ القدم ارتبطت الخيول بالعزة والفخر، وكانت عنوانًا للشجاعة والهيبة.
              </>
            ) : (
              <>
                Horses are not merely companions, but timeless symbols of nobility, strength, and loyalty.
                <br />
                Embodying dignity, pride, and courage across generations.
              </>
            )}
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="quotes-cards-grid">
          {quotes.map((item, index) => (
            <div key={item.id} className={`quote-card ${index === 1 ? 'quote-card-featured' : ''}`}>
              {/* Card Image Banner */}
              <div className="quote-card-image-wrapper">
                <img
                  src={item.image}
                  alt={language === 'ar' ? item.authorAr : item.authorEn}
                  className="quote-card-image"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `/images/quotes/quote-card-${(index % 3) + 1}.jpg`;
                  }}
                />
                <div className="quote-card-img-gradient" aria-hidden="true" />
                {/* Golden Floating Quote Badge */}
                <div className="quote-card-badge" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 56 56" fill="none">
                    <path
                      d="M18.877 27.1368H7.93366C8.12033 16.2401 10.267 14.4434 16.9637 10.4768C17.7337 10.0101 17.9903 9.0301 17.5237 8.23676C17.0803 7.46676 16.077 7.2101 15.307 7.67676C7.42033 12.3434 4.66699 15.1901 4.66699 28.7468V41.3234C4.66699 45.3134 7.91033 48.5334 11.877 48.5334H18.877C22.9837 48.5334 26.087 45.4301 26.087 41.3234V34.3234C26.087 30.2401 22.9837 27.1368 18.877 27.1368Z"
                      fill="white"
                    />
                    <path
                      d="M44.123 27.1368H33.1796C33.3663 16.2401 35.513 14.4434 42.2096 10.4768C42.9796 10.0101 43.2363 9.0301 42.7696 8.23676C42.303 7.46676 41.323 7.2101 40.5296 7.67676C32.643 12.3434 29.8896 15.1901 29.8896 28.7701V41.3468C29.8896 45.3368 33.133 48.5568 37.0996 48.5568H44.0996C48.2063 48.5568 51.3096 45.4534 51.3096 41.3468V34.3468C51.333 30.2401 48.2296 27.1368 44.123 27.1368Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              {/* Card Body */}
              <div className="quote-card-body">
                {/* Decorative subtle background quotes */}
                <div className="quote-card-watermark" aria-hidden="true">”</div>

                <p className="quote-card-text">
                  "{language === 'ar' ? item.quoteAr : item.quoteEn}"
                </p>

                {/* Author Info */}
                <div className="quote-card-author">
                  <div className="author-avatar" aria-hidden="true">
                    <span>{language === 'ar' ? item.initialsAr : item.initialsEn}</span>
                  </div>
                  <div className="author-info-text">
                    <div className="author-name-row">
                      <span className="author-name">
                        {language === 'ar' ? item.authorAr : item.authorEn}
                      </span>
                      <span className="author-verified-badge" title={language === 'ar' ? 'شخصية موثقة' : 'Verified'} aria-label="Verified">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                      </span>
                    </div>
                    <span className="author-title">
                      {language === 'ar' ? item.titleAr : item.titleEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Accent Gold Line */}
      <div className="quotes-bottom-gold-bar" aria-hidden="true" />
    </section>
  );
};

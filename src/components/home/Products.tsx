import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { Product } from '../../pages/ProductsPage';
import './Products.css';

interface ProductItem {
  id: string;
  name: string;
  image: string;
  descriptionAr: string;
  descriptionEn: string;
}

interface ProductsProps {
  onViewAll?: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const Products: React.FC<ProductsProps> = ({ onViewAll, onSelectProduct }) => {
  const { language, direction, t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const products: ProductItem[] = [
    {
      id: 'freedom-cubes',
      name: 'Freedom Cubes',
      image: '/images/products/freedom-cubes.jpg',
      descriptionAr: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
      descriptionEn: 'High-oil, fiber-rich cubes ideal for horses requiring a low-starch, controlled energy diet.',
    },
    {
      id: 'breeze-up',
      name: 'Anti-Sweat & Winter Rugs',
      image: '/images/products/breeze-up.jpg',
      descriptionAr: 'أغطية وسجادات شتوية مانعة للتعرق ومقاومة لبرودة الطقس تمنح خيلك الدفء والراحة القصوى.',
      descriptionEn: 'Premium anti-sweat and winter rugs engineered to provide warmth, breathability, and comfort.',
    },
    {
      id: 'optima-bcaa',
      name: 'Optima BCCA- Powder',
      image: '/images/products/optima-bcaa.jpg',
      descriptionAr: 'بودرة أحماض أمينية BCAA لدعم استشفاء العضلات السريع وتعزيز طاقة وأداء خيل السباق.',
      descriptionEn: 'Branched-chain amino acids powder supporting fast muscle recovery and sustained athletic stamina.',
    },
    {
      id: 'calavite',
      name: 'Calavite',
      image: '/images/products/calavite.jpg',
      descriptionAr: 'مكمل كلسيوم وفيتامينات متوازن لدعم نمو العظام القوية وصحة المفاصل والحوافر.',
      descriptionEn: 'Balanced calcium and essential vitamin supplement supporting strong bone growth and sound hooves.',
    },
    {
      id: 'bronco-e',
      name: 'Bronco-E Fly Spray',
      image: '/images/products/bronco-e.jpg',
      descriptionAr: 'بخاخ برونكو-إي الفعال لحماية الخيل والفرسان من الذباب والحشرات المزعجة.',
      descriptionEn: 'Highly effective fly and insect repellent spray protecting horses and stables.',
    },
    {
      id: 'restore-lyte',
      name: 'Restore-Lyte Plus',
      image: 'https://equineproducts-ukltd.com/cdn/shop/files/8_97249dd5-4a00-4c94-b6d2-dc4f7ca91f04.png?v=1737548730',
      descriptionAr: 'محلول كهارل متطور وسريع المفعول لاستعادة الترطيب والمعادن بعد المجهود الشاق.',
      descriptionEn: 'Advanced fast-acting electrolyte formula restoring hydration and vital minerals.',
    },
    {
      id: 'tiger-tongue',
      name: 'Tiger Tongue Sponge',
      image: 'https://equineproducts-ukltd.com/cdn/shop/files/35_60dfa11c-6c6e-484b-85e2-8a6370cfa320.png?v=1734690102',
      descriptionAr: 'إسفنجة تدليك وتنظيف فريدة تزيل الأتربة والتعرق وتمنح شعر الخيل لمعاناً فائقاً.',
      descriptionEn: 'Unique grooming sponge effectively wiping sweat and dust for a shiny coat.',
    },
    {
      id: 'dmg-6060',
      name: 'DMG 6060',
      image: 'https://equineproducts-ukltd.com/cdn/shop/files/47_261eed3c-2450-4341-98e3-13a35ac2ba39.png?v=1734695857',
      descriptionAr: 'مكمل غذائي ممتاز لزيادة كفاءة استهلاك الأكسجين ومقاومة حمض اللاكتيك أثناء السباق.',
      descriptionEn: 'Premium dietary supplement supporting oxygen utilization and muscle endurance.',
    },
  ];

  const handleScroll = (action: 'next' | 'prev') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.querySelector<HTMLElement>('.product-card');
    const scrollAmount = card ? (card.offsetWidth + 22) : 295;

    if (direction === 'rtl') {
      // In RTL, moving forward ("next") scrolls left (negative values in DOM)
      const delta = action === 'next' ? -scrollAmount : scrollAmount;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = Math.abs(container.scrollLeft);

      if (action === 'next' && currentScroll >= maxScroll - 15) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (action === 'prev' && currentScroll <= 15) {
        container.scrollTo({ left: -maxScroll, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: delta, behavior: 'smooth' });
      }
    } else {
      // In LTR, moving forward ("next") scrolls right (positive values in DOM)
      const delta = action === 'next' ? scrollAmount : -scrollAmount;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;

      if (action === 'next' && currentScroll >= maxScroll - 15) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (action === 'prev' && currentScroll <= 15) {
        container.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: delta, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="products-section" id="products" dir={direction}>
      <div className="products-container">
        {/* Header Block with Title on one side and Navigation Arrows on the other */}
        <div className="products-header">
          {/* Title Group */}
          <div
            className="products-title-group"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (onViewAll) onViewAll();
              else {
                window.location.hash = '#products';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <span className="products-tag">{language === 'ar' ? 'تسوق الآن !' : 'Shop Now!'}</span>
            <h2 className="products-title">{t('productsTitle')}</h2>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="products-nav-arrows">
            <button
              type="button"
              className="prod-arrow-btn prod-arrow-solid"
              onClick={() => handleScroll('next')}
              aria-label={language === 'ar' ? 'المنتجات التالية' : 'Next products'}
              title={language === 'ar' ? 'المنتجات التالية' : 'Next products'}
            >
              {direction === 'rtl' ? <ChevronLeft size={20} strokeWidth={2.4} /> : <ChevronRight size={20} strokeWidth={2.4} />}
            </button>

            <button
              type="button"
              className="prod-arrow-btn prod-arrow-outline"
              onClick={() => handleScroll('prev')}
              aria-label={language === 'ar' ? 'المنتجات السابقة' : 'Previous products'}
              title={language === 'ar' ? 'المنتجات السابقة' : 'Previous products'}
            >
              {direction === 'rtl' ? <ChevronRight size={20} strokeWidth={2.4} /> : <ChevronLeft size={20} strokeWidth={2.4} />}
            </button>
          </div>
        </div>

        {/* 4 Product Cards Grid / Track */}
        <div className="products-grid" ref={scrollContainerRef}>
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {/* Product Packshot Image */}
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
              </div>

              {/* Product Title */}
              <h3 className="product-name">{product.name}</h3>

              {/* Product Description */}
              <p className="product-desc">
                {language === 'ar' ? product.descriptionAr : product.descriptionEn}
              </p>

              {/* View Details Button */}
              <button
                type="button"
                className="product-btn-details"
                onClick={() => {
                  if (onSelectProduct) {
                    onSelectProduct({
                      id: product.id,
                      name: product.name,
                      description: language === 'ar' ? product.descriptionAr : product.descriptionEn,
                      imageUrl: product.image,
                      categoryId: 19,
                      categoryName: language === 'ar' ? 'أعلاف ومكملات غذائية' : 'Feeds & Supplements',
                      agentName: language === 'ar' ? 'الشركاء العالميين' : 'Global Partners',
                    });
                  } else if (onViewAll) {
                    onViewAll();
                  } else {
                    window.location.hash = '#products';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                {t('viewDetails')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

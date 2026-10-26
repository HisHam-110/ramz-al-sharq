import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Truck,
  Info,
  Clock,
  Layers,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import type { Product } from './ProductsPage';
import { useLanguage } from '../context/LanguageContext';
import './ProductDetailPage.css';

// Official WhatsApp Vector Icon from public/icons/whatsappVector.svg
const WhatsAppIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 20,
  className = '',
  color = '#FFFFFF',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M14.5817 11.985C14.333 11.8608 13.1097 11.2625 12.882 11.1792C12.6534 11.0967 12.4876 11.0558 12.321 11.3042C12.156 11.5517 11.6788 12.1092 11.5339 12.2742C11.3891 12.44 11.2434 12.46 10.9947 12.3367C10.746 12.2117 9.94388 11.9508 8.99353 11.1075C8.25419 10.4509 7.75431 9.64002 7.60946 9.39169C7.46461 9.14419 7.59439 9.01002 7.71831 8.88669C7.83051 8.77585 7.96783 8.59752 8.09175 8.45335C8.21651 8.30835 8.25754 8.20502 8.34127 8.03919C8.42416 7.87419 8.38313 7.73002 8.32034 7.60585C8.25754 7.48169 7.76018 6.26252 7.55336 5.76669C7.35073 5.28419 7.14559 5.35003 6.9932 5.34169C6.84835 5.33503 6.68256 5.33336 6.51594 5.33336C6.35015 5.33336 6.08053 5.39503 5.85279 5.64336C5.62504 5.89086 4.98199 6.49002 4.98199 7.70919C4.98199 8.92752 5.87372 10.105 5.99764 10.2709C6.1224 10.4359 7.75264 12.9375 10.2487 14.01C10.8423 14.265 11.3053 14.4175 11.6671 14.5308C12.2632 14.72 12.8058 14.6933 13.2337 14.6292C13.7118 14.5583 14.7057 14.03 14.9133 13.4517C15.121 12.8733 15.121 12.3775 15.0582 12.2742C14.9962 12.1708 14.8312 12.1092 14.5817 11.985ZM10.0418 18.1542H10.0385C8.55626 18.1543 7.10128 17.7577 5.82599 17.0058L5.52372 16.8275L2.39135 17.6458L3.22699 14.6058L3.03022 14.2942C2.20165 12.9811 1.76332 11.4614 1.76588 9.91085C1.76672 5.36919 5.48018 1.6742 10.0452 1.6742C12.2557 1.6742 14.3339 2.53253 15.8963 4.08919C16.6672 4.85304 17.2782 5.76146 17.694 6.76189C18.1098 7.76232 18.3221 8.83489 18.3186 9.91752C18.3161 14.4592 14.6035 18.1542 10.0418 18.1542ZM17.0861 2.9067C16.1636 1.98247 15.0659 1.24965 13.8567 0.7507C12.6475 0.251754 11.3508 -0.00339687 10.0418 3.41479e-05C4.55328 3.41479e-05 0.0862428 4.44586 0.0837309 9.91002C0.0837309 11.6567 0.541739 13.3617 1.41338 14.8642L0 20L5.27923 18.6217C6.73916 19.4133 8.37513 19.8281 10.0377 19.8283H10.0418C15.5296 19.8283 19.9974 15.3825 20 9.91752C20.004 8.61525 19.7486 7.32511 19.2484 6.12172C18.7483 4.91833 18.0133 3.82559 17.0861 2.9067Z"
      fill={color}
    />
  </svg>
);

// Local high-res fallback images
import breezeUpImg from '/images/products/breeze-up.jpg';
import calaviteImg from '/images/products/calavite.jpg';
import freedomCubesImg from '/images/products/freedom-cubes.jpg';
import optimaBcaaImg from '/images/products/optima-bcaa.jpg';

interface ProductDetailPageProps {
  product: Product;
  onBackToProducts: () => void;
  onBackToHome: () => void;
  onSelectProduct: (product: Product) => void;
}

const API_BASE_URL = 'https://www.ramzelsharq.com/dashboard/api';

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToProducts,
  onBackToHome,
  onSelectProduct,
}) => {
  const { language, direction } = useLanguage();

  // Current active preview image
  const [activeImage, setActiveImage] = useState<string>(product.imageUrl);

  // Selected weight / package size
  const [selectedWeight, setSelectedWeight] = useState<string>('5kg');

  // Active information tab
  const [activeTab, setActiveTab] = useState<'overview' | 'dosage' | 'features' | 'warnings'>('overview');

  // Extended product data fetched from API
  const [fullProduct, setFullProduct] = useState<Product>(product);

  // Similar products list
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  // Update state when product prop changes
  useEffect(() => {
    setActiveImage(product.imageUrl);
    setFullProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fetch full product details from API if ID is numerical
    if (typeof product.id === 'number') {
      fetch(`${API_BASE_URL}/products/${product.id}?lang=${language}&locale=${language}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => {
          if (json?.data) {
            setFullProduct((prev) => ({ ...prev, ...json.data }));
            if (json.data.imageUrl) {
              setActiveImage(json.data.imageUrl);
            }
          }
        })
        .catch((err) => console.warn('Could not fetch extra product info:', err));
    }

    // Fetch similar products from the same category or general list
    const categoryParam = product.categoryId && product.categoryId !== 'all' ? `&categoryId=${product.categoryId}` : '';
    fetch(`${API_BASE_URL}/products?lang=${language}&locale=${language}&pageSize=8${categoryParam}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data?.items && json.data.items.length > 0) {
          const filtered = json.data.items
            .filter((p: any) => String(p.id) !== String(product.id))
            .slice(0, 4)
            .map((p: any, idx: number) => {
              let fallbackImg = optimaBcaaImg;
              if (idx % 4 === 1) fallbackImg = breezeUpImg;
              if (idx % 4 === 2) fallbackImg = freedomCubesImg;
              if (idx % 4 === 3) fallbackImg = calaviteImg;

              return {
                id: p.id,
                name: p.name || 'منتج خيل',
                description: p.description || 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي متكامل.',
                imageUrl: p.imageUrl || fallbackImg,
                categoryId: p.categoryId || 0,
                categoryName: p.categoryName || 'أعلاف ومكملات',
                agentName: p.agentName || 'الشركاء العالميين',
              };
            });
          setSimilarProducts(filtered);
        } else {
          // Fallback similar items
          setSimilarProducts([
            {
              id: 'sim-1',
              name: 'Anti-Sweat & Winter Rugs',
              description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
              imageUrl: breezeUpImg,
              categoryId: 'supplements',
              categoryName: 'أعلاف ومكملات غذائية',
            },
            {
              id: 'sim-2',
              name: 'Freedom Cubes',
              description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
              imageUrl: freedomCubesImg,
              categoryId: 'supplements',
              categoryName: 'أعلاف ومكملات غذائية',
            },
            {
              id: 'sim-3',
              name: 'Optima BCCA- Powder',
              description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
              imageUrl: optimaBcaaImg,
              categoryId: 'supplements',
              categoryName: 'أعلاف ومكملات غذائية',
            },
            {
              id: 'sim-4',
              name: 'Freedom Cubes Sport',
              description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
              imageUrl: freedomCubesImg,
              categoryId: 'supplements',
              categoryName: 'أعلاف ومكملات غذائية',
            },
          ]);
        }
      })
      .catch(() => {
        setSimilarProducts([
          {
            id: 'sim-1',
            name: 'Anti-Sweat & Winter Rugs',
            description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
            imageUrl: breezeUpImg,
            categoryId: 'supplements',
            categoryName: 'أعلاف ومكملات غذائية',
          },
          {
            id: 'sim-2',
            name: 'Freedom Cubes',
            description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
            imageUrl: freedomCubesImg,
            categoryId: 'supplements',
            categoryName: 'أعلاف ومكملات غذائية',
          },
          {
            id: 'sim-3',
            name: 'Optima BCCA- Powder',
            description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
            imageUrl: optimaBcaaImg,
            categoryId: 'supplements',
            categoryName: 'أعلاف ومكملات غذائية',
          },
          {
            id: 'sim-4',
            name: 'Freedom Cubes Sport',
            description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
            imageUrl: freedomCubesImg,
            categoryId: 'supplements',
            categoryName: 'أعلاف ومكملات غذائية',
          },
        ]);
      });
  }, [product]);

  // Gallery thumbnails (either from product.images or alternate views)
  const galleryThumbnails = React.useMemo(() => {
    if (fullProduct.images && fullProduct.images.length > 1) {
      return fullProduct.images.map((img) => img.imageUrl);
    }
    // Fallback gallery images to enable clicking and switching angles
    return [
      fullProduct.imageUrl || breezeUpImg,
      freedomCubesImg,
      optimaBcaaImg,
    ];
  }, [fullProduct]);

  // WhatsApp click handler
  const handleWhatsAppOrder = () => {
    const prodName = (language === 'en' && fullProduct.englishName) ? fullProduct.englishName : fullProduct.name;
    const text = language === 'en'
      ? `Hello, I would like to order the product: ${prodName}\nSelected Size / Weight: ${selectedWeight}\nFrom Ramz Al Sharq.`
      : `السلام عليكم، أرغب في طلب المنتج: ${fullProduct.name}\nالوزن المطلوب: ${selectedWeight}\nرابط المنتج في رمز الشرق.`;
    const url = `https://wa.me/966503936999?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const displayName = (language === 'en' && fullProduct.englishName) ? fullProduct.englishName : fullProduct.name;

  return (
    <div className="product-detail-page" dir={direction}>
      <div className="pdp-container">

        {/* =========================================================================
            1. BREADCRUMBS NAVIGATION
            ========================================================================= */}
        <nav className="pdp-breadcrumb" aria-label={language === 'en' ? 'Breadcrumb navigation' : 'مسار التصفح'}>
          <button type="button" className="pdp-bc-link" onClick={onBackToHome}>
            {language === 'en' ? 'Home' : 'الرئيسية'}
          </button>
          {direction === 'rtl' ? (
            <ChevronLeft size={14} className="pdp-bc-separator" />
          ) : (
            <ChevronRight size={14} className="pdp-bc-separator" />
          )}
          <button type="button" className="pdp-bc-link" onClick={onBackToProducts}>
            {language === 'en' ? 'Products' : 'المنتجات'}
          </button>
          {direction === 'rtl' ? (
            <ChevronLeft size={14} className="pdp-bc-separator" />
          ) : (
            <ChevronRight size={14} className="pdp-bc-separator" />
          )}
          <span className="pdp-bc-current">
            {fullProduct.categoryName || (language === 'en' ? 'Feeds & Supplements' : 'الأعلاف والمكملات الغذائية')}
          </span>
        </nav>

        {/* =========================================================================
            2. PRODUCT HERO SHOWCASE (Gallery & Buy Box)
            ========================================================================= */}
        <section className="pdp-hero-grid">

          {/* Gallery Column */}
          <div className="pdp-gallery-col">
            {/* Main Packshot Frame */}
            <div className="pdp-main-image-frame">
              <img
                src={activeImage || fullProduct.imageUrl || breezeUpImg}
                alt={displayName}
                className="pdp-main-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = breezeUpImg;
                }}
              />
            </div>

            {/* Side Thumbnails */}
            <div className="pdp-thumbnails-list">
              {galleryThumbnails.map((thumbUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`pdp-thumb-btn ${activeImage === thumbUrl ? 'active' : ''}`}
                  onClick={() => setActiveImage(thumbUrl)}
                >
                  <img
                    src={thumbUrl}
                    alt={`${displayName} ${idx + 1}`}
                    className="pdp-thumb-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = breezeUpImg;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Meta & Action Box */}
          <div className="pdp-info-col">
            
            {/* Badges Row */}
            <div className="pdp-tags-row">
              <span className="pdp-category-badge">
                {fullProduct.categoryName || (language === 'en' ? 'Feeds' : 'الأعلاف')}
              </span>
              <span className="pdp-agent-badge">
                {fullProduct.agentName || 'GAIN'}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="pdp-title">{displayName}</h1>

            {/* Tagline / Excerpt */}
            <p className="pdp-subtitle">
              {fullProduct.description || (language === 'en' ? 'High-performance equine nutrition formula for health and stamina.' : 'بخاخ مضاد للذباب للخيول برائحة السترونيلا تغطية شاملة لحصانك وإسطبلك')}
            </p>

            {/* Purchase & Dosage Box */}
            <div className="pdp-spec-box">
              <div className="pdp-spec-row">
                <span className="pdp-spec-label">
                  {language === 'en' ? 'Recommended Dosage' : 'الكمية الموصى بها'}
                </span>
                <span className="pdp-spec-value">50g / Day</span>
              </div>

              <div className="pdp-spec-row">
                <span className="pdp-spec-label">
                  {language === 'en' ? 'Available Sizes' : 'الأوزان المتاحة'}
                </span>
                <div className="pdp-weights-options">
                  <button
                    type="button"
                    className={`pdp-weight-btn ${selectedWeight === '5kg' ? 'active' : ''}`}
                    onClick={() => setSelectedWeight('5kg')}
                  >
                    5kg
                  </button>
                  <button
                    type="button"
                    className={`pdp-weight-btn ${selectedWeight === '10kg' ? 'active' : ''}`}
                    onClick={() => setSelectedWeight('10kg')}
                  >
                    10kg
                  </button>
                </div>
              </div>

              {/* WhatsApp Order Button */}
              <button
                type="button"
                className="pdp-whatsapp-btn"
                onClick={handleWhatsAppOrder}
              >
                <WhatsAppIcon size={22} className="pdp-whatsapp-icon" color="#FFFFFF" />
                <span>
                  {language === 'en' ? 'Order via WhatsApp' : 'الطلب عن طريق واتساب'}
                </span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pdp-trust-cards">
              <div className="pdp-trust-card">
                <ShieldCheck size={26} className="pdp-trust-icon" />
                <div className="pdp-trust-text">
                  <h4 className="pdp-trust-title">
                    {language === 'en' ? 'Certified Quality' : 'جودة معتمدة'}
                  </h4>
                  <p className="pdp-trust-sub">ISO & HACCP</p>
                </div>
              </div>

              <div className="pdp-trust-card">
                <Truck size={26} className="pdp-trust-icon" />
                <div className="pdp-trust-text">
                  <h4 className="pdp-trust-title">
                    {language === 'en' ? 'Fast Shipping' : 'شحن سريع'}
                  </h4>
                  <p className="pdp-trust-sub">
                    {language === 'en' ? 'Across all Kingdom' : 'جميع أنحاء المملكة'}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* =========================================================================
            3. TABBED PRODUCT DETAILS
            ========================================================================= */}
        <section className="pdp-tabs-section">
          
          {/* Tabs Menu */}
          <aside className="pdp-tabs-sidebar">
            <h3 className="pdp-tabs-heading">
              {language === 'en' ? 'Product Information' : 'تفاصيل ومعلومات المنتج'}
            </h3>
            <div className="pdp-tabs-menu">
              
              <button
                type="button"
                className={`pdp-tab-item ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <div className="pdp-tab-item-content">
                  <Info size={18} />
                  <span>{language === 'en' ? 'Overview' : 'نظرة عامة'}</span>
                </div>
                {activeTab === 'overview' && (
                  direction === 'rtl' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />
                )}
              </button>

              <button
                type="button"
                className={`pdp-tab-item ${activeTab === 'dosage' ? 'active' : ''}`}
                onClick={() => setActiveTab('dosage')}
              >
                <div className="pdp-tab-item-content">
                  <Clock size={18} />
                  <span>{language === 'en' ? 'Dosage & Feeding' : 'الجرعة وطريقة الاستخدام'}</span>
                </div>
                {activeTab === 'dosage' && (
                  direction === 'rtl' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />
                )}
              </button>

              <button
                type="button"
                className={`pdp-tab-item ${activeTab === 'features' ? 'active' : ''}`}
                onClick={() => setActiveTab('features')}
              >
                <div className="pdp-tab-item-content">
                  <Layers size={18} />
                  <span>{language === 'en' ? 'Features & Actives' : 'المميزات والمواد الفعالة'}</span>
                </div>
                {activeTab === 'features' && (
                  direction === 'rtl' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />
                )}
              </button>

              <button
                type="button"
                className={`pdp-tab-item ${activeTab === 'warnings' ? 'active' : ''}`}
                onClick={() => setActiveTab('warnings')}
              >
                <div className="pdp-tab-item-content">
                  <AlertTriangle size={18} />
                  <span>{language === 'en' ? 'Warnings & Storage' : 'التحذيرات وموانع الاستخدام'}</span>
                </div>
                {activeTab === 'warnings' && (
                  direction === 'rtl' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />
                )}
              </button>

            </div>
          </aside>

          {/* Active Tab Content Panel */}
          <main className="pdp-tab-panel">
            
            {activeTab === 'overview' && (
              <div className="pdp-tab-body">
                <div className="pdp-tab-header">
                  <div className="pdp-tab-icon-circle">
                    <Info size={20} />
                  </div>
                  <h2 className="pdp-tab-title">
                    {language === 'en' ? 'Overview' : 'نظرة عامة'}
                  </h2>
                </div>

                <p className="pdp-tab-text">
                  {fullProduct.description || (
                    language === 'en'
                      ? 'A premium veterinary supplement designed to boost general vitality and performance, blending essential vitamins, trace minerals, and bioavailable nutrients.'
                      : 'برو-فايتال هو مكمل غذائي عالي الجودة مصمم لتعزيز الصحة العامة وأداء الخيل، يجمع بين الفيتامينات الأساسية، المعادن النادرة، والأحماض الأمينية لدعم الوظائف الحيوية في الجسم.'
                  )}
                </p>

                <p className="pdp-tab-text">
                  {language === 'en'
                    ? 'Formulated for athletic horses, racehorses, showjumpers, and breeding stables requiring sustained stamina and top nutritional support.'
                    : 'مناسب للخيول الرياضية، خيول السباق، خيول الاستعراض، وحتى خيول الأندية التي تتطلب مستويات طاقة عالية ودعماً غذائياً إضافياً.'}
                </p>

                <div className="pdp-features-grid">
                  <div className="pdp-feature-item">
                    <CheckCircle2 size={18} className="pdp-check-icon" />
                    <span>{language === 'en' ? 'Balanced, highly bioavailable formula' : 'تركيبة متوازنة وسهلة الامتصاص'}</span>
                  </div>
                  <div className="pdp-feature-item">
                    <CheckCircle2 size={18} className="pdp-check-icon" />
                    <span>{language === 'en' ? 'Compensates daily feed deficiencies' : 'يعوض النقص الغذائي في الأعلاف'}</span>
                  </div>
                  <div className="pdp-feature-item">
                    <CheckCircle2 size={18} className="pdp-check-icon" />
                    <span>{language === 'en' ? 'Improves skin tone and coat shine' : 'يحسن مظهر الشعر والجلد'}</span>
                  </div>
                  <div className="pdp-feature-item">
                    <CheckCircle2 size={18} className="pdp-check-icon" />
                    <span>{language === 'en' ? 'Supports lean muscle conditioning' : 'يدعم بناء الكتلة العضلية'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dosage' && (
              <div className="pdp-tab-body">
                <div className="pdp-tab-header">
                  <div className="pdp-tab-icon-circle">
                    <Clock size={20} />
                  </div>
                  <h2 className="pdp-tab-title">
                    {language === 'en' ? 'Dosage & Feeding Instructions' : 'الجرعة وطريقة الاستخدام'}
                  </h2>
                </div>

                {(language === 'en' && fullProduct.moreInfoEn) ? (
                  <div
                    className="pdp-html-content"
                    dangerouslySetInnerHTML={{ __html: fullProduct.moreInfoEn }}
                  />
                ) : fullProduct.moreInfoAr ? (
                  <div
                    className="pdp-html-content"
                    dangerouslySetInnerHTML={{ __html: fullProduct.moreInfoAr }}
                  />
                ) : (
                  <>
                    <p className="pdp-tab-text">
                      {language === 'en'
                        ? 'Mix thoroughly with daily feed: 50g per day for adult horses in maintenance, and 100g per day during intense training or competition seasons.'
                        : 'يُخلط مع العلف اليومي بجرعة 50 جرام يومياً للخيول البالغة في فترات التدريب العادي، و100 جرام يومياً خلال فترات السباقات والمنافسات الشديدة.'}
                    </p>
                    <div className="pdp-dosage-tips">
                      <div className="pdp-tip-row">
                        <strong>{language === 'en' ? 'Maintenance & Light Work:' : 'خيول التدريب العادي:'}</strong>
                        <span>{language === 'en' ? '1 scoop (50g) daily with the morning ration.' : 'مغرفة واحدة (50 جم) يومياً مع الوجبة الصباحية.'}</span>
                      </div>
                      <div className="pdp-tip-row">
                        <strong>{language === 'en' ? 'Race & Endurance Horses:' : 'خيول السباق والقدرة:'}</strong>
                        <span>{language === 'en' ? '2 scoops (100g) split between morning and evening.' : 'مغرفتان (100 جم) تقسم بين الوجبة الصباحية والمسائية.'}</span>
                      </div>
                      <div className="pdp-tip-row">
                        <strong>{language === 'en' ? 'Foals & Young Stock:' : 'المهرات والخيول النامية:'}</strong>
                        <span>{language === 'en' ? '1/2 scoop (25g) daily until 2 years of age.' : 'نصف مغرفة (25 جم) يومياً حتى بلوغ عامين.'}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'features' && (
              <div className="pdp-tab-body">
                <div className="pdp-tab-header">
                  <div className="pdp-tab-icon-circle">
                    <Layers size={20} />
                  </div>
                  <h2 className="pdp-tab-title">
                    {language === 'en' ? 'Features & Active Ingredients' : 'المميزات والمواد الفعالة'}
                  </h2>
                </div>

                <p className="pdp-tab-text">
                  {language === 'en'
                    ? 'Features pharmaceutical-grade active compounds formulated to ensure optimum bioavailability and physiological benefit for your horse.'
                    : 'يحتوي هذا المركب على توليفة متقدمة من المكونات النشطة عالية النقاوة التي تضمن أعلى معدلات امتصاص واستفادة بيولوجية للحصان.'}
                </p>

                <div className="pdp-ingredients-list">
                  <div className="pdp-ingredient-card">
                    <h4 className="pdp-ing-name">
                      {language === 'en' ? 'Branched-Chain Amino Acids (BCAA)' : 'الأحماض الأمينية متفرعة السلسلة (BCAA)'}
                    </h4>
                    <p className="pdp-ing-desc">
                      {language === 'en'
                        ? 'Leucine, Isoleucine, and Valine accelerate muscle recovery and prevent catabolic breakdown.'
                        : 'الليوسين والإيزوليوسين والفالين لتسريع الاستشفاء العضلي ومنع الهدم بعد التمارين الشاقة.'}
                    </p>
                  </div>
                  <div className="pdp-ingredient-card">
                    <h4 className="pdp-ing-name">
                      {language === 'en' ? 'Vitamin E & Organic Selenium' : 'فيتامين E والسيلينيوم العضوي'}
                    </h4>
                    <p className="pdp-ing-desc">
                      {language === 'en'
                        ? 'Antioxidant defense system protecting myocytes against oxidative stress and strengthening immunity.'
                        : 'مضادات أكسدة قوية لحماية الخلايا العضلية من الإجهاد التأكسدي ودعم كفاءة الجهاز المناعي.'}
                    </p>
                  </div>
                  <div className="pdp-ingredient-card">
                    <h4 className="pdp-ing-name">
                      {language === 'en' ? 'Biotin & Chelated Zinc' : 'مركبات البيوتين والزنك المخلبي'}
                    </h4>
                    <p className="pdp-ing-desc">
                      {language === 'en'
                        ? 'Promotes robust hoof growth, prevents cracks, and yields a healthy, radiant sheen to coat.'
                        : 'لدعم صحة ونمو الحوافر ومنع التشققات وزيادة لمعان الفروة ونضارتها.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'warnings' && (
              <div className="pdp-tab-body">
                <div className="pdp-tab-header">
                  <div className="pdp-tab-icon-circle">
                    <AlertTriangle size={20} />
                  </div>
                  <h2 className="pdp-tab-title">
                    {language === 'en' ? 'Warnings & Precautions' : 'التحذيرات وموانع الاستخدام'}
                  </h2>
                </div>

                <div className="pdp-warnings-box">
                  <p className="pdp-warning-text">
                    {language === 'en'
                      ? '• Store in a cool, dry place below 25°C, away from direct sunlight.'
                      : '• يُحفظ في مكان بارد وجاف بدرجة حرارة لا تتجاوز 25 درجة مئوية، بعيداً عن أشعة الشمس المباشرة.'}
                  </p>
                  <p className="pdp-warning-text">
                    {language === 'en'
                      ? '• Keep container tightly closed after each use to protect potency and prevent moisture.'
                      : '• يجب إحكام إغلاق العبوة جيداً بعد كل استخدام للحفاظ على جودة المكونات ومنع الرطوبة.'}
                  </p>
                  <p className="pdp-warning-text">
                    {language === 'en'
                      ? '• For equine veterinary use only. Keep out of reach of children and other animals.'
                      : '• للاستخدام البيطري للخيول فقط، يُحفظ بعيداً عن متناول الأطفال والحيوانات الأخرى.'}
                  </p>
                  <p className="pdp-warning-text">
                    {language === 'en'
                      ? '• In case of any unexpected allergic reaction, discontinue use and consult your veterinarian.'
                      : '• في حال ظهور أي أعراض تحسسية غير متوقعة، يُرجى التوقف عن الاستخدام واستشارة الطبيب البيطري المختص.'}
                  </p>
                </div>
              </div>
            )}

          </main>

        </section>

        {/* =========================================================================
            4. SIMILAR PRODUCTS SECTION
            ========================================================================= */}
        <section className="pdp-similar-section">
          <div className="pdp-similar-header">
            <h2 className="pdp-similar-title">
              {language === 'en' ? 'Similar Products' : 'منتجات مشابهة'}
            </h2>
            <button
              type="button"
              className="pdp-view-all-btn"
              onClick={onBackToProducts}
            >
              <span>{language === 'en' ? 'View More' : 'عرض المزيد'}</span>
            </button>
          </div>

          <div className="pdp-similar-grid">
            {similarProducts.map((simProd) => {
              const simDisplayName = (language === 'en' && simProd.englishName) ? simProd.englishName : simProd.name;
              return (
                <article
                  key={simProd.id}
                  className="pdp-similar-card"
                  onClick={() => onSelectProduct(simProd)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onSelectProduct(simProd);
                  }}
                >
                  <div className="pdp-sim-img-box">
                    <img
                      src={simProd.imageUrl}
                      alt={simDisplayName}
                      className="pdp-sim-img"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = breezeUpImg;
                      }}
                    />
                  </div>

                  <h3 className="pdp-sim-title">{simDisplayName}</h3>
                  <p className="pdp-sim-desc">{simProd.description}</p>

                  <button
                    type="button"
                    className="pdp-sim-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(simProd);
                    }}
                  >
                    {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};


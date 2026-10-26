import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Product } from './ProductsPage';
import './AgentDetailPage.css';

export interface AgentData {
  id: number | string;
  name: string;
  englishName?: string;
  logoUrl: string;
  bannerUrl?: string;
  imageUrl: string;
  website?: string;
  catalogueUrl?: string;
  description: string;
  agentId?: number;
}

interface AgentDetailPageProps {
  agent?: AgentData | null;
  onBackToHome?: () => void;
  onSelectProduct?: (product: Product) => void;
}

const API_BASE_URL = 'https://www.ramzelsharq.com/dashboard/api';

// Curated default agents catalog with exact API IDs and metadata from https://www.ramzelsharq.com/dashboard/api/agents
export const AGENTS_CATALOG: Record<string, AgentData> = {
  'equine-uk': {
    id: 7,
    agentId: 7,
    name: 'اكوين',
    englishName: 'Equine Products UK LTD',
    logoUrl: 'https://equineproducts-ukltd.com/cdn/shop/files/EPUK_logo-1500px_157b5484-aee3-495d-ba80-d59532737dbe.png?v=1750930230&width=200',
    bannerUrl: 'https://equineproducts-ukltd.com/cdn/shop/files/EPUK_logo-1500px_157b5484-aee3-495d-ba80-d59532737dbe.png?v=1750930230&width=200',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0640/7523/5542/files/factory_1_1024x1024.jpg?v=1649858183',
    website: 'https://equineproducts-ukltd.com/',
    catalogueUrl: 'https://drive.google.com/file/d/199sZTv40OV9All5x69cfssM9CtfqGSIk/view',
    description: 'تأسست شركة Equine Products UK Ltd عام 1981، وهي متخصصة في توريد وتصنيع مكملات غذائية عالية الجودة لجميع تخصصات الفروسية حول العالم. بفضل مكاتبها ومركز التوزيع المتطور في نيوكاسل أبون تاين، نجمع بين عقود من الخبرة وأحدث التطورات في مجال تغذية الخيول لنقدم مكملات غذائية عالية الجودة تحظى بثقة مُلاك الخيول والمدربين والفرسان في جميع أنحاء العالم.',
  },
  'gain': {
    id: 6,
    agentId: 6,
    name: 'قين',
    englishName: 'GAIN Equine Nutrition',
    logoUrl: 'https://www.efflisburn.com/wp-content/uploads/go-x/u/8a4402ee-3a27-499b-9470-2e2b09fdd0ba/l0,t0,w669,h287/image.png',
    bannerUrl: 'https://www.efflisburn.com/wp-content/uploads/go-x/u/8a4402ee-3a27-499b-9470-2e2b09fdd0ba/l0,t0,w669,h287/image.png',
    imageUrl: 'https://www.gainanimalnutrition.com/wp-content/uploads/2022/11/GAIN-Trucks-01_V1-566x378.jpg',
    website: 'https://www.gainanimalnutrition.com/',
    catalogueUrl: 'https://drive.google.com/file/d/1QMDxNMePpEiudLyxH8q8SruJ3H0rEjTs/view',
    description: 'تفتخر شركة GAIN Equine Nutrition بسمعتها في تغذية بعضٍ من أعظم خيول السباق على مرّ التاريخ. ويُعدّ الجمع بين المواصفات الغذائية العالية والجودة الثابتة أمراً بالغ الأهمية للمساعدة في إطلاق العنان لإمكانات الخيول الرياضية.',
  },
  'farnam': {
    id: 8,
    agentId: 8,
    name: 'فارنام',
    englishName: 'Farnam',
    logoUrl: 'https://www.farnam.com/-/media/project/oneweb/farnam/images/logo/farnam-logo-png.png?h=204&iar=0&w=650&hash=DA92DF0F23E43680FEB62BAC7856AFF2',
    bannerUrl: 'https://www.farnam.com/-/media/project/oneweb/farnam/images/logo/farnam-logo-png.png?h=204&iar=0&w=650&hash=DA92DF0F23E43680FEB62BAC7856AFF2',
    imageUrl: 'https://www.farnam.com/-/media/project/oneweb/farnam/custom-image/image-gallery/instagram_image-(1).jpg?h=640&iar=0&w=640&hash=174B171E1F308C01064C1E1E5860D25E',
    website: 'https://www.farnam.com/',
    catalogueUrl: 'https://drive.google.com/file/d/1jDird3IiAu5xURA0hAnm3EwR4esjMA5R/view',
    description: 'تُعد Farnam من العلامات الرائدة في مجال العناية بالخيول، حيث تقدم منتجات مبتكرة وعالية الجودة لدعم صحة الخيول وسلامتها والعناية اليومية بها.',
  },
  'top-form': {
    id: 11,
    agentId: 11,
    name: 'توب فورم نيوتريشن',
    englishName: 'Top Form Nutrition',
    logoUrl: 'https://tfn-ukltd.com/pub/media/logo/default/logo.png',
    bannerUrl: 'https://tfn-ukltd.com/pub/media/logo/default/logo.png',
    imageUrl: 'https://tfn-ukltd.com/pub/media/magestore/bannerslider/images/r/a/racing-1.jpg',
    website: 'https://tfn-ukltd.com/',
    catalogueUrl: 'https://drive.google.com/file/d/1p4y8JfQFadyXFM0KLuxBB9_2TZarmDLz/view',
    description: 'مكملات التغذية لمساعدتك على تحقيق الإمكانات الرياضية الكاملة وإنتاج الفائزين البارزين في مختلف ميادين السباقات والبطولات العالمية.',
  },
  'kpp': {
    id: 9,
    agentId: 9,
    name: 'كنتاكي',
    englishName: 'Kentucky Performance Products',
    logoUrl: 'https://kppusa.com/wp-content/themes/kppusa/img/header-logo-home.jpg',
    bannerUrl: 'https://kppusa.com/wp-content/themes/kppusa/img/header-logo-home.jpg',
    imageUrl: 'https://kppusa.com/wp-content/uploads/2026/01/Front-page-jumper-1024x549.jpg',
    website: 'https://kppusa.com/',
    catalogueUrl: 'https://drive.google.com/file/d/1JjPMI1tW41N9SFpEO0VWN8r0yLU7xcpu/view',
    description: 'لأكثر من 25 عامًا، تلتزم شركة كنتاكي لمنتجات الأداء بإنتاج مكملات غذائية عالية الجودة ومثبتة علميًا لحل مشكلات صحة الخيل وأدائها.',
  },
  'tenda': {
    id: 2017,
    agentId: 2017,
    name: 'تندا',
    englishName: 'Tenda',
    logoUrl: 'https://tendaheal.com/wp-content/uploads/tenda-heal-logo-2.png',
    bannerUrl: 'https://tendaheal.com/wp-content/uploads/tenda-heal-logo-2.png',
    imageUrl: 'https://tendaheal.com/wp-content/uploads/tenda-heal-family-shot3.png',
    website: 'https://tendaheal.com/',
    catalogueUrl: '',
    description: 'تيندا (Tenda) هي شركة متخصصة في حلول الرعاية الصحية وعلاج الجروح، وتخدم قطاع الخيول الرياضية وخيول الأداء منذ أكثر من 45 عامًا.',
  },
  'kerckhaert': {
    id: 13,
    agentId: 13,
    name: 'مصنع كيركيرت الملكي للحدوات',
    englishName: 'KERCKHAERT',
    logoUrl: 'https://kerckhaert.com/hubfs/KerckhaertBlauw.svg',
    bannerUrl: 'https://kerckhaert.com/hubfs/KerckhaertBlauw.svg',
    imageUrl: 'https://kerckhaert.com/hs-fs/hubfs/Kerckhaert/brands/Kerckhaert/KH_landingspage_900x380.jpg?width=900&height=380&name=KH_landingspage_900x380.jpg',
    website: 'https://kerckhaert.com/',
    catalogueUrl: 'https://kerckhaert.com/catalogues',
    description: 'تأسست الشركة العائلية عام 1906 على يد الجد الأكبر أونوريه كيركيرت، وقد نمت على مر السنين على الصعيد الدولي لتصبح أكبر شركة مستقلة لتصنيع حدوات الخيل في العالم.',
  },
};

// Fallback curated products for Equine Products UK in case of network issues
const EQUINE_FALLBACK_PRODUCTS: Product[] = [
  {
    id: 4342,
    name: 'إكوي شاين برو كوارتر',
    englishName: 'Equi-Shine Pro Quarter',
    description: 'مكملات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
    imageUrl: 'https://equineproducts-ukltd.com/cdn/shop/files/relax_copy.jpg?v=1774514788',
    categoryId: 19,
    categoryName: 'المكملات الغذائية',
    agentName: 'Equine Products UK',
  },
  {
    id: 4341,
    name: 'دي إم جي 6060',
    englishName: 'DMG 6060',
    description: 'مكملات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
    imageUrl: 'https://equineproducts-ukltd.com/cdn/shop/files/47_261eed3c-2450-4341-98e3-13a35ac2ba39.png?v=1734695857',
    categoryId: 19,
    categoryName: 'المكملات الغذائية',
    agentName: 'Equine Products UK',
  },
  {
    id: 4340,
    name: 'تايجر تونج',
    englishName: 'Tiger Tongue Sponge',
    description: 'مكملات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
    imageUrl: 'https://equineproducts-ukltd.com/cdn/shop/files/35_60dfa11c-6c6e-484b-85e2-8a6370cfa320.png?v=1734690102',
    categoryId: 19,
    categoryName: 'المكملات الغذائية',
    agentName: 'Equine Products UK',
  },
  {
    id: 4144,
    name: 'فاسل حبكتر',
    englishName: 'Restore-Lyte Plus',
    description: 'مكملات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
    imageUrl: 'https://equineproducts-ukltd.com/cdn/shop/files/8_97249dd5-4a00-4c94-b6d2-dc4f7ca91f04.png?v=1737548730',
    categoryId: 19,
    categoryName: 'المكملات الغذائية',
    agentName: 'Equine Products UK',
  },
  {
    id: 4115,
    name: 'بيو تريشن ZMC المتطور',
    englishName: 'Bio-Trition ZMC Advanced',
    description: 'تركيبة غذائية تكميلية لدعم نمو الحوافر السليمة وتقوية نسيج الكيراتين بمستويات عالية من البيوتين.',
    imageUrl: 'https://equineproducts-ukltd.com/cdn/shop/files/141.png?v=1734693483',
    categoryId: 19,
    categoryName: 'المكملات الغذائية',
    agentName: 'Equine Products UK',
  },
  {
    id: 4116,
    name: 'ريلاكس كولانت كلاي',
    englishName: 'Relax Coolant Clay',
    description: 'طين تبريد مائي طبيعي جاهز للاستخدام لتخفيف التورم والإجهاد في أوتار وقوائم الخيل بعد التمارين.',
    imageUrl: 'https://equineproducts-ukltd.com/cdn/shop/files/relax_copy.jpg?v=1774514788',
    categoryId: 19,
    categoryName: 'المكملات الغذائية',
    agentName: 'Equine Products UK',
  },
  {
    id: 4117,
    name: 'فاريرز فريند زيت الحوافر',
    englishName: 'Farriers Friend Hoof Oil',
    description: 'مزيج تقليدي متوازن للحفاظ على رطوبة وليونة الحوافر في الطقس الجاف وحمايتها من الرطوبة الزائدة.',
    imageUrl: 'https://equineproducts-ukltd.com/cdn/shop/files/35_60dfa11c-6c6e-484b-85e2-8a6370cfa320.png?v=1734690102',
    categoryId: 19,
    categoryName: 'المكملات الغذائية',
    agentName: 'Equine Products UK',
  },
  {
    id: 4118,
    name: 'شريط فلير الأنفي',
    englishName: 'FLAIR® Nasal Strip',
    description: 'شريط أنفي طبي لتوسيع المجاري الهوائية وتقليل مقاومة التنفس أثناء السباقات والتمرين المكثف.',
    imageUrl: 'https://equineproducts-ukltd.com/cdn/shop/files/47_261eed3c-2450-4341-98e3-13a35ac2ba39.png?v=1734695857',
    categoryId: 19,
    categoryName: 'المكملات الغذائية',
    agentName: 'Equine Products UK',
  },
];

export const AgentDetailPage: React.FC<AgentDetailPageProps> = ({
  agent: initialAgent,
  onBackToHome,
  onSelectProduct,
}) => {
  const { language } = useLanguage();
  // Determine current active agent, defaulting to Equine Products UK
  const activeAgent: AgentData = initialAgent || AGENTS_CATALOG['equine-uk'];

  const [currentAgent, setCurrentAgent] = useState<AgentData>(activeAgent);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (initialAgent) {
      setCurrentAgent(initialAgent);
    }

    // Synchronize live agent details from API to ensure official logo and image URLs
    let isMounted = true;
    const fetchLiveAgent = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/agents?lang=ar&locale=ar&pageSize=100`);
        if (res.ok) {
          const json = await res.json();
          const items = json?.data?.items || json?.items || [];
          const targetId = initialAgent?.agentId || initialAgent?.id || activeAgent.id;
          const match = items.find((a: any) => 
            Number(a.id) === Number(targetId) || 
            (initialAgent?.name && a.name && (
              a.name.toLowerCase().includes(initialAgent.name.toLowerCase()) ||
              initialAgent.name.toLowerCase().includes(a.name.toLowerCase())
            ))
          );
          if (match && isMounted) {
            setCurrentAgent(prev => ({
              ...prev,
              id: match.id,
              agentId: match.id,
              name: match.name?.trim() || prev.name,
              logoUrl: match.logoUrl || prev.logoUrl,
              bannerUrl: match.logoUrl || prev.bannerUrl,
              imageUrl: match.imageUrl || prev.imageUrl,
              website: match.website || prev.website,
              catalogueUrl: match.catalogueUrl || prev.catalogueUrl,
              description: match.description || prev.description,
            }));
          }
        }
      } catch (e) {
        console.warn('Could not sync live agent from API:', e);
      }
    };

    fetchLiveAgent();

    return () => {
      isMounted = false;
    };
  }, [initialAgent]);

  // Fetch agent products dynamically from the API
  useEffect(() => {
    let isMounted = true;
    const fetchAgentProducts = async () => {
      setLoading(true);

      // Determine numeric agent ID
      const targetAgentId = currentAgent.agentId || currentAgent.id || 7;

      try {
        const response = await fetch(
          `${API_BASE_URL}/products?agentId=${targetAgentId}&pageSize=24`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();
        const items = data?.data?.items || data?.items || [];

        if (items.length > 0) {
          const mappedProducts: Product[] = items.map((item: any) => ({
            id: item.id,
            name: item.name || item.nameAr || 'منتج متميز',
            englishName: item.englishName || item.nameEn || item.name,
            description:
              item.description ||
              item.descriptionAr ||
              'مكملات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
            imageUrl: item.imageUrl || '/images/products/bronco-e.jpg',
            categoryId: item.categoryId || 19,
            categoryName: item.categoryName || 'المكملات الغذائية',
            agentName: item.agentName || currentAgent.name,
            agentId: item.agentId || targetAgentId,
            isBestSeller: Boolean(item.isBestSeller),
            moreInfoAr: item.moreInfoAr,
            moreInfoEn: item.moreInfoEn,
            images: item.images,
          }));

          if (isMounted) {
            setProducts(mappedProducts);
            setLoading(false);
          }
          return;
        }

        // If API returned empty for this specific agent, use curated fallback
        if (isMounted) {
          setProducts(EQUINE_FALLBACK_PRODUCTS);
          setLoading(false);
        }
      } catch (err: any) {
        console.warn('API error loading agent products, loading fallback:', err);
        if (isMounted) {
          setProducts(EQUINE_FALLBACK_PRODUCTS);
          setLoading(false);
        }
      }
    };

    fetchAgentProducts();

    return () => {
      isMounted = false;
    };
  }, [currentAgent]);

  return (
    <div className="agent-page-root" dir="rtl">
      <div className="agent-page-container">
        
        {/* Navigation Breadcrumb & Back Action */}
        <nav className="agent-breadcrumb-nav" aria-label="مسار التنقل">
          <div className="agent-breadcrumbs">
            <button
              onClick={onBackToHome}
              className="agent-breadcrumb-link"
              type="button"
            >
              الرئيسية
            </button>
            <span className="agent-breadcrumb-separator">/</span>
            <button
              onClick={onBackToHome}
              className="agent-breadcrumb-link"
              type="button"
            >
              شركاؤنا
            </button>
            <span className="agent-breadcrumb-separator">/</span>
            <span className="agent-breadcrumb-current">
              {currentAgent.englishName || currentAgent.name}
            </span>
          </div>

          <button
            onClick={onBackToHome}
            className="agent-back-btn"
            type="button"
          >
            <span>{language === 'ar' ? 'العودة للشركاء' : 'Back to Partners'}</span>
          </button>
        </nav>

        {/* 1. Top Brand Banner (Luxury White Showcase Stage) */}
        <div className="agent-brand-banner">
          <div className="agent-brand-logo-frame">
            <img
              src={currentAgent.logoUrl || currentAgent.bannerUrl}
              alt={currentAgent.englishName || currentAgent.name}
              className="agent-brand-logo-img"
              loading="eager"
            />
          </div>
        </div>

        {/* 2. Middle Profile Card (Matches Exact Screenshot) */}
        <div className="agent-profile-card">
          {/* Left Column: Image with Decorative Curved Corner Border */}
          <div className="agent-image-col">
            <div className="agent-image-wrapper">
              <div className="agent-image-frame">
                <img
                  src={currentAgent.imageUrl || '/images/partners/equine-factory.jpg'}
                  alt={currentAgent.name}
                  className="agent-team-img"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to factory or banner if image fails
                    (e.currentTarget as HTMLImageElement).src = '/images/partners/equine-factory.jpg';
                  }}
                />
              </div>
              {/* Distinctive navy curved line framing bottom-left corner */}
              <div className="agent-image-corner-accent" aria-hidden="true" />
            </div>
          </div>

          {/* Right Column: Authorized Badge, Description & Actions */}
          <div className="agent-info-col">
            <div className="agent-badge-pill">
              <span className="agent-badge-dot" />
              وكيل معتمد
            </div>

            <p className="agent-description-text">
              {currentAgent.description}
            </p>

            <div className="agent-actions-row">
              {currentAgent.catalogueUrl ? (
                <a
                  href={currentAgent.catalogueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="agent-read-more-link"
                >
                  <span>اقرأ المزيد</span>
                  <span className="arrow-icon">
                    <ArrowLeft size={16} />
                  </span>
                </a>
              ) : currentAgent.website ? (
                <a
                  href={currentAgent.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="agent-read-more-link"
                >
                  <span>اقرأ المزيد</span>
                  <span className="arrow-icon">
                    <ArrowLeft size={16} />
                  </span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('agent-products-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="agent-read-more-link"
                >
                  <span>اقرأ المزيد</span>
                  <span className="arrow-icon">
                    <ArrowLeft size={16} />
                  </span>
                </button>
              )}

              {currentAgent.website && (
                <a
                  href={currentAgent.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="agent-secondary-link"
                  title="زيارة الموقع الرسمي"
                >
                  <span>الموقع الرسمي</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {currentAgent.catalogueUrl && (
                <a
                  href={currentAgent.catalogueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="agent-secondary-link"
                  title="تحميل الكتالوج"
                >
                  <span>الكتالوج</span>
                  <Download size={14} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 3. Agent Products Section ("منتجات الوكيل") */}
        <section
          id="agent-products-grid"
          className="agent-products-section"
          aria-labelledby="agent-products-heading"
        >
          <div className="agent-products-header">
            <h2 id="agent-products-heading" className="agent-products-title">
              منتجات الوكيل
            </h2>
            <p className="agent-products-subtitle">
              استعراض مجموعة مختارة من أفضل منتجات {currentAgent.englishName || currentAgent.name}
            </p>
          </div>

          {/* 4-Column Product Grid */}
          <div className="agent-products-grid">
            {loading ? (
              <div className="agent-loading-container">
                <div className="agent-spinner" />
                <p>جاري تحميل منتجات الوكيل من الخادم...</p>
              </div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <article key={product.id} className="agent-product-card">
                  {/* Product Packshot Image */}
                  <div className="agent-product-image-box">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="agent-product-img"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/products/bronco-e.jpg';
                      }}
                    />
                  </div>

                  {/* Product Title */}
                  <h3 className="agent-product-name" title={product.name}>
                    {product.name}
                  </h3>

                  {/* Product Short Description */}
                  <p className="agent-product-desc" title={product.description}>
                    {product.description}
                  </p>

                  {/* Details Action Button */}
                  <button
                    type="button"
                    className="agent-product-btn"
                    onClick={() => onSelectProduct?.(product)}
                  >
                    عرض التفاصيل
                  </button>
                </article>
              ))
            ) : (
              <div className="agent-empty-container">
                <p>لا توجد منتجات مسجلة لهذا الوكيل حالياً.</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

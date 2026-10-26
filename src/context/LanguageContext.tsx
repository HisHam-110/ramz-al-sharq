import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

export interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation & Header
  searchPlaceholder: {
    ar: 'ابحث عن المنتجات',
    en: 'Search products...',
  },
  contactUs: {
    ar: 'تواصل معنا',
    en: 'Contact Us',
  },
  navHome: {
    ar: 'الرئيسية',
    en: 'Home',
  },
  navAbout: {
    ar: 'من نحن',
    en: 'About Us',
  },
  navProducts: {
    ar: 'المنتجات',
    en: 'Products',
  },
  navArticles: {
    ar: 'المقالات',
    en: 'Articles',
  },
  navContact: {
    ar: 'تواصل معنا',
    en: 'Contact Us',
  },
  catDropdownFeeds: {
    ar: 'أعلاف ومكملات غذائية',
    en: 'Feeds & Supplements',
  },
  catDropdownFeedsDesc: {
    ar: 'تغذية فائقة الجودة لجميع السلالات',
    en: 'Superior nutrition for all equine breeds',
  },
  catDropdownSaddles: {
    ar: 'السروج ومستلزمات الركوب',
    en: 'Saddles & Riding Gear',
  },
  catDropdownSaddlesDesc: {
    ar: 'سروج جلدية فاخرة ولجام أصيل',
    en: 'Luxury leather saddles and authentic bridles',
  },
  catDropdownCare: {
    ar: 'العناية والنظافة والفرش',
    en: 'Care, Grooming & Bedding',
  },
  catDropdownCareDesc: {
    ar: 'أدوات تنظيف وعناية متكاملة',
    en: 'Complete grooming and care equipment',
  },
  catDropdownStables: {
    ar: 'مستلزمات الإسطبلات',
    en: 'Stable Supplies',
  },
  catDropdownStablesDesc: {
    ar: 'معدات وإكسسوارات إسطبلات الخيل',
    en: 'Equestrian stable accessories and equipment',
  },

  // Hero Section
  heroTitle1: {
    ar: 'رمز الشرق للتجارة',
    en: 'Ramz Al Sharq Trading',
  },
  heroDesc1: {
    ar: 'الوجهة الرائدة الأولى في المملكة لمستلزمات الخيل والفروسية، نوفر أجود المنتجات العالمية والمكملات الغذائية لدعم صحة وأداء خيلك بأعلى معايير الجودة.',
    en: "The Kingdom's premier destination for horse and equestrian supplies, providing world-class nutritional supplements and care products for peak performance.",
  },
  heroTitle2: {
    ar: 'أعلاف ومكملات متطورة',
    en: 'Advanced Nutrition & Care',
  },
  heroDesc2: {
    ar: 'مجموعة مختارة بعناية من أفضل الماركات العالمية تضمن النشاط والحيوية والقوة لخيل السباق والجمال والقفز.',
    en: 'A carefully curated selection of leading global brands ensuring stamina, vitality, and power for race, show, and jumping horses.',
  },
  heroTitle3: {
    ar: 'شراكات عالمية موثوقة',
    en: 'Trusted Global Partnerships',
  },
  heroDesc3: {
    ar: 'وكلاء معتمدون لكبرى الشركات العالمية المتخصصة في التغذية والرعاية البيطرية للخيول داخل المملكة والخليج العربي.',
    en: 'Authorized distributors for world-renowned equine nutrition and veterinary care manufacturers across Saudi Arabia and the Gulf.',
  },
  chatWhatsApp: {
    ar: 'تواصل عبر واتساب',
    en: 'Chat on WhatsApp',
  },
  exploreProducts: {
    ar: 'استكشف المنتجات',
    en: 'Explore Products',
  },
  heroCard1Title: {
    ar: 'خبرة رائدة',
    en: 'Leading Experience',
  },
  heroCard1Desc: {
    ar: 'أكثر من 15 عاماً من التميز والريادة في خدمة ملاك ومربي الخيل بالمملكة',
    en: 'Over 15 years of excellence serving horse owners and breeders in Saudi Arabia',
  },
  heroCard2Title: {
    ar: 'منتجات معتمدة',
    en: 'Certified Products',
  },
  heroCard2Desc: {
    ar: 'أكثر من 500+ منتج عالي الجودة من أفضل المصانع العالمية المتخصصة',
    en: 'Over 500+ premium products from top international specialized manufacturers',
  },
  heroCard3Title: {
    ar: 'شركاء عالميين',
    en: 'Global Partners',
  },
  heroCard3Desc: {
    ar: 'وكلاء حصريون ومعتمدون لأكبر العلامات التجارية الأوروبية والأمريكية',
    en: 'Exclusive & authorized distributors for major European and American brands',
  },

  // Categories
  categoriesTitle: {
    ar: 'التصنيفات',
    en: 'Categories',
  },
  categoriesSubtitle: {
    ar: 'تصفح تشكيلتنا الشاملة من منتجات الخيل والفروسية المصممة بعناية لتلبية أعلى معايير الجودة العالمية',
    en: 'Browse our comprehensive range of equestrian supplies crafted to meet top international quality standards',
  },

  // Why Choose Us
  whyUsTitle: {
    ar: 'لماذا رمز الشرق ؟',
    en: 'Why Ramz Al Sharq?',
  },
  whyUsSubtitle: {
    ar: 'من الأعلاف الطبيعية الموزونة إلى أفضل معدات الفروسية، نحرص على تقديم كل ما يضمن صحة خيلك وأدائه المتميز.',
    en: "From balanced natural feeds to premier equestrian gear, we ensure your horse's optimal health and peak performance.",
  },
  whySupport: {
    ar: 'دعم متواصل',
    en: '24/7 Support',
  },
  whySupportDesc: {
    ar: 'اهتمام بأدق التفاصيل ومواصفات عالمية في كل منتج',
    en: 'Continuous expert consultation and dedicated customer care',
  },
  whyDelivery: {
    ar: 'توصيل سريع',
    en: 'Fast Delivery',
  },
  whyDeliveryDesc: {
    ar: 'اهتمام بأدق التفاصيل ومواصفات عالمية في كل منتج',
    en: 'Swift dispatch and careful handling across all regions',
  },
  whyExpertise: {
    ar: 'خبرة واسعة',
    en: 'Deep Expertise',
  },
  whyExpertiseDesc: {
    ar: 'اهتمام بأدق التفاصيل ومواصفات عالمية في كل منتج',
    en: 'Decades of specialized knowledge in horse health and nutrition',
  },
  whyQuality: {
    ar: 'جودة عالية',
    en: 'Premium Quality',
  },
  whyQualityDesc: {
    ar: 'اهتمام بأدق التفاصيل ومواصفات عالمية في كل منتج',
    en: 'Rigorous quality standards and certified international products',
  },

  // Products Section
  productsTitle: {
    ar: 'منتجاتنا',
    en: 'Our Products',
  },
  productsSubtitle: {
    ar: 'نقدم تشكيلة مختارة من أفضل المكملات الغذائية والأعلاف العالمية لدعم صحة ولياقة الخيل',
    en: 'A handpicked selection of top international feeds and supplements to support horse fitness and vitality',
  },
  viewAll: {
    ar: 'عرض الكل',
    en: 'View All',
  },
  viewDetails: {
    ar: 'عرض التفاصيل',
    en: 'View Details',
  },

  // Partners
  partnersTitle: {
    ar: 'شركاؤنا العالميين',
    en: 'Our Global Partners',
  },
  partnersSubtitle: {
    ar: 'نفخر بتمثيل كبرى الشركات والعلامات التجارية العالمية الرائدة في مجال تغذية ورعاية الخيل',
    en: "Proudly representing the world's leading brands in equine nutrition and veterinary care",
  },

  // Quotes
  quotesTitle: {
    ar: 'أقوال وحكم من عالم الخيل والفروسية',
    en: 'Wisdom from the Equestrian World',
  },

  // Articles
  articlesTitle: {
    ar: 'أحدث المقالات',
    en: 'Latest Articles',
  },
  articlesSubtitle: {
    ar: 'نصائح وإرشادات علمية متخصصة في رعاية وتغذية وتدريب الخيل مقدمة من خبرائنا',
    en: 'Expert scientific advice and practical insights on horse nutrition, care, and training',
  },
  readMore: {
    ar: 'قراءة المزيد',
    en: 'Read More',
  },

  // Footer
  footerDesc: {
    ar: 'شركة رمز الشرق للتجارة، رواد في استيراد وتوزيع أجود أنواع أعلاف ومكملات ومستلزمات الخيل في المملكة العربية السعودية.',
    en: 'Ramz Al Sharq Trading Co., leaders in importing and distributing premium horse feeds, supplements, and equestrian supplies across Saudi Arabia.',
  },
  quickLinks: {
    ar: 'روابط سريعة',
    en: 'Quick Links',
  },
  contactInfo: {
    ar: 'معلومات التواصل',
    en: 'Contact Information',
  },
  addressText: {
    ar: 'المملكة العربية السعودية، الرياض، الملز',
    en: 'Riyadh, Al-Malaz, Kingdom of Saudi Arabia',
  },
  copyrightText: {
    ar: 'جميع الحقوق محفوظة © رمز الشرق للتجارة',
    en: 'All Rights Reserved © Ramz Al Sharq Trading',
  },
  privacyPolicy: {
    ar: 'سياسة الخصوصية',
    en: 'Privacy Policy',
  },
  termsConditions: {
    ar: 'الشروط والأحكام',
    en: 'Terms & Conditions',
  },

  // Products Page & Detail Page
  allProductsTitle: {
    ar: 'جميع المنتجات',
    en: 'All Products',
  },
  allProductsDesc: {
    ar: 'اكتشف مجموعتنا الكاملة من منتجات وأعلاف ومكملات الخيل عالية الجودة',
    en: 'Discover our complete catalog of premium equine feeds, supplements, and care products',
  },
  filterCategories: {
    ar: 'الفئات',
    en: 'Categories',
  },
  allCategoriesTab: {
    ar: 'جميع المنتجات',
    en: 'All Products',
  },
  filterSearchInput: {
    ar: 'ابحث عن المنتجات بالاسم أو الفئة...',
    en: 'Search products by name or category...',
  },
  orderViaWhatsApp: {
    ar: 'الطلب عن طريق واتساب',
    en: 'Order via WhatsApp',
  },
  orderProductWhatsApp: {
    ar: 'طلب المنتج عبر واتساب',
    en: 'Order via WhatsApp',
  },
  quickWhatsApp: {
    ar: 'طلب سريع عبر واتساب',
    en: 'Quick WhatsApp Order',
  },
  backToProducts: {
    ar: 'العودة للمنتجات',
    en: 'Back to Products',
  },
  backToHome: {
    ar: 'العودة للرئيسية',
    en: 'Back to Home',
  },
  productDetailsTab: {
    ar: 'معلومات المنتج',
    en: 'Product Information',
  },
  keyBenefitsTab: {
    ar: 'المميزات والفوائد',
    en: 'Benefits & Features',
  },
  usageInstructionsTab: {
    ar: 'تعليمات الاستخدام والجرعات',
    en: 'Feeding & Usage Instructions',
  },
  nutritionalCompositionTab: {
    ar: 'التحليل الغذائي والمكونات',
    en: 'Nutritional Composition',
  },
  certifiedQuality: {
    ar: 'جودة معتمدة',
    en: 'Certified Quality',
  },
  fastShipping: {
    ar: 'شحن سريع وآمن',
    en: 'Fast & Secure Shipping',
  },

  // Floating Actions
  whatsappFloatingTooltip: {
    ar: 'تواصل معنا عبر واتساب',
    en: 'Chat with us on WhatsApp',
  },
  scrollTopFloatingTooltip: {
    ar: 'العودة للأعلى',
    en: 'Back to Top',
  },
};

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang === 'ar' || urlLang === 'en') {
        localStorage.setItem('rasco_lang', urlLang);
        return urlLang;
      }
    } catch (_e) {
      // ignore
    }
    const saved = localStorage.getItem('rasco_lang');
    return saved === 'en' ? 'en' : 'ar';
  });

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    // Sync HTML document direction and lang
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('rasco_lang', language);

    // Apply or remove body class for targeted CSS styling
    if (language === 'en') {
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-ar');
    } else {
      document.body.classList.add('lang-ar');
      document.body.classList.remove('lang-en');
    }
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || key;
    }
    return key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      <div className={`rasco-app-root dir-${direction} lang-${language}`} dir={direction}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

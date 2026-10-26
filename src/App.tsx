import { useState, useEffect } from 'react';
import {
  Header,
  Hero,
  Categories,
  WhyChooseUs,
  Products,
  Partners,
  Quotes,
  Articles,
  Footer,
  FloatingActions,
} from './components';
import {
  PrivacyPolicy,
  TermsConditions,
  ContactPage,
  AboutPage,
  KnowledgeCenter,
  ProductsPage,
  ProductDetailPage,
  ArticleDetailPage,
  AgentDetailPage,
  NotFoundPage,
  type Product,
  type ArticleData,
  type AgentData,
  AGENTS_CATALOG,
} from './pages';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';

const DEFAULT_BRONCO_PRODUCT: Product = {
  id: 'bronco-e',
  name: 'Bronco e',
  englishName: 'Bronco e Equine Fly Spray',
  description: 'بخاخ مضاد للذباب للخيول برائحة السترونيلا تغطية شاملة لحصانك وإسطبلك.',
  imageUrl: '/images/products/bronco-e.jpg',
  categoryId: 30,
  categoryName: 'الأعلاف والمكملات الغذائية',
  agentName: 'GAIN',
  isBestSeller: true,
};

type PageType =
  | 'home'
  | 'privacy'
  | 'terms'
  | 'contact'
  | 'about'
  | 'articles'
  | 'article-detail'
  | 'products'
  | 'product-detail'
  | 'agent-detail'
  | '404';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [attemptedPath, setAttemptedPath] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product>(DEFAULT_BRONCO_PRODUCT);
  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentData>(AGENTS_CATALOG['equine-uk']);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '';
      const pathname = window.location.pathname || '/';

      // Known Home section anchors
      const homeValidAnchors = ['', '#', '#/', '#home', '#categories', '#why-choose-us', '#partners', '#quotes', '#footer'];

      if (homeValidAnchors.includes(hash)) {
        if (pathname !== '/' && pathname !== '/index.html') {
          setAttemptedPath(pathname);
          setCurrentPage('404');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        setCurrentPage('home');
      } else if (hash === '#privacy') {
        setCurrentPage('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#terms') {
        setCurrentPage('terms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#contact' || hash === '#locations') {
        setCurrentPage('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#about') {
        setCurrentPage('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#articles' || hash === '#knowledge') {
        setCurrentPage('articles');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#article' || hash.startsWith('#article')) {
        setCurrentPage('article-detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#products' || hash === '#all-products') {
        setCurrentPage('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#product')) {
        setCurrentPage('product-detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#agent')) {
        const agentKey = hash.replace('#agent-', '').replace('#agent', '');
        if (agentKey && AGENTS_CATALOG[agentKey]) {
          setSelectedAgent(AGENTS_CATALOG[agentKey]);
        } else if (agentKey) {
          const found = Object.values(AGENTS_CATALOG).find(
            (a) => a.id.toString() === agentKey || a.agentId?.toString() === agentKey
          );
          if (found) setSelectedAgent(found);
        }
        setCurrentPage('agent-detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Any unrecognized hash (e.g. #contac, #test, etc.)
        setAttemptedPath(hash);
        setCurrentPage('404');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    window.location.hash =
      page === 'privacy'
        ? '#privacy'
        : page === 'terms'
        ? '#terms'
        : page === 'contact'
        ? '#contact'
        : page === 'about'
        ? '#about'
        : page === 'articles'
        ? '#articles'
        : page === 'article-detail'
        ? '#article-detail'
        : page === 'products'
        ? '#products'
        : page === 'product-detail'
        ? '#product-detail'
        : page === 'agent-detail'
        ? '#agent-detail'
        : page === '404'
        ? '#404'
        : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.location.hash = `#product-${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAgent = (partnerIdOrAgent: string | AgentData) => {
    let agentToSet = AGENTS_CATALOG['equine-uk'];
    if (typeof partnerIdOrAgent === 'string') {
      if (AGENTS_CATALOG[partnerIdOrAgent]) {
        agentToSet = AGENTS_CATALOG[partnerIdOrAgent];
      } else {
        const found = Object.values(AGENTS_CATALOG).find(
          (a) => a.id.toString() === partnerIdOrAgent || a.agentId?.toString() === partnerIdOrAgent
        );
        if (found) agentToSet = found;
      }
    } else if (partnerIdOrAgent) {
      agentToSet = partnerIdOrAgent;
    }

    setSelectedAgent(agentToSet);
    setCurrentPage('agent-detail');
    const slug = Object.keys(AGENTS_CATALOG).find(
      (k) => AGENTS_CATALOG[k].id === agentToSet.id
    ) || agentToSet.id;
    window.location.hash = `#agent-${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (art: any) => {
    if (art.category && art.image && (art.timeDate || art.author?.name)) {
      setSelectedArticle(art as ArticleData);
    } else {
      const mapped: ArticleData = {
        id: art.id,
        title: art.titleAr || art.title || 'أساسيات العناية بحوافر الخيل للحفاظ على صحة الحصان',
        category: art.tagAr || art.category || art.badgeLabel || 'الصحة',
        badgeLabel: art.tagAr || art.badgeLabel || 'الصحة',
        badgeType: art.tagType || art.badgeType || 'health',
        timeDate: art.dateAr ? `${art.dateAr} • 10:32 صباحاً` : (art.timeDate || '9 مارس 2026 • 10:32 صباحاً'),
        image: art.id === 'article-2' ? '/images/articles/saudi-cup-hoof-care.jpg' : (art.image || '/images/articles/saudi-cup-hoof-care.jpg'),
        author: {
          name: art.authorAr || (typeof art.author === 'string' ? art.author : art.author?.name) || 'أ.م.د. عمرو بكر',
          role: art.authorRoleAr || 'استشاري جراحة ورعاية خيول',
        },
        excerpt: art.descriptionAr || art.excerpt || '',
        content: art.content,
      };
      setSelectedArticle(mapped);
    }
    setCurrentPage('article-detail');
    window.location.hash = `#article-${art.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      <div className="app-layout">
        {/* Rasco Official Header */}
        <Header onNavigate={navigateTo} />

        {/* Main Page Content, Privacy Policy, Terms & Conditions, Contact Page, or About Page */}
        {currentPage === 'home' && (
          <main>
            {/* 1. Hero Section with Interactive Carousel */}
            <Hero />

            {/* 2. Categories Section (التصنيفات) */}
            <Categories />

            {/* 3. Why Choose Us Section (لماذا رمز الشرق ؟) with Video */}
            <WhyChooseUs />

            {/* 4. Products Section (منتجاتنا) */}
            <Products
              onViewAll={() => navigateTo('products')}
              onSelectProduct={handleSelectProduct}
            />

            {/* 5. Global Partners Section (شركاؤنا العالميين) with Infinite Carousel */}
            <Partners onSelectPartner={handleSelectAgent} />

            {/* 6. Equestrian Quotes Section (أقوال وحكم من عالم الخيل والفروسية) */}
            <Quotes />

            {/* 7. Latest Articles Carousel (أحدث المقالات) */}
            <Articles 
              onViewAll={() => {
                setSelectedArticle(null);
                navigateTo('articles');
              }} 
              onSelectArticle={handleSelectArticle}
            />
          </main>
        )}

        {currentPage === 'about' && (
          <AboutPage onBackToHome={() => navigateTo('home')} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onBackToHome={() => navigateTo('home')} />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicy onBackToHome={() => navigateTo('home')} />
        )}

        {currentPage === 'terms' && (
          <TermsConditions onBackToHome={() => navigateTo('home')} />
        )}

        {currentPage === 'articles' && (
          <KnowledgeCenter
            onBackToHome={() => navigateTo('home')}
            onNavigateToContact={() => navigateTo('contact')}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentPage === 'article-detail' && (
          <ArticleDetailPage
            article={selectedArticle}
            onBackToHome={() => navigateTo('home')}
            onBackToArticles={() => {
              setSelectedArticle(null);
              navigateTo('articles');
            }}
            onSelectArticle={handleSelectArticle}
            onSelectProduct={handleSelectProduct}
            onViewAllProducts={() => navigateTo('products')}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            onBackToHome={() => navigateTo('home')}
            onNavigateToContact={() => navigateTo('contact')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBackToProducts={() => navigateTo('products')}
            onBackToHome={() => navigateTo('home')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'agent-detail' && (
          <AgentDetailPage
            agent={selectedAgent}
            onBackToHome={() => navigateTo('home')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === '404' && (
          <NotFoundPage
            onBackToHome={() => navigateTo('home')}
            onNavigate={(page) => navigateTo(page as PageType)}
            attemptedPath={attemptedPath}
          />
        )}

        {/* Official Rasco Footer */}
        <Footer onNavigate={navigateTo} />

        {/* Floating Bottom Actions (WhatsApp on Right, Scroll-To-Top on Left) */}
        <FloatingActions />
      </div>
    </LanguageProvider>
  );
}

export default App;

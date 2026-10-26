import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  X,
  Loader2,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ProductsPage.css';

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

// Local high-res fallback product images
import breezeUpImg from '/images/products/breeze-up.jpg';
import calaviteImg from '/images/products/calavite.jpg';
import freedomCubesImg from '/images/products/freedom-cubes.jpg';
import optimaBcaaImg from '/images/products/optima-bcaa.jpg';

export interface Product {
  id: number | string;
  name: string;
  englishName?: string;
  description: string;
  imageUrl: string;
  categoryId: number | string;
  categoryName: string;
  agentId?: number | string | null;
  agentName?: string;
  isBestSeller?: boolean;
  moreInfoAr?: string | null;
  moreInfoEn?: string | null;
  images?: Array<{ id: number; imageUrl: string; isMain?: boolean }>;
}

export interface Category {
  id: number | string;
  name: string;
  count: number;
}

export interface Partner {
  id: number | string;
  name: string;
  logoUrl?: string;
}

interface ProductsPageProps {
  onBackToHome?: () => void;
  onNavigateToContact?: () => void;
  onSelectProduct?: (product: Product) => void;
}

const API_BASE_URL = 'https://www.ramzelsharq.com/dashboard/api';
const ITEMS_PER_PAGE = 12;

// Initial curated fallback products matching the exact design packshots
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'bronco-e',
    name: 'Bronco e',
    englishName: 'Bronco e Equine Fly Spray',
    description: 'بخاخ مضاد للذباب للخيول برائحة السترونيلا تغطية شاملة لحصانك وإسطبلك.',
    imageUrl: '/images/products/bronco-e.jpg',
    categoryId: 30,
    categoryName: 'الأعلاف والمكملات الغذائية',
    agentName: 'GAIN',
    isBestSeller: true,
  },
  {
    id: 'fb-1',
    name: 'Optima BCCA- Powder',
    englishName: 'Optima BCCA- Powder',
    description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
    imageUrl: optimaBcaaImg,
    categoryId: 'supplements',
    categoryName: 'أعلاف ومكملات غذائية',
    agentName: 'الشركاء العالميين',
    isBestSeller: true,
  },
  {
    id: 'fb-2',
    name: 'Anti-Sweat & Winter Rugs',
    englishName: 'Anti-Sweat & Winter Rugs',
    description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
    imageUrl: breezeUpImg,
    categoryId: 'riding',
    categoryName: 'مستلزمات الركوب',
    agentName: 'الشركاء العالميين',
    isBestSeller: true,
  },
  {
    id: 'fb-3',
    name: 'Freedom Cubes',
    englishName: 'Freedom Cubes',
    description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
    imageUrl: freedomCubesImg,
    categoryId: 'supplements',
    categoryName: 'أعلاف ومكملات غذائية',
    agentName: 'قين',
    isBestSeller: true,
  },
  {
    id: 'fb-4',
    name: 'Calavite',
    englishName: 'Calavite',
    description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
    imageUrl: calaviteImg,
    categoryId: 'hoof',
    categoryName: 'العناية بالحوافر',
    agentName: 'اكوين',
    isBestSeller: true,
  },
  {
    id: 'fb-5',
    name: 'Calavite Power',
    englishName: 'Calavite Power',
    description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
    imageUrl: calaviteImg,
    categoryId: 'supplements',
    categoryName: 'أعلاف ومكملات غذائية',
    agentName: 'فارنام',
    isBestSeller: false,
  },
  {
    id: 'fb-6',
    name: 'Calavite Care',
    englishName: 'Calavite Care',
    description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
    imageUrl: calaviteImg,
    categoryId: 'farrier',
    categoryName: 'أدوات البيطار',
    agentName: 'كنتاكي',
    isBestSeller: false,
  },
  {
    id: 'fb-7',
    name: 'Anti-Sweat & Winter Rugs',
    englishName: 'Anti-Sweat & Winter Rugs',
    description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
    imageUrl: breezeUpImg,
    categoryId: 'riding',
    categoryName: 'مستلزمات الركوب',
    agentName: 'الشركاء العالميين',
    isBestSeller: false,
  },
  {
    id: 'fb-8',
    name: 'Freedom Cubes Sport',
    englishName: 'Freedom Cubes Sport',
    description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
    imageUrl: freedomCubesImg,
    categoryId: 'supplements',
    categoryName: 'أعلاف ومكملات غذائية',
    agentName: 'قين',
    isBestSeller: false,
  },
  {
    id: 'fb-9',
    name: 'Optima BCCA- Powder Plus',
    englishName: 'Optima BCCA- Powder Plus',
    description: 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي منخفض النشويات.',
    imageUrl: optimaBcaaImg,
    categoryId: 'supplements',
    categoryName: 'أعلاف ومكملات غذائية',
    agentName: 'الشركاء العالميين',
    isBestSeller: false,
  },
];

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onBackToHome,
  onNavigateToContact,
  onSelectProduct,
}) => {
  const { language, direction } = useLanguage();

  // Products state
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [totalCount, setTotalCount] = useState<number>(63);
  const [totalPages, setTotalPages] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string | number>('all');
  const [activePartner, setActivePartner] = useState<string | number>('all');
  const [sortOption, setSortOption] = useState<'bestseller' | 'newest' | 'name-asc'>('bestseller');
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  // Categories & Partners fetched from API with live real counts
  const [categories, setCategories] = useState<Category[]>([
    { id: 'all', name: language === 'en' ? 'All' : 'الكل', count: 543 },
    { id: 30, name: language === 'en' ? 'Accessories' : 'اكسسوارات', count: 276 },
    { id: 21, name: language === 'en' ? 'Horseshoes & Irons' : 'حذوات وحدايد', count: 195 },
    { id: 19, name: language === 'en' ? 'Supplements' : 'مكملات غذائية', count: 64 },
    { id: 20, name: language === 'en' ? 'Feeds' : 'أعلاف', count: 8 },
  ]);

  const [partners, setPartners] = useState<Partner[]>([
    { id: 'all', name: language === 'en' ? 'All' : 'الكل' },
    { id: 'p1', name: language === 'en' ? 'Global Partner 1' : 'الشريك الأول' },
    { id: 'p2', name: language === 'en' ? 'Global Partner 2' : 'الشريك الثاني' },
    { id: 'p3', name: language === 'en' ? 'Global Partner 3' : 'الشريك الثالث' },
    { id: 'p4', name: language === 'en' ? 'Global Partner 4' : 'الشريك الرابع' },
  ]);

  // Selected product for modal preview
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);

  const gridTopRef = useRef<HTMLDivElement | null>(null);
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    if (isSortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortOpen]);

  // Helper function to sort products list based on active option
  const sortProductsList = (
    items: Product[],
    sort: 'bestseller' | 'newest' | 'name-asc',
    lang: string
  ): Product[] => {
    const cloned = [...items];
    if (sort === 'bestseller') {
      return cloned.sort((a, b) => {
        const aScore = a.isBestSeller ? 2 : (typeof a.id === 'string' ? 1 : 0);
        const bScore = b.isBestSeller ? 2 : (typeof b.id === 'string' ? 1 : 0);
        return bScore - aScore;
      });
    }
    if (sort === 'newest') {
      return cloned.sort((a, b) => {
        const aNum = typeof a.id === 'number' ? a.id : (parseInt(String(a.id).replace(/\D/g, ''), 10) || 0);
        const bNum = typeof b.id === 'number' ? b.id : (parseInt(String(b.id).replace(/\D/g, ''), 10) || 0);
        return bNum - aNum;
      });
    }
    if (sort === 'name-asc') {
      return cloned.sort((a, b) => {
        const nameA = ((lang === 'en' && a.englishName) ? a.englishName : a.name).trim();
        const nameB = ((lang === 'en' && b.englishName) ? b.englishName : b.name).trim();
        return nameA.localeCompare(nameB, lang === 'ar' ? 'ar' : 'en', { numeric: true, sensitivity: 'base' });
      });
    }
    return cloned;
  };

  // Immediate sort handler
  const handleSortSelect = (option: 'bestseller' | 'newest' | 'name-asc') => {
    setSortOption(option);
    setIsSortOpen(false);
    setProducts((prev) => sortProductsList(prev, option, language));
  };

  // =========================================================================
  // 1. FETCH ALL CATEGORIES & THEIR EXACT REAL COUNTS FROM API
  // =========================================================================
  useEffect(() => {
    let isMounted = true;

    async function fetchMetadata() {
      try {
        // 1. Fetch total products count for "الكل"
        let allProductsCount = 543;
        try {
          const totalRes = await fetch(`${API_BASE_URL}/products?pageSize=1`);
          if (totalRes.ok) {
            const totalJson = await totalRes.json();
            if (totalJson?.data?.totalCount) {
              allProductsCount = totalJson.data.totalCount;
            }
          }
        } catch (e) {
          console.warn('Could not fetch total products count:', e);
        }

        // 2. Fetch all categories from API
        const catRes = await fetch(`${API_BASE_URL}/categories?lang=${language}&locale=${language}&pageSize=100`);
        if (catRes.ok) {
          const catJson = await catRes.json();
          if (catJson?.data?.items && isMounted) {
            // Query the exact count of products for each category in parallel
            const categoriesWithCounts: Category[] = await Promise.all(
              catJson.data.items.map(async (c: any) => {
                let count = 0;
                try {
                  const countRes = await fetch(
                    `${API_BASE_URL}/products?categoryId=${c.id}&pageSize=1`
                  );
                  if (countRes.ok) {
                    const countJson = await countRes.json();
                    count = countJson?.data?.totalCount ?? 0;
                  }
                } catch {
                  // Fallback counts if individual count request fails
                  if (c.id === 30) count = 276;
                  else if (c.id === 21) count = 195;
                  else if (c.id === 19) count = 64;
                  else if (c.id === 20) count = 8;
                }

                let catName = c.name?.trim() || (language === 'en' ? 'Category' : 'تصنيف');
                if (language === 'en') {
                  if (c.id === 30 || catName.includes('اكسسوارات')) catName = 'Accessories';
                  else if (c.id === 21 || catName.includes('حذوات')) catName = 'Horseshoes & Irons';
                  else if (c.id === 19 || catName.includes('مكملات')) catName = 'Nutritional Supplements';
                  else if (c.id === 20 || catName.includes('أعلاف')) catName = 'Feeds';
                }

                return {
                  id: c.id,
                  name: catName,
                  count,
                };
              })
            );

            // Sort categories by product count descending
            categoriesWithCounts.sort((a, b) => b.count - a.count);

            if (isMounted) {
              setCategories([
                { id: 'all', name: language === 'en' ? 'All' : 'الكل', count: allProductsCount },
                ...categoriesWithCounts,
              ]);
            }
          }
        }

        // 3. Fetch agents / partners from API
        const agentRes = await fetch(`${API_BASE_URL}/agents?lang=${language}&locale=${language}&pageSize=100`);
        if (agentRes.ok) {
          const agentJson = await agentRes.json();
          if (agentJson?.data?.items && isMounted) {
            const apiAgents: Partner[] = agentJson.data.items.map((a: any) => ({
              id: a.id,
              name: a.name?.trim() || (language === 'en' ? 'Partner' : 'شريك'),
              logoUrl: a.logoUrl,
            }));
            setPartners([
              { id: 'all', name: language === 'en' ? 'All' : 'الكل' },
              ...apiAgents,
            ]);
          }
        }
      } catch (err) {
        console.warn('Using fallback categories/partners due to network error:', err);
      }
    }

    fetchMetadata();
    return () => {
      isMounted = false;
    };
  }, [language]);

  // =========================================================================
  // 2. FETCH PRODUCTS FROM API & CURATED SHOWCASE (WITH SEARCH & SORTING)
  // =========================================================================
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    async function fetchProducts() {
      try {
        const queryParams = new URLSearchParams();
        queryParams.set('lang', language);
        queryParams.set('locale', language);
        queryParams.set('pageSize', String(ITEMS_PER_PAGE));
        queryParams.set('pageNumber', String(currentPage));

        if (activeCategory !== 'all') {
          queryParams.set('categoryId', String(activeCategory));
        }

        if (activePartner !== 'all') {
          queryParams.set('agentId', String(activePartner));
        }

        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
          queryParams.set('search', trimmedQuery);
        }

        const res = await fetch(`${API_BASE_URL}/products?${queryParams.toString()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        if (json?.data?.items && isMounted) {
          const mapped: Product[] = json.data.items.map((item: any, idx: number) => {
            // Assign smart fallback image if remote image is broken/empty
            let fallbackImg = optimaBcaaImg;
            if (idx % 4 === 1) fallbackImg = breezeUpImg;
            if (idx % 4 === 2) fallbackImg = freedomCubesImg;
            if (idx % 4 === 3) fallbackImg = calaviteImg;

            return {
              id: item.id,
              name: item.name || 'منتج خيل',
              englishName: item.translations?.find((t: any) => t.languageCode === 'en')?.name || item.name,
              description: item.description || 'مكعبات عالية الزيت وغنية بالألياف، مناسبة للخيول التي تحتاج نظام غذائي متكامل.',
              imageUrl: item.imageUrl || fallbackImg,
              categoryId: item.categoryId || 0,
              categoryName: item.categoryName || 'أعلاف ومكملات',
              agentId: item.agentId,
              agentName: item.agentName || 'الشركاء العالميين',
              isBestSeller: item.isBestSeller ?? (idx < 4),
              moreInfoAr: item.moreInfoAr,
              moreInfoEn: item.moreInfoEn,
              images: item.images,
            };
          });

          // Search in fallback products as well
          let finalProducts = mapped;
          if (trimmedQuery) {
            const q = trimmedQuery.toLowerCase();
            const matchingFallbacks = FALLBACK_PRODUCTS.filter((f) => {
              const matchCat = activeCategory === 'all' || String(f.categoryId) === String(activeCategory);
              if (!matchCat) return false;
              return (
                f.name.toLowerCase().includes(q) ||
                (f.englishName && f.englishName.toLowerCase().includes(q)) ||
                (f.description && f.description.toLowerCase().includes(q)) ||
                (f.categoryName && f.categoryName.toLowerCase().includes(q)) ||
                (f.agentName && f.agentName.toLowerCase().includes(q))
              );
            });
            const existingIds = new Set(mapped.map((m) => String(m.id)));
            const uniqueFallbacks = matchingFallbacks.filter((f) => !existingIds.has(String(f.id)));
            finalProducts = [...uniqueFallbacks, ...mapped];
          } else if (currentPage === 1 && activeCategory === 'all' && activePartner === 'all') {
            const existingIds = new Set(mapped.map((m) => String(m.id)));
            const uniqueFallbacks = FALLBACK_PRODUCTS.filter((f) => !existingIds.has(String(f.id)));
            finalProducts = [...uniqueFallbacks.slice(0, 6), ...mapped].slice(0, ITEMS_PER_PAGE);
          }

          // Apply chosen sort order
          finalProducts = sortProductsList(finalProducts, sortOption, language);

          setProducts(finalProducts);
          const computedTotal = trimmedQuery ? finalProducts.length : (json.data.totalCount || 63);
          setTotalCount(computedTotal);
          setTotalPages(trimmedQuery ? Math.max(1, Math.ceil(finalProducts.length / ITEMS_PER_PAGE)) : Math.max(json.data.totalPages || 1, 1));
        }
      } catch (error) {
        console.warn('API error, using local products showcase:', error);
        if (isMounted) {
          // Client-side filtering of fallback products
          let filtered = [...FALLBACK_PRODUCTS];
          if (activeCategory !== 'all') {
            filtered = filtered.filter((p) => String(p.categoryId) === String(activeCategory));
          }
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(
              (p) =>
                p.name.toLowerCase().includes(q) ||
                (p.englishName && p.englishName.toLowerCase().includes(q)) ||
                p.description.toLowerCase().includes(q)
            );
          }
          filtered = sortProductsList(filtered, sortOption, language);
          setProducts(filtered);
          setTotalCount(filtered.length);
          setTotalPages(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    // Debounce search input
    const timer = setTimeout(() => {
      fetchProducts();
    }, 250);

    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
  }, [currentPage, activeCategory, activePartner, searchQuery, language]);

  // Handle page navigation
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open product details page or modal and optionally fetch extended data
  const handleOpenDetails = async (product: Product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
      return;
    }
    setSelectedProduct(product);
    if (typeof product.id === 'number') {
      try {
        setIsModalLoading(true);
        const res = await fetch(`${API_BASE_URL}/products/${product.id}?lang=${language}&locale=${language}`);
        if (res.ok) {
          const json = await res.json();
          if (json?.data) {
            setSelectedProduct((prev) => (prev ? { ...prev, ...json.data } : null));
          }
        }
      } catch (e) {
        console.warn('Could not fetch extra product details:', e);
      } finally {
        setIsModalLoading(false);
      }
    }
  };

  // WhatsApp click handler for quick order
  const handleWhatsAppOrder = (product: Product) => {
    const prodName = (language === 'en' && product.englishName) ? product.englishName : product.name;
    const text = language === 'en'
      ? `Hello, I would like to inquire and order the product: ${prodName} (Product ID: ${product.id})`
      : `السلام عليكم، أرغب في الاستفسار والطلب بخصوص المنتج: ${product.name} (رمز المنتج: ${product.id})`;
    const url = `https://wa.me/966503936999?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="all-products-page" dir={direction} ref={gridTopRef}>
      <div className="all-products-container">
        
        {/* Breadcrumb Navigation */}
        {onBackToHome && (
          <nav className="aph-breadcrumb" aria-label={language === 'en' ? 'Breadcrumb navigation' : 'مسار التصفح'}>
            <button
              type="button"
              className="aph-breadcrumb-link"
              onClick={onBackToHome}
            >
              {language === 'en' ? 'Home' : 'الرئيسية'}
            </button>
            <span className="aph-breadcrumb-separator">/</span>
            <span className="aph-breadcrumb-current">
              {language === 'en' ? 'All Products' : 'جميع المنتجات'}
            </span>
          </nav>
        )}

        {/* =========================================================================
            1. TOP HEADER SECTION (Title & Subtitle on Right, Search Bar on Left)
            ========================================================================= */}
        <header className="all-products-header">
          <div className="aph-text-group">
            <h1 className="aph-title">
              {language === 'en' ? 'All Products' : 'جميع المنتجات'}
            </h1>
            <p className="aph-subtitle">
              {language === 'en'
                ? 'High-performance nutritional solutions formulated for athletic and purebred horses'
                : 'حلول غذائية عالية الأداء مصممة خصيصاً للخيول الرياضية المحترفة وسلالات الخيول الأصيلة'}
            </p>
          </div>

          <div className="aph-search-box">
            <input
              type="text"
              className="aph-search-input"
              placeholder={language === 'en' ? 'Search products...' : 'ابحث عن المنتجات'}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              aria-label={language === 'en' ? 'Search products' : 'ابحث عن المنتجات'}
            />
            <Search size={18} className="aph-search-icon" />
            {searchQuery && (
              <button
                type="button"
                className="aph-search-clear-btn"
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                aria-label={language === 'en' ? 'Clear search' : 'مسح البحث'}
                title={language === 'en' ? 'Clear search' : 'مسح البحث'}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </header>

        {/* =========================================================================
            2. SUB-BAR: Item Count & Sort Selector
            ========================================================================= */}
        <div className="all-products-subbar">
          <div className="aps-count-text">
            {language === 'en'
              ? `Showing ${products.length} of ${totalCount} items`
              : `عرض ${products.length} من ${totalCount} عنصر`}
          </div>

          <div className="aps-sort-wrapper">
            <span className="aps-sort-label">
              {language === 'en' ? 'Sort by:' : 'الترتيب من خلال:'}
            </span>
            <div className="aps-sort-dropdown" ref={sortDropdownRef}>
              <button
                type="button"
                className="aps-sort-btn"
                onClick={() => setIsSortOpen(!isSortOpen)}
                aria-expanded={isSortOpen}
              >
                <span>
                  {sortOption === 'bestseller'
                    ? (language === 'en' ? 'Best Seller' : 'الأكثر مبيعاً')
                    : sortOption === 'newest'
                    ? (language === 'en' ? 'Newest' : 'الأحدث')
                    : (language === 'en' ? 'Name: A - Z' : 'الاسم: أ - ي')}
                </span>
                <ChevronDown size={14} className={`aps-chevron ${isSortOpen ? 'open' : ''}`} />
              </button>

              {isSortOpen && (
                <div className="aps-dropdown-menu">
                  <button
                    type="button"
                    className={`aps-dropdown-item ${sortOption === 'bestseller' ? 'active' : ''}`}
                    onClick={() => handleSortSelect('bestseller')}
                  >
                    <span>{language === 'en' ? 'Best Seller' : 'الأكثر مبيعاً'}</span>
                    {sortOption === 'bestseller' && <span className="aps-sort-check">✓</span>}
                  </button>
                  <button
                    type="button"
                    className={`aps-dropdown-item ${sortOption === 'newest' ? 'active' : ''}`}
                    onClick={() => handleSortSelect('newest')}
                  >
                    <span>{language === 'en' ? 'Newest' : 'الأحدث'}</span>
                    {sortOption === 'newest' && <span className="aps-sort-check">✓</span>}
                  </button>
                  <button
                    type="button"
                    className={`aps-dropdown-item ${sortOption === 'name-asc' ? 'active' : ''}`}
                    onClick={() => handleSortSelect('name-asc')}
                  >
                    <span>{language === 'en' ? 'Name: A - Z' : 'الاسم: أ - ي'}</span>
                    {sortOption === 'name-asc' && <span className="aps-sort-check">✓</span>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. MAIN TWO-COLUMN LAYOUT (Sidebar & Products)
            ========================================================================= */}
        <div className="all-products-layout">

          {/* ----------------- SIDEBAR ----------------- */}
          <aside className="all-products-sidebar">
            
            {/* Box 1: Product Categories */}
            <div className="aps-sidebar-card">
              <h2 className="aps-sidebar-title">
                {language === 'en' ? 'Product Categories' : 'تصنيفات المنتجات'}
              </h2>
              <ul className="aps-cat-list">
                {categories.map((cat) => {
                  const isActive = String(activeCategory) === String(cat.id);
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        className={`aps-cat-btn ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setCurrentPage(1);
                        }}
                      >
                        <span className="aps-cat-name">{cat.name}</span>
                        <span className="aps-cat-badge">{cat.count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Box 2: Global Partners */}
            <div className="aps-sidebar-card">
              <h2 className="aps-sidebar-title">
                {language === 'en' ? 'Global Partners' : 'الشركاء العالميين'}
              </h2>
              <div className="aps-partners-pills">
                {partners.map((partner) => {
                  const isActive = String(activePartner) === String(partner.id);
                  return (
                    <button
                      key={partner.id}
                      type="button"
                      className={`aps-partner-pill ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setActivePartner(partner.id);
                        setCurrentPage(1);
                      }}
                    >
                      {partner.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Box 3: Support Callout */}
            <div className="aps-support-card">
              <div className="aps-support-watermark" aria-hidden="true">
                <Sparkles size={56} />
              </div>
              <h3 className="aps-support-title">
                {language === 'en' ? 'Have a question?' : 'عندك سؤال ؟'}
              </h3>
              <p className="aps-support-desc">
                {language === 'en'
                  ? 'Need a personalized recommendation for your horse? Let us help you choose optimal equipment and nutrition.'
                  : 'هل تريد ترشيح منتج معين لخيلك؟ دعنا نساعدك في اختيار المعدات والأنظمة الغذائية الفعالة.'}
              </p>
              <button
                type="button"
                className="aps-support-link"
                onClick={() => {
                  if (onNavigateToContact) {
                    onNavigateToContact();
                  } else {
                    window.location.hash = '#contact';
                  }
                }}
              >
                <span>{language === 'en' ? 'Contact Now' : 'تواصل الآن'}</span>
                {direction === 'rtl' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>

          </aside>

          {/* ----------------- PRODUCTS GRID & PAGINATION ----------------- */}
          <main className="all-products-main">
            
            {isLoading ? (
              <div className="aps-loading-container">
                <Loader2 size={36} className="aps-spinner" />
                <p>
                  {language === 'en'
                    ? 'Loading latest products from server...'
                    : 'جاري تحميل أحدث المنتجات من الخادم...'}
                </p>
              </div>
            ) : products.length === 0 ? (
              <div className="aps-empty-container">
                <p>
                  {language === 'en'
                    ? 'No products matched your search in this category.'
                    : 'لا توجد منتجات مطابقة لبحثك في هذا التصنيف.'}
                </p>
                <button
                  type="button"
                  className="aps-reset-btn"
                  onClick={() => {
                    setActiveCategory('all');
                    setActivePartner('all');
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                >
                  {language === 'en' ? 'View All Products' : 'عرض جميع المنتجات'}
                </button>
              </div>
            ) : (
              <div className="aps-products-grid">
                {products.map((prod) => {
                  const displayName = (language === 'en' && prod.englishName) ? prod.englishName : prod.name;
                  return (
                    <article
                      key={prod.id}
                      className="aps-card"
                      onClick={() => handleOpenDetails(prod)}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleOpenDetails(prod);
                      }}
                    >
                      {/* Packshot Image Frame */}
                      <div className="aps-card-image-box">
                        <img
                          src={prod.imageUrl}
                          alt={displayName}
                          className="aps-card-img"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = breezeUpImg;
                          }}
                        />
                      </div>

                      {/* Centered Product Info */}
                      <div className="aps-card-info">
                        <h3 className="aps-card-title">{displayName}</h3>
                        <p className="aps-card-desc">{prod.description}</p>
                      </div>

                      {/* Action Button */}
                      <button
                        type="button"
                        className="aps-card-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetails(prod);
                        }}
                      >
                        {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                      </button>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {!isLoading && totalPages > 1 && (
              <div className="aps-pagination-container" aria-label={language === 'en' ? 'Products pagination' : 'شريط صفحات المنتجات'}>
                <button
                  type="button"
                  className="aps-page-btn aps-page-nav"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  aria-label={language === 'en' ? 'Previous page' : 'الصفحة السابقة'}
                >
                  {direction === 'rtl' ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    if (totalPages <= 6) return true;
                    if (p === 1 || p === totalPages) return true;
                    if (Math.abs(p - currentPage) <= 1) return true;
                    return false;
                  })
                  .map((p, idx, arr) => {
                    const prev = arr[idx - 1];
                    const showEllipsis = prev && p - prev > 1;

                    return (
                      <React.Fragment key={p}>
                        {showEllipsis && <span className="aps-page-ellipsis">...</span>}
                        <button
                          type="button"
                          className={`aps-page-btn ${currentPage === p ? 'active' : ''}`}
                          onClick={() => handlePageChange(p)}
                        >
                          {p}
                        </button>
                      </React.Fragment>
                    );
                  })}

                <button
                  type="button"
                  className="aps-page-btn aps-page-nav"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  aria-label={language === 'en' ? 'Next page' : 'الصفحة التالية'}
                >
                  {direction === 'rtl' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* =========================================================================
          4. PRODUCT DETAILS MODAL (Rich Preview & Order via WhatsApp)
          ========================================================================= */}
      {selectedProduct && (
        <div
          className="aps-modal-overlay"
          onClick={() => setSelectedProduct(null)}
          dir={direction}
        >
          <div
            className="aps-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="aps-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label={language === 'en' ? 'Close dialog' : 'إغلاق النافذة'}
            >
              <X size={20} />
            </button>

            <div className="aps-modal-grid">
              {/* Product Packshot in Modal */}
              <div className="aps-modal-image-col">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="aps-modal-main-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = breezeUpImg;
                  }}
                />
              </div>

              {/* Product Content & Details in Modal */}
              <div className="aps-modal-content-col">
                <span className="aps-modal-cat-tag">
                  {selectedProduct.categoryName}
                </span>

                <h2 className="aps-modal-title">
                  {(language === 'en' && selectedProduct.englishName) ? selectedProduct.englishName : selectedProduct.name}
                </h2>
                {selectedProduct.agentName && (
                  <p className="aps-modal-agent">
                    {language === 'en' ? 'Agent / Brand:' : 'الوكيل / المصنع:'} {selectedProduct.agentName}
                  </p>
                )}

                <p className="aps-modal-description">{selectedProduct.description}</p>

                {isModalLoading ? (
                  <div className="aps-modal-loading">
                    <Loader2 size={24} className="aps-spinner" />
                    <span>
                      {language === 'en'
                        ? 'Loading dosage and ingredient details...'
                        : 'جاري تحميل تفاصيل الجرعات والمكونات...'}
                    </span>
                  </div>
                ) : (
                  (selectedProduct.moreInfoAr || selectedProduct.moreInfoEn) && (
                    <div className="aps-modal-more-info">
                      <h4 className="aps-modal-info-title">
                        {language === 'en' ? 'Usage & Active Ingredients:' : 'طريقة الاستخدام والمكونات:'}
                      </h4>
                      <div
                        className="aps-modal-html-box"
                        dangerouslySetInnerHTML={{
                          __html: (language === 'en' && selectedProduct.moreInfoEn)
                            ? selectedProduct.moreInfoEn
                            : (selectedProduct.moreInfoAr || '')
                        }}
                      />
                    </div>
                  )
                )}

                <div className="aps-modal-actions">
                  <button
                    type="button"
                    className="aps-modal-whatsapp-btn"
                    onClick={() => handleWhatsAppOrder(selectedProduct)}
                  >
                    <WhatsAppIcon size={18} color="#FFFFFF" />
                    <span>
                      {language === 'en' ? 'Order via WhatsApp' : 'طلب المنتج عبر واتساب'}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="aps-modal-contact-btn"
                    onClick={() => {
                      setSelectedProduct(null);
                      if (onNavigateToContact) {
                        onNavigateToContact();
                      } else {
                        window.location.hash = '#contact';
                      }
                    }}
                  >
                    {language === 'en' ? 'Inquire about product' : 'استفسر عن المنتج'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

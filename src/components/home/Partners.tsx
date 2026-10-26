import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Partners.css';

export interface Partner {
  id: string;
  name: string;
  descAr: string;
  descEn: string;
  logo: string;
}

interface PartnersProps {
  onSelectPartner?: (partnerId: string) => void;
}

const API_BASE_URL = 'https://www.ramzelsharq.com/dashboard/api';

export const Partners: React.FC<PartnersProps> = ({ onSelectPartner }) => {
  const { direction, t } = useLanguage();

  const basePartners: Partner[] = [
    {
      id: 'gain',
      name: 'GAIN Equine Nutrition',
      descAr: 'شركة عالمية رائدة متخصصة في تغذية الخيول، معتمدة من أفضل الإسطبلات حول العالم.',
      descEn: 'A world-leading equine nutrition brand trusted by premier racing and sport horse stables.',
      logo: 'https://www.efflisburn.com/wp-content/uploads/go-x/u/8a4402ee-3a27-499b-9470-2e2b09fdd0ba/l0,t0,w669,h287/image.png',
    },
    {
      id: 'farnam',
      name: 'Farnam',
      descAr: 'الاسم الأول في عالم العناية بالخيل والمكملات ومضادات الطفيليات وحماية الفرو.',
      descEn: 'Premier household name in horse care, fly control, and daily wellness solutions.',
      logo: 'https://www.farnam.com/-/media/project/oneweb/farnam/images/logo/farnam-logo-png.png?h=204&iar=0&w=650&hash=DA92DF0F23E43680FEB62BAC7856AFF2',
    },
    {
      id: 'kpp',
      name: 'Kentucky Performance Products',
      descAr: 'شركة متخصصة في المكملات الغذائية الاستشفائية المتطورة المدعومة بأبحاث علمية صارمة.',
      descEn: 'Targeted research-proven nutritional supplements to solve equine wellness challenges.',
      logo: 'https://kppusa.com/wp-content/themes/kppusa/img/header-logo-home.jpg',
    },
    {
      id: 'equine-uk',
      name: 'Equine Products UK LTD',
      descAr: 'منتجات ومكملات بيطرية بريطانية متخصصة تلبي متطلبات نخبة الخيل والمدربين.',
      descEn: 'British high-potency veterinary supplements manufactured to GMP standards.',
      logo: 'https://equineproducts-ukltd.com/cdn/shop/files/EPUK_logo-1500px_157b5484-aee3-495d-ba80-d59532737dbe.png?v=1750930230&width=200',
    },
    {
      id: 'kerckhaert',
      name: 'KERCKHAERT',
      descAr: 'المصنع العالمي الرائد للحذوات وحدائد الخيل وإكسسوارات البيطرة منذ أكثر من قرن.',
      descEn: 'The global benchmark manufacturer of premium horseshoes and farrier tools.',
      logo: 'https://kerckhaert.com/hubfs/KerckhaertBlauw.svg',
    },
    {
      id: 'top-form',
      name: 'Top Form Nutrition',
      descAr: 'شركة متخصصة في إنتاج المكملات الغذائية عالية الجودة تجمع بين البحث العلمي والتركيبات الفعالة.',
      descEn: 'Specializing in scientifically proven high-grade equine nutritional supplements.',
      logo: 'https://tfn-ukltd.com/pub/media/logo/default/logo.png',
    },
    {
      id: 'tenda',
      name: 'Tenda',
      descAr: 'تيندا (Tenda) متخصصة في حلول الرعاية الصحية وعلاج الجروح لخيول الأداء.',
      descEn: 'Specializing in wound care and high performance equine recovery solutions.',
      logo: 'https://tendaheal.com/wp-content/uploads/tenda-heal-logo-2.png',
    },
  ];

  const [partnerList, setPartnerList] = React.useState<Partner[]>(basePartners);

  React.useEffect(() => {
    let isMounted = true;
    const fetchLiveAgents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/agents?lang=ar&locale=ar&pageSize=100`);
        if (res.ok) {
          const json = await res.json();
          const items = json?.data?.items || json?.items || [];
          if (items.length > 0 && isMounted) {
            const mapped: Partner[] = items.map((a: any) => ({
              id: String(a.id),
              name: a.name?.trim() || 'شريك معتمد',
              descAr: a.description || 'شريك رسمي ومعتمد لدى رمز الشرق',
              descEn: a.description || 'Authorized partner of Rasco',
              logo: a.logoUrl || '/images/partners/equine-uk-large.png',
            }));
            setPartnerList(mapped);
          }
        }
      } catch (err) {
        console.warn('Using fallback base partners due to fetch error:', err);
      }
    };

    fetchLiveAgents();
    return () => {
      isMounted = false;
    };
  }, []);

  // Triplicate the list for a completely seamless, gap-free infinite marquee loop
  const marqueeList = [...partnerList, ...partnerList, ...partnerList];

  return (
    <section className="partners-section" dir={direction} aria-label={t('partnersTitle')}>
      {/* Decorative Wave/Pattern Overlay */}
      <div className="partners-pattern-overlay" aria-hidden="true" />

      <div className="partners-inner">
        {/* Section Header */}
        <div className="partners-header">
          <h2 className="partners-title">{t('partnersTitle')}</h2>
          <div className="partners-title-underline" aria-hidden="true" />
        </div>

        {/* Infinite Carousel / Marquee Container */}
        <div className="partners-marquee-wrapper">
          {/* Subtle edge fade gradient masks */}
          <div className="partners-fade-mask left" aria-hidden="true" />
          <div className="partners-fade-mask right" aria-hidden="true" />

          <div className="partners-marquee-track">
            {marqueeList.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="partner-marquee-card"
                onClick={() => onSelectPartner?.(partner.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectPartner?.(partner.id);
                  }
                }}
                title={`عرض تفاصيل وكيل ${partner.name}`}
              >
                <div className="partner-marquee-img-wrap">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="partner-marquee-img"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Elegant Bottom Gold Accent Line */}
      <div className="partners-bottom-gold-bar" aria-hidden="true" />
    </section>
  );
};

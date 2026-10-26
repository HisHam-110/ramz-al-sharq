import React, { useState, useEffect } from 'react';
import { Phone, Clock, Navigation } from 'lucide-react';
import { IconCall, IconFax, IconEmail } from '../common/BrandIcons';
import { useLanguage } from '../../context/LanguageContext';
import './ContactBanner.css';

interface TeamMember {
  id: number;
  name: string;
  nameEn?: string;
  region: string;
  regionEn: string;
  image: string;
  phone: string;
  whatsapp: string;
}

const API_BASE_URL = 'https://www.ramzelsharq.com/dashboard/api';

const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1006,
    name: 'د.مصطفي محمود',
    nameEn: 'Dr.Mostafa Mahmoud',
    region: 'منطقة الرياض',
    regionEn: 'Riyadh Region',
    image: 'https://www.ramzelsharq.com/dashboard/api/uploads/images/1664ee5d-c89a-4b4e-b8f5-0f440a51ca5c.png',
    phone: '+966505289728',
    whatsapp: '966505289728',
  },
  {
    id: 1007,
    name: 'د.أحمد عادل',
    nameEn: 'DR.Ahmed Adel',
    region: 'المنطقة الشرقية',
    regionEn: 'Eastern Region',
    image: 'https://www.ramzelsharq.com/dashboard/api/uploads/images/e4a216bb-7c7f-4484-bd64-edec9b843405.jpeg',
    phone: '+966505289728',
    whatsapp: '966505289728',
  },
  {
    id: 1008,
    name: 'د.أحمد عز الدين',
    nameEn: 'Dr.Ahmed Ezz',
    region: 'المنطقة الشمالية',
    regionEn: 'Northern Region',
    image: 'https://www.ramzelsharq.com/dashboard/api/uploads/images/1a636569-885e-4bc1-8e6d-8d933cce09d5.png',
    phone: '+966505289728',
    whatsapp: '966505289728',
  },
  {
    id: 1009,
    name: 'د.لؤي أحمد',
    nameEn: 'Dr.Loai Ahmed',
    region: 'منطقة الرياض والجنوب',
    regionEn: 'Riyadh and Southern Region',
    image: 'https://www.ramzelsharq.com/dashboard/api/uploads/images/015ae3a0-1add-4038-9c08-563c3c58090a.jpeg',
    phone: '+966505289728',
    whatsapp: '966505289728',
  },
];

interface Branch {
  id: number;
  name: string;
  nameEn?: string;
  address: string;
  addressEn?: string;
  location: string;
  workingHours?: string | null;
  isHQ?: boolean;
}

const DEFAULT_BRANCHES: Branch[] = [
  {
    id: 10,
    name: 'المبنى الرئيسي للشركة',
    nameEn: 'Headquarters',
    address: 'مكتب رقم 6، طريق الملك عبدالعزيز الفرعي، حي الملك فهد , الرياض',
    addressEn: 'Office No. 6, King Abdulaziz Branch Road, Al King Fahd District, Riyadh',
    location: 'https://www.google.com/maps/place/Unikom+Consulting/@24.7254171,46.6696062,658m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e2f1d0f5f04a705:0xcce0b0477bb86956!8m2!3d24.7254171!4d46.6696062!16s%2Fg%2F11w__6yvc7?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D',
    workingHours: '[{"startDay":"Saturday","endDay":"Thursday","from":"09:00","to":"17:00"}]',
    isHQ: true,
  },
  {
    id: 15,
    name: 'صيدلية رمز الشرق البيطرية رقم 1',
    nameEn: 'Ramz Al Sharq Veterinary Pharmacy No. 1',
    address: 'طريق الثمامة، الرمال، الرياض 13268، المملكة العربية السعودية',
    addressEn: 'Thumamah Road, Ar Rimal, Riyadh 13268, Saudi Arabia',
    location: 'https://www.google.com/maps/place/%D8%B5%D9%8A%D8%AF%D9%84%D9%8A%D8%A9+%D8%B1%D9%85%D8%B2+%D8%A7%D9%84%D8%B4%D8%B1%D9%82+%D8%A7%D9%84%D8%A8%D9%8A%D8%B7%D8%B1%D9%8A%D8%A9%28%D9%A1%29+%D8%A7%D9%82%D9%88%D9%8A+%D8%A7%D9%84%D8%A8%D8%B1%D8%A7%D9%86%D8%AF%D8%A7%D8%AA+%D9%81%D9%8A+%D9%85%D8%AC%D8%A7%D9%84+%D8%A7%D9%84%D9%85%D9%83%D9%85%D9%84%D8%A7%D8%AA+%D8%A7%D9%84%D8%BA%D8%B0%D8%A7%D8%A6%D9%8A%D8%A9+%D9%88%D8%A7%D9%84%D8%A7%D8%B9%D9%84%D8%A7%D9%81+%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%88%D8%B1%D8%AF%D8%A9+%D9%84%D9%84%D8%AE%D9%8A%D9%88%D9%84+ramz+alsharq%E2%80%AD/@24.8638594,46.852859,3563m/data=!3m1!1e3!4m6!3m5!1s0x3e2e55610737d739:0xb36ab1a8878b6d4e!8m2!3d24.8687713!4d46.8471979!16s%2Fg%2F11k8gbpmpd?entry=ttu&g_ep=EgoyMDI2MDMzMS4wIKXMDSoASAFQAw%3D%3D',
    workingHours: '[{"startDay":"Saturday","endDay":"Friday","from":"09:00","to":"12:00"},{"startDay":"Saturday","endDay":"Friday","from":"16:00","to":"21:00"}]',
    isHQ: false,
  },
  {
    id: 16,
    name: 'صيدلية رمز الشرق البيطرية رقم 2',
    nameEn: 'Ramz Al Sharq Veterinary Pharmacy No. 2',
    address: 'طريق الجنادرية ، الرياض 13617، المملكة العربية السعودية',
    addressEn: 'Al Janadriyah Road, Riyadh 13617, Saudi Arabia',
    location: 'https://www.google.com/maps/place/RAMZ+AL+SHARQ+PHARMACY+2/@24.8638594,46.852859,3563m/data=!3m1!1e3!4m6!3m5!1s0x3e2e557495bf5ca5:0x880372d87dcf1181!8m2!3d24.8589476!4d46.8497654!16s%2Fg%2F11thb_6y9h?entry=ttu&g_ep=EgoyMDI2MDMzMS4wIKXMDSoASAFQAw%3D%3D',
    workingHours: '[{"startDay":"Saturday","endDay":"Friday","from":"09:00","to":"12:00"},{"startDay":"Saturday","endDay":"Friday","from":"16:00","to":"21:00"}]',
    isHQ: false,
  },
];

function extractCoordinates(locationUrl: string): { lat: string; lng: string } {
  if (!locationUrl) return { lat: '24.8687713', lng: '46.8471979' };
  const match3d = locationUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if (match3d) {
    return { lat: match3d[1], lng: match3d[2] };
  }
  const matchAt = locationUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (matchAt) {
    return { lat: matchAt[1], lng: matchAt[2] };
  }
  return { lat: '24.8687713', lng: '46.8471979' };
}

function formatHours(workingHoursStr: string | null | undefined, lang: string): string[] {
  if (!workingHoursStr) {
    return [lang === 'en' ? '09:00 AM - 05:00 PM' : '09:00 ص - 5:00 م'];
  }
  try {
    const parsed = typeof workingHoursStr === 'string' ? JSON.parse(workingHoursStr) : workingHoursStr;
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((slot: any) => {
        const from = formatTime(slot.from, lang);
        const to = formatTime(slot.to, lang);
        return `${from} - ${to}`;
      });
    }
  } catch {
    // fallback
  }
  return [lang === 'en' ? '09:00 AM - 05:00 PM' : '09:00 ص - 5:00 م'];
}

function formatTime(time24: string, lang: string): string {
  if (!time24) return '';
  const [hStr, mStr] = time24.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr || '00';
  if (isNaN(h)) return time24;
  const isPm = h >= 12;
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  const hPadded = h < 10 ? `0${h}` : `${h}`;
  if (lang === 'ar') {
    return `${hPadded}:${m} ${isPm ? 'م' : 'ص'}`;
  }
  return `${hPadded}:${m} ${isPm ? 'PM' : 'AM'}`;
}

export const ContactBanner: React.FC = () => {
  const { language, direction } = useLanguage();
  const [activeMapTab, setActiveMapTab] = useState<'google' | 'saudi'>('google');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(DEFAULT_TEAM_MEMBERS);
  const [branches, setBranches] = useState<Branch[]>(DEFAULT_BRANCHES);
  const [selectedBranchId, setSelectedBranchId] = useState<number>(15);

  useEffect(() => {
    let isMounted = true;
    const fetchSalesDelegates = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/sales?lang=${language}&locale=${language}&pageSize=100`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const items = data?.data?.items || data?.items || [];

        if (items.length > 0 && isMounted) {
          const mapped: TeamMember[] = items
            .filter((item: any) => item.isActive !== false && Boolean(item.imageUrl) && !item.name?.includes('صيدلية'))
            .map((item: any, idx: number) => {
              const enTrans = item.translations?.find((t: any) => t.languageCode === 'en' || t.locale === 'en') || {};
              const arTrans = item.translations?.find((t: any) => t.languageCode === 'ar' || t.locale === 'ar') || {};

              const nameAr = arTrans.name || item.name || 'مندوب مبيعات';
              const nameEn = enTrans.name || item.name || 'Sales Representative';
              const regionAr = arTrans.areaName || item.areaName || (language === 'ar' ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia');
              const regionEn = enTrans.areaName || item.areaName || 'Kingdom of Saudi Arabia';

              let imageUrl = item.imageUrl || '';
              if (imageUrl) {
                imageUrl = imageUrl.replace('ramzalsharq.growfet.com', 'www.ramzelsharq.com');
              }

              const rawPhone = item.phone || item.morePhone || '+966505289728';
              const cleanWhatsApp = rawPhone.replace(/\D/g, '') || '966505289728';

              return {
                id: item.id || idx,
                name: nameAr,
                nameEn: nameEn,
                region: regionAr,
                regionEn: regionEn,
                image: imageUrl,
                phone: rawPhone,
                whatsapp: cleanWhatsApp,
              };
            });

          if (mapped.length > 0) {
            setTeamMembers(mapped);
          }
        }
      } catch (err) {
        console.warn('Could not fetch sales delegates from API, using fallback:', err);
      }
    };

    fetchSalesDelegates();

    return () => {
      isMounted = false;
    };
  }, [language]);

  useEffect(() => {
    let isMounted = true;
    const fetchBranches = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/branches?lang=${language}&locale=${language}&pageSize=100`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const items = data?.data?.items || data?.items || [];
        if (items.length > 0 && isMounted) {
          const mapped: Branch[] = items.map((item: any) => {
            const enTrans = item.translations?.find((t: any) => t.languageCode === 'en' || t.locale === 'en') || {};
            const arTrans = item.translations?.find((t: any) => t.languageCode === 'ar' || t.locale === 'ar') || {};

            const nameAr = arTrans.name || item.name || '';
            const nameEn = enTrans.name || item.name || '';
            const addressAr = arTrans.address || item.address || '';
            const addressEn = enTrans.address || item.address || '';
            const isHQ = item.id === 10 || nameAr.includes('المبنى الرئيسي') || nameAr.includes('المقر الرئيسي') || nameEn.toLowerCase().includes('headquarters');

            return {
              id: item.id,
              name: nameAr,
              nameEn: nameEn,
              address: addressAr,
              addressEn: addressEn,
              location: item.location || 'https://maps.google.com',
              workingHours: item.workingHours,
              isHQ,
            };
          });

          setBranches(mapped);
        }
      } catch (err) {
        console.warn('Could not fetch branches from API, using fallback:', err);
      }
    };

    fetchBranches();

    return () => {
      isMounted = false;
    };
  }, [language]);

  const hqBranch = branches.find((b) => b.isHQ) || branches[0];
  const pharmacyBranches = branches.filter((b) => !b.isHQ);
  const activeBranch = branches.find((b) => b.id === selectedBranchId) || pharmacyBranches[0] || hqBranch;
  const activeCoords = extractCoordinates(activeBranch?.location || '');

  return (
    <div className="contact-full-wrapper" id="contact" dir={direction}>
      {/* =========================================================================
          1. TOP HERO CONTACT BANNER
          ========================================================================= */}
      <div className="contact-banner-container">
        <div className="contact-banner-card">
          {/* Subtle Golden Horse Watermark */}
          <div className="contact-horse-watermark" aria-hidden="true">
            <svg
              width="450"
              height="550"
              viewBox="0 0 559 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M594.599 219.404C608.135 239.772 614.707 264.446 624.688 285.738C632.177 308.457 636.204 331.717 641.759 353.093C646.742 374.72 646.413 396.171 648.753 415.447C650.765 434.94 652.22 452.686 650.765 468.491C650.274 484.407 649.717 498.205 649.314 509.629C648.444 532.411 647.91 545.378 647.91 545.378L650.564 545.793C650.564 545.793 653.183 532.99 656.602 510.151C658.165 498.603 660.088 484.646 662.32 468.655C665.496 452.505 665.898 434.108 664.846 413.878C663.558 393.824 665.295 371.506 661.43 348.499C657.051 325.647 654.548 300.376 646.703 276.086C636.607 252.779 629.953 226.204 615.914 203.674C602.332 180.768 589.013 156.819 570.321 138.057C553.253 117.423 532.089 102.949 512.186 87.621C491.39 74.4242 470.454 61.8816 449.247 53.2296C428.268 43.8083 407.22 37.6586 387.089 33.9714C367.248 28.6927 347.952 27.7245 330.513 25.0586C260.042 20.1866 214.379 33.5647 214.379 33.5161L214.607 36.6373C214.607 36.5843 260.363 31.9864 328.215 43.1717C344.954 47.0799 363.472 49.5336 382.133 56.121C401.294 61.1521 420.675 68.9907 440.531 78.0583C460.345 86.8385 479.722 99.2263 498.883 112.083C516.979 126.924 536.414 140.736 551.517 160.219C568.955 177.046 581.702 198.691 594.599 219.404ZM428.036 728.821C447.096 715.208 466.806 698.665 485.68 678.805C503.022 659.154 523.706 635.585 538.967 610.235C554.87 584.416 568.282 555.307 575.427 523.502C583.006 491.755 584.437 458.177 581.133 424.86C573.737 358.508 550.495 292.462 517.9 241.881C483.544 192.219 443.839 150.21 404.122 127.464C363.948 104.244 327.121 92.3295 301.136 85.7421C275.094 79.4288 259.791 77.877 259.791 77.877C259.791 77.877 275.044 77.7974 301.775 81.573C328.173 86.0692 366.807 92.4046 409.437 114.744C430.609 125.642 452.972 141.058 473.336 160.905C493.455 179.981 515.177 201.985 532.878 228.9C568.592 282.979 593.265 350.259 602.491 421.977C611.535 494.571 590.294 569.57 554.747 623.166C536.697 651.258 518.175 672.793 496.991 693.594C476.31 713.113 455.011 728.976 434.705 741.885C393.456 767.337 355.306 778.027 328.919 783.019C302.44 788.138 286.959 787.462 286.959 787.462C286.959 787.462 302.44 786.467 328.107 778.474C353.759 770.786 389.371 755.002 428.036 728.821ZM3.37946 399.111C9.32526 372.925 26.0175 355.445 36.6711 335.886C47.7581 299.248 54.6439 260.692 67.402 224.303C73.4406 205.84 80.8486 187.992 88.6899 170.065C95.8465 153.902 104.419 138.211 116.334 123.449C119.583 106.11 122.554 87.9084 124.635 70.1667C126.423 51.218 127.61 31.7786 124.272 14.9078L121.436 0L132.573 3.13453C152.074 8.59454 170.14 16.6984 186.627 29.462C202.932 41.6906 217.269 60.2989 220.422 82.665L217.768 83.3857C211.957 63.0311 197.76 48.3576 181.641 38.9363C169.335 31.6858 155.799 26.9022 142.333 23.3874C146.701 39.5243 148.461 55.8071 148.573 71.5858C149.057 92.6522 147.204 112.874 144.047 133.742L143.432 137.796L139.958 142.093C120.566 166.475 103.924 201.742 88.7634 235.192C73.9241 269.344 56.0443 303.002 44.9999 339.392L44.7949 340.174L44.3616 340.736C31.7389 360.246 18.064 379.676 18.3193 402.197C17.7932 413.148 18.7294 424.227 21.5881 434.21C23.1897 439.122 24.447 443.928 26.5746 448.088C28.3811 451.824 31.236 456.682 32.4042 457.571C35.3791 460.657 38.7408 462.253 43.5647 465.153C47.8199 468.005 52.2068 469.804 56.5975 471.634C65.197 475.556 73.9744 477.488 81.9318 476.179C98.3494 474.796 111.68 454.702 118.748 432.411L120.075 432.592L121.467 432.804C122.086 445.475 119.637 458.075 114.697 470.379C109.212 482.192 99.1076 493.01 86.4849 497.507C73.9319 502.445 60.9649 500.274 49.762 496.83C44.1605 494.894 38.4429 492.833 33.4604 489.827C28.884 487.316 22.2574 484.597 17.3599 479.265C10.683 472.183 8.05634 466.462 5.26721 459.406C2.84174 452.584 1.21698 445.793 0.601929 438.892C-0.825562 425.222 0.362061 411.787 3.37946 399.111ZM183.513 393.47C201.528 375.543 217.946 354.481 230.568 332.336L235.969 322.861L244.247 328.56C252.796 334.608 262.286 339.533 269.326 348.327C277.4 355.904 283.345 366.148 288.626 376.325C299.187 397.193 302.506 421.327 302.274 443.875C302.185 489.655 288.487 531.991 270.789 570.56C266.032 580.31 260.827 589.765 255.195 598.886C249.384 607.224 243.899 616.084 239.876 623.869C235.211 631.681 230.019 639.281 227.891 648.954C225.149 658.203 220.986 667.037 220.278 677.179C219.068 687.055 216.46 696.826 216.661 707.074C216.777 717.216 214.967 727.534 215.837 737.751C215.93 758.446 218.174 779.168 221.238 799.996C213.919 780.605 208.932 759.989 205.667 738.901C203.517 728.45 203.106 717.605 202.418 706.808C201.188 696.043 203.06 685.15 203.381 674.119C203.381 663.036 206.878 652.456 209.099 641.478C210.812 630.293 215.915 620.363 220.642 610.226C225.42 599.536 230.406 591.255 235.621 582.705C240.034 574.632 244.17 566.011 248.197 556.97C263.702 521.168 274.719 481.918 275.771 443.53C276.204 433.887 275.156 424.639 273.988 415.363C272.181 406.344 270.286 397.515 266.649 389.398C262.947 381.56 259.059 373.421 253.025 367.434C249.551 362.642 244.746 359.083 240.174 355.387C225.447 374.437 209.447 391.344 191.567 405.743C180.132 412.719 169.293 420.509 156.948 424.586C145.401 430.859 132.117 430.939 119.974 432.685C131.838 427.592 143.707 424.899 153.974 417.008C164.968 411.079 174.093 401.649 183.513 393.47Z"
                fill="#C9A55A"
              />
            </svg>
          </div>

          <div className="contact-banner-inner">
            <h2 className="contact-banner-headline">
              {language === 'en' ? (
                <>
                  We are here to answer all your inquiries
                  <br />
                  and fulfill your needs with maximum speed.
                </>
              ) : (
                <>
                  نحن هنا للإجابة علي جميع استفساراتك
                  <br />
                  وتلبية احتياجاتك بأسرع وقت ممكن.
                </>
              )}
            </h2>

            <p className="contact-banner-desc">
              {language === 'en'
                ? 'Have a question or need an expert consultation? Our team is dedicated to providing superior solutions for your equine requirements. Reach out today for swift, trusted support.'
                : 'هل لديك استفسار أو تحتاج إلى استشارة؟ فريقنا جاهز لمساعدتك وتقديم أفضل الحلول لاحتياجات خيولك، تواصل معنا الآن واحصل على دعم سريع وموثوق.'}
            </p>

            {/* Quick Contact Info Row */}
            <div className="contact-banner-channels">
              {/* Phone 1 */}
              <a href="tel:+966112690408" className="contact-channel-item" dir="ltr">
                <span className="channel-icon" aria-hidden="true">
                  <IconCall size={18} color="#C9A55A" />
                </span>
                <span className="channel-text">+966 11 2690408</span>
              </a>

              {/* Office Landline / Fax */}
              <a href="tel:+966112690407" className="contact-channel-item" dir="ltr">
                <span className="channel-icon" aria-hidden="true">
                  <IconFax size={18} color="#C9A55A" />
                </span>
                <span className="channel-text">+966 11 2690407</span>
              </a>

              {/* Email */}
              <a href="mailto:info@ramzalsharq.com" className="contact-channel-item" dir="ltr">
                <span className="channel-icon" aria-hidden="true">
                  <IconEmail size={18} color="#C9A55A" />
                </span>
                <span className="channel-text">info@ramzalsharq.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. LOCATIONS SECTION
          ========================================================================= */}
      <section className="locations-section" id="locations">
        <div className="locations-header">
          <h2 className="locations-title">
            {language === 'en' ? 'Our Locations' : 'أماكن تواجدنا'}
          </h2>
          <p className="locations-subtitle">
            {language === 'en' ? 'Visit us at one of our specialized locations across Riyadh.' : 'تفضل بزيارتنا في أحد مواقعنا المتخصصة.'}
          </p>
        </div>

        <div className="locations-grid">
          {/* Branches & Pharmacies */}
          <div className="locations-cards-col">
            {/* Card 1: Main Headquarter */}
            {hqBranch && (
              <div
                className={`location-card main-hq-card hq-card ${selectedBranchId === hqBranch.id ? 'is-active-branch' : ''}`}
                onClick={() => setSelectedBranchId(hqBranch.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-right-accent" aria-hidden="true" />
                <div className="location-card-content">
                  <div className="location-card-top hq-card-header">
                    <h3 className="location-card-title hq-card-title">
                      {language === 'en' ? (hqBranch.nameEn || hqBranch.name) : hqBranch.name}
                    </h3>
                    <a
                      href={hqBranch.location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="location-route-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>{language === 'en' ? 'Get Directions' : 'عرض المسار'}</span>
                      <Navigation size={15} strokeWidth={2.4} />
                    </a>
                  </div>

                  <p className="location-address hq-card-address">
                    {language === 'en' ? (hqBranch.addressEn || hqBranch.address) : hqBranch.address}
                  </p>

                  <div className="location-hours-row hq-card-hours">
                    <Clock size={14} className="clock-icon" />
                    <span>
                      {formatHours(hqBranch.workingHours, language).join(' | ')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Card 2: Pharmacies Container */}
            <div className="pharmacies-container-card">
              <h3 className="pharmacies-header-title">
                {language === 'en' ? 'Veterinary Pharmacies' : 'الصيدليات'}
              </h3>

              <div className="pharmacy-items-stack">
                {pharmacyBranches.map((pharmacy) => {
                  const times = formatHours(pharmacy.workingHours, language);
                  const isSelected = selectedBranchId === pharmacy.id;
                  return (
                    <div
                      key={pharmacy.id}
                      className={`pharmacy-subcard ${isSelected ? 'is-active-branch' : ''}`}
                      onClick={() => setSelectedBranchId(pharmacy.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="pharmacy-subcard-header">
                        <div className="pharmacy-name-row">
                          <span className="gold-dot" aria-hidden="true" />
                          <h4 className="pharmacy-name">
                            {language === 'en' ? (pharmacy.nameEn || pharmacy.name) : pharmacy.name}
                          </h4>
                        </div>
                        <a
                          href={pharmacy.location}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="location-route-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>{language === 'en' ? 'Get Directions' : 'عرض المسار'}</span>
                          <Navigation size={14} strokeWidth={2.4} />
                        </a>
                      </div>

                      <p className="pharmacy-address">
                        {language === 'en' ? (pharmacy.addressEn || pharmacy.address) : pharmacy.address}
                      </p>

                      <div className="pharmacy-times-list">
                        {times.map((t, idx) => (
                          <div key={idx} className="time-line">
                            <Clock size={13} className="clock-icon" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Map Container */}
          <div className="locations-map-col">
            <div className="map-card-wrapper">
              {/* Top Tabs Switcher */}
              <div className="map-tabs-bar">
                <button
                  type="button"
                  className={`map-tab-btn ${activeMapTab === 'google' ? 'active' : ''}`}
                  onClick={() => setActiveMapTab('google')}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                    <line x1="9" y1="3" x2="9" y2="18" />
                    <line x1="15" y1="6" x2="15" y2="21" />
                  </svg>
                  <span>{language === 'en' ? 'Map Location' : 'موقعنا على الخريطة'}</span>
                </button>

                <button
                  type="button"
                  className={`map-tab-btn ${activeMapTab === 'saudi' ? 'active' : ''}`}
                  onClick={() => setActiveMapTab('saudi')}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>{language === 'en' ? 'Kingdom Network' : 'شبكة الفروع بالمملكة'}</span>
                </button>
              </div>

              {/* Tab 1: Live Interactive Google Map */}
              {activeMapTab === 'google' && (
                <div className="google-map-container">
                  <iframe
                    key={`${activeCoords.lat}-${activeCoords.lng}`}
                    title={
                      language === 'en'
                        ? `${activeBranch?.nameEn || activeBranch?.name} location on Google Maps`
                        : `موقع ${activeBranch?.name} على خرائط Google`
                    }
                    src={`https://maps.google.com/maps?q=${activeCoords.lat},${activeCoords.lng}&hl=${language}&z=16&output=embed`}
                    className="google-map-iframe"
                    loading="lazy"
                    allowFullScreen
                  />

                  {/* Floating Glassmorphic Location Badge */}
                  <div className="map-floating-badge">
                    <div className="badge-pin-icon" aria-hidden="true">
                      <span className="pin-pulse" />
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A55A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>

                    <div className="badge-text-box">
                      <div className="badge-title">
                        {language === 'en' ? (activeBranch?.nameEn || activeBranch?.name) : activeBranch?.name}
                      </div>
                      <div className="badge-sub">
                        {language === 'en' ? (activeBranch?.addressEn || activeBranch?.address) : activeBranch?.address}
                      </div>
                    </div>

                    <a
                      href={activeBranch?.location || 'https://maps.google.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="badge-action-btn"
                      aria-label={language === 'en' ? 'Open in Google Maps' : 'فتح في خرائط Google'}
                    >
                      <span>{language === 'en' ? 'Open in Google Maps' : 'فتح في Google Maps'}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}

              {/* Tab 2: Saudi Network Vector Map Graphic */}
              {activeMapTab === 'saudi' && (
                <div className="saudi-network-container">
                  <img
                    src="/images/map-saudi.png"
                    alt={language === 'en' ? 'Ramz Al Sharq branch distribution across Saudi Arabia' : 'خريطة انتشار وتواجد رمز الشرق في المملكة العربية السعودية'}
                    className="map-image"
                  />
                  <div className="saudi-map-overlay-badge">
                    <span className="dot-live" />
                    <span>
                      {language === 'en' ? 'Comprehensive coverage across all regions' : 'تغطية متكاملة لجميع مناطق المملكة'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SALES REPRESENTATIVES SECTION
          ========================================================================= */}
      <section className="sales-team-section" id="agents">
        <div className="sales-team-header">
          <h2 className="sales-team-title">
            {language === 'en' ? 'Sales Representatives' : 'فريق المناديب'}
          </h2>
          <p className="sales-team-subtitle">
            {language === 'en'
              ? 'Our specialized sales delegates are distributed across all regions of the Kingdom to provide technical consultation, product recommendations, and swift order fulfillment.'
              : 'نوفر لك فريقاً من مندوبي المبيعات المتخصصين في جميع مناطق المملكة لتقديم الدعم الفني، المساعدة في اختيار المنتجات، وتسهيل عملية الطلب والتوصيل بكل سرعة واحترافية.'}
          </p>
        </div>

        {/* 4 Team Member Cards */}
        <div className="sales-team-grid">
          {teamMembers.map((member) => {
            const memberDisplayName = (language === 'en' && member.nameEn) ? member.nameEn : member.name;
            const memberRegion = language === 'en' ? member.regionEn : member.region;

            return (
              <div key={member.id} className="team-member-card">
                {/* Avatar Circle */}
                <div className="member-avatar-wrapper">
                  <img
                    src={member.image}
                    alt={memberDisplayName}
                    className="member-avatar-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/team/ahmed-sabry.png';
                    }}
                  />
                </div>

                {/* Name & Region Badge */}
                <h3 className="member-name">{memberDisplayName}</h3>
                <div className="member-region-badge">
                  <span>{memberRegion}</span>
                </div>

                {/* Bottom Actions: Phone & WhatsApp */}
                <div className="member-actions-row">
                  <a
                    href={`tel:${member.phone}`}
                    className="member-btn-phone"
                    aria-label={language === 'en' ? `Call ${memberDisplayName}` : `اتصال هاتفي مع ${member.name}`}
                  >
                    <Phone size={16} strokeWidth={2.2} />
                  </a>

                  <a
                    href={`https://wa.me/${member.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-btn-whatsapp"
                    aria-label={language === 'en' ? `WhatsApp chat with ${memberDisplayName}` : `تواصل واتساب مع ${member.name}`}
                  >
                    <img
                      src="/icons/whatsappVector.svg"
                      alt=""
                      className="whatsapp-btn-icon"
                      width="16"
                      height="16"
                    />
                    <span>{language === 'en' ? 'WhatsApp' : 'تواصل واتساب'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { CheckCircle2, Flag, Lightbulb, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './VisionMissionValues.css';

interface CoreValue {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  icon: React.ReactNode;
}

export const VisionMissionValues: React.FC = () => {
  const { language, direction } = useLanguage();

  const coreValues: CoreValue[] = [
    {
      id: 'quality',
      titleAr: 'الجودة',
      titleEn: 'Quality',
      subtitleAr: 'إتقان يفوق التوقعات',
      subtitleEn: 'Excellence beyond expectations',
      icon: <CheckCircle2 size={24} color="#154C9D" strokeWidth={2} />,
    },
    {
      id: 'authenticity',
      titleAr: 'الأصالة',
      titleEn: 'Authenticity',
      subtitleAr: 'تمسك بجذورنا وقيمنا',
      subtitleEn: 'Rooted in heritage & integrity',
      icon: <Flag size={24} color="#154C9D" strokeWidth={2} />,
    },
    {
      id: 'innovation',
      titleAr: 'الابتكار',
      titleEn: 'Innovation',
      subtitleAr: 'تفكير خارج الصندوق',
      subtitleEn: 'Modern veterinary science',
      icon: <Lightbulb size={24} color="#154C9D" strokeWidth={2} />,
    },
    {
      id: 'excellence',
      titleAr: 'التميز',
      titleEn: 'Leadership',
      subtitleAr: 'نسعى لنكون الأفضل',
      subtitleEn: 'Striving to lead the market',
      icon: <Award size={24} color="#154C9D" strokeWidth={2} />,
    },
  ];

  return (
    <section className="vmv-section" aria-label="رؤيتنا ورسالتنا وقيمنا" dir={direction}>
      <div className="vmv-container">
        {/* Main Section Heading */}
        <h2 className="vmv-main-title">
          {language === 'ar' ? 'رؤيتنا ورسالتنا وقيمنا' : 'Our Vision, Mission & Values'}
        </h2>

        {/* Divider with Subtitle */}
        <div className="vmv-divider-row">
          <span className="vmv-divider-line" aria-hidden="true" />
          <span className="vmv-divider-text">
            {language === 'ar' ? 'قيمنا الجوهرية' : 'Our Core Values'}
          </span>
          <span className="vmv-divider-line" aria-hidden="true" />
        </div>

        {/* 4 Core Values Cards */}
        <div className="vmv-values-grid">
          {coreValues.map((val) => (
            <div key={val.id} className="vmv-value-card">
              <div className="vmv-value-icon" aria-hidden="true">
                {val.icon}
              </div>
              <h3 className="vmv-value-title">
                {language === 'ar' ? val.titleAr : val.titleEn}
              </h3>
              <p className="vmv-value-subtitle">
                {language === 'ar' ? val.subtitleAr : val.subtitleEn}
              </p>
            </div>
          ))}
        </div>

        {/* 2 Detailed Cards: رؤيتنا & رسالتنا */}
        <div className="vmv-details-grid">
          {/* Card 1: Vision (Blue) */}
          <div className="vmv-detail-card vmv-card-vision">
            <div className="vmv-card-icon-box vision-box" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#154C9D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1.5" fill="#154C9D" />
              </svg>
            </div>
            <h3 className="vmv-detail-title vision-title">
              {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
            </h3>
            <p className="vmv-detail-text">
              {language === 'ar'
                ? 'أن نكون الخيار الأول والشريك الأكثر موثوقية في مجال تغذية ورعاية الخيول بالمملكة والشرق الأوسط، من خلال استيراد وتقديم أعلى المعايير العالمية التي تضع صحة وأداء الخيل في المقام الأول.'
                : 'To be the first choice and most trusted partner in equine nutrition and horse care across the Kingdom and the Middle East, offering world-class standards that prioritize equine health and performance.'}
            </p>
          </div>

          {/* Card 2: Mission (Green) */}
          <div className="vmv-detail-card vmv-card-mission">
            <div className="vmv-card-icon-box mission-box" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00A86B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1.5" fill="#00A86B" />
              </svg>
            </div>
            <h3 className="vmv-detail-title mission-title">
              {language === 'ar' ? 'رسالتنا' : 'Our Mission'}
            </h3>
            <p className="vmv-detail-text">
              {language === 'ar'
                ? 'تزويد الإسطبلات والمربين بأفضل الأعلاف والمكملات والمعدات الرياضية المعتمدة عالمياً، مع تقديم استشارات متخصصة ودعم مستمر يضمن تفوق الخيول في جميع الميادين والمنافسات.'
                : 'Supplying stables and breeders with internationally certified feeds, supplements, and equestrian equipment, alongside expert consultation and dedicated support ensuring peak performance.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

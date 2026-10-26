import React, { useEffect } from 'react';
import {
  Scale,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Users,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Mail,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './TermsConditions.css';

interface TermsConditionsProps {
  onBackToHome?: () => void;
}

export const TermsConditions: React.FC<TermsConditionsProps> = ({ onBackToHome }) => {
  const { language, direction } = useLanguage();
  const isAr = language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-page-wrapper" dir={direction}>
      {/* ================= HERO BANNER ================= */}
      <section className="terms-banner-container">
        <div className="terms-banner-card">
          {/* Horse Portrait Illustration */}
          <div className="terms-banner-horse-wrapper" aria-hidden="true">
            <img
              src="/images/terms-horse-banner.png"
              alt=""
              className="terms-banner-horse-img"
            />
            <div className="terms-banner-horse-fade" />
          </div>

          {/* Banner Text Content */}
          <div className="terms-banner-content">
            <div className="terms-banner-badge">
              <Scale size={16} />
              <span>{isAr ? 'اتفاقية الاستخدام المعتمدة' : 'Official User Agreement'}</span>
            </div>

            <h1 className="terms-banner-title">
              {isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </h1>
            <div className="terms-banner-gold-bar" aria-hidden="true" />
            
            <p className="terms-banner-subtitle">
              {isAr
                ? 'نلتزم في شركة رمز الشرق (RASCO) بتوفير بيئة قانونية شفافة تضمن حقوق عملائنا وتحدد التزاماتنا المهنية تجاه رعاية الخيول.'
                : 'At Ramz Al Sharq (RASCO), we are dedicated to providing a transparent legal framework ensuring our clients’ rights and defining our professional commitments.'}
            </p>

            <div className="terms-banner-meta-bar">
              <div className="terms-meta-item">
                <Calendar size={14} />
                <span>{isAr ? 'آخر تحديث: 2025' : 'Updated: 2025'}</span>
              </div>
              <span className="terms-meta-dot">•</span>
              <div className="terms-meta-item">
                <Clock size={14} />
                <span>{isAr ? 'وقت القراءة: دقيقتان' : '2 min read'}</span>
              </div>
              <span className="terms-meta-dot">•</span>
              <div className="terms-meta-item">
                <Sparkles size={14} />
                <span>RAMZ AL SHARQ LLC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT BODY ================= */}
      <main className="terms-content-container">
        {/* Quick Highlights 3-Card Grid */}
        <div className="terms-highlights-grid">
          <div className="terms-highlight-card">
            <div className="terms-highlight-icon-wrap blue">
              <BookOpen size={22} />
            </div>
            <div className="terms-highlight-info">
              <h4>{isAr ? 'الضوابط القياسية' : 'Standard Rules'}</h4>
              <p>
                {isAr
                  ? 'إدارة وتنظيم طريقة استخدامك لمنصة وموقع رمز الشرق الرسمي.'
                  : 'Managing and governing your use of our official website.'}
              </p>
            </div>
          </div>

          <div className="terms-highlight-card">
            <div className="terms-highlight-icon-wrap gold">
              <CheckCircle2 size={22} />
            </div>
            <div className="terms-highlight-info">
              <h4>{isAr ? 'الموافقة الملزمة' : 'Binding Agreement'}</h4>
              <p>
                {isAr
                  ? 'تصفح الموقع يمثل قبولاً وإقراراً قانونياً بجميع الشروط الواردة.'
                  : 'Browsing represents full legal consent and acceptance of all terms.'}
              </p>
            </div>
          </div>

          <div className="terms-highlight-card">
            <div className="terms-highlight-icon-wrap emerald">
              <Users size={22} />
            </div>
            <div className="terms-highlight-info">
              <h4>{isAr ? 'أهلية الاستخدام' : 'Age Eligibility'}</h4>
              <p>
                {isAr
                  ? 'اشتراط إشراف ولي الأمر لمن هم دون سن 18 عاماً لحماية القصّر.'
                  : 'Parental supervision required for individuals under 18.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 01: نطاق وتطبيق الشروط */}
        <article className="terms-card-section">
          <div className="terms-card-header">
            <div className="terms-section-number">01</div>
            <div className="terms-section-title-wrap">
              <span className="terms-section-tag">{isAr ? 'الضوابط العامة' : 'General Provisions'}</span>
              <h2 className="terms-card-title">
                {isAr ? 'نطاق الاتفاقية والاستخدام القياسي' : 'Scope & Standard Terms'}
              </h2>
            </div>
          </div>

          <div className="terms-card-body">
            <div className="terms-featured-callout">
              <div className="callout-indicator" />
              <p className="terms-paragraph featured">
                {isAr
                  ? 'توضح شروط وأحكام الموقع القياسية المكتوبة في هذه الصفحة طريقة استخدامك لموقعنا، وتنظم العلاقة القانونية بين الزائر وشركة رمز الشرق للتجارة (RASCO).'
                  : 'These standard website Terms and Conditions written on this webpage shall manage and govern your use of our website.'}
              </p>
            </div>

            <div className="terms-details-block">
              <div className="terms-paragraph-with-icon">
                <div className="terms-bullet-icon">
                  <FileCheck size={18} />
                </div>
                <p className="terms-paragraph">
                  {isAr
                    ? 'تسري هذه البنود على جميع أقسام الموقع، وتضمن تجربة استخدام آمنة وشفافة تخدم أصحاب ومحبي الخيل وتوفر معلومات دقيقة وموثوقة.'
                    : 'These provisions apply to all website sections, ensuring a secure and transparent user experience for equestrian enthusiasts and partners.'}
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Section 02: سريان الشروط والموافقة الكاملة */}
        <article className="terms-card-section agreement-section">
          <div className="terms-card-header">
            <div className="terms-section-number gold">02</div>
            <div className="terms-section-title-wrap">
              <span className="terms-section-tag gold">{isAr ? 'الإقرار الإلزامي' : 'Mandatory Acceptance'}</span>
              <h2 className="terms-card-title">
                {isAr ? 'سريان الشروط والموافقة الكاملة' : 'Applicability & Acceptance'}
              </h2>
            </div>
          </div>

          <div className="terms-card-body">
            <div className="terms-consent-box">
              <div className="terms-consent-icon-wrap">
                <CheckCircle2 size={32} />
              </div>
              <div className="terms-consent-text">
                <p className="terms-paragraph highlight-consent">
                  {isAr
                    ? 'سيتم تطبيق هذه الشروط بالكامل على استخدامك لهذا الموقع، وباستخدامك للموقع فإنك توافق على جميع الشروط والأحكام المذكورة هنا.'
                    : 'These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here.'}
                </p>
                <div className="terms-badge-pill">
                  <ShieldCheck size={14} />
                  <span>{isAr ? 'التزام قانوني سارٍ ومباشر' : 'Immediate & Active Legal Commitment'}</span>
                </div>
              </div>
            </div>

            <div className="terms-notice-box alert">
              <div className="terms-notice-icon">
                <AlertTriangle size={20} />
              </div>
              <div className="terms-notice-content">
                <h5>{isAr ? 'تنويه عدم الموافقة' : 'Disagreement Notice'}</h5>
                <p>
                  {isAr
                    ? 'إذا كنت لا توافق على أي من هذه الشروط والأحكام الخاصة بالموقع، فيجب عليك عدم استخدام هذا الموقع والتوقف عن تصفحه فوراً.'
                    : 'You must not use this Website if you disagree with any of these standard Terms and Conditions.'}
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Section 03: الأهلية القانونية واستخدام القصّر */}
        <article className="terms-card-section minors-section">
          <div className="terms-card-header">
            <div className="terms-section-number emerald">03</div>
            <div className="terms-section-title-wrap">
              <span className="terms-section-tag emerald">{isAr ? 'الحماية والأهلية' : 'Eligibility & Minors'}</span>
              <h2 className="terms-card-title">
                {isAr ? 'استخدام القصّر والأهلية القانونية' : 'Minors & Legal Age Requirements'}
              </h2>
            </div>
          </div>

          <div className="terms-card-body">
            <div className="terms-minors-box">
              <div className="terms-minors-icon-wrap">
                <Users size={28} />
              </div>
              <div className="terms-minors-text">
                <p className="terms-paragraph highlight-minor">
                  {isAr
                    ? 'لا يُسمح للقصّر أو للأشخاص الذين تقل أعمارهم عن 18 سنة باستخدام هذا الموقع دون إشراف ولي الأمر أو الوصي القانوني.'
                    : 'Minors or people below 18 years old are not allowed to use this Website without parental or guardian supervision.'}
                </p>
                <span className="terms-minor-pill">
                  {isAr ? 'حماية بيانات القصّر وسلامة التصفح' : 'Child Data Safety & Supervised Browsing'}
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* ================= INQUIRY / CONTACT CARD ================= */}
        <section className="terms-contact-card">
          <div className="terms-contact-inner">
            <div className="terms-contact-info">
              <div className="terms-contact-icon">
                <HelpCircle size={28} />
              </div>
              <div>
                <h3>{isAr ? 'هل لديك أي استفسار حول الشروط والأحكام؟' : 'Questions Regarding Our Terms?'}</h3>
                <p>
                  {isAr
                    ? 'فريق العمل القانوني والإداري في شركة رمز الشرق متاح دائماً لتقديم المساعدة والإيضاح.'
                    : 'Our legal and support team at Ramz Al Sharq is always here to clarify and assist.'}
                </p>
              </div>
            </div>

            <div className="terms-contact-actions">
              <a href="#contact" className="terms-contact-btn">
                <Mail size={16} />
                <span>{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Back to Home Button Link */}
        {onBackToHome && (
          <div className="terms-back-home-box">
            <button
              type="button"
              onClick={onBackToHome}
              className="terms-back-home-btn"
            >
              {direction === 'rtl' ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
              <span>{direction === 'rtl' ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home Page'}</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

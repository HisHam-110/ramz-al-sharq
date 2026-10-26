import React, { useEffect } from 'react';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Clock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Mail,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './PrivacyPolicy.css';

interface PrivacyPolicyProps {
  onBackToHome?: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBackToHome }) => {
  const { language, direction } = useLanguage();
  const isAr = language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-page-wrapper" dir={direction}>
      {/* ================= HERO BANNER ================= */}
      <section className="privacy-hero-banner">
        <div className="privacy-hero-overlay" aria-hidden="true" />
        <div className="privacy-hero-particles" aria-hidden="true" />
        
        <div className="privacy-hero-content">
          <div className="privacy-hero-badge">
            <ShieldCheck className="privacy-badge-icon" size={18} />
            <span>{isAr ? 'الشفافية والحماية القانونية' : 'Transparency & Legal Protection'}</span>
          </div>

          <h1 className="privacy-hero-title">
            {isAr ? 'سياسة الخصوصية وإخلاء المسؤولية' : 'Privacy Policy & Disclaimer'}
          </h1>
          
          <p className="privacy-hero-subtitle">
            {isAr
              ? 'نلتزم في شركة رمز الشرق بتوفير بيئة تصفح آمنة وموثوقة لعملائنا وشركائنا وفق أعلى معايير الشفافية والمسؤولية.'
              : 'At Ramz Al Sharq (RASCO), we are committed to providing a safe, reliable, and transparent environment for our clients and partners.'}
          </p>

          <div className="privacy-hero-meta-bar">
            <div className="privacy-meta-item">
              <Calendar size={15} />
              <span>{isAr ? 'آخر تحديث: مارس 2025' : 'Last Updated: March 2025'}</span>
            </div>
            <span className="privacy-meta-dot">•</span>
            <div className="privacy-meta-item">
              <Clock size={15} />
              <span>{isAr ? 'وقت القراءة: دقيقتان' : '2 min read'}</span>
            </div>
            <span className="privacy-meta-dot">•</span>
            <div className="privacy-meta-item">
              <Sparkles size={15} />
              <span>RAMZ AL SHARQ LLC (RASCO)</span>
            </div>
          </div>
        </div>

        {/* Gentle Arch Curved Bottom Edge */}
        <div className="privacy-hero-curve" aria-hidden="true">
          <svg
            viewBox="0 0 1440 45"
            fill="none"
            preserveAspectRatio="none"
            className="curve-svg"
          >
            <defs>
              <linearGradient id="heroCurveGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#206bda" />
                <stop offset="50%" stopColor="#144b9d" />
                <stop offset="100%" stopColor="#042658" />
              </linearGradient>
            </defs>
            <path
              d="M0,0 L0,5 Q720,45 1440,5 L1440,0 Z"
              fill="url(#heroCurveGrad)"
            />
            <path
              d="M0,5 Q720,45 1440,5"
              stroke="#C9A55A"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </section>

      {/* ================= MAIN CONTENT BODY ================= */}
      <main className="privacy-content-container">
        {/* Quick Highlights 3-Card Grid */}
        <div className="privacy-highlights-grid">
          <div className="privacy-highlight-card">
            <div className="privacy-highlight-icon-wrap blue">
              <FileText size={22} />
            </div>
            <div className="privacy-highlight-info">
              <h4>{isAr ? 'أغراض معلوماتية' : 'Informational Purpose'}</h4>
              <p>{isAr ? 'كافة البيانات منشورة بحسن نية لتقديم معلومات عامة وموثوقة.' : 'All data is published in good faith for general knowledge.'}</p>
            </div>
          </div>

          <div className="privacy-highlight-card">
            <div className="privacy-highlight-icon-wrap gold">
              <ExternalLink size={22} />
            </div>
            <div className="privacy-highlight-info">
              <h4>{isAr ? 'روابط خارجية مستقلة' : 'External Links'}</h4>
              <p>{isAr ? 'الروابط الخارجية لا تعني تبني كامل محتواها أو سياساتها.' : 'External links are for reference; we do not control their content.'}</p>
            </div>
          </div>

          <div className="privacy-highlight-card">
            <div className="privacy-highlight-icon-wrap emerald">
              <CheckCircle2 size={22} />
            </div>
            <div className="privacy-highlight-info">
              <h4>{isAr ? 'الموافقة الصريحة' : 'User Consent'}</h4>
              <p>{isAr ? 'تصفحك للموقع يمثل إقراراً وموافقة على بنود إخلاء المسؤولية.' : 'Using our site represents full consent to our terms.'}</p>
            </div>
          </div>
        </div>

        {/* ================= SECTION 1: إخلاء المسؤولية لشركة ================= */}
        <article className="privacy-card-section">
          <div className="privacy-card-header">
            <div className="privacy-section-number">01</div>
            <div className="privacy-section-title-wrap">
              <span className="privacy-section-tag">{isAr ? 'البيان الأساسي' : 'Core Statement'}</span>
              <h2 className="privacy-card-title">
                {isAr
                  ? 'إخلاء المسؤولية وسياسة الخصوصية لشركة RAMZ AL SHARQ LLC (RASCO)'
                  : 'Disclaimer & Privacy Policy for RAMZ AL SHARQ LLC (RASCO)'}
              </h2>
            </div>
          </div>

          <div className="privacy-card-body">
            {isAr ? (
              <>
                <div className="privacy-featured-callout">
                  <div className="callout-indicator" />
                  <p className="privacy-paragraph featured">
                    جميع المعلومات الموجودة في هذا الموقع يتم نشرها بحسن نية ولأغراض
                    معلوماتية عامة فقط. شركة <strong>RAMZ AL SHARQ LLC (RASCO)</strong> لا تقدم أي
                    ضمانات بخصوص اكتمال أو موثوقية أو دقة هذه المعلومات.
                  </p>
                </div>

                <div className="privacy-notice-box alert">
                  <div className="notice-icon-box">
                    <AlertTriangle size={20} />
                  </div>
                  <div className="notice-content">
                    <h5>{isAr ? 'حدود المسؤولية الشخصية' : 'Personal Responsibility'}</h5>
                    <p>
                      أي إجراء تقوم به بناءً على المعلومات الموجودة في هذا الموقع (<strong>RAMZ AL SHARQ LLC (RASCO)</strong>)
                      يكون على مسؤوليتك الشخصية بالكامل. كما أن شركة <strong>RAMZ AL SHARQ LLC (RASCO)</strong> غير
                      مسؤولة عن أي خسائر أو أضرار قد تنتج عن استخدام موقعنا.
                    </p>
                  </div>
                </div>

                <div className="privacy-links-explanation">
                  <div className="privacy-paragraph-with-icon">
                    <span className="point-bullet" />
                    <p className="privacy-paragraph">
                      من خلال موقعنا، يمكنك زيارة مواقع أخرى عن طريق الضغط على الروابط التي
                      تقود إلى مواقع خارجية. ورغم أننا نسعى لتوفير روابط لمواقع مفيدة
                      وموثوقة فقط، إلا أننا لا نملك أي تحكم في محتوى هذه المواقع أو
                      طبيعتها. كما أن وجود روابط لمواقع أخرى لا يعني أننا نوصي بجميع
                      المحتويات الموجودة فيها.
                    </p>
                  </div>

                  <div className="privacy-paragraph-with-icon">
                    <span className="point-bullet" />
                    <p className="privacy-paragraph">
                      يرجى الانتباه أيضًا إلى أنه عند مغادرتك لموقعنا والانتقال إلى مواقع
                      أخرى، قد تكون لدى تلك المواقع سياسات خصوصية وشروط مختلفة خارجة عن
                      نطاق سيطرتنا. لذلك نوصي بالاطلاع على سياسات الخصوصية وشروط الخدمة
                      الخاصة بهذه المواقع قبل إجراء أي تعاملات أو مشاركة أي معلومات.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="privacy-featured-callout">
                  <div className="callout-indicator" />
                  <p className="privacy-paragraph featured">
                    All the information on this website is published in good faith and for general information purpose only.
                    <strong> RAMZ AL SHARQ LLC (RASCO)</strong> does not make any warranties about the completeness, reliability, and accuracy of this information.
                  </p>
                </div>

                <div className="privacy-notice-box alert">
                  <div className="notice-icon-box">
                    <AlertTriangle size={20} />
                  </div>
                  <div className="notice-content">
                    <h5>Personal Responsibility & Limitation of Liability</h5>
                    <p>
                      Any action you take upon the information you find on this website (<strong>RAMZ AL SHARQ LLC (RASCO)</strong>)
                      is strictly at your own risk. <strong>RAMZ AL SHARQ LLC (RASCO)</strong> will not be liable for any losses and/or damages in connection with the use of our website.
                    </p>
                  </div>
                </div>

                <div className="privacy-links-explanation">
                  <div className="privacy-paragraph-with-icon">
                    <span className="point-bullet" />
                    <p className="privacy-paragraph">
                      From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. The presence of any links does not imply a recommendation for all the content found on these sites.
                    </p>
                  </div>

                  <div className="privacy-paragraph-with-icon">
                    <span className="point-bullet" />
                    <p className="privacy-paragraph">
                      Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites before engaging in any business or uploading any information.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </article>

        {/* ================= SECTION 2: الموافقة ================= */}
        <article className="privacy-card-section consent-section">
          <div className="privacy-card-header">
            <div className="privacy-section-number gold">02</div>
            <div className="privacy-section-title-wrap">
              <span className="privacy-section-tag gold">{isAr ? 'الإقرار والموافقة' : 'Acceptance'}</span>
              <h2 className="privacy-card-title">
                {isAr ? 'الموافقة' : 'Consent'}
              </h2>
            </div>
          </div>

          <div className="privacy-card-body">
            <div className="privacy-consent-box">
              <div className="privacy-consent-icon-wrap">
                <CheckCircle2 size={32} />
              </div>
              <div className="privacy-consent-text">
                <p className="privacy-paragraph highlight-consent">
                  {isAr
                    ? 'باستخدامك لموقعنا، فإنك توافق بذلك على إخلاء المسؤولية الخاص بنا وتقر بجميع الشروط المذكورة فيه.'
                    : 'By using our website, you hereby consent to our disclaimer and agree to its terms.'}
                </p>
                <div className="privacy-consent-badge">
                  <span>{isAr ? 'ساري المفعول لجميع الزوار والمستخدمين' : 'Applies to all visitors and users'}</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ================= SECTION 3: التحديث ================= */}
        <article className="privacy-card-section update-section">
          <div className="privacy-card-header">
            <div className="privacy-section-number blue">03</div>
            <div className="privacy-section-title-wrap">
              <span className="privacy-section-tag blue">{isAr ? 'التعديلات والتطوير' : 'Revisions'}</span>
              <h2 className="privacy-card-title">
                {isAr ? 'التحديث' : 'Updates'}
              </h2>
            </div>
          </div>

          <div className="privacy-card-body">
            <div className="privacy-update-box">
              <div className="privacy-update-icon-wrap">
                <RefreshCw size={28} />
              </div>
              <div className="privacy-update-text">
                <p className="privacy-paragraph">
                  {isAr
                    ? 'في حال قمنا بتحديث أو تعديل أو إجراء أي تغييرات على هذا المستند، سيتم نشر هذه التغييرات هنا بشكل واضح ومباشر لضمان الشفافية المستمرة مع عملائنا.'
                    : 'Should we update, amend or make any changes to this document, those changes will be prominently posted here to ensure ongoing transparency.'}
                </p>
                <span className="privacy-update-pill">
                  {isAr ? 'الإشعار الفوري بالتحديثات' : 'Immediate Notification of Updates'}
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* ================= INQUIRY / CONTACT CARD ================= */}
        <section className="privacy-contact-card">
          <div className="privacy-contact-inner">
            <div className="privacy-contact-info">
              <div className="privacy-contact-icon">
                <HelpCircle size={28} />
              </div>
              <div>
                <h3>{isAr ? 'هل لديك أي استفسار قانوني؟' : 'Have Any Legal Questions?'}</h3>
                <p>
                  {isAr
                    ? 'فريق الدعم القانوني والإداري في شركة رمز الشرق مستعد للإجابة على جميع استفساراتكم.'
                    : 'Our legal and support team at Ramz Al Sharq is always here to assist you.'}
                </p>
              </div>
            </div>

            <div className="privacy-contact-actions">
              <a href="#contact" className="privacy-contact-btn">
                <Mail size={16} />
                <span>{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Back to Home Button Link */}
        {onBackToHome && (
          <div className="privacy-back-home-box">
            <button
              type="button"
              onClick={onBackToHome}
              className="privacy-back-btn"
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

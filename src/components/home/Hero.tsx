import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpLeft, ArrowUpRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import slide1Collapsed from '../../assets/images/Property 1=1.png';
import slide1Expanded from '../../assets/images/Component 20.png';
import slide2Collapsed from '../../assets/images/images - defaults.png';
import slide2Expanded from '../../assets/images/images - open.png';
import slide3Collapsed from '../../assets/images/Component 20-1.png';
import slide3Expanded from '../../assets/images/Component 20-1-open.png';
import slide4Collapsed from '../../assets/images/Component 20-2.png';
import slide4Expanded from '../../assets/images/images - open2.png';
import './Hero.css';

interface CarouselSlide {
  id: number;
  collapsedImage: string;
  expandedImage: string;
  altAr: string;
  altEn: string;
  tagAr: string;
  tagEn: string;
}

export const Hero: React.FC = () => {
  const { language, direction, t } = useLanguage();
  const touchStartX = useRef<number | null>(null);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      collapsedImage: slide1Collapsed,
      expandedImage: slide1Expanded,
      altAr: 'حصان أبيض يركض في الطبيعة',
      altEn: 'White horse galloping in nature',
      tagAr: 'أصالة وحرية الخيل',
      tagEn: 'Equine Purity & Freedom',
    },
    {
      id: 2,
      collapsedImage: slide2Collapsed,
      expandedImage: slide2Expanded,
      altAr: 'عناية وتنظيف فرو الخيل',
      altEn: 'Horse grooming and coat care',
      tagAr: 'عناية ونظافة متكاملة',
      tagEn: 'Complete Grooming Care',
    },
    {
      id: 3,
      collapsedImage: slide3Collapsed,
      expandedImage: slide3Expanded,
      altAr: 'حصان عربي أصيل واقف',
      altEn: 'Authentic Arabian horse',
      tagAr: 'سلالات عربية أصيلة',
      tagEn: 'Authentic Arabian Breeds',
    },
    {
      id: 4,
      collapsedImage: slide4Collapsed,
      expandedImage: slide4Expanded,
      altAr: 'تغذية ومكملات غذائية للخيل',
      altEn: 'Horse feed and nutrition',
      tagAr: 'أعلاف ومكملات متطورة',
      tagEn: 'Advanced Equine Nutrition',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play interval: 2.8 seconds, pauses when user hovers
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2800);

    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSelectSlide = (targetIndex: number) => {
    setCurrentIndex(targetIndex);
  };

  const getPositionClass = (index: number) => {
    const total = slides.length;
    let diff = index - currentIndex;
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;

    if (diff === 0) return 'pos-center';
    if (diff === 1) return 'pos-next';
    if (diff === -1) return 'pos-prev';
    return 'pos-far';
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    // Minimum swipe threshold
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        direction === 'rtl' ? handlePrev() : handleNext();
      } else {
        direction === 'rtl' ? handleNext() : handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="hero-figma-section" aria-label="قسم البطل الرئيسي">
      {/* Background Golden Horse Watermark */}
      <div className="hero-gold-watermark" aria-hidden="true">
        <svg
          width="559"
          height="800"
          viewBox="0 0 559 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="gold-horse-svg"
        >
          <path
            d="M594.599 219.404C608.135 239.772 614.707 264.446 624.688 285.738C632.177 308.457 636.204 331.717 641.759 353.093C646.742 374.72 646.413 396.171 648.753 415.447C650.765 434.94 652.22 452.686 650.765 468.491C650.274 484.407 649.717 498.205 649.314 509.629C648.444 532.411 647.91 545.378 647.91 545.378L650.564 545.793C650.564 545.793 653.183 532.99 656.602 510.151C658.165 498.603 660.088 484.646 662.32 468.655C665.496 452.505 665.898 434.108 664.846 413.878C663.558 393.824 665.295 371.506 661.43 348.499C657.051 325.647 654.548 300.376 646.703 276.086C636.607 252.779 629.953 226.204 615.914 203.674C602.332 180.768 589.013 156.819 570.321 138.057C553.253 117.423 532.089 102.949 512.186 87.621C491.39 74.4242 470.454 61.8816 449.247 53.2296C428.268 43.8083 407.22 37.6586 387.089 33.9714C367.248 28.6927 347.952 27.7245 330.513 25.0586C260.042 20.1866 214.379 33.5647 214.379 33.5161L214.607 36.6373C214.607 36.5843 260.363 31.9864 328.215 43.1717C344.954 47.0799 363.472 49.5336 382.133 56.121C401.294 61.1521 420.675 68.9907 440.531 78.0583C460.345 86.8385 479.722 99.2263 498.883 112.083C516.979 126.924 536.414 140.736 551.517 160.219C568.955 177.046 581.702 198.691 594.599 219.404ZM428.036 728.821C447.096 715.208 466.806 698.665 485.68 678.805C503.022 659.154 523.706 635.585 538.967 610.235C554.87 584.416 568.282 555.307 575.427 523.502C583.006 491.755 584.437 458.177 581.133 424.86C573.737 358.508 550.495 292.462 517.9 241.881C483.544 192.219 443.839 150.21 404.122 127.464C363.948 104.244 327.121 92.3295 301.136 85.7421C275.094 79.4288 259.791 77.877 259.791 77.877C259.791 77.877 275.044 77.7974 301.775 81.573C328.173 86.0692 366.807 92.4046 409.437 114.744C430.609 125.642 452.972 141.058 473.336 160.905C493.455 179.981 515.177 201.985 532.878 228.9C568.592 282.979 593.265 350.259 602.491 421.977C611.535 494.571 590.294 569.57 554.747 623.166C536.697 651.258 518.175 672.793 496.991 693.594C476.31 713.113 455.011 728.976 434.705 741.885C393.456 767.337 355.306 778.027 328.919 783.019C302.44 788.138 286.959 787.462 286.959 787.462C286.959 787.462 302.44 786.467 328.107 778.474C353.759 770.786 389.371 755.002 428.036 728.821ZM3.37946 399.111C9.32526 372.925 26.0175 355.445 36.6711 335.886C47.7581 299.248 54.6439 260.692 67.402 224.303C73.4406 205.84 80.8486 187.992 88.6899 170.065C95.8465 153.902 104.419 138.211 116.334 123.449C119.583 106.11 122.554 87.9084 124.635 70.1667C126.423 51.218 127.61 31.7786 124.272 14.9078L121.436 0L132.573 3.13453C152.074 8.59454 170.14 16.6984 186.627 29.462C202.932 41.6906 217.269 60.2989 220.422 82.665L217.768 83.3857C211.957 63.0311 197.76 48.3576 181.641 38.9363C169.335 31.6858 155.799 26.9022 142.333 23.3874C146.701 39.5243 148.461 55.8071 148.573 71.5858C149.057 92.6522 147.204 112.874 144.047 133.742L143.432 137.796L139.958 142.093C120.566 166.475 103.924 201.742 88.7634 235.192C73.9241 269.344 56.0443 303.002 44.9999 339.392L44.7949 340.174L44.3616 340.736C31.7389 360.246 18.064 379.676 18.3193 402.197C17.7932 413.148 18.7294 424.227 21.5881 434.21C23.1897 439.122 24.447 443.928 26.5746 448.088C28.3811 451.824 31.236 456.682 32.4042 457.571C35.3791 460.657 38.7408 462.253 43.5647 465.153C47.8199 468.005 52.2068 469.804 56.5975 471.634C65.197 475.556 73.9744 477.488 81.9318 476.179C98.3494 474.796 111.68 454.702 118.748 432.411L120.075 432.592L121.467 432.804C122.086 445.475 119.637 458.075 114.697 470.379C109.212 482.192 99.1076 493.01 86.4849 497.507C73.9319 502.445 60.9649 500.274 49.762 496.83C44.1605 494.894 38.4429 492.833 33.4604 489.827C28.884 487.316 22.2574 484.597 17.3599 479.265C10.683 472.183 8.05634 466.462 5.26721 459.406C2.84174 452.584 1.21698 445.793 0.601929 438.892C-0.825562 425.222 0.362061 411.787 3.37946 399.111ZM183.513 393.47C201.528 375.543 217.946 354.481 230.568 332.336L235.969 322.861L244.247 328.56C252.796 334.608 262.286 339.533 269.326 348.327C277.4 355.904 283.345 366.148 288.626 376.325C299.187 397.193 302.506 421.327 302.274 443.875C302.185 489.655 288.487 531.991 270.789 570.56C266.032 580.31 260.827 589.765 255.195 598.886C249.384 607.224 243.899 616.084 239.876 623.869C235.211 631.681 230.019 639.281 227.891 648.954C225.149 658.203 220.986 667.037 220.278 677.179C219.068 687.055 216.46 696.826 216.661 707.074C216.777 717.216 214.967 727.534 215.837 737.751C215.93 758.446 218.174 779.168 221.238 799.996C213.919 780.605 208.932 759.989 205.667 738.901C203.517 728.45 203.106 717.605 202.418 706.808C201.188 696.043 203.06 685.15 203.381 674.119C203.381 663.036 206.878 652.456 209.099 641.478C210.812 630.293 215.915 620.363 220.642 610.226C225.42 599.536 230.406 591.255 235.621 582.705C240.034 574.632 244.17 566.011 248.197 556.97C263.702 521.168 274.719 481.918 275.771 443.53C276.204 433.887 275.156 424.639 273.988 415.363C272.181 406.344 270.286 397.515 266.649 389.398C262.947 381.56 259.059 373.421 253.025 367.434C249.551 362.642 244.746 359.083 240.174 355.387C225.447 374.437 209.447 391.344 191.567 405.743C180.132 412.719 169.293 420.509 156.948 424.586C145.401 430.859 132.117 430.939 119.974 432.685C131.838 427.592 143.707 424.899 153.974 417.008C164.968 411.079 174.093 401.649 183.513 393.47Z"
            fill="#C9A55A"
          />
        </svg>
      </div>

      <div className="hero-content-wrapper" dir={direction}>
        {/* Top Typography Header */}
        <div className="hero-header-block">
          <h1 className="hero-main-title">
            {language === 'ar' ? (
              <>
                شريكك <span className="highlight-gold">الموثوق</span> في صحة
                <br />
                الخيول
              </>
            ) : (
              <>
                Your <span className="highlight-gold">Trusted</span> Partner in
                <br />
                Equine Health
              </>
            )}
          </h1>
          <p className="hero-subtitle">
            {language === 'ar'
              ? 'أدوية وأعلاف ومكملات غذائية عالية الجودة للخيول'
              : 'Premium feeds, supplements, and certified veterinary care for horses'}
          </p>
        </div>

        {/* 3D Coverflow Carousel Container */}
        <div
          className="hero-carousel-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows */}
          <button
            type="button"
            className="carousel-arrow-btn arrow-prev"
            onClick={direction === 'rtl' ? handlePrev : handleNext}
            aria-label={language === 'ar' ? 'السابق' : 'Previous'}
          >
            {direction === 'rtl' ? <ChevronRight size={22} strokeWidth={2.4} /> : <ChevronLeft size={22} strokeWidth={2.4} />}
          </button>

          <button
            type="button"
            className="carousel-arrow-btn arrow-next"
            onClick={direction === 'rtl' ? handleNext : handlePrev}
            aria-label={language === 'ar' ? 'التالي' : 'Next'}
          >
            {direction === 'rtl' ? <ChevronLeft size={22} strokeWidth={2.4} /> : <ChevronRight size={22} strokeWidth={2.4} />}
          </button>

          {/* 3D Coverflow Stage */}
          <div className="hero-coverflow-stage">
            {slides.map((slide, index) => {
              const posClass = getPositionClass(index);
              const isCenter = posClass === 'pos-center';
              const altText = language === 'ar' ? slide.altAr : slide.altEn;
              const tagText = language === 'ar' ? slide.tagAr : slide.tagEn;

              return (
                <div
                  key={slide.id}
                  className={`hero-coverflow-card ${posClass}`}
                  onClick={() => handleSelectSlide(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={altText}
                  aria-current={isCenter ? 'true' : undefined}
                >
                  <img
                    src={slide.expandedImage || slide.collapsedImage}
                    alt={altText}
                    className="card-media-3d"
                    loading="eager"
                  />
                  <div className="card-gradient-overlay" aria-hidden="true" />

                  {/* Active pill badge */}
                  <div className="card-info-badge-3d">
                    <span className="badge-dot" />
                    <span>{tagText}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Pagination Dots */}
          <div className="carousel-dots-container" role="tablist">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleSelectSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="hero-actions-row">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/966505289728"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-outline"
          >
            <span>{t('chatWhatsApp')}</span>
            <img
              src="/icons/whatsappVector.svg"
              alt="WhatsApp"
              className="whatsapp-green-icon"
              width="22"
              height="22"
            />
          </a>

          {/* Explore Products Button */}
          <a href="#products" className="btn-explore-products">
            {direction === 'rtl' ? (
              <ArrowUpLeft className="btn-arrow-icon" size={18} strokeWidth={2.4} />
            ) : (
              <ArrowUpRight className="btn-arrow-icon" size={18} strokeWidth={2.4} />
            )}
            <span>{t('exploreProducts')}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

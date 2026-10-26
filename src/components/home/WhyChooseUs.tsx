import React, { useState, useRef } from 'react';
import { Headphones, Truck, Award, Users, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './WhyChooseUs.css';

interface FeatureCard {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: React.ReactNode;
}

export const WhyChooseUs: React.FC = () => {
  const { language, direction, t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const features: FeatureCard[] = [
    {
      id: 'support',
      titleAr: 'دعم متواصل',
      titleEn: '24/7 Support',
      descAr: 'اهتمام بأدق التفاصيل ومواصفات عالمية في كل منتج',
      descEn: 'Dedicated customer service and expert consultation anytime',
      icon: <Headphones size={22} strokeWidth={2} color="#154C9D" />,
    },
    {
      id: 'delivery',
      titleAr: 'توصيل سريع',
      titleEn: 'Fast Delivery',
      descAr: 'اهتمام بأدق التفاصيل ومواصفات عالمية في كل منتج',
      descEn: 'Fast and safe dispatch across all Kingdom regions',
      icon: <Truck size={22} strokeWidth={2} color="#154C9D" />,
    },
    {
      id: 'quality',
      titleAr: 'جودة عالية',
      titleEn: 'Certified Quality',
      descAr: 'اهتمام بأدق التفاصيل ومواصفات عالمية في كل منتج',
      descEn: 'Highest international specifications and certified feeds',
      icon: <Award size={22} strokeWidth={2} color="#154C9D" />,
    },
    {
      id: 'experience',
      titleAr: 'خبرة واسعة',
      titleEn: 'Deep Expertise',
      descAr: 'اهتمام بأدق التفاصيل ومواصفات عالمية في كل منتج',
      descEn: 'Over 15 years of leadership serving horse breeders',
      icon: <Users size={22} strokeWidth={2} color="#154C9D" />,
    },
  ];

  return (
    <section className="why-us-section" dir={direction} aria-label={t('whyUsTitle')}>
      <div className="why-us-container">
        
        {/* Content Column: Header + 2x2 Feature Cards Grid */}
        <div className="why-us-content-column">
          <div className="why-us-header">
            <h2 className="why-us-title">{t('whyUsTitle')}</h2>
            <p className="why-us-subtitle">
              {t('whyUsSubtitle')}
            </p>
          </div>

          {/* 2x2 Feature Cards Grid */}
          <div className="why-us-grid">
            {features.map((item) => (
              <div key={item.id} className="why-us-card">
                <div className="why-us-icon-wrapper" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="why-us-card-title">
                  {language === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <p className="why-us-card-desc">
                  {language === 'ar' ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Media Column: Running White Horse Video Player */}
        <div className="why-us-media-column">
          <div 
            className="running-horse-card" 
            onClick={togglePlay}
            role="region"
            aria-label={language === 'ar' ? 'فيديو حصان أبيض أصيل يركض' : 'Video of purebred white horse running'}
          >
            <video
              ref={videoRef}
              className="running-horse-video"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster="/images/why-us-horse.png"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/videos/horse-running.webm" type="video/webm" />
              <img
                src="/images/why-us-horse.png"
                alt={language === 'ar' ? 'حصان أبيض أصيل يركض في الطبيعة' : 'Purebred white horse running'}
                className="running-horse-img"
              />
            </video>

            {/* Subtle Vignette Overlay */}
            <div className="running-horse-overlay" aria-hidden="true" />

            {/* Floating Top Badge */}
            <div className="video-badge-pill">
              <span className="badge-pulse-dot" />
              <span>{language === 'ar' ? 'أصالة الخيل العربي' : 'Purebred Arabian Excellence'}</span>
            </div>

            {/* Floating Glassmorphism Bottom Controls */}
            <div className="video-controls-bar">
              <button
                type="button"
                className="video-control-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                aria-label={isPlaying ? (language === 'ar' ? 'إيقاف الفيديو' : 'Pause video') : (language === 'ar' ? 'تشغيل الفيديو' : 'Play video')}
                title={isPlaying ? (language === 'ar' ? 'إيقاف مؤقت' : 'Pause') : (language === 'ar' ? 'تشغيل' : 'Play')}
              >
                {isPlaying ? <Pause size={17} /> : <Play size={17} />}
              </button>

              <button
                type="button"
                className="video-control-btn"
                onClick={toggleMute}
                aria-label={isMuted ? (language === 'ar' ? 'تشغيل الصوت' : 'Unmute') : (language === 'ar' ? 'كتم الصوت' : 'Mute')}
                title={isMuted ? (language === 'ar' ? 'تشغيل الصوت' : 'Unmute') : (language === 'ar' ? 'كتم الصوت' : 'Mute')}
              >
                {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
            </div>

            {/* Center Big Play Button when paused */}
            {!isPlaying && (
              <div className="video-center-play" aria-hidden="true">
                <div className="center-play-circle">
                  <Play size={28} fill="currentColor" />
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

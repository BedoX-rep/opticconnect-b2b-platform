import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Hero = () => {
  const { t, currentLanguage } = useLanguage();

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-primary to-primary-600 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-white opacity-5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center" dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
          {t('hero.title', 'Morocco\'s Premier Eyewear Marketplace')}
        </h1>

        <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
          {t('hero.subtitle', 'Connect with top eyewear distributors and retailers in one seamless platform')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/distributors"
            className="px-8 py-3 rounded-lg bg-white text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px] min-w-[180px]"
          >
            {t('hero.findDistributors', 'Find Distributors')}
          </Link>
          <Link
            to="/products"
            className="px-8 py-3 rounded-lg bg-white/20 text-white font-medium transition-all hover:shadow-lg hover:bg-white/30 hover:translate-y-[-2px] min-w-[180px]"
          >
            {t('hero.browseProducts', 'Browse Products')}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-white opacity-70" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
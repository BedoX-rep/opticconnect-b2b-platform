
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !textRef.current) return;
      
      // Parallax effect
      const scrollPosition = window.scrollY;
      const opacity = 1 - scrollPosition / 700;
      const transform = scrollPosition / 2;
      
      textRef.current.style.opacity = Math.max(0, opacity).toString();
      textRef.current.style.transform = `translateY(${transform}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,1)), url(https://images.unsplash.com/photo-1556015048-4d3aa10df74c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div 
        ref={textRef}
        className="text-center px-4 z-10 transition-all duration-300 ease-out max-w-4xl animate-slide-up"
      >
        <div className="inline-block mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wider bg-primary/10 text-primary">
            Moroccan Optical Eyewear
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Connect with Premium Eyewear Distributors
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          OpticConnect brings together Morocco's finest eyewear distributors and retailers
          on a single, elegant platform. Discover, connect, and grow your optical business.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/distributors"
            className="px-8 py-3 rounded-lg bg-primary text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
          >
            Find Distributors
          </Link>
          <Link
            to="/products"
            className="px-8 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
          >
            Browse Products
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-muted-foreground" />
      </div>
    </div>
  );
};

export default Hero;


import React, { useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && textRef.current) {
        const scrollPosition = window.scrollY;
        const opacity = Math.max(1 - scrollPosition / 700, 0);
        const translateY = scrollPosition * 0.3;
        
        textRef.current.style.opacity = opacity.toString();
        textRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-primary/10 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556015048-4d3aa10df74c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10 z-0"></div>
      
      {/* Geometric shapes for modern look */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
      
      <div 
        ref={textRef}
        className="text-center px-4 z-10 transition-all duration-300 ease-out max-w-5xl"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6"
        >
          <span className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wider bg-primary/10 text-primary">
            Morocco's Premier Eyewear Platform
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
        >
          Connect with Premium <br /> Eyewear Partners
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
        >
          OpticConnect brings together Morocco's finest eyewear distributors and retailers
          on a single, elegant platform. Discover, connect, and grow your optical business.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-5"
        >
          <Link
            to="/distributors"
            className="px-10 py-4 rounded-lg bg-primary text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px] text-lg"
          >
            Find Distributors
          </Link>
          <Link
            to="/products"
            className="px-10 py-4 rounded-lg bg-white text-primary border border-primary/20 font-medium transition-all hover:shadow-lg hover:translate-y-[-2px] text-lg"
          >
            Browse Products
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="text-primary" />
      </motion.div>
    </div>
  );
};

export default Hero;

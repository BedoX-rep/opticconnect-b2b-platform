
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DistributorCard, { DistributorProps } from './DistributorCard';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Sample data - in a real app, this would come from a database
const featuredDistributors: DistributorProps[] = [
  {
    id: '1',
    name: 'OptiVision',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    city: 'Casablanca',
    phone: '+212 522-123456',
    bio: 'Premium eyewear distributor specializing in designer frames and sunglasses from top international brands.',
    featured: true
  },
  {
    id: '2',
    name: 'Moroccan Lens Co.',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    city: 'Rabat',
    phone: '+212 537-789012',
    bio: 'Specialized in high-quality optical lenses and frames with a focus on affordable luxury and exceptional service.',
    featured: true
  },
  {
    id: '3',
    name: 'EyeStyle Maroc',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    city: 'Marrakech',
    phone: '+212 524-345678',
    bio: 'Offering contemporary and traditional eyewear designs that blend Moroccan craftsmanship with modern technology.',
    featured: true
  }
];

const FeaturedDistributors = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wider bg-primary/10 text-primary mb-4 inline-block">
              Featured Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Featured Distributors</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">Connect with Morocco's top eyewear specialists and discover premium products for your business</p>
          </div>
          <Link 
            to="/distributors" 
            className="flex items-center text-primary font-medium hover:underline mt-4 md:mt-0 group"
          >
            View all distributors
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredDistributors.map((distributor, index) => (
            <motion.div
              key={distributor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DistributorCard {...distributor} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDistributors;

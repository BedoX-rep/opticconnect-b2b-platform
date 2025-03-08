
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DistributorCard, { DistributorProps } from './DistributorCard';

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
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Distributors</h2>
            <p className="text-muted-foreground mt-2">Connect with Morocco's top eyewear specialists</p>
          </div>
          <Link 
            to="/distributors" 
            className="flex items-center text-primary font-medium hover:underline"
          >
            View all
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDistributors.map(distributor => (
            <DistributorCard key={distributor.id} {...distributor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDistributors;

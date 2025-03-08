
import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface DistributorProps {
  id: string;
  name: string;
  image?: string;
  city: string;
  phone: string;
  bio: string;
  featured?: boolean;
}

const DistributorCard = ({ 
  id, 
  name, 
  image, 
  city, 
  phone, 
  bio, 
  featured = false 
}: DistributorProps) => {
  const defaultImage = 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
  
  return (
    <div 
      className={cn(
        "group h-full overflow-hidden rounded-xl transition-all duration-300 bg-white border border-border hover:shadow-lg relative",
        featured && "ring-2 ring-primary/20"
      )}
    >
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}
      
      <Link to={`/distributors/${id}`}>
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
          <img 
            src={image || defaultImage} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-6">
        <Link to={`/distributors/${id}`}>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin size={16} className="mr-1" />
          <span>{city}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
          {bio}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <a 
            href={`tel:${phone}`}
            className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Phone size={16} className="mr-2" />
            {phone}
          </a>
          
          <Link 
            to={`/distributors/${id}`}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DistributorCard;

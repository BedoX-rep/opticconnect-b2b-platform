
import React from 'react';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

export interface DistributorProps {
  id: string;
  name: string;
  image: string;
  city: string;
  phone: string;
  bio: string;
  featured: boolean;
}

const DistributorCard = ({ id, name, image, city, phone, bio }: DistributorProps) => {
  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md hover:translate-y-[-4px] group border-primary/10">
      <Link to={`/distributor/${id}`} className="block h-full">
        <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-primary/5 text-primary">
              {name.charAt(0)}
            </div>
          )}
          {city && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                <MapPin size={12} className="mr-1" />
                {city}
              </div>
            </div>
          )}
        </div>
        
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{name}</h3>
            <span className="bg-primary/10 text-primary p-1 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
              <ArrowUpRight size={16} />
            </span>
          </div>
          
          {bio && <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{bio}</p>}
          
          {phone && (
            <div className="flex items-center text-muted-foreground text-sm">
              <Phone size={14} className="mr-2" />
              {phone}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default DistributorCard;

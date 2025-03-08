import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface DistributorProps {
  id: string;
  name: string;
  city?: string;
  bio?: string;
  image_url?: string | null;
  featured?: boolean;
  [key: string]: any; // For other potential properties
}

const DistributorCard: React.FC<DistributorProps> = ({
  id,
  name,
  city,
  bio,
  image_url,
  featured
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group h-full">
      <Link to={`/distributor/${id}`} className="block h-full">
        <CardContent className="p-0 h-full">
          {/* Image/Logo Section */}
          <div className="h-40 bg-primary/5 flex items-center justify-center">
            {image_url ? (
              <img 
                src={image_url} 
                alt={name} 
                className="w-full h-full object-cover transition-all group-hover:scale-105"
              />
            ) : (
              <Building className="h-16 w-16 text-primary/40" />
            )}
          </div>

          {/* Content Section */}
          <div className="p-5">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-xl line-clamp-1">{name}</h3>
              {featured && (
                <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                  Featured
                </Badge>
              )}
            </div>

            {city && (
              <div className="flex items-center mt-2 text-muted-foreground text-sm">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{city}</span>
              </div>
            )}

            {bio && (
              <p className="mt-3 text-muted-foreground text-sm line-clamp-2">{bio}</p>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default DistributorCard;
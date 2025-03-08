import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface DistributorProps {
  id: string;
  name: string;
  image_url?: string | null;
  city?: string;
  phone?: string;
  bio?: string;
  featured?: boolean;
  email?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

const DistributorCard: React.FC<DistributorProps> = ({
  id,
  name,
  image_url,
  city,
  phone,
  bio,
  featured
}) => {
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={image_url || ''} alt={name} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-lg">{name}</h3>
            {city && (
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="h-3 w-3 mr-1" />
                {city}
              </div>
            )}
          </div>
          {featured && (
            <Badge variant="outline" className="ml-auto text-xs">
              Featured
            </Badge>
          )}
        </div>

        {bio && (
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{bio}</p>
        )}

        <div className="mt-2">
          <Button variant="outline" size="sm" asChild className="w-full">
            <Link to={`/distributors/${id}`} className="flex items-center justify-center">
              View Profile <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>

      {phone && (
        <CardFooter className="p-4 pt-0 border-t">
          <div className="flex items-center text-sm">
            <Phone className="h-3 w-3 mr-1" />
            <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default DistributorCard;
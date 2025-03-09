import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Store } from 'lucide-react'; // Added import for Store icon


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
  const { t } = useLanguage; // Assuming useLanguage hook is available

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 border-border/50">
      <div className="relative">
        {featured && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-primary text-white hover:bg-primary/90">
              {t('featured', 'Featured')}
            </Badge>
          </div>
        )}
        <div className="bg-gradient-to-b from-primary/5 to-primary/10 pt-8 pb-4 px-6 flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4 ring-4 ring-background shadow-lg">
            <AvatarImage src={image_url || ''} alt={name} />
            <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
      </div>

      <CardContent className="p-6 flex-grow">
        {bio && (
          <p className="text-muted-foreground text-center mb-6 line-clamp-3">
            {bio}
          </p>
        )}

        <div className="space-y-3 mt-2">
          {city && (
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">{city}</span>
            </div>
          )}

          {phone && (
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">{phone}</span>
            </div>
          )}

          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Store className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm">{t('viewProducts', 'View Products')}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Button asChild className="w-full" variant="default">
          <Link to={`/distributor/${id}`}>
            {t('viewDistributor', 'View Distributor')}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DistributorCard;
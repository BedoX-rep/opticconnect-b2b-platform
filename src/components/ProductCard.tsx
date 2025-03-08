import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  min_quantity?: number;
  category?: string;
  image_url?: string | null;
  featured?: boolean;
  distributor_id: string;
  distributor_name?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  min_quantity = 1,
  category,
  image_url,
  featured = false,
  distributor_id,
  distributor_name,
}) => {
  const formattedPrice = new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 2,
  }).format(price);

  return (
    <Card className="overflow-hidden h-full flex flex-col modern-card card-hover-effect">
      <Link to={`/product/${id}`} className="relative block">
        <div className="aspect-square w-full overflow-hidden bg-gray-100 rounded-t-lg">
          {image_url ? (
              <img
                src={image_url}
                alt={name}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
              />
            ) : (
              <ShoppingBag className="h-16 w-16 text-gray-300" />
            )}
        </div>
        {featured && (
          <Badge className="absolute top-3 right-3 shadow-md bg-primary text-white font-arabic">متميز</Badge>
        )}
      </Link>
      <CardContent className="flex-grow flex flex-col p-5">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
              {featured && (
                <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                  Featured
                </Badge>
              )}
            </div>

            {category && (
              <Badge variant="secondary" className="mt-2 text-xs font-normal">
                {category}
              </Badge>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className="text-lg font-bold text-primary">
                {formattedPrice}
              </div>
              <div className="text-xs text-muted-foreground">
                Min: {min_quantity} pcs
              </div>
            </div>
          </div>

        {distributor_name && (
          <div className="px-5 pb-4">
            <Link
              to={`/distributors/${distributor_id}`}
              className="block text-sm text-muted-foreground hover:text-primary"
            >
              {distributor_name}
            </Link>
          </div>
        )}
    </Card>
  );
};

export default ProductCard;
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
    <Card className="overflow-hidden transition-all hover:shadow-md group h-full">
      <CardContent className="p-0 h-full">
        <Link to={`/product/${id}`} className="block">
          {/* Product Image */}
          <div className="h-48 bg-gray-100 flex items-center justify-center">
            {image_url ? (
              <img
                src={image_url}
                alt={name}
                className="w-full h-full object-cover transition-all group-hover:scale-105"
              />
            ) : (
              <ShoppingBag className="h-16 w-16 text-gray-300" />
            )}
          </div>

          {/* Content Section */}
          <div className="p-5">
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
        </Link>

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
      </CardContent>
    </Card>
  );
};

export default ProductCard;
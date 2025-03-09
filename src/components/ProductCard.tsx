import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

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
  const { language, t } = useLanguage();

  const formattedPrice = new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
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
                <Badge variant="default" className="absolute top-2 right-2 z-10 orange-gradient">
                  {t('product.featured') || 'Featured'}
                </Badge>
              )}
            </div>

            {category && (
              <Badge variant="secondary" className="mt-2 text-xs font-normal">
                {category}
              </Badge>
            )}

            <div className="mt-3 flex items-center justify-between">
              <div className="font-medium">{formattedPrice}</div>
              <div className="text-sm text-muted-foreground">
                {t('product.minQuantity')}: {min_quantity} {t('product.pieces') || 'pcs'}
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
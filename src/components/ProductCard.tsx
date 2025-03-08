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
  const { t, language } = useLanguage();

  const formattedPrice = new Intl.NumberFormat(language === 'en' ? 'en-US' : 'ar-SA', {
    style: 'currency',
    currency: 'USD',
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
              <h3 className="font-semibold text-lg line-clamp-1">{t('products.name', { name })}</h3> {/* Assuming t handles interpolation */}
              {featured && (
                <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                  {t('products.featured')} {/* Assuming t handles translation */}
                </Badge>
              )}
            </div>

            {category && (
              <Badge variant="secondary" className="mt-2 text-xs font-normal">
                {t('products.category', { category })} {/* Assuming t handles interpolation */}
              </Badge>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className="text-lg font-bold text-primary">
                {formattedPrice}
              </div>
              <div className="text-xs text-muted-foreground">
                {t('products.minQuantity', { min_quantity })} {/* Assuming t handles interpolation and translation */}
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
              {t('products.distributor', { distributor_name })} {/* Assuming t handles interpolation */}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
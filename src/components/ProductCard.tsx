
import React from 'react';
import { Eye, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface ProductProps {
  id: string;
  name: string;
  image: string;
  price: number;
  minQuantity: number;
  distributorId: string;
  distributorName: string;
  category?: string;
  featured?: boolean;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  minQuantity,
  distributorId,
  distributorName,
  featured = false,
}: ProductProps) => {
  const defaultImage = 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
  
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

      <Link to={`/products/${id}`}>
        <div className="relative h-64 overflow-hidden bg-secondary/30">
          <img
            src={image || defaultImage}
            alt={name}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick actions overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              to={`/products/${id}`}
              className="p-2 rounded-full bg-white/90 text-foreground hover:bg-primary hover:text-white transition-colors shadow-sm"
            >
              <Eye size={18} />
            </Link>
            <a
              href={`tel:${distributorId}`}
              className="p-2 rounded-full bg-white/90 text-foreground hover:bg-primary hover:text-white transition-colors shadow-sm"
            >
              <ShoppingCart size={18} />
            </a>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/products/${id}`}>
          <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold">{price.toFixed(2)} MAD</span>
          <span className="text-sm text-muted-foreground">
            Min: {minQuantity} pcs
          </span>
        </div>

        <div className="pt-3 border-t border-border">
          <Link
            to={`/distributors/${distributorId}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {distributorName}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

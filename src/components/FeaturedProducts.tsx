
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard, { ProductProps } from './ProductCard';

// Sample data - in a real app, this would come from a database
const featuredProducts: ProductProps[] = [
  {
    id: '1',
    name: 'Premium Titanium Frames',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 1200,
    minQuantity: 10,
    distributorId: '1',
    distributorName: 'OptiVision',
    featured: true
  },
  {
    id: '2',
    name: 'Designer Sunglasses Collection',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 890,
    minQuantity: 5,
    distributorId: '2',
    distributorName: 'Moroccan Lens Co.',
    featured: true
  },
  {
    id: '3',
    name: 'Photochromic Lenses - Premium',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 650,
    minQuantity: 20,
    distributorId: '3',
    distributorName: 'EyeStyle Maroc',
    featured: true
  },
  {
    id: '4',
    name: 'Slim Acetate Frames',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 780,
    minQuantity: 8,
    distributorId: '1',
    distributorName: 'OptiVision',
    featured: true
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-muted-foreground mt-2">Discover the latest in optical eyewear</p>
          </div>
          <Link 
            to="/products" 
            className="flex items-center text-primary font-medium hover:underline"
          >
            View all
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

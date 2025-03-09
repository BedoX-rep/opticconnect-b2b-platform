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
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Sample data - in a real app, this would come from a database
const featuredProducts = [
  {
    id: '1',
    name: 'Designer Aviator Sunglasses',
    price: 1200,
    minQuantity: 5,
    category: 'Sunglasses',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    distributorId: '1',
    distributorName: 'OptiVision'
  },
  {
    id: '2',
    name: 'Premium Optical Frames',
    price: 950,
    minQuantity: 10,
    category: 'Frames',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    distributorId: '2',
    distributorName: 'Moroccan Lens Co.'
  },
  {
    id: '3',
    name: 'Blue Light Blocking Glasses',
    price: 750,
    minQuantity: 15,
    category: 'Computer Glasses',
    imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    distributorId: '3',
    distributorName: 'EyeStyle Maroc'
  },
  {
    id: '4',
    name: 'Titanium Rimless Frames',
    price: 1500,
    minQuantity: 5,
    category: 'Frames',
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    distributorId: '1',
    distributorName: 'OptiVision'
  }
];

const FeaturedProducts = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wider bg-primary/10 text-primary mb-4 inline-block">
              Trending Items
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Featured Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">Discover top-quality eyewear products from Morocco's leading distributors</p>
          </div>
          <Link 
            to="/products" 
            className="flex items-center text-primary font-medium hover:underline mt-4 md:mt-0 group"
          >
            View all products
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                min_quantity={product.minQuantity}
                category={product.category}
                image_url={product.imageUrl}
                featured={product.featured}
                distributor_id={product.distributorId}
                distributor_name={product.distributorName}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
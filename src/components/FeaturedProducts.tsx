import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
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
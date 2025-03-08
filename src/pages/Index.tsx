import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedDistributors from '@/components/FeaturedDistributors';
import FeaturedProducts from '@/components/FeaturedProducts';
import { ArrowRight, Store, Package, Phone, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Feature items for the "Why OpticConnect" section
  const features = [
    {
      icon: <Store className="h-10 w-10 text-primary" />,
      title: 'Connect with Distributors',
      description: 'Find the perfect distributors for your retail business across Morocco.'
    },
    {
      icon: <Package className="h-10 w-10 text-primary" />,
      title: 'Discover Products',
      description: 'Browse through a wide range of high-quality optical products and eyewear.'
    },
    {
      icon: <Phone className="h-10 w-10 text-primary" />,
      title: 'Direct Communication',
      description: 'Connect directly with distributors through their provided contact information.'
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: 'Verified Partners',
      description: 'All distributors on our platform are verified businesses in the optical industry.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Hero Section */}
      <div className="py-20 hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-2 text-gradient">
              Connect with Morocco's Premier Optical Distributors
            </h1>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 font-arabic text-gradient">
              تواصل مع أفضل موزعي المنتجات البصرية في المغرب
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              OptiConnect brings together optical retailers and distributors 
              in one platform, making it easier to discover products, connect 
              with suppliers, and grow your business.
            </p>
            <p className="mt-3 text-lg text-muted-foreground font-arabic">
              أوبتي كونكت تجمع بين تجار التجزئة والموزعين في مجال البصريات في منصة واحدة، 
              مما يسهل اكتشاف المنتجات والتواصل مع الموردين وتنمية أعمالك.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="arabic-button bg-primary hover:bg-primary/90">
                <Link to="/distributors">
                  <span className="font-arabic">العثور على الموزعين</span>
                  <span className="mx-1">|</span>
                  <span>Find Distributors</span>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="arabic-button">
                <Link to="/products">
                  <span className="font-arabic">تصفح المنتجات</span>
                  <span className="mx-1">|</span>
                  <span>Browse Products</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Why OpticConnect Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why OpticConnect</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing how optical retailers and distributors connect in Morocco
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-border hover:shadow-md transition-all"
              >
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Distributors Section */}
      <FeaturedDistributors />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Join Now CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-6 inline-block">
            For Distributors
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to expand your reach?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join OpticConnect today and showcase your products to retailers across Morocco.
            Our platform connects you directly with potential clients looking for quality eyewear.
          </p>
          <Link 
            to="/login" 
            className="inline-flex items-center px-8 py-3 rounded-lg bg-primary text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
          >
            Join as a Distributor
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
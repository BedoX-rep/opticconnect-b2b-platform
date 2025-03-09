
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Eye, Users, ShoppingBag, Award, CheckCircle, Glasses } from 'lucide-react';
import Hero from '@/components/Hero';
import FeaturedDistributors from '@/components/FeaturedDistributors';
import { supabase } from '@/lib/supabase';

const Index = () => {
  const [stats, setStats] = useState({
    distributors: 0,
    products: 0,
    retailers: 120, // Static value for now, could be dynamic in future
    transactions: 1500 // Static value for now, could be dynamic in future
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Fetch distributor count
      const { count: distributorCount } = await supabase
        .from('distributors')
        .select('*', { count: 'exact', head: true });
      
      // Fetch product count
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });
      
      setStats({
        ...stats,
        distributors: distributorCount || 0,
        products: productCount || 0,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-sm border border-border/50 transition-all hover:shadow-md">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.distributors}</div>
              <div className="text-sm text-muted-foreground text-center">Verified Distributors</div>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-sm border border-border/50 transition-all hover:shadow-md">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.products}</div>
              <div className="text-sm text-muted-foreground text-center">Quality Products</div>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-sm border border-border/50 transition-all hover:shadow-md">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.retailers}</div>
              <div className="text-sm text-muted-foreground text-center">Active Retailers</div>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-sm border border-border/50 transition-all hover:shadow-md">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.transactions}+</div>
              <div className="text-sm text-muted-foreground text-center">Monthly Connections</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How OpticConnect Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with the best eyewear distributors in Morocco or showcase your products to retailers nationwide with our simple platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 text-center transition-all hover:shadow-md hover:translate-y-[-2px]">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Glasses className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Browse Products</h3>
              <p className="text-muted-foreground">
                Explore a wide range of eyewear products from verified distributors across Morocco.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 text-center transition-all hover:shadow-md hover:translate-y-[-2px]">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Connect Directly</h3>
              <p className="text-muted-foreground">
                Contact distributors directly to discuss your needs, pricing, and ordering options.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 text-center transition-all hover:shadow-md hover:translate-y-[-2px]">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Make Business</h3>
              <p className="text-muted-foreground">
                Finalize your orders and establish lasting business relationships with trusted partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedDistributors />
      
      {/* CTA Section for Distributors */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 mb-6 inline-block">
            For Distributors
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to expand your reach?
          </h2>
          <p className="text-lg opacity-90 mb-10 max-w-3xl mx-auto">
            Join OpticConnect today and showcase your products to retailers across Morocco.
            Our platform connects you directly with potential clients looking for quality eyewear.
          </p>
          <Link 
            to="/login" 
            className="inline-flex items-center px-8 py-3 rounded-lg bg-white text-primary font-medium transition-all hover:shadow-lg hover:bg-opacity-90"
          >
            Join as a Distributor
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from distributors and retailers who have found success with OpticConnect
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">MA</span>
                </div>
                <div>
                  <h4 className="font-bold">Mohammed Alami</h4>
                  <p className="text-sm text-muted-foreground">Retailer, Casablanca</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "OpticConnect has transformed how I source products for my optical shop. I've found reliable suppliers and expanded my product range."
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">SA</span>
                </div>
                <div>
                  <h4 className="font-bold">Samira Amrani</h4>
                  <p className="text-sm text-muted-foreground">Distributor, Rabat</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "Since joining OpticConnect, our distribution network has grown by 40%. The platform makes it easy to showcase our products to retailers nationwide."
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">YB</span>
                </div>
                <div>
                  <h4 className="font-bold">Younes Belhaj</h4>
                  <p className="text-sm text-muted-foreground">Retailer, Marrakech</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "The direct connection with distributors has eliminated middlemen and reduced our procurement costs significantly. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

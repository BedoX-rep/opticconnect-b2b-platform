
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Store, Package, Phone, ShieldCheck, Glasses, PieChart, Users, BadgeCheck, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import FeaturedDistributors from '@/components/FeaturedDistributors';
import FeaturedProducts from '@/components/FeaturedProducts';
import { useInView } from 'react-intersection-observer';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const StatCard = ({ icon, value, label, delay }: StatCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-sm border border-primary/10 p-6 flex flex-col items-center text-center"
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-3xl font-bold mb-1 text-primary">{value}</h3>
      <p className="text-muted-foreground">{label}</p>
    </motion.div>
  );
};

const Index = () => {
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="animate-fade-in">
      <Hero />

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wider bg-primary/10 text-primary mb-4 inline-block">
              Industry Leader
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Morocco's Trusted Eyewear Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join thousands of businesses revolutionizing the optical industry in Morocco.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={<Store size={24} />} 
              value="500+" 
              label="Retailers Connected" 
              delay={0.1} 
            />
            <StatCard 
              icon={<Package size={24} />} 
              value="5,000+" 
              label="Products Listed" 
              delay={0.2} 
            />
            <StatCard 
              icon={<Glasses size={24} />} 
              value="120+" 
              label="Distributors Registered" 
              delay={0.3} 
            />
            <StatCard 
              icon={<PieChart size={24} />} 
              value="30%" 
              label="Market Growth" 
              delay={0.4} 
            />
          </div>
        </div>
      </section>

      <FeaturedDistributors />

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wider bg-primary/10 text-primary mb-4 inline-block">
              Platform Overview
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              How OpticConnect Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform simplifies connections between eyewear distributors and retailers throughout Morocco.
            </p>
          </div>

          <div 
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Users size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect</h3>
              <p className="text-muted-foreground">
                Retailers browse and connect with qualified distributors across Morocco, finding partners that match their specific needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Package size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover</h3>
              <p className="text-muted-foreground">
                Explore thousands of eyewear products from frames to lenses, with detailed specifications and pricing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <BadgeCheck size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Grow</h3>
              <p className="text-muted-foreground">
                Build lasting business relationships that help expand your market reach and increase revenue.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wider bg-primary/20 text-primary mb-4 inline-block">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover how OpticConnect has transformed businesses across Morocco.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-primary/10">
              <div className="flex items-center mb-4">
                <div className="text-primary">
                  <Sparkles size={20} />
                  <Sparkles size={20} />
                  <Sparkles size={20} />
                  <Sparkles size={20} />
                  <Sparkles size={20} />
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                "OpticConnect has revolutionized how we source eyewear products. We've increased our product variety by 40% and reduced costs."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="font-medium text-primary">MO</span>
                </div>
                <div>
                  <h4 className="font-medium">Mohammed Oufkir</h4>
                  <p className="text-sm text-muted-foreground">Retailer, Casablanca</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-primary/10">
              <div className="flex items-center mb-4">
                <div className="text-primary">
                  <Sparkles size={20} />
                  <Sparkles size={20} />
                  <Sparkles size={20} />
                  <Sparkles size={20} />
                  <Sparkles size={20} />
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                "As a distributor, we've expanded our retailer network to regions we never reached before. Our sales increased by 65% in just six months."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="font-medium text-primary">LB</span>
                </div>
                <div>
                  <h4 className="font-medium">Laila Benkirane</h4>
                  <p className="text-sm text-muted-foreground">Distributor, Rabat</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-primary/10">
              <div className="flex items-center mb-4">
                <div className="text-primary">
                  <Sparkles size={20} />
                  <Sparkles size={20} />
                  <Sparkles size={20} />
                  <Sparkles size={20} />
                  <Sparkles size={20} />
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                "The platform is intuitive and elegant. Finding new suppliers for our boutique optical shop has never been easier. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="font-medium text-primary">YA</span>
                </div>
                <div>
                  <h4 className="font-medium">Yasmine Alaoui</h4>
                  <p className="text-sm text-muted-foreground">Retailer, Marrakech</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wider bg-primary/10 text-primary mb-4 inline-block">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Benefits for Your Business
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                OpticConnect offers a range of advantages that help eyewear businesses thrive in Morocco's competitive market.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Verified Partners</h3>
                    <p className="text-muted-foreground">All distributors are thoroughly vetted to ensure quality and reliability.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Premium Selection</h3>
                    <p className="text-muted-foreground">Access to a diverse range of high-quality eyewear products from across Morocco.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Direct Communication</h3>
                    <p className="text-muted-foreground">Connect directly with distributors without intermediaries or additional fees.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-64 h-64 bg-primary/10 rounded-lg -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-primary/5 rounded-lg -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1594136976553-38728eeb348a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Eyewear professionals" 
                  className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-6 inline-block">
            Get Started Today
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to transform your eyewear business?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join OpticConnect today and be part of Morocco's leading eyewear marketplace.
            Our platform connects distributors with retailers to create lasting business relationships.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/register" 
              className="inline-flex items-center px-8 py-3 rounded-lg bg-primary text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
            >
              Create an Account
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link 
              to="/about" 
              className="inline-flex items-center px-8 py-3 rounded-lg bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

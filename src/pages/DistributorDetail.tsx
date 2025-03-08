import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Phone, ArrowLeft, Building, ShoppingBag, Loader2, Share2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { DistributorProps } from '@/components/DistributorCard';

interface Product {
  id: string;
  name: string;
  image_url: string;
  price: number;
  min_quantity: number;
  distributor_id: string;
  distributors: { name: string };
  category: string;
  featured: boolean;
}

const DistributorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [distributor, setDistributor] = useState<DistributorProps | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchDistributor();
      fetchDistributorProducts();
    }
  }, [id]);

  const fetchDistributor = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('distributors')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setDistributor(data);
      }
    } catch (error: any) {
      console.error('Error fetching distributor:', error);
      toast({
        title: 'Error fetching distributor information',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const fetchDistributorProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          price,
          min_quantity,
          category,
          image_url,
          featured,
          distributor_id,
          distributors:distributor_id(name)
        `)
        .eq('distributor_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedProducts = data.map(item => ({
          ...item,
          distributor_name: item.distributors.name
        }));
        
        setProducts(formattedProducts);
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error fetching products',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShareClick = () => {
    if (navigator.share && distributor) {
      navigator.share({
        title: `${distributor.name} | OptiConnect`,
        text: `Check out ${distributor.name} on OptiConnect!`,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied to clipboard',
        description: 'You can now share this distributor\'s profile',
      });
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!distributor) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Distributor Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The distributor you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/distributors">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Distributors
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link 
            to="/distributors" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Distributors
          </Link>
        </div>
        
        {/* Distributor Header */}
        <div className="relative rounded-xl overflow-hidden h-64 md:h-80 mb-6">
          {distributor.image_url ? (
            <>
              <img 
                src={distributor.image_url} 
                alt={distributor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-primary/30 to-primary/10 flex items-center justify-center">
              <Building className="h-20 w-20 text-primary/40" />
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold drop-shadow-sm">{distributor.name}</h1>
            <div className="flex items-center mt-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{distributor.city}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShareClick}
                  title="Share this distributor"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                  <a 
                    href={`tel:${distributor.phone}`}
                    className="flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {distributor.phone}
                  </a>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    {distributor.city}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">{distributor.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Products section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Available Products</h2>
              <div>
                <span className="text-muted-foreground">
                  {products.length} product{products.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map(product => (
                  <ProductCard 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image_url}
                    price={product.price}
                    minQuantity={product.min_quantity}
                    distributorId={product.distributor_id}
                    distributorName={product.distributor_name}
                    category={product.category}
                    featured={product.featured}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-secondary/20 rounded-xl">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No products available</h3>
                <p className="text-muted-foreground">
                  This distributor hasn't added any products yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorDetail;

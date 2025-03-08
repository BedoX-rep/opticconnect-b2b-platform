
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
  price: number;
  min_quantity: number;
  category: string;
  image_url: string | null;
  featured: boolean;
  distributor_id: string;
  distributors?: {
    name: string;
  };
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

      if (error) {
        console.error('Error fetching distributor:', error);
        toast({
          title: 'Error fetching distributor information',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      if (data) {
        setDistributor(data);
      }
    } catch (error: any) {
      console.error('Error fetching distributor:', error);
      toast({
        title: 'Error fetching distributor information',
        description: error.message || 'Unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
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

      if (error) {
        console.error('Error fetching distributor products:', error);
        toast({
          title: 'Error fetching products',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      if (data) {
        console.log('Fetched distributor products:', data);
        setProducts(data);
      }
    } catch (error: any) {
      console.error('Error fetching distributor products:', error);
      toast({
        title: 'Error fetching products',
        description: error.message || 'Unknown error occurred',
        variant: 'destructive',
      });
    }
  };

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${distributor?.name} - OpticConnect`,
        text: `Check out ${distributor?.name} on OpticConnect`,
        url: window.location.href,
      }).catch(error => {
        console.error('Error sharing:', error);
      });
    } else {
      toast({
        title: 'Share',
        description: 'Sharing is not supported on this browser',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!distributor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Distributor not found</h1>
          <p className="mt-4">The distributor you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="mt-6">
            <Link to="/distributors">Back to Distributors</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/distributors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Distributors
        </Link>
      </Button>

      {/* Distributor Profile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Header */}
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo/Image */}
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
              {distributor.image_url ? (
                <img 
                  src={distributor.image_url} 
                  alt={distributor.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building className="h-12 w-12 text-primary" />
              )}
            </div>
            
            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold">{distributor.name}</h1>
                <Button variant="outline" size="icon" onClick={shareProfile}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              {distributor.city && (
                <div className="flex items-center mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{distributor.city}</span>
                </div>
              )}
              
              {distributor.phone && (
                <div className="flex items-center mt-2 text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{distributor.phone}</span>
                </div>
              )}
              
              {distributor.bio && (
                <p className="mt-4 text-muted-foreground">{distributor.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              
              {distributor.email && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Email</p>
                  <p className="text-muted-foreground">{distributor.email}</p>
                </div>
              )}
              
              {distributor.phone && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Phone</p>
                  <p className="text-muted-foreground">{distributor.phone}</p>
                </div>
              )}
              
              {distributor.city && (
                <div>
                  <p className="text-sm font-medium mb-1">Location</p>
                  <p className="text-muted-foreground">{distributor.city}</p>
                </div>
              )}
              
              <Button className="w-full mt-6">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View Products
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Products Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Products
        </h2>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                min_quantity={product.min_quantity}
                category={product.category}
                image_url={product.image_url}
                featured={product.featured}
                distributor_id={product.distributor_id}
                distributor_name={distributor.name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No products yet</h3>
            <p className="mt-2 text-muted-foreground">
              This distributor hasn't added any products yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default DistributorDetail;

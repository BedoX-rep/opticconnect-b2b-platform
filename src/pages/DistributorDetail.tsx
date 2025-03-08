
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { 
  MapPin, 
  Phone, 
  ArrowLeft, 
  Building, 
  ShoppingBag, 
  Loader2, 
  Share2, 
  Mail,
  Calendar
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { DistributorProps } from '@/components/DistributorCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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
  description?: string;
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
        .select('*')
        .eq('distributor_id', id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast({
          title: 'Error fetching products',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      if (data) {
        setProducts(data);
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error fetching products',
        description: error.message || 'Unknown error occurred',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${distributor?.name} - Optical Distributor Profile`,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied to clipboard',
        description: 'You can now share this distributor profile.',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-xl">Loading distributor profile...</span>
      </div>
    );
  }

  if (!distributor) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Distributor Not Found</h1>
        <p className="mb-6">The distributor you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/distributors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Distributors
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/distributors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Distributors
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Distributor Info */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={distributor.image_url || ''} alt={distributor.name} />
                  <AvatarFallback className="text-3xl font-bold">
                    {distributor.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold">{distributor.name}</h1>
                {distributor.featured && (
                  <Badge className="mt-2" variant="default">
                    Featured Distributor
                  </Badge>
                )}
              </div>
              
              <Separator className="my-4" />
              
              {distributor.bio && (
                <div className="mb-6 text-center">
                  <p className="text-muted-foreground whitespace-pre-wrap">{distributor.bio}</p>
                </div>
              )}
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                {distributor.city && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{distributor.city}</span>
                  </div>
                )}
                
                {distributor.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                    <a href={`tel:${distributor.phone}`} className="hover:underline">
                      {distributor.phone}
                    </a>
                  </div>
                )}
                
                {distributor.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                    <a href={`mailto:${distributor.email}`} className="hover:underline">
                      {distributor.email}
                    </a>
                  </div>
                )}
                
                {distributor.created_at && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>Joined {formatDate(distributor.created_at)}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <Button onClick={shareProfile} variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Products by {distributor.name}
            <span className="ml-2 text-sm text-muted-foreground">({products.length})</span>
          </h2>

          {products.length === 0 ? (
            <div className="bg-muted p-6 rounded-lg text-center">
              <p className="text-muted-foreground">This distributor hasn't added any products yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  minQuantity={product.min_quantity}
                  category={product.category}
                  imageUrl={product.image_url}
                  featured={product.featured}
                  distributorId={product.distributor_id}
                  distributorName={distributor.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistributorDetail;

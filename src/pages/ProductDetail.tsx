
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, Building, Phone, MapPin, 
  ShoppingCart, ChevronRight, Plus, Minus, Loader2, Share2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  min_quantity: number;
  category: string;
  image_url: string | null;
  distributor_id: string;
  featured: boolean;
  created_at: string;
  distributor: {
    id: string;
    name: string;
    city: string;
    phone: string;
    image_url: string | null;
  };
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderQuantity, setOrderQuantity] = useState(0);
  
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      setOrderQuantity(product.min_quantity);
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          distributor:distributors(id, name, city, phone, image_url)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setProduct(data as Product);
      }
    } catch (error: any) {
      console.error('Error fetching product:', error);
      toast({
        title: 'Error fetching product information',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = () => {
    if (product && orderQuantity < product.quantity) {
      setOrderQuantity(prev => prev + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (product && orderQuantity > product.min_quantity) {
      setOrderQuantity(prev => prev - 1);
    }
  };

  const handleShareClick = () => {
    if (navigator.share && product) {
      navigator.share({
        title: `${product.name} | OptiConnect`,
        text: `Check out ${product.name} from ${product.distributor.name} on OptiConnect!`,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied to clipboard',
        description: 'You can now share this product',
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

  if (!product) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const createdDate = new Date(product.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link 
            to="/products" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-secondary/30 rounded-xl overflow-hidden">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply p-6"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center">
                <ShoppingCart className="h-20 w-20 text-primary/20" />
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="outline" className="mb-3">
                  {product.category}
                </Badge>
                
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                
                <div className="text-2xl font-semibold mb-6">
                  {product.price.toFixed(2)} MAD
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShareClick}
                title="Share this product"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            <p className="text-muted-foreground mb-6">
              {product.description}
            </p>
            
            <Separator className="my-6" />
            
            {/* Order Info */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stock</span>
                <span className="font-medium">{product.quantity} units</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Min. Order Quantity</span>
                <span className="font-medium">{product.min_quantity} units</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Listed on</span>
                <span className="font-medium">{createdDate}</span>
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-muted-foreground">Quantity:</span>
              
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDecreaseQuantity}
                  disabled={orderQuantity <= product.min_quantity}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <span className="px-4 font-medium">
                  {orderQuantity}
                </span>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleIncreaseQuantity}
                  disabled={orderQuantity >= product.quantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Total and Contact */}
            <div className="bg-secondary/20 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span>Total</span>
                <span className="font-semibold">
                  {(product.price * orderQuantity).toFixed(2)} MAD
                </span>
              </div>
              <Button
                className="w-full mt-2"
                asChild
              >
                <a href={`tel:${product.distributor.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Distributor to Order
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Distributor Card */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Distributor Information</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-secondary">
                  {product.distributor.image_url ? (
                    <img 
                      src={product.distributor.image_url} 
                      alt={product.distributor.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary">
                      <Building className="h-8 w-8" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{product.distributor.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin size={14} className="mr-1" />
                    <span>{product.distributor.city}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" asChild>
                    <a href={`tel:${product.distributor.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </a>
                  </Button>
                  
                  <Button asChild>
                    <Link to={`/distributors/${product.distributor.id}`}>
                      Visit Profile
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { 
  Plus, Pencil, Trash2, Image, Loader2, Search, 
  ArrowUpDown, Check, X, ShoppingCart
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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
  created_at: string;
  featured: boolean;
}

// Product categories
const productCategories = [
  'Frames', 'Sunglasses', 'Lenses', 'Contact Lenses', 
  'Accessories', 'Cleaning Products', 'Cases', 'Other'
];

const emptyProduct: Omit<Product, 'id' | 'distributor_id' | 'created_at'> = {
  name: '',
  description: '',
  price: 0,
  quantity: 0,
  min_quantity: 1,
  category: '',
  image_url: null,
  featured: false
};

const ProductManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Product>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Product form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState<Omit<Product, 'id' | 'distributor_id' | 'created_at'>>(emptyProduct);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  
  // Image upload state
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('distributor_id', user?.id)
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
      toast({
        title: 'Unexpected error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...products]
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const resetProductForm = () => {
    setProductData(emptyProduct);
    setEditProductId(null);
    setIsEditing(false);
  };

  const openAddProductDialog = () => {
    resetProductForm();
    setIsDialogOpen(true);
  };

  const openEditProductDialog = (product: Product) => {
    setIsEditing(true);
    setEditProductId(product.id);
    setProductData({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      min_quantity: product.min_quantity,
      category: product.category,
      image_url: product.image_url,
      featured: product.featured
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetProductForm();
  };

  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    let parsedValue: string | number | boolean = value;
    
    // Convert number fields
    if (name === 'price' || name === 'quantity' || name === 'min_quantity') {
      parsedValue = value === '' ? 0 : Number(value);
    }
    
    setProductData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleCategoryChange = (category: string) => {
    setProductData(prev => ({ ...prev, category }));
  };

  const handleFeaturedChange = (featured: boolean) => {
    setProductData(prev => ({ ...prev, featured }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    try {
      setUploading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // Update the product with the new image URL
      setProductData(prev => ({ ...prev, image_url: publicUrl }));

      toast({
        title: 'Image uploaded successfully',
        description: 'Your product image has been updated',
      });
    } catch (error: any) {
      toast({
        title: 'Error uploading image',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'You must be logged in to manage products',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSaving(true);
      
      if (isEditing && editProductId) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            quantity: productData.quantity,
            min_quantity: productData.min_quantity,
            category: productData.category,
            image_url: productData.image_url,
            featured: productData.featured,
            updated_at: new Date()
          })
          .eq('id', editProductId)
          .eq('distributor_id', user.id);

        if (error) throw error;

        toast({
          title: 'Product updated',
          description: 'Your product has been successfully updated',
        });
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert({
            distributor_id: user.id,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            quantity: productData.quantity,
            min_quantity: productData.min_quantity,
            category: productData.category,
            image_url: productData.image_url,
            featured: productData.featured
          });

        if (error) throw error;

        toast({
          title: 'Product created',
          description: 'Your product has been successfully added',
        });
      }
      
      // Refresh the products list
      await fetchProducts();
      
      // Close the dialog and reset form
      setIsDialogOpen(false);
      resetProductForm();
    } catch (error: any) {
      toast({
        title: isEditing ? 'Error updating product' : 'Error creating product',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        .eq('distributor_id', user?.id);

      if (error) throw error;

      toast({
        title: 'Product deleted',
        description: 'The product has been successfully deleted',
      });
      
      // Refresh products list
      await fetchProducts();
    } catch (error: any) {
      toast({
        title: 'Error deleting product',
        description: error.message,
        variant: 'destructive',
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

  return (
    <div className="container py-12 px-4 sm:px-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your eyewear products and inventory
          </p>
        </div>
        
        <Button onClick={openAddProductDialog} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
      </div>
      
      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                  <div className="flex items-center">
                    Name
                    {sortField === 'name' && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('category')} className="cursor-pointer hidden md:table-cell">
                  <div className="flex items-center">
                    Category
                    {sortField === 'category' && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('price')} className="cursor-pointer">
                  <div className="flex items-center">
                    Price
                    {sortField === 'price' && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('quantity')} className="cursor-pointer hidden md:table-cell">
                  <div className="flex items-center">
                    Stock
                    {sortField === 'quantity' && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Min Order
                </TableHead>
                <TableHead className="text-center hidden md:table-cell">
                  Featured
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.length > 0 ? (
                sortedProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.image_url ? (
                        <div className="h-10 w-10 rounded bg-secondary/30 overflow-hidden">
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded bg-secondary/30 flex items-center justify-center">
                          <Image className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.category}
                    </TableCell>
                    <TableCell>
                      {product.price.toFixed(2)} MAD
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.quantity}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.min_quantity}
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      {product.featured ? (
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditProductDialog(product)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive/90"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the product "{product.name}".
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <ShoppingCart className="h-10 w-10 mb-2" />
                      {searchTerm ? (
                        <p>No products match your search</p>
                      ) : (
                        <>
                          <p className="text-lg font-medium">No products yet</p>
                          <p className="mt-1">Add your first product to get started</p>
                          <Button 
                            onClick={openAddProductDialog} 
                            variant="outline" 
                            className="mt-4"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update your product details below' 
                : 'Fill in the details to add a new product to your inventory'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitProduct}>
            <div className="grid gap-6 py-4">
              {/* Product Image */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-40 w-40 rounded-md overflow-hidden bg-secondary/30">
                  {productData.image_url ? (
                    <img 
                      src={productData.image_url} 
                      alt="Product preview" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary">
                      <Image size={32} />
                    </div>
                  )}
                  
                  <Label 
                    htmlFor="product-image-upload" 
                    className="absolute bottom-2 right-2 bg-primary text-primary-foreground p-2 rounded-md cursor-pointer shadow-md hover:bg-primary/90 transition-colors"
                  >
                    <Image size={16} />
                    <span className="sr-only">Upload image</span>
                  </Label>
                  
                  <Input 
                    id="product-image-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </div>
                
                {uploading && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading image...
                  </div>
                )}
              </div>
            
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={productData.name} 
                  onChange={handleProductChange} 
                  placeholder="e.g. Premium Titanium Frames"
                  required
                />
              </div>
              
              {/* Product Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={productData.category} 
                  onValueChange={handleCategoryChange}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price, Quantity, and Min Quantity in a grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (MAD)</Label>
                  <Input 
                    id="price" 
                    name="price" 
                    type="number"
                    min="0"
                    step="0.01"
                    value={productData.price} 
                    onChange={handleProductChange} 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Stock Quantity</Label>
                  <Input 
                    id="quantity" 
                    name="quantity" 
                    type="number"
                    min="0"
                    value={productData.quantity} 
                    onChange={handleProductChange} 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="min_quantity">Minimum Order</Label>
                  <Input 
                    id="min_quantity" 
                    name="min_quantity" 
                    type="number"
                    min="1"
                    value={productData.min_quantity} 
                    onChange={handleProductChange} 
                    required
                  />
                </div>
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={productData.description} 
                  onChange={handleProductChange} 
                  placeholder="Describe your product in detail..."
                  rows={4}
                  required
                />
              </div>
              
              {/* Featured toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={productData.featured}
                  onCheckedChange={handleFeaturedChange}
                />
                <Label htmlFor="featured">
                  Mark as featured product
                </Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving || uploading}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;

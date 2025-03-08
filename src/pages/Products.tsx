
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Search, Filter, Check } from 'lucide-react';
import ProductCard, { ProductProps } from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Sample categories for optical products
const CATEGORIES = [
  "Frames",
  "Sunglasses",
  "Lenses",
  "Contact Lenses",
  "Accessories",
  "Cleaning Products",
  "Cases"
];

const Products = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(5000);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          distributors:distributorId (name)
        `);

      if (error) throw error;

      if (data) {
        // Format the data to match ProductProps
        const formattedData = data.map(item => ({
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          minQuantity: item.minQuantity,
          distributorId: item.distributorId,
          distributorName: item.distributors?.name || 'Unknown',
          category: item.category,
          featured: item.featured || false
        }));

        setProducts(formattedData);

        // Find the highest price for the slider
        const highestPrice = Math.max(...formattedData.map(p => p.price), 5000);
        setMaxPrice(highestPrice);
        setPriceRange([0, highestPrice]);
      }
    } catch (error: any) {
      toast({
        title: 'Error fetching products',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const sortProducts = (products: ProductProps[]) => {
    switch (sortBy) {
      case 'newest':
        return [...products]; // Assuming products are already sorted by newest
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const filteredProducts = sortProducts(
    products.filter(product => {
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearchTerm && matchesCategory && matchesPriceRange;
    })
  );

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Optical Eyewear Products
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse through a wide selection of premium optical products
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-xl shadow-sm p-4 mb-8 border">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Categories</span>
                    </div>
                    <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 ml-2">
                      {selectedCategories.length}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Select Categories</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {CATEGORIES.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={category} 
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <Label htmlFor={category}>{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between items-center">
                    <span>Price Range</span>
                    <span className="text-sm text-muted-foreground">
                      {priceRange[0]} - {priceRange[1]} MAD
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Price Range</h4>
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={maxPrice}
                      step={50}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange([value[0], value[1]])}
                      className="py-4"
                    />
                    <div className="flex justify-between">
                      <p>{priceRange[0]} MAD</p>
                      <p>{priceRange[1]} MAD</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="md:col-span-3 lg:col-span-4">
              <Button 
                variant="secondary" 
                onClick={handleClearFilters}
                className="w-full sm:w-auto"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-[360px] rounded-xl bg-card animate-pulse border" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

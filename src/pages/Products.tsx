
import React, { useEffect, useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import ProductCard, { ProductProps } from '@/components/ProductCard';

// Sample data - in a real app, this would come from a database
const allProducts: ProductProps[] = [
  {
    id: '1',
    name: 'Premium Titanium Frames',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 1200,
    minQuantity: 10,
    distributorId: '1',
    distributorName: 'OptiVision',
    featured: true
  },
  {
    id: '2',
    name: 'Designer Sunglasses Collection',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 890,
    minQuantity: 5,
    distributorId: '2',
    distributorName: 'Moroccan Lens Co.',
    featured: true
  },
  {
    id: '3',
    name: 'Photochromic Lenses - Premium',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 650,
    minQuantity: 20,
    distributorId: '3',
    distributorName: 'EyeStyle Maroc',
    featured: true
  },
  {
    id: '4',
    name: 'Slim Acetate Frames',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 780,
    minQuantity: 8,
    distributorId: '1',
    distributorName: 'OptiVision',
    featured: true
  },
  {
    id: '5',
    name: 'Children\'s Eyewear Collection',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 450,
    minQuantity: 15,
    distributorId: '4',
    distributorName: 'Glasses Emporium',
    featured: false
  },
  {
    id: '6',
    name: 'Anti-Blue Light Glasses',
    image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 520,
    minQuantity: 12,
    distributorId: '5',
    distributorName: 'Vision Plus',
    featured: false
  },
  {
    id: '7',
    name: 'Sports Eyewear Collection',
    image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 980,
    minQuantity: 6,
    distributorId: '6',
    distributorName: 'Clear View Optics',
    featured: false
  },
  {
    id: '8',
    name: 'Luxury Gold-Plated Frames',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 1850,
    minQuantity: 3,
    distributorId: '1',
    distributorName: 'OptiVision',
    featured: false
  }
];

// Categories for filtering
const categories = ['All Categories', 'Frames', 'Sunglasses', 'Lenses', 'Accessories'];

// Sort options
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' }
];

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle search, filtering and sorting
  useEffect(() => {
    let results = allProducts;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.distributorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category (in a real app, products would have categories)
    if (selectedCategory !== 'All Categories') {
      // This is a simplification since our sample data doesn't have categories
      // In a real app, you would filter by the actual category field
      results = results.filter(product => 
        product.name.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    // Filter by price range
    results = results.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Sort results
    switch (selectedSort) {
      case 'price_asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        // For this example, we'll assume the order in the array is the "newest" order
        break;
    }
    
    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, selectedSort, priceRange]);

  // Handle price range input
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-secondary/30 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Eyewear Products</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover a wide range of quality optical products for your retail business
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-10">
          <div className="flex flex-col space-y-4">
            {/* Search and Filter Toggle Row */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search Input */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              {/* Filter Toggle Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-secondary text-foreground rounded-lg md:w-auto"
              >
                <Filter size={18} />
                <span>Filters</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {/* Sort Select */}
              <div className="relative md:w-1/4">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none bg-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown size={16} className="text-muted-foreground" />
                </div>
              </div>
            </div>
            
            {/* Expanded Filter Options */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden transition-all duration-300 ${isFilterOpen ? 'max-h-96 pt-4 border-t border-border' : 'max-h-0'}`}>
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* Price Range Min */}
              <div>
                <label className="block text-sm font-medium mb-2">Min Price (MAD)</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => handlePriceRangeChange(e, 'min')}
                  min="0"
                  max={priceRange.max}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              {/* Price Range Max */}
              <div>
                <label className="block text-sm font-medium mb-2">Max Price (MAD)</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => handlePriceRangeChange(e, 'max')}
                  min={priceRange.min}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-6">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
                setSelectedSort('newest');
                setPriceRange({ min: 0, max: 2000 });
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

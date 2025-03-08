
import React, { useEffect, useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import DistributorCard, { DistributorProps } from '@/components/DistributorCard';

// Sample data - in a real app, this would come from a database
const allDistributors: DistributorProps[] = [
  {
    id: '1',
    name: 'OptiVision',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    city: 'Casablanca',
    phone: '+212 522-123456',
    bio: 'Premium eyewear distributor specializing in designer frames and sunglasses from top international brands.',
    featured: true
  },
  {
    id: '2',
    name: 'Moroccan Lens Co.',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    city: 'Rabat',
    phone: '+212 537-789012',
    bio: 'Specialized in high-quality optical lenses and frames with a focus on affordable luxury and exceptional service.',
    featured: true
  },
  {
    id: '3',
    name: 'EyeStyle Maroc',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    city: 'Marrakech',
    phone: '+212 524-345678',
    bio: 'Offering contemporary and traditional eyewear designs that blend Moroccan craftsmanship with modern technology.',
    featured: true
  },
  {
    id: '4',
    name: 'Glasses Emporium',
    image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    city: 'Tangier',
    phone: '+212 539-567890',
    bio: 'Wide range of affordable and luxury eyewear options for all ages with a focus on excellent customer service.',
    featured: false
  },
  {
    id: '5',
    name: 'Vision Plus',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    city: 'Fez',
    phone: '+212 535-123456',
    bio: 'Family-owned business with over 30 years of experience in the eyewear industry, offering personalized service.',
    featured: false
  },
  {
    id: '6',
    name: 'Clear View Optics',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    city: 'Agadir',
    phone: '+212 528-789012',
    bio: 'Specializing in premium optical solutions with a wide range of designer frames and cutting-edge lens technology.',
    featured: false
  }
];

// List of Moroccan cities for filtering
const cities = ['All Cities', 'Casablanca', 'Rabat', 'Marrakech', 'Tangier', 'Fez', 'Agadir'];

const Distributors = () => {
  const [filteredDistributors, setFilteredDistributors] = useState<DistributorProps[]>(allDistributors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let results = allDistributors;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(distributor => 
        distributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        distributor.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by city
    if (selectedCity !== 'All Cities') {
      results = results.filter(distributor => distributor.city === selectedCity);
    }
    
    setFilteredDistributors(results);
  }, [searchTerm, selectedCity]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-secondary/30 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Eyewear Distributors</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with the best optical eyewear distributors across Morocco
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search distributors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            {/* City Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-muted-foreground" />
              </div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none bg-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredDistributors.length} distributors
          </p>
        </div>
        
        {/* Distributors Grid */}
        {filteredDistributors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDistributors.map(distributor => (
              <DistributorCard key={distributor.id} {...distributor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-6">No distributors found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCity('All Cities');
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

export default Distributors;

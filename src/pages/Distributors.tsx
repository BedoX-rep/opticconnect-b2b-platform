import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Search, MapPin } from 'lucide-react';
import DistributorCard, { DistributorProps } from '@/components/DistributorCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Placeholder for SupabaseStatus component -  needs actual implementation
const SupabaseStatus = () => <div>Supabase Connection Status: (Implementation needed)</div>;


const Distributors = () => {
  const [distributors, setDistributors] = useState<DistributorProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('distributors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching distributors:', error);
        toast({
          title: 'Error fetching distributors',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      if (data) {
        console.log('Fetched distributors:', data);
        setDistributors(data);

        // Extract unique cities for filter
        const uniqueCities = [...new Set(data.map(distributor => distributor.city).filter(Boolean))];
        setCities(uniqueCities);
      }
    } catch (error: any) {
      console.error('Error fetching distributors:', error);
      toast({
        title: 'Error fetching distributors',
        description: error.message || 'Unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDistributors = distributors.filter(distributor => {
    const matchesSearchTerm = distributor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (distributor.bio && distributor.bio.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCity = selectedCity && selectedCity !== 'all' ? 
                        distributor.city?.toLowerCase() === selectedCity.toLowerCase() : 
                        true;
    return matchesSearchTerm && matchesCity;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SupabaseStatus /> {/* Added SupabaseStatus component */}
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Optical Eyewear Distributors
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with Morocco's finest eyewear distributors
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-xl shadow-sm p-4 mb-8 border">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search distributors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city || "unknown"}>
                      {city || "Unknown"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Distributors Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[420px] rounded-xl bg-card animate-pulse border" />
            ))}
          </div>
        ) : filteredDistributors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDistributors.map((distributor) => (
              <DistributorCard 
                key={distributor.id} 
                id={distributor.id}
                name={distributor.name}
                image_url={distributor.image_url}
                city={distributor.city}
                phone={distributor.phone}
                bio={distributor.bio}
                featured={distributor.featured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground mb-2">No distributors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Distributors;
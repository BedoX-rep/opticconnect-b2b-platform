import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface DistributorProps {
  id: string;
  name: string;
  image_url?: string | null;
  city?: string;
  phone?: string;
  bio?: string;
  featured?: boolean;
  email?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

const DistributorCard: React.FC<DistributorProps> = ({
  id,
  name,
  image_url,
  city,
  phone,
  bio,
  featured
}) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col modern-card card-hover-effect dir-rtl"> {/* Added dir-rtl for RTL support */}
      <CardContent className="p-0">
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 rounded-t-lg">
          <img
            src={image_url || "/placeholder.svg"}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-5">
          <h2 className="text-xl font-semibold font-arabic">{name}</h2>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <MapPin className="h-3 w-3 mr-1 text-primary" />
            <span className="font-arabic">{city || "موقع غير محدد"}</span>
          </div>
          <p className="mt-4 line-clamp-3 text-sm font-arabic">{bio || "لا يوجد وصف متاح"}</p>
          <div className="mt-5">
            <Button asChild className="w-full arabic-button bg-primary hover:bg-primary/90">
              <Link to={`/distributors/${id}`}>
                <span className="font-arabic">عرض الملف الشخصي</span>
                <span className="mx-1">|</span>
                <span>View Profile</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DistributorCard;
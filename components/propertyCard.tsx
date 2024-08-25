import { Star } from 'lucide-react';
import Image from 'next/image';

import { Button } from './ui/button';

interface PropertyCardProps {
  image: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
}

const PropertyCard = ({
  image,
  name,
  price,
  rating,
  reviews,
}: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={image}
        alt={name}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">${price} Per Night</p>
        <div className="flex items-center mt-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm">
            {rating} ({reviews} Reviews)
          </span>
        </div>
        <Button className="w-full mt-4 bg-teal-500 hover:bg-teal-600">
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;

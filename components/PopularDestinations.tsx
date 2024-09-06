import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from './ui/card';

const destinations = [
  { name: 'Paris', image: '/images/paris.jpg' },
  { name: 'New York', image: '/images/new-york.jpg' },
  { name: 'Tokyo', image: '/images/tokyo.jpg' },
  { name: 'Bali', image: '/images/bali.jpg' },
];

const PopularDestinations = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Link
              href={`/destination/${destination.name.toLowerCase()}`}
              key={destination.name}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <h3 className="text-white text-2xl font-bold">
                        {destination.name}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;

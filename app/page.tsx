import CTA from '@/components/cta';
import Features from '@/components/features';
import Hero from '@/components/hero';
import PropertyCard from '@/components/propertyCard';

const properties = [
  {
    image: '/images/fairy-meadows.jpg',
    name: 'Fairy Meadows',
    price: 70,
    rating: 4.8,
    reviews: 1569,
  },
  // Add more properties...
];

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Popular</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
      <CTA />
    </main>
  );
}

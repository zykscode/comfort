import CTA from '@/components/cta';
import Features from '@/components/features';
import Hero from '@/components/hero';
import { Icons } from '@/components/icons';
import { ParallaxText } from '@/components/parallax';
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
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Popular</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
      <CTA />
      <div className="flex gap-4 items-center flex-col">
        <h3 className="text-4xl">Hotels</h3>
        <ParallaxText baseVelocity={3}>
          <div className="flex h-8 justify-evenly gap-4 pl-36">
            <Icons.fourPoints className="h-full" />
            <Icons.rh className="h-full" />
            <Icons.frasier className="h-full " />
            <Icons.eko className="h-full  " />
            <Icons.marriot className="h-full" />
            <Icons.sheraton className="h-full" />
          </div>
        </ParallaxText>
        <ParallaxText baseVelocity={-3}>
          <div className="flex h-8 justify-evenly gap-4 pl-36">
            <Icons.sheraton className="h-full" />
            <Icons.frasier className="h-full " />
            <Icons.eko className="h-full  " />
            <Icons.marriot className="h-full" />
            <Icons.fourPoints className="h-full" />
            <Icons.rh className="h-full" />
          </div>
        </ParallaxText>
      </div>
    </main>
  );
}

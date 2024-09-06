import CTA from '@/components/cta';
import Features from '@/components/features';
import Hero from '@/components/hero';
import { Icons } from '@/components/icons';
import { ParallaxText } from '@/components/parallax';
import PopularDestinations from '@/components/PopularDestinations';
import PropertyCard from '@/components/propertyCard';
import SearchSection from '@/components/SearchSection';
import Testimonials from '@/components/Testimonials';

const featuredProperties = [
  {
    image: '/images/fairy-meadows.jpg',
    name: 'Fairy Meadows Resort',
    price: 70,
    rating: 4.8,
    reviews: 1569,
  },
  // Add 2 more featured properties
];

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      <SearchSection />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProperties.map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </div>
        </div>
      </section>
      <Features />
      <PopularDestinations />
      <Testimonials />
      <section className="w-full py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Hotel Partners
          </h2>
          <div className="flex gap-4 items-center flex-col">
            <ParallaxText baseVelocity={3}>
              <div className="flex h-12 justify-evenly gap-8">
                <Icons.fourPoints className="h-full" />
                <Icons.rh className="h-full" />
                <Icons.frasier className="h-full" />
                <Icons.eko className="h-full" />
                <Icons.marriot className="h-full" />
                <Icons.sheraton className="h-full" />
              </div>
            </ParallaxText>
            <ParallaxText baseVelocity={-3}>
              <div className="flex h-12 justify-evenly gap-8">
                <Icons.sheraton className="h-full" />
                <Icons.frasier className="h-full" />
                <Icons.eko className="h-full" />
                <Icons.marriot className="h-full" />
                <Icons.fourPoints className="h-full" />
                <Icons.rh className="h-full" />
              </div>
            </ParallaxText>
          </div>
        </div>
      </section>
      <CTA />
    </main>
  );
}

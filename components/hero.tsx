'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from './ui/button';

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-secondary text-white"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Discover Your Perfect Stay
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
        >
          Experience luxury, comfort, and unforgettable moments in our
          handpicked hotels around the world.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button asChild size="lg" className="text-lg">
            <Link href="/search">Find Your Hotel</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;

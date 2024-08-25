'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from './ui/button';

const CTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-primary text-white"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Experience Comfort?
        </h2>
        <p className="text-xl mb-8">
          Book your stay now and enjoy unparalleled luxury.
        </p>
        <Button asChild size="lg">
          <Link href="/sign-up">Book Now</Link>
        </Button>
      </div>
    </motion.section>
  );
};

export default CTA;

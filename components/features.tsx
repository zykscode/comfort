'use client';

import { motion } from 'framer-motion';
import { Home, Shield, Star } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const features = [
  {
    icon: Home,
    title: 'Comfortable Stays',
    description:
      'Enjoy our carefully curated accommodations for maximum comfort.',
  },
  {
    icon: Shield,
    title: 'Secure Bookings',
    description:
      'Book with confidence using our secure and easy-to-use platform.',
  },
  {
    icon: Star,
    title: 'Premium Experience',
    description: 'Experience top-notch service and amenities during your stay.',
  },
];

const Features = () => {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <feature.icon className="w-6 h-6 mr-2" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

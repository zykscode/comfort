/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileContentProps {
  user: {
    id: string;
    email: string;
    name: string;
    profileImageUrl: string;
  };
  lodger: {
    clerkId: string;
    name: string;
    email: string;
    phoneNumber: string;
    profileImage: {
      url: string;
    };
    preference: string;
    bookings: any[];
  } | null;
  error?: boolean;
}
export default function ProfileContent({
  user,
  lodger,
  error,
}: ProfileContentProps) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <Button asChild className="mb-4">
          <Link href="/">Home</Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Error loading or creating profile. Please try again later.</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={lodger?.profileImage?.url ?? user.profileImageUrl}
              alt={lodger?.name ?? user.name}
            />
            <AvatarFallback>
              {lodger?.name.charAt(0) ?? user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{lodger?.name ?? user.name}</h1>
            <p className="text-gray-500">{lodger?.email ?? user.email}</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Email:</strong> {lodger?.email ?? user.email}
            </p>
            <p>
              <strong>Name:</strong> {lodger?.name ?? user.name}
            </p>
            <p>
              <strong>Phone:</strong> {lodger?.phoneNumber ?? ''}
            </p>
            <p>
              <strong>Preferences:</strong> {lodger?.preference ?? ''}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Total Bookings:</strong> {lodger?.bookings?.length ?? 0}
            </p>
            {/* Add more booking-related information here */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {lodger?.bookings && lodger.bookings.length > 0 ? (
              lodger.bookings.slice(0, 3).map((booking, index) => (
                <div key={index} className="mb-2">
                  <p>
                    <strong>Booking {index + 1}:</strong>{' '}
                    {/* Add booking details here */}
                  </p>
                </div>
              ))
            ) : (
              <p>No bookings yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

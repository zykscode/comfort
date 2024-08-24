'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ProfileContentProps {
  user?: any;
  lodger?: any;
  error?: boolean;
}

export default function ProfileContent({ user, lodger, error }: ProfileContentProps) {
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
            <AvatarImage src={user.profileImageUrl} alt={lodger.name} />
            <AvatarFallback>{lodger.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{lodger.name}</h1>
            <p className="text-gray-500">{lodger.email}</p>
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
            <p><strong>Email:</strong> {lodger.email}</p>
            <p><strong>Name:</strong> {lodger.name}</p>
            {/* Add more profile information here */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Total Bookings:</strong> 0</p>
            <p><strong>Upcoming Stays:</strong> 0</p>
            {/* Add more booking-related information here */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Points:</strong> 0</p>
            <p><strong>Member Since:</strong> {new Date().getFullYear()}</p>
            {/* Add more rewards-related information here */}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

import { useToast } from '@/hooks/use-toast';
export default function UserLayout({
  children,
  profile,
  dashboard,
}: {
  children: React.ReactNode;
  profile: React.ReactNode;
  dashboard: React.ReactNode;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to access this page.',
        variant: 'destructive',
      });
      redirect('/sign-in');
    }

    if (isLoaded && isSignedIn && user) {
      toast({
        title: 'Welcome',
        description: `Hello, ${user.firstName || 'User'}! You've successfully logged in.`,
        variant: 'default',
      });
    }
  }, [isLoaded, isSignedIn, user, toast]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>{profile}</div>
        <div>{dashboard}</div>
      </div>
      {children}
    </div>
  );
}

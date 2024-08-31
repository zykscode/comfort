'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

import { useToast } from '@/hooks/use-toast';

interface Lodger {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [lodger, setLodger] = useState<Lodger | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;

      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();

        setLodger(data);

        toast({
          title: 'Profile Loaded',
          description: 'Your profile has been successfully loaded.',
          variant: 'default',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: 'Error',
          description:
            'There was an error loading your profile. Please try again.',
          variant: 'destructive',
        });
      }
    }

    fetchUserData();
  }, [user, toast]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Profile</h1>
      {lodger && (
        <div>
          <p>Name: {lodger.name}</p>
          <p>Email: {lodger.email}</p>
          {/* Add more profile information as needed */}
        </div>
      )}
    </div>
  );
}

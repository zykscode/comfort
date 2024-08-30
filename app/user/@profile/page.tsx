'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { getUserByClerkId } from '@/lib/hygraph';

export default function ProfilePage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [lodger, setLodger] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;

      try {
        const userData = {
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress ?? '',
          name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
          profileImageUrl: user.imageUrl,
        };

        // Fetch or create user in the database via API route
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch or create user');
        }

        const dbUser = await response.json();

        // Fetch Hygraph data
        const hygraphLodger = await getUserByClerkId(
          user.id,
          userData.email,
          userData.name,
        );

        setLodger({ ...dbUser, ...hygraphLodger });

        toast({
          title: 'Profile Updated',
          description: 'Your profile has been successfully updated.',
          variant: 'default',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: 'Error',
          description: 'There was an error updating your profile. Please try again.',
          variant: 'destructive',
        });
      }
    }

    fetchUserData();
  }, [user, toast]);

  if (!user) {
    return null;
  }

  // Render your profile content here using the `lodger` state
  return (
    // Your JSX here
  );
}

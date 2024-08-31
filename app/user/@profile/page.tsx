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

        // Fetch Hygraph data
        const hygraphLodger = await getUserByClerkId(
          user.id,
          userData.email,
          userData.name,
        );

        setLodger({ ...userData, ...hygraphLodger });

        toast({
          title: 'Profile Loaded',
          description: 'Your profile has been successfully loaded.',
          variant: 'default',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: 'Error',
          description: 'There was an error loading your profile. Please try again.',
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

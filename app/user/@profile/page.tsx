import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

import { prisma } from '@/lib/db';
import { getUserByClerkId } from '@/lib/hygraph';
export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userData = {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress ?? '',
    name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
    profileImageUrl: user.imageUrl,
  };

  let lodger = await getUserByClerkId(user.id, userData.email, userData.name);

  if (!lodger) {
    // If the user doesn't exist in Hygraph, create them in Supabase/Prisma
    lodger = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {},
      create: {
        clerkId: user.id,
        email: userData.email,
        name: userData.name,
      },
    });
  }

  const lodgerData = lodger
    ? {
        clerkId: user.id,
        name: lodger.name || userData.name,
        email: lodger.email || userData.email,
        phoneNumber: lodger.phoneNumber || '',
        profileImage: {
          url: lodger.profileImageUrl || userData.profileImageUrl,
        },
        preference: lodger.preference || '',
        bookings: lodger.bookings || [],
      }
    : null;

  return <ProfileContent user={userData} lodger={lodgerData} />;
}

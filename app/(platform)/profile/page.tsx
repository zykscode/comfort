import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import ProfileContent from '@/components/ui/profileContent';
import { getUserByClerkId } from '@/lib/hygraph';

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  try {
    const clerkId = user.id;
    const email = user.emailAddresses[0]?.emailAddress || '';
    const name = `${user.firstName} ${user.lastName}`.trim();

    const lodger = await getUserByClerkId(clerkId, email, name);

    return <ProfileContent user={user} lodger={lodger} />;
  } catch (error) {
    console.error('Error fetching or creating user profile:', error);
    return <ProfileContent error={true} />;
  }
}

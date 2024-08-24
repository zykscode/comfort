import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getUserByClerkId } from '@/lib/hygraph';

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
    return null;
  }

  try {
    const clerkId = user.id;
    const email = user.emailAddresses[0]?.emailAddress || '';
    const name = `${user.firstName} ${user.lastName}`.trim();

    const lodger = await getUserByClerkId(clerkId, email, name);

    return (
      <div className="flex flex-col">
        <Link href="/">Home</Link>
        <h1>Profile</h1>
        <p>Email: {lodger.email}</p>
        <p>Name: {lodger.name}</p>
      </div>
    );
  } catch (error) {
    console.error('Error fetching or creating user profile:', error);
    return (
      <>
        <Link href="/">Home</Link>
        <h1>Error</h1>
        <p>Error loading or creating profile. Please try again later.</p>
      </>
    );
  }
}

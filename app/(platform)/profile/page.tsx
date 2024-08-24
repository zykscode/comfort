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
    const userData = {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      name: `${user.firstName} ${user.lastName}`.trim(),
      profileImageUrl: user.imageUrl,
    };

    const lodger = await getUserByClerkId(
      user.id,
      userData.email,
      userData.name,
    );

    const lodgerData = {
      ...lodger,
      phoneNumber: lodger.phoneNumber || '',
      profileImage: { url: lodger.profileImageUrl || '' },
      preference: lodger.preference || '',
      bookings: lodger.bookings || [],
    };

    return <ProfileContent user={userData} lodger={lodgerData} />;
  } catch (error) {
    console.error('Error fetching or creating user profile:', error);
    return <ProfileContent user={{} as any} lodger={{} as any} error={true} />;
  }
}

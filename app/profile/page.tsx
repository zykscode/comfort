import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import ProfileContent from '@/components/ui/profileContent';
import { getUserByClerkId } from '@/lib/hygraph';

type Booking = {
  id: string;
  // Add other booking properties as needed
};

type Lodger = {
  phoneNumber: string;
  profileImageUrl: string;
  preference: string;
  bookings: Booking[];
};

type UserData = {
  id: string;
  email: string;
  name: string;
  profileImageUrl: string;
};

type LodgerData = {
  clerkId: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: { url: string };
  preference: string;
  bookings: Booking[];
};

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  try {
    const userData: UserData = {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? '',
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      profileImageUrl: user.imageUrl,
    };

    const lodger = (await getUserByClerkId(
      user.id,
      userData.email,
      userData.name,
    )) as Lodger | null;

    const lodgerData: LodgerData | null = lodger
      ? {
          clerkId: user.id,
          name: userData.name,
          email: userData.email,
          phoneNumber: lodger.phoneNumber,
          profileImage: { url: lodger.profileImageUrl },
          preference: lodger.preference,
          bookings: lodger.bookings,
        }
      : null;

    return <ProfileContent user={userData} lodger={lodgerData} />;
  } catch (error) {
    console.error('Error fetching or creating user profile:', error);
    return (
      <ProfileContent
        user={{ id: '', email: '', name: '', profileImageUrl: '' }}
        lodger={null}
        error={true}
      />
    );
  }
}

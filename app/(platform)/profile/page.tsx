import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
    return null; // Ensure the function exits after redirect
  }

  try {
    const response = await fetch(`/api/getUserByClerkId?clerkId=${user.id}`);
    let lodger = await response.json();

    if (!lodger) {
      const createResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/createUser`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
            clerkId: user.id,
          }),
        },
      );
      lodger = await createResponse.json();
    }

    return (
      <div>
        <h1>Profile</h1>
        <p>User ID: {lodger.id}</p>
        <p>Email: {lodger.email}</p>
        <p>Name: {lodger.name}</p>
      </div>
    );
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return (
      <div>
        <h1>Profile</h1>
        <p>Error loading profile. Please try again later.</p>
      </div>
    );
  }
}

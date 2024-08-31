import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function GET() {
  const user = await currentUser();

  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const lodger = await prisma.user.findUnique({
      where: { clerkId: user.id },
      include: { bookings: true },
    });

    if (!lodger) {
      // If user doesn't exist in the database, return Clerk user data
      return NextResponse.json({
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: `${user.firstName} ${user.lastName}`.trim(),
        bookings: [],
      });
    }

    return NextResponse.json(lodger);
  } catch (error) {
    console.error('Error in user API route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

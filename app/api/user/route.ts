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
      // If user doesn't exist in the database, create a new one
      const newUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress ?? '',
          name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
          isAdmin: false,
        },
      });
      return NextResponse.json(newUser);
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in user API route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

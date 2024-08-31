import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db'; // Assuming you have a Prisma client setup

export async function GET() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
      select: {
        id: true,
        name: true,
        email: true,
        profileImageUrl: true,
        // ... other fields
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

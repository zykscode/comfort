import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { hotelId, roomTypeId, checkIn, checkOut } = await req.json();

  try {
    let dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });

    if (!dbUser) {
      // Create user if they don't exist
      dbUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress ?? '',
          name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
        },
      });
    }

    const booking = await prisma.booking.create({
      data: {
        clerkId: user.id,
        hotelId,
        roomTypeId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        status: 'pending',
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error in booking API route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

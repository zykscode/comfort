import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId } = auth(); // Clerk user authentication

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { hotelId, roomTypeId, checkIn, checkOut } = await req.json();

  try {
    const booking = await prisma.booking.create({
      data: {
        clerkId: userId,
        hotelId,
        roomTypeId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        status: 'pending',
      },
    });
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { bookingId, amount, currency, paymentProviderId } = await req.json();

  try {
    // Remove the redundant user query
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        amount,
        currency,
        status: 'pending',
        paymentProviderId,
        userId: user.id, // Add this line to associate the payment with the user
      },
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error('Error in payment API route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { id, email, name } = await req.json();

    const user = await prisma.user.upsert({
      where: { clerkId: id },
      update: { email, name },
      create: { clerkId: id, email, name },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in user API route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

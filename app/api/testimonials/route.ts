import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      include: {
        user: {
          select: {
            name: true,
            // Add other user fields you want to include
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10, // Limit to 10 most recent testimonials
    });

    const formattedTestimonials = testimonials.map(
      ({ id, text, user, createdAt }) => ({
        id,
        name: user.name,
        avatar: `/avatars/${id}.jpg`, // Assuming you store avatars with user IDs
        text,
        createdAt,
      }),
    );

    return NextResponse.json(formattedTestimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

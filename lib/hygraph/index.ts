import { prisma } from '@/lib/db';

export async function getUserByClerkId(
  clerkId: string,
  email: string,
  name: string,
) {
  try {
    let user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      // If user doesn't exist, create a new one
      user = await prisma.user.create({
        data: {
          clerkId,
          email,
          name,
          isAdmin: false, // Set initial admin status to false
        },
      });
    }

    return user;
  } catch (error) {
    console.error('Error in getUserByClerkId:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to get or create user: ${error.message}`);
    } else {
      throw new Error('Failed to get or create user: Unknown error');
    }
  }
}

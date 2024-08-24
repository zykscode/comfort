import { GraphQLClient } from 'graphql-request';

import { CREATE_USER, GET_USER_BY_CLERK_ID } from './queries';

const hygraphClient = new GraphQLClient(
  process.env.NEXT_HYGRAPH_ENDPOINT as string,
  {
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
    },
  },
);

interface UserResponse {
  lodger: {
    id: string;
    clerkId: string;
    name: string;
    email: string;
  } | null;
}

export async function getUserByClerkId(
  clerkId: string,
  email: string,
  name: string,
) {
  try {
    const response = await hygraphClient.request<UserResponse>(
      GET_USER_BY_CLERK_ID,
      { clerkId },
    );

    console.log('Hygraph response:', response); // For debugging

    if (response.lodger) {
      return response.lodger;
    } else {
      // If user doesn't exist, create a new one
      const result = await hygraphClient.request(CREATE_USER, {
        clerkId,
        email,
        name,
      });
      return (result as { createLodger: unknown }).createLodger;
    }
  } catch (error) {
    console.error('Detailed error:', JSON.stringify(error, null, 2));
    throw error;
  }
}

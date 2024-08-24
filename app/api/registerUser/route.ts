import { gql, GraphQLClient } from 'graphql-request';
import { NextResponse } from 'next/server';

// Environment variables for Hygraph
const hygraphEndpoint = process.env.NEXT_HYGRAPH_ENDPOINT as string;
const hygraphToken = process.env.HYGRAPH_MUTATION_TOKEN as string;

// Ensure the endpoint is valid
if (!hygraphEndpoint || !hygraphEndpoint.startsWith('http')) {
  throw new Error('Invalid or missing Hygraph endpoint URL');
}

// Ensure the token is present
if (!hygraphToken) {
  throw new Error('Missing Hygraph mutation token');
}

// GraphQL mutation to create a user
const createUserMutation = gql`
  mutation CreateUser($email: String!, $name: String!, $clerkId: String!) {
    createLodger(data: { email: $email, name: $name, clerkId: $clerkId }) {
      id
      email
      name
      clerkId
    }
  }
`;

const client = new GraphQLClient(hygraphEndpoint, {
  headers: {
    Authorization: `Bearer ${hygraphToken}`,
  },
});

export async function POST(req: Request) {
  try {
    const { email, name, clerkId } = await req.json();

    const newUser = await client.request(createUserMutation, {
      email,
      name,
      clerkId,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error registering user to Hygraph:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 },
    );
  }
}

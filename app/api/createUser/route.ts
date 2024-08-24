import { gql, GraphQLClient } from 'graphql-request';
import { NextRequest, NextResponse } from 'next/server';

const hygraphEndpoint = process.env.NEXT_HYGRAPH_ENDPOINT as string;
const hygraphToken = process.env.HYGRAPH_MUTATION_TOKEN as string;

const client = new GraphQLClient(hygraphEndpoint, {
  headers: { Authorization: `Bearer ${hygraphToken}` },
});

interface CreateLodgerResponse {
  createLodger: {
    id: string;
    email: string;
    name: string;
    clerkId: string;
  };
}

export async function POST(req: NextRequest) {
  const { email, name, clerkId } = await req.json();

  if (!email || !name || !clerkId) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 },
    );
  }

  try {
    const result = await client.request<CreateLodgerResponse>(
      gql`
        mutation CreateUser(
          $email: String!
          $name: String!
          $clerkId: String!
        ) {
          createLodger(
            data: { email: $email, name: $name, clerkId: $clerkId }
          ) {
            id
            email
            name
            clerkId
          }
        }
      `,
      { email, name, clerkId },
    );

    return NextResponse.json(result.createLodger, { status: 201 });
  } catch (error) {
    console.error('Error in createUser:', error);
    if (error.response) {
      console.error(
        'GraphQL response:',
        JSON.stringify(error.response, null, 2),
      );
    }
    if (error.request) {
      console.error('GraphQL request:', JSON.stringify(error.request, null, 2));
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

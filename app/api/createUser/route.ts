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

export async function POST(request: NextRequest) {
  try {
    const { email, name, clerkId } = await request.json();

    if (!email || !name || !clerkId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

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
    let errorMessage = 'Internal Server Error';
    let errorDetails = {};

    if (error.response) {
      console.error(
        'GraphQL response:',
        JSON.stringify(error.response, null, 2),
      );
      errorMessage =
        error.response.errors?.[0]?.message || 'Unknown GraphQL error';
      errorDetails = error.response.errors?.[0] || {};
    }
    if (error.request) {
      console.error('GraphQL request:', JSON.stringify(error.request, null, 2));
    }

    return NextResponse.json(
      { error: errorMessage, details: errorDetails },
      { status: 500 },
    );
  }
}

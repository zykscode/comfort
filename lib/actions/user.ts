import { gql, GraphQLClient } from 'graphql-request';

const hygraphEndpoint = process.env.NEXT_HYGRAPH_ENDPOINT as string;
const hygraphToken = process.env.HYGRAPH_MUTATION_TOKEN as string;

const client = new GraphQLClient(hygraphEndpoint, {
  headers: { Authorization: `Bearer ${hygraphToken}` },
});

interface GetUserResponse {
  lodger: {
    id: string;
    email: string;
    name: string;
    clerkId: string;
  } | null;
}

interface CreateLodgerResponse {
  createLodger: {
    id: string;
    email: string;
    name: string;
    clerkId: string;
  };
}

export async function getUserByClerkId(clerkId: string) {
  console.log('Fetching lodger with clerkId:', clerkId); // Log the clerkId
  try {
    const response = await client.request<GetUserResponse>(
      gql`
        query GetUser($clerkId: String!) {
          lodger(where: { clerkId: $clerkId }) {
            id
            email
            name
            clerkId
          }
        }
      `,
      { clerkId },
    );
    console.log('GraphQL response:', response); // Log the full response
    return response.lodger;
  } catch (error) {
    console.error('Error in getUserByClerkId:', error);
    if (error.response) {
      console.error(
        'GraphQL response:',
        JSON.stringify(error.response, null, 2),
      );
    }
    if (error.request) {
      console.error('GraphQL request:', JSON.stringify(error.request, null, 2));
    }
    throw error;
  }
}

export async function createUser(email: string, name: string, clerkId: string) {
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

    console.log('Mutation result:', JSON.stringify(result, null, 2));

    return result.createLodger;
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
    throw error;
  }
}

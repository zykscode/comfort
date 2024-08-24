import { GraphQLClient } from 'graphql-request';

const hygraphEndpoint = process.env.NEXT_HYGRAPH_ENDPOINT as string;
const hygraphToken = process.env.HYGRAPH_MUTATION_TOKEN as string;

const hygraph = new GraphQLClient(hygraphEndpoint, {
  headers: { Authorization: `Bearer ${hygraphToken}` },
});

export const getUserByClerkId = async (clerkId: string) => {
  interface LodgerResponse {
    lodger: {
      id: string;
      email: string;
      name: string;
      clerkId: string;
    };
  }

  const { lodger } = await hygraph.request<LodgerResponse>(
    `query GetUserByClerkId($clerkId: String!) {
      lodger(where: { clerkId: $clerkId }) {
        id
        email
        name
        clerkId
      }
    }`,
    { clerkId },
  );

  return lodger;
};

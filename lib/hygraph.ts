import { GraphQLClient } from 'graphql-request';

const hygraphEndpoint = process.env.NEXT_HYGRAPH_ENDPOINT;
const hygraphToken = process.env.HYGRAPH_MUTATION_TOKEN;

if (!hygraphEndpoint) {
  throw new Error('NEXT_PUBLIC_HYGRAPH_ENDPOINT is not defined');
}

if (!hygraphToken) {
  throw new Error('HYGRAPH_MUTATION_TOKEN is not defined');
}

const hygraph = new GraphQLClient(hygraphEndpoint, {
  headers: {
    Authorization: `Bearer ${hygraphToken}`,
  },
});

interface Lodger {
  id: string;
  email: string;
  name: string;
  clerkId: string;
}

const createLodger = async (
  clerkId: string,
  email: string,
  name: string,
): Promise<Lodger> => {
  const mutation = `
    mutation CreateLodger($clerkId: String!, $email: String!, $name: String!) {
      createLodger(data: {clerkId: $clerkId, email: $email, name: $name}) {
        id
        email
        name
        clerkId
      }
      publishLodger(where: {clerkId: $clerkId}) {
        id
      }
    }
  `;

  const variables = { clerkId, email, name };

  const { createLodger } = await hygraph.request<{ createLodger: Lodger }>(
    mutation,
    variables,
  );
  return createLodger;
};

export const getUserByClerkId = async (
  clerkId: string,
  email: string,
  name: string,
): Promise<Lodger> => {
  const query = `
    query GetUserByClerkId($clerkId: String!) {
      lodger(where: { clerkId: $clerkId }) {
        id
        email
        name
        clerkId
      }
    }
  `;

  const { lodger } = await hygraph.request<{ lodger: Lodger | null }>(query, {
    clerkId,
  });

  if (!lodger) {
    console.log(
      `No lodger found for clerkID: ${clerkId}. Creating new lodger.`,
    );
    return createLodger(clerkId, email, name);
  }

  return lodger;
};

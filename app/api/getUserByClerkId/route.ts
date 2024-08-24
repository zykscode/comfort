import { gql, GraphQLClient } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { clerkId } = req.query;

  if (!clerkId || typeof clerkId !== 'string') {
    return res.status(400).json({ error: 'Invalid clerkId' });
  }

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

    return res.status(200).json(response.lodger);
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
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

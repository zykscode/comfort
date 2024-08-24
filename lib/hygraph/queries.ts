import { gql } from 'graphql-request';

export const GET_USER_BY_CLERK_ID = gql`
  query GetUserByClerkId($clerkId: String!) {
    lodger(where: { clerkId: $clerkId }) {
      id
      clerkId
      name
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($clerkId: String!, $name: String!, $email: String!) {
    createLodger(data: { clerkId: $clerkId, name: $name, email: $email }) {
      id
      clerkId
      name
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String
    $email: String
    $phoneNumber: String
    $preference: String
  ) {
    updateLodger(
      where: { id: $id }
      data: {
        name: $name
        email: $email
        phoneNumber: $phoneNumber
        preference: $preference
      }
    ) {
      id
      name
      email
      phoneNumber
      preference
    }
  }
`;

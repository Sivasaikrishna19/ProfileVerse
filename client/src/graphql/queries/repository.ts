// src/graphql/queries/repository.ts
import { graphqlClient } from '../client';

export const fetchUserRepositories = async (username: string, token: string) => {

  const query = `
    query($username: String!, $first: Int!, $after: String) {
      user(login: $username) {
        repositories(first: $first, after: $after) {
          edges {
            node {
              name
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(first: 100) {
                      edges {
                        node {
                          committedDate
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    username,
    first: 100,
    after: null,
  };

  return graphqlClient(query, variables, token);
};

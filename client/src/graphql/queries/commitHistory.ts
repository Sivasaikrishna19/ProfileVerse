// src/graphql/queries/repository.ts
import { graphqlClient } from '../client';

export const fetchUserCommitHistory = async (username: string, token: string, year: number) => {
  const startDate = new Date(`${year}-01-01`).toISOString();
  const endDate = new Date(`${year}-12-31`).toISOString();

  const query = `
    query($username: String!, $first: Int!, $after: String, $startDate: GitTimestamp!, $endDate: GitTimestamp!) {
      user(login: $username) {
        repositories(first: $first, after: $after) {
          edges {
            node {
              name
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(first: 100, since: $startDate, until: $endDate) {
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
    startDate,
    endDate,
  };

  return graphqlClient(query, variables, token);
};

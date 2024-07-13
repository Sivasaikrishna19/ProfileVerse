// src/graphql/queries/repository.ts
import { graphqlClient } from "../client";

export const fetchUserCommitHistory = async (username: string, token: string, startDate: string, endDate: string) => {
  const query = `
    query($username: String!, $startDate: GitTimestamp!, $endDate: GitTimestamp!) {
      user(login: $username) {
        repositories(first: 100) {
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
    startDate,
    endDate,
  };

  console.log("Fetching commit history with variables:", variables);

  try {
    const result = await graphqlClient(query, variables, token);
    console.log("Commit history result:", result);
    return result;
  } catch (error) {
    console.error("Error fetching commit history:", error);
    throw error;
  }
};

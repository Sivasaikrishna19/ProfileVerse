import { graphqlClient } from '../client';

export const fetchContributions = async (username: string, token: string) => {
  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          commitContributionsByRepository {
            repository {
              name
              url
            }
            contributions(first: 100) {
              nodes {
                occurredAt
                commit {
                  message
                  url
                }
              }
              totalCount
            }
          }
        }
      }
    }
  `;

  const from = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(); // 1 year back
  const to = new Date().toISOString();

  const variables = {
    username,
    from,
    to,
  };

  const result = await graphqlClient(query, variables, token);

  return result.user.contributionsCollection.commitContributionsByRepository;
};

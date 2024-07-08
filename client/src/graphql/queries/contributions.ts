import { graphqlClient } from '../client';

export const fetchContributions = async (username: string, token: string) => {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          commitContributionsByRepository {
            repository {
              name
              url
              owner {
                login
              }
            }
            contributions(first: 100) {
              nodes {
                occurredAt
              }
              totalCount
            }
          }
        }
      }
    }
  `;

  const variables = {
    username,
  };

  try {
    const result = await graphqlClient(query, variables, token, 'contributions');
    console.log('result: ', result);

    // if (!result || !result.data || !result.data.user) {
    //   throw new Error('Unexpected response structure: ' + JSON.stringify(result));
    // }

    return result.user.contributionsCollection.commitContributionsByRepository;
  } catch (error) {
    console.error('Error fetching contributions:', error);
    throw error;
  }
};

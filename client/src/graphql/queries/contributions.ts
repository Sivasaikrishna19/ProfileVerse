import { graphqlClient } from '../client';

export const fetchContributions = async (username: string, token: string) => {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          commitContributionsByRepository {
            repository {
              name
              description
              url
              owner {
                login
              }
              createdAt
              updatedAt
              stargazerCount
              forkCount
              issues {
                totalCount
              }
              primaryLanguage {
                name
                color
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

    if (result?.user) {
      return result.user.contributionsCollection.commitContributionsByRepository;
    } else {
      throw new Error('User data not found in response');
    }
  } catch (error) {
    console.error('Error fetching contributions:', error);
    throw error;
  }
};

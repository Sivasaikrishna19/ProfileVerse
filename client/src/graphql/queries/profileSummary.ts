import { graphqlClient } from '../client';

export const fetchUserMetaData = async (username: string, token: string) => {
  const query = `
    query($username: String!) {
      user(login: $username) {
        login
        name
        avatarUrl
        bio
        company
        location
        email
        websiteUrl
        twitterUsername
        followers {
          totalCount
        }
        following {
          totalCount
        }
        repositories {
          totalCount
        }
        starredRepositories {
          totalCount
        }
        gists {
          totalCount
        }
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    username,
  };

  const result = await graphqlClient(query, variables, token);
  return result.user;
};

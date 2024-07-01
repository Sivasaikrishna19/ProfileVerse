import { graphqlClient } from '../client';

export const fetchUserLanguages = async (username: string, token: string) => {
  const query = `
    query($username: String!, $first: Int!, $after: String) {
      user(login: $username) {
        repositories(first: $first, after: $after) {
          edges {
            node {
              languages(first: 100) {
                edges {
                  node {
                    name
                  }
                  size
                }
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;

  let hasNextPage = true;
  let after = null;
  const allLanguages: { [key: string]: number } = {};

  while (hasNextPage) {
    const variables = {
      username,
      first: 100,
      after,
    };

    const response = await graphqlClient(query, variables, token);

    response.user.repositories.edges.forEach((repo: any) => {
      repo.node.languages.edges.forEach((language: any) => {
        const { name } = language.node;
        const { size } = language;
        if (allLanguages[name]) {
          allLanguages[name] += size;
        } else {
          allLanguages[name] = size;
        }
      });
    });

    hasNextPage = response.user.repositories.pageInfo.hasNextPage;
    after = response.user.repositories.pageInfo.endCursor;
  }

  const languagesArray = Object.keys(allLanguages).map((language) => ({
    language,
    bytes: allLanguages[language],
  }));

  return languagesArray;
};

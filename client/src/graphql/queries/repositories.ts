import { graphqlClient } from '../client';

export const fetchAllRepositories = async (username: string, token: string) => {
  const query = `
    query($username: String!, $first: Int!, $after: String) {
      user(login: $username) {
        repositories(first: $first, after: $after) {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            node {
              name
              description
              stargazerCount
              forkCount
              watchers {
                totalCount
              }
              primaryLanguage {
                name
              }
              licenseInfo {
                name
              }
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
        }
      }
    }
  `;

  const variables = {
    username,
    first: 100,
    after: null,
  };

  let repositories:any = [];
  let hasNextPage = true;
  let endCursor = null;

  while (hasNextPage) {
    const result = await graphqlClient(query, { ...variables, after: endCursor }, token);
    const fetchedRepos = result.user.repositories.edges.map((edge: any) => edge.node);
    repositories = [...repositories, ...fetchedRepos];
    hasNextPage = result.user.repositories.pageInfo.hasNextPage;
    endCursor = result.user.repositories.pageInfo.endCursor;
  }

  return repositories;
};

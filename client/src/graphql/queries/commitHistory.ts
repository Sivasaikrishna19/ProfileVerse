import { graphqlClient } from '../client';

export const fetchUserCommitHistory = async (username: string, token: string, year: number) => {
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
            isPrivate
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 100, since: "${year-1}-12-31T23:59:59Z", until: "${year}-12-31T23:59:59Z") {
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

  let allCommits: any[] = [];
  let hasNextPage = true;

  while (hasNextPage) {
    const result = await graphqlClient(query, variables, token);
    const repositories = result.user.repositories.edges;
    const commits = repositories.flatMap((repo: any) =>
      repo.node.defaultBranchRef?.target?.history.edges.map((commit: any) => ({
        date: commit.node.committedDate.split("T")[0],
        count: 1,
        isPrivate: repo.node.isPrivate,
      })) || []
    );
    allCommits = [...allCommits, ...commits];
    hasNextPage = result.user.repositories.pageInfo.hasNextPage;
    variables.after = result.user.repositories.pageInfo.endCursor;
  }

  return allCommits;
};




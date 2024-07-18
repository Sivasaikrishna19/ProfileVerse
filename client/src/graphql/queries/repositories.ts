import { graphqlClient } from '../client';

export const fetchAllRepositories = async (username: string, token: string) => {
  const queryRepositories = `
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
              isFork
              url
              owner {
                login
              }
              stargazerCount
              forkCount
              issues {
                totalCount
              }
              pullRequests(states: [OPEN, CLOSED, MERGED], first: 100) {
                totalCount
              }
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
              createdAt
              updatedAt
              object(expression: "HEAD:README.md") {
                ... on Blob {
                  text
                }
              }
              contributions: defaultBranchRef {
                target {
                  ... on Commit {
                    history(first: 100) {
                      nodes {
                        committedDate
                      }
                      totalCount
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

  const queryCommits = `
    query($owner: String!, $name: String!, $after: String) {
      repository(owner: $owner, name: $name) {
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 100, after: $after) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
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
  `;

  const variables = {
    username,
    first: 100,
    after: null,
  };

  let repositories: any = [];
  let hasNextPage = true;
  let endCursor = null;

  while (hasNextPage) {
    const result = await graphqlClient(queryRepositories, { ...variables, after: endCursor }, token);
    const fetchedRepos = result.user.repositories.edges.map((edge: any) => ({
      ...edge.node,
      contributions: {
        nodes: edge.node.contributions?.target?.history?.nodes?.map((node: any) => ({
          occurredAt: node.committedDate,
        })) || [],
        totalCount: edge.node.contributions?.target?.history?.totalCount || 0,
      },
      readme: edge.node.object?.text || "No README available",
    }));
    repositories = [...repositories, ...fetchedRepos];
    hasNextPage = result.user.repositories.pageInfo.hasNextPage;
    endCursor = result.user.repositories.pageInfo.endCursor;
  }

  // Fetch all commits for each repository
  for (let repo of repositories) {
    let allCommits: any = [];
    let commitsHasNextPage = true;
    let commitsEndCursor = null;

    while (commitsHasNextPage) {
      const result = await graphqlClient(
        queryCommits,
        { owner: repo.owner.login, name: repo.name, after: commitsEndCursor },
        token
      );
      const history = result.repository.defaultBranchRef.target.history;
      const commits = history.edges.map((edge: any) => edge.node);
      allCommits = [...allCommits, ...commits];
      commitsHasNextPage = history.pageInfo.hasNextPage;
      commitsEndCursor = history.pageInfo.endCursor;
    }

    // Group commits by date and count the number of commits per date
    const commitsGroupedByDate = allCommits.reduce((acc: any, commit: any) => {
      const date = commit.committedDate.split("T")[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += 1;
      return acc;
    }, {});

    // Transform grouped commits into the desired format
    const commitsArray = Object.entries(commitsGroupedByDate).map(
      ([date, count]) => ({ date, count })
    );

    repo.allCommits = commitsArray;
  }

  return repositories;
};

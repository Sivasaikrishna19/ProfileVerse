// import { graphqlClient } from '../client';

// export const fetchContributions = async (username: string, token: string) => {
//   const query = `
//     query($username: String!, $first: Int!, $after: String) {
//       user(login: $username) {
//         contributionsCollection {
//           commitContributionsByRepository {
//             repository {
//               name
//               description
//               url
//               owner {
//                 login
//               }
//               createdAt
//               updatedAt
//               stargazerCount
//               forkCount
//               issues {
//                 totalCount
//               }
//               primaryLanguage {
//                 name
//                 color
//               }
//             }
//             contributions(first: 100) {
//               nodes {
//                 occurredAt
//               }
//               totalCount
//             }
//           }
//         }
//         repositories(first: $first, after: $after) {
//           pageInfo {
//             endCursor
//             hasNextPage
//           }
//           nodes {
//             name
//             description
//             url
//             isFork
//             owner {
//               login
//             }
//             createdAt
//             updatedAt
//             stargazerCount
//             forkCount
//             issues {
//               totalCount
//             }
//             primaryLanguage {
//               name
//               color
//             }
//             contributions: defaultBranchRef {
//               target {
//                 ... on Commit {
//                   history(first: 100) {
//                     nodes {
//                       committedDate
//                     }
//                     totalCount
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `;

//   const variables = {
//     username,
//     first: 100,
//     after: null,
//   };

//   let allRepositories:any = [];
//   let hasNextPage = true;
//   let endCursor = null;
//   let result:any = await graphqlClient(query, { ...variables, after: endCursor }, token, 'contributionsAndRepos');
//   console.log(result, 'repos')
//   while (hasNextPage) {

//     const repositories = result.user.repositories.nodes.map((repo: any) => ({
//       ...repo,
//       contributions: {
//         nodes: repo.contributions?.target?.history?.nodes?.map((node: any) => ({
//           occurredAt: node.committedDate,
//         })) || [],
//         totalCount: repo.contributions?.target?.history?.totalCount || 0,
//       },
//     }));

//     allRepositories = [...allRepositories, ...repositories];
//     hasNextPage = result.user.repositories.pageInfo.hasNextPage;
//     endCursor = result.user.repositories.pageInfo.endCursor;
//   }

//   const contributions = result.user.contributionsCollection.commitContributionsByRepository;

//   return { contributions, repositories: allRepositories };
// };

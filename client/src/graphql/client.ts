import axios from 'axios';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

export const graphqlClient = async (query: string, variables: any, token: string) => {
   
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(
      GITHUB_GRAPHQL_URL,
      {
        query,
        variables,
      },
      { headers }
    );
    console.log(response.data.data,"data")
    return response.data.data;
  } catch (error) {
    console.error('Error making GraphQL request:', error);
    throw error;
  }
};

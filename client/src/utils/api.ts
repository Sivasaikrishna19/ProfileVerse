import { fetchUserMetaData } from '@/graphql/queries/profileSummary';
import { fetchAllRepositories } from '@/graphql/queries/repositories';

export const fetchUserData = async (username:string,token:string) => {
  try {
    const userData = await fetchUserMetaData(username, token);
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const fetchRepositories = async (username:string,token:string) => {
  try {
    const repositories = await fetchAllRepositories(username, token);

    return repositories;
  
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
};





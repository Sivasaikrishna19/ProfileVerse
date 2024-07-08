import { fetchUserMetaData } from '@/graphql/queries/profileSummary';
import { fetchAllRepositories } from '@/graphql/queries/repositories';
import { fetchContributions } from '@/graphql/queries/contributions';

export const fetchUserData = async (username: string, token: string) => {
  try {
    const userData = await fetchUserMetaData(username, token);
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const fetchRepositories = async (username: string, token: string) => {
  try {
    const repositories = await fetchAllRepositories(username, token);
    return repositories;
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
};

export const fetchUserContributions = async (username: string, token: string) => {
  try {
    const contributions = await fetchContributions(username, token);
    console.log('contributions: ',contributions);
    return contributions;
  } catch (error) {
    console.error('Error fetching contributions:', error);
  }
};

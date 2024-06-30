import axios from 'axios';

const getHeaders = (token: string | null) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const GITHUB_API_URL = 'https://api.github.com';

export const fetchUserData = async (username: string, token: string | null = null, params = {}) => {
  const headers = getHeaders(token);
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};


export const fetchRepositories = async (username: string, token: string | null = null) => {
  const headers = getHeaders(token);
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export const getTopRepositories = (repos: any, topN: number | null = null) => {
  const sortedRepos = repos.sort(
    (a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  
  return topN !== null ? sortedRepos.slice(0, topN) : sortedRepos;
};

const fetchRepoLanguages = async (repoUrl: string, token: string | null) => {
  const headers = getHeaders(token);
  try {
    const response = await axios.get(repoUrl, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching languages for ${repoUrl}:`, error);
    return {};
  }
};


const significantLanguages = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 
  'Rust', 'Kotlin', 'Swift', 'Objective-C', 'Scala', 'Haskell', 'Shell', 'HTML', 
  'CSS', 'Dart', 'Perl', 'Lua', 'Elixir', 'Clojure', 'R', 'MATLAB'
];

export const aggregateLanguages = async (repos:Array<IRepository> ,username: string, token: string | null = null) => {

  const languageStats: { [language: string]: number } = {};

  for (const repo of repos) {
    const languagesUrl = `${GITHUB_API_URL}/repos/${username}/${repo.name}/languages`;
    const repoLanguages = await fetchRepoLanguages(languagesUrl, token);

    Object.entries(repoLanguages).forEach(([language, bytes]:any) => {
      if (significantLanguages.includes(language)) {
        if (languageStats[language]) {
          languageStats[language] += bytes;
        } else {
          languageStats[language] = bytes;
        }
      }
    });
  }

  // Convert the aggregated language data into the desired format
  const formattedData = Object.entries(languageStats).map(([language, bytes]) => ({
    language,
    bytes,
  }));

  return formattedData;
};


export const fetchCommitActivity = async (username: string, repo: string, token: string | null = null) => {
  const headers = getHeaders(token);
    try {
        const response = await axios.get(`${GITHUB_API_URL}/repos/${username}/${repo}/stats/commit_activity`, {
            headers,
        });

        return response.data;
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
};

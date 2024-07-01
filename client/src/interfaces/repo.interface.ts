export interface IRepository {
    name: string;
    description: string | null;
    url: string;
    stargazerCount: number;
    forkCount: number;
    openIssuesCount: number;
    primaryLanguage: {
      name: string;
      color: string;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner: {
      login: string;
      url: string;
    };
  }
  
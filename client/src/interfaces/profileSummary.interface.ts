export interface IProfileSummary {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  url: string;
  email: string | null;
  company: string | null;
  location: string | null;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  repositories: {
    totalCount: number;
  };
  createdAt: string;
  updatedAt: string;
}

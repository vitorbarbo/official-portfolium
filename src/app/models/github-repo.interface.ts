export interface GitHubRepoOwner {
  login: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  size: number;
  stargazers_count: number;
  topics: string[];
  owner: GitHubRepoOwner;
}


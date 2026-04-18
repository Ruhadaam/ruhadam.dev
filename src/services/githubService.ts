export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export interface GithubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

const CACHE_KEY_PREFIX = "github_cache_";
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

const getCache = (key: string) => {
  if (typeof window === "undefined") return null;
  const cached = localStorage.getItem(CACHE_KEY_PREFIX + key);
  if (!cached) return null;
  try {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY_PREFIX + key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const setCache = (key: string, data: any) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    CACHE_KEY_PREFIX + key,
    JSON.stringify({ data, timestamp: Date.now() })
  );
};

export const githubService = {
  // Sync methods for initial state hydration
  getCachedUser(username: string): GithubUser | null {
    return getCache(`user_${username}`);
  },

  getCachedRepos(username: string): GithubRepo[] | null {
    return getCache(`repos_${username}`);
  },

  async getUser(username: string): Promise<GithubUser> {
    const cached = getCache(`user_${username}`);
    if (cached) return cached;

    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    const data = await res.json();
    setCache(`user_${username}`, data);
    return data;
  },

  async getRepos(username: string): Promise<GithubRepo[]> {
    const cached = getCache(`repos_${username}`);
    if (cached) return cached;

    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!res.ok) throw new Error("Failed to fetch repos");
    const data = await res.json();
    setCache(`repos_${username}`, data);
    return data;
  }
};

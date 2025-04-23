// API Configuration
const isServer = typeof window === "undefined";
export const API_URL = isServer
  ? process.env.API_URL
  : process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined");
}

// Cache Configuration
export const REVALIDATE_TIME = Number(
  process.env.NEXT_PUBLIC_REVALIDATE_TIME || 60
); // 默认1分钟
export const CACHE_TIME = Number(process.env.NEXT_PUBLIC_CACHE_TIME || 300); // 默认5分钟

// API Endpoints
export const endpoints = {
  blogs: `/blogs`,
  books: `/books`,
  experiences: `/experiences`,
  home: `/globals/home`,
  projects: `/projects`,
  skills: `/skills`,
  skillCategories: `/skill-categories`,
  about: `/globals/about`,
  photos: `/photos`,
} as const;

// Query Keys Configuration
export const queryKeys = {
  blogs: {
    all: ["blogs"] as const,
    detail: (id: number) => [...queryKeys.blogs.all, id] as const,
    bySlug: (slug: string) => [...queryKeys.blogs.all, "slug", slug] as const,
    infinite: ["blogs", "infinite"] as const,
  },
  books: {
    all: ["books"] as const,
    detail: (id: number) => [...queryKeys.books.all, id] as const,
    infinite: ["books", "infinite"] as const,
  },
  experiences: {
    all: ["experiences"] as const,
    detail: (id: number) => [...queryKeys.experiences.all, id] as const,
  },
  home: ["home"] as const,
  projects: {
    all: ["projects"] as const,
    detail: (id: number) => [...queryKeys.projects.all, id] as const,
    home: ["projects", "home"] as const,
    infinite: ["projects", "infinite"] as const,
  },
  skills: {
    all: ["skills"] as const,
    detail: (id: number) => [...queryKeys.skills.all, id] as const,
  },
  skillCategories: {
    all: ["skillCategories"] as const,
    detail: (id: number) => [...queryKeys.skillCategories.all, id] as const,
  },
  about: ["about"] as const,
  photos: {
    all: ["photos"] as const,
    infinite: ["photos", "infinite"] as const,
    detail: (id: string) => [...queryKeys.photos.all, id] as const,
  },
} as const;

// Default Query Options
export const defaultQueryOptions = {
  staleTime: REVALIDATE_TIME * 1000, // 转换为毫秒
  gcTime: CACHE_TIME * 1000, // 转换为毫秒
} as const;

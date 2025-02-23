export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  slug: string;
  coverImage: string;
  tags: string[];
}

const sampleImages = [
  "https://i.namu.wiki/i/15PXYVDuDGCpzWg0CEC9r_eb97xrVSKKiF-kDRjYJW-B_LWEO72npnnv4VGjwxdH5IU25Fw5F7CP0wmcmvKv5w.webp",
  "https://hips.hearstapps.com/hmg-prod/images/xginstagram-01-65c87bfc72fdb.jpeg?crop=1xw:1xh;center,top&resize=980:*",
  "https://pbs.twimg.com/media/GJm5Bb1XAAAP_7V.jpg",
];

const sampleTags = [
  ["Next.js", "TypeScript", "Tailwind CSS"],
  ["React", "Performance", "Web Development"],
  ["TypeScript", "Programming", "Web Development"],
  ["JavaScript", "Frontend", "Development"],
  ["CSS", "Design", "UI/UX"],
  ["Testing", "Quality Assurance", "Jest"],
  ["GraphQL", "API", "Backend"],
  ["Docker", "DevOps", "Deployment"],
];

const blogTitles = [
  "Understanding Modern Web Architecture",
  "The Future of Frontend Development",
  "Building Scalable Applications",
  "Mastering React Hooks",
  "Advanced TypeScript Techniques",
  "CSS Grid vs Flexbox",
  "State Management in 2024",
  "Testing Best Practices",
  "Performance Optimization Tips",
  "Serverless Architecture Explained",
];

export function generateBlogPosts(count: number = 20): BlogPost[] {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index); // Each post is one day apart

    const randomReadingTime = Math.floor(Math.random() * 15) + 5; // 5-20 minutes
    const randomImageIndex = Math.floor(Math.random() * sampleImages.length);
    const randomTagsIndex = Math.floor(Math.random() * sampleTags.length);
    const titleIndex = index % blogTitles.length;

    return {
      id: (index + 1).toString(),
      title: blogTitles[titleIndex] + " " + index,
      excerpt:
        "Explore the latest trends and best practices in modern web development. Learn how to build better applications with cutting-edge technologies.",
      date: date.toISOString().split("T")[0],
      readingTime: `${randomReadingTime} min read`,
      slug: blogTitles[titleIndex].toLowerCase().replace(/\s+/g, "-"),
      coverImage: sampleImages[randomImageIndex],
      tags: sampleTags[randomTagsIndex],
    };
  });
}

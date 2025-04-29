export interface BlogPost {
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  date: string;
  author: string;
  readTime?: string;
  featured?: boolean;
}

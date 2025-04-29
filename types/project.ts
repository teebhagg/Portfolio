export interface Project {
  name: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

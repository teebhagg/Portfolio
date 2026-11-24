export interface Project {
  name: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  imagePosition?: string;
  imageFit?: 'cover' | 'contain';
  category?: string;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

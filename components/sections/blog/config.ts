import { BlogPost } from '@/types/blog';

const blogPosts: BlogPost[] = [
  {
    title: 'Getting Started with Next.js',
    slug: 'getting-started-with-nextjs',
    description:
      'Learn how to create modern web applications with Next.js, from setup to deployment.',
    thumbnail: '/images/blog/nextjs-starter.jpg',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'JavaScript', 'Frontend'],
    date: 'April 15, 2025',
    author: 'Your Name',
    readTime: '5 min read',
    featured: true
  },
  {
    title: 'Building Responsive UIs with TailwindCSS',
    slug: 'responsive-ui-with-tailwindcss',
    description:
      'Discover how to create beautiful, responsive user interfaces using TailwindCSS utility-first approach.',
    thumbnail: '/images/blog/tailwind-ui.jpg',
    category: 'Design',
    tags: ['TailwindCSS', 'CSS', 'Design', 'Responsive'],
    date: 'April 10, 2025',
    author: 'Your Name',
    readTime: '4 min read',
    featured: true
  },
  {
    title: 'Optimizing Website Performance',
    slug: 'optimizing-website-performance',
    description:
      'Learn essential techniques to improve your website loading speed and overall performance.',
    thumbnail: '/images/blog/performance.jpg',
    category: 'Performance',
    tags: ['Web Performance', 'Optimization', 'Core Web Vitals'],
    date: 'April 5, 2025',
    author: 'Your Name',
    readTime: '7 min read'
  },
  {
    title: 'Introduction to TypeScript',
    slug: 'introduction-to-typescript',
    description:
      'A beginner-friendly guide to TypeScript and how it improves JavaScript development.',
    thumbnail: '/images/blog/typescript.jpg',
    category: 'Programming',
    tags: ['TypeScript', 'JavaScript', 'Web Development'],
    date: 'March 28, 2025',
    author: 'Your Name',
    readTime: '6 min read'
  },
  {
    title: 'Creating Animations with Framer Motion',
    slug: 'animations-with-framer-motion',
    description:
      'Learn how to add beautiful animations to your React applications using Framer Motion.',
    thumbnail: '/images/blog/framer-motion.jpg',
    category: 'Animation',
    tags: ['React', 'Framer Motion', 'Animation', 'UI/UX'],
    date: 'March 20, 2025',
    author: 'Your Name',
    readTime: '5 min read'
  },
  {
    title: 'State Management in React Applications',
    slug: 'state-management-react',
    description:
      'Explore different state management approaches in React and when to use each one.',
    thumbnail: '/images/blog/state-management.jpg',
    category: 'Web Development',
    tags: ['React', 'State Management', 'Redux', 'Context API'],
    date: 'March 15, 2025',
    author: 'Your Name',
    readTime: '8 min read'
  }
];

export { blogPosts };

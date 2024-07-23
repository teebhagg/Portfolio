import { Skill } from '@/types/skill';
import {
  CodeIcon,
  DatabaseIcon,
  LayoutIcon,
  SmartphoneIcon,
  MoreHorizontal,
  Computer
} from 'lucide-react';

const trimLen: number = -1; // 0 is accordion only, -1 is does not restrict the length

const skills: Skill[] = [
  {
    name: 'Web Development',
    Icon: CodeIcon,
    description: `Web Development involves creating websites and web applications that are both visually appealing and highly functional. It encompasses a variety of technologies, frameworks, and best practices to ensure a seamless user experience and efficient performance.\nThe following are some of the main technologies used in Web Development:\n\n - Next.js, React.js\n - TypeScript, JavaScript\n - Node.js, Express.js\n - TailwindCSS, Bootstrap, Material UI\n - Redux`
  },
  {
    name: 'Database Management',
    Icon: DatabaseIcon,
    description: `Database Management involves efficiently storing and organizing data. This skill covers a range of technologies, frameworks, and best practices to ensure data integrity, security, and performance.\n The following are some of the main technologies used in Database Management:\n\n - MongoDB\n - PostgreSQL\n - Cloud FireStore`
  },
  {
    name: 'Mobile Development',
    Icon: SmartphoneIcon,
    description: `Mobile Development entails crafting apps for smartphones and tablets that are both visually appealing and highly functional. It includes a variety of technologies, frameworks, and best practices to provide a seamless user experience on mobile devices\nThe following are some of the main technologies used in Mobile Development:\n\n - Flutter, Dart, BLoC\n - Firebase`
  },
  {
    name: 'More',
    Icon: Computer,
    description: `Skills that encompasses a variety of technologies, frameworks, and best practices to ensure a seamless user experience and efficient performance.\n\n - Git, GitHub\n - RESTful APIs\n - Agile Methodologies\n - Responsive Web Design\n - Debugging\n - Problem-Solving\n - Communication\n - Teamwork\n - Continuous Learning`
  }
];

export { trimLen, skills };

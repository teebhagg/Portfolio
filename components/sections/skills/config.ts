import { Skill } from '@/types/skill';
import {
  Code2,
  CodeIcon,
  Computer,
  DatabaseIcon,
  Globe,
  Settings,
  SmartphoneIcon,
  Users
} from 'lucide-react';

const trimLen: number = -1; // 0 is accordion only, -1 is does not restrict the length

const skills: Skill[] = [
  {
    name: 'Programming Languages',
    Icon: Code2,
    description: `Proficient in modern programming languages that power web and mobile applications:\n\n - JavaScript\n - TypeScript\n - Dart`
  },
  {
    name: 'Frontend Development',
    Icon: Globe,
    description: `Expertise in creating responsive, interactive, and user-friendly interfaces using modern frameworks and libraries:\n\n - React.js\n - Next.js\n - TailwindCSS\n - Material-UI\n - Bootstrap`
  },
  {
    name: 'Backend Development',
    Icon: CodeIcon,
    description: `Experience building robust server-side applications and APIs to support web and mobile applications:\n\n - Node.js\n - Express.js\n - Nest.js`
  },
  {
    name: 'Mobile Development',
    Icon: SmartphoneIcon,
    description: `Skilled in developing cross-platform mobile applications with a focus on performance and user experience:\n\n - Flutter`
  },
  {
    name: 'Database Management',
    Icon: DatabaseIcon,
    description: `Knowledge of various database systems for efficient data storage, retrieval, and management:\n\n - MongoDB\n - PostgreSQL\n - Firebase`
  },
  {
    name: 'Tools & Platforms',
    Icon: Settings,
    description: `Proficient with industry-standard tools and platforms that enhance development workflow and collaboration:\n\n - Git\n - GitHub\n - Notion\n - Figma\n - Docker\n - CI/CD`
  },
  {
    name: 'Methodologies',
    Icon: Computer,
    description: `Experience with software development methodologies and practices that ensure efficient project delivery:\n\n - Agile\n - Project Management\n - SDLC (Software Development Life Cycle)`
  },
  {
    name: 'Soft Skills',
    Icon: Users,
    description: `Essential interpersonal abilities that complement technical skills and facilitate effective teamwork:\n\n - Communication\n - Collaboration\n - Teamwork\n - Problem-Solving`
  }
];

export { skills, trimLen };

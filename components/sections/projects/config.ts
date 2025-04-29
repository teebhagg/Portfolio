import { Project } from '@/types/project';

const projects: Project[] = [
  {
    name: 'Personal Portfolio Website',
    slug: 'portfolio',
    description:
      'A personal portfolio to showcase my coding projects, resume, and skills in a beautifully designed format.',
    thumbnail: '/images/projects/portfolio/cover.jpg',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
    githubUrl: 'https://github.com/teebhagg/portfolio',
    liveUrl: 'https://joshua-ansah.vercel.app'
  },
  {
    name: 'Seymo School',
    slug: 'seymo_school',
    description:
      'A comprehensive school management mobile app for seamless administration, student tracking, and parent communication.',
    thumbnail: '/images/projects/seymo_school/cover.jpg',
    category: 'Mobile App',
    tags: ['Flutter', 'Dart', 'Firebase'],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.seymo_school'
  },
  {
    name: 'Moyosore Blog Web App',
    slug: 'moyosore',
    description:
      'A web app that helps users to read blog posts and listen to its audio recordings for an accessible content experience.',
    thumbnail: '/images/projects/moyosore/cover.jpg',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    githubUrl: 'https://github.com/teebhagg/moyosore-blog',
    liveUrl: 'https://moyosore.com'
  },
  {
    name: 'Shine Energy',
    slug: 'shine_energy',
    description:
      'Official website for Shine Energy Company Limited. Shine Energy is an oil and gas solutions company that has a wide range of petroleum product and service offerings.',
    thumbnail: '/images/projects/shine_energy/cover.jpg',
    category: 'Web Development',
    tags: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    liveUrl: 'https://shine-energy.com'
  },
  {
    name: 'Green Ghana',
    slug: 'green_ghana',
    description:
      'A mobile app that helps users track their fitness activities, set goals, and monitor progress with motivational tools.',
    thumbnail: '/images/projects/green_ghana/cover.jpg',
    category: 'Mobile App',
    tags: ['Flutter', 'Firebase', 'Google Maps API'],
    liveUrl:
      'https://play.google.com/store/apps/details?id=org.fcghana.green_ghana&hl=en'
  },
  {
    name: 'Bhagg Bloggs',
    slug: 'bhagg_bloggs',
    description:
      'A blogging platform where users can share their thoughts and ideas about anything. The platform allows users to create, read, and like posts.',
    thumbnail: '/images/projects/bhagg_bloggs/cover.jpg',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    githubUrl: 'https://github.com/teebhagg/bhagg-bloggs',
    liveUrl: 'https://bhagg-bloggs-frontend.vercel.app/'
  },
  {
    name: 'Movie Catalogue',
    slug: 'movie_catalogue',
    description:
      'A movie catalogue website that provides information about movies, actors, and directors. The website allows users to search for movies by title, actor, or director.',
    thumbnail: '/images/projects/movie_catalogue/cover.jpg',
    category: 'Web Development',
    tags: ['React', 'TMDB API', 'CSS3'],
    githubUrl: 'https://github.com/teebhagg/movie-website',
    liveUrl: 'https://movie-website-teebhagg.vercel.app/'
  },
  {
    name: 'UZI-Express',
    slug: 'uzi_express',
    description:
      'An e-commerce platform where users can buy and sell. The platform helps promote a marketplace for eco-friendly products.',
    thumbnail: '/images/projects/uzi_express/cover.jpg',
    category: 'E-Commerce',
    tags: ['Next.js', 'MongoDB', 'TailwindCSS'],
    githubUrl: 'https://github.com/teebhagg/uzi-express',
    liveUrl: 'https://uzi-express.vercel.app'
  }
];

export { projects };

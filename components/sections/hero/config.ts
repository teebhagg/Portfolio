import { Hero } from '@/types/hero';
import { metadata as meta } from '@/app/config';

const hero: Hero = {
  name: meta.author.name,
  label: meta.author.label,
  description: 'I am a software developer and I love to build beautiful web apps and mobile apps. Welcome to my portfolio.'
};

export { hero };
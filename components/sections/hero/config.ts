import { Hero } from '@/types/hero';
import { metadata as meta } from '@/app/config';

const hero: Hero = {
  name: meta.author.name,
  label: meta.author.label,
  description:
    'I am a dedicated software engineer with a passion for creating software applications and solutions. Welcome to my portfolio.'
};

export { hero };

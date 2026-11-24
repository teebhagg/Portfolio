import ModeToggle from '@/components/mode-toggle';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { height } from '../anim';
import Body from './body/body';
import Image from './image/image';
import styles from './style.module.scss';

import { links } from '@/components/sections/header/config';

interface IndexProps {
  setIsActive: (isActive: boolean) => void;
}

interface SelectedLinkState {
  isActive: boolean;
  index: number;
}

const Index: React.FC<IndexProps> = ({ setIsActive }) => {
  const [selectedLink, setSelectedLink] = useState<SelectedLinkState>({
    isActive: false,
    index: 0
  });

  return (
    <motion.nav
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.nav}
      id="site-navigation"
      aria-label="Site navigation"
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            setIsActive={setIsActive}
          />
          {/* <Footer /> */}
        </div>
        <Image
          src={links[selectedLink.index].thumbnail}
          isActive={selectedLink.isActive}
          alt={links[selectedLink.index].title}
        />
        <div className="absolute bottom-0 right-0 mb-auto">
          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  );
};

export default Index;

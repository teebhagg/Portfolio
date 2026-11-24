import {
  About,
  Contact,
  Experience,
  Footer,
  Header,
  Hero,
  Projects,
  Skills
} from '@/components/sections';

import Cursor from '@/components/cursor/cursor';
import Preloader from '@/components/preloader/preloader';
import SmoothScroll from '@/components/smooth-scroll';
import SectionColorField from '@/components/section-color-field';

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <div className="flex min-h-[100dvh] flex-col">
        <Header loader={true} />
        <main className="scroll-color-main relative isolate flex-1">
          <SectionColorField />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </div>
      <Cursor />
    </SmoothScroll>
  );
}

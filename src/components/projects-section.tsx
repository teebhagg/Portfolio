import { Container, Typography } from '@mui/material'
import React from 'react'
import ProjectCard from './preoject-card'
import { useMediaQuery } from 'react-responsive';

enum projectType {
  web = 'Web Development',
  mobile = 'Mobile App Development',
  design = 'User Interface Design'
}

enum blogP {
  blog_url = 'https://bhagg-bloggs-frontend.vercel.app/',
  blog_descr = 'Blog Website (Bhagg Bloggs)'
}
enum arrant {
  arr_url = 'https://arrantservices.org/',
  arr_descr = 'Official Website for Arrant Services'
}

enum GreenGhana {
  url = '',
  descr = 'Green Ghana (Soon to be released)'
}

enum Storify {
  url = '',
  descr = 'E-Commerce (under development)'
}

enum MovieWeb {
  url = '',
  descr = 'Movie Web App (Under redesign)'
}
enum Documentaries {
  url = '',
  descr = 'Photography Port (Under development)'
}

export default function ProjectsSection() {

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 660px)",
  });

  const isTabletDevice = useMediaQuery({
    query: "(max-device-width: 768px)",
  });

  const blog_image = require('../images/blog.png')
  const arrant_image = require('../images/arrant.png')
  
  return (
    <div className='project-section' >
      <Container maxWidth='lg' sx={{ marginTop:'250px' }}>
        <Typography>
          Projects
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: isMobileDevice? 'repeat(1, minmax(0, 1fr))': isTabletDevice? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))', gap: '20px', marginTop: '50px', width:'fit-content' }} >
          <ProjectCard link={blogP.blog_url} image={blog_image} projectType={projectType.web} projectDescr={blogP.blog_descr} />
          <ProjectCard link={arrant.arr_url} image={arrant_image} projectType={projectType.web} projectDescr={arrant.arr_descr} />
          <ProjectCard link='' image='' projectDescr={GreenGhana.descr} projectType={projectType.mobile} />
          <ProjectCard link='' image='' projectDescr={Storify.descr} projectType={projectType.web} />
          <ProjectCard link='' image='' projectDescr={MovieWeb.descr} projectType={projectType.web} />
          <ProjectCard link='' image='' projectDescr={Documentaries.descr} projectType={projectType.web} />
        </div>
      </Container>
    </div>
  )
}

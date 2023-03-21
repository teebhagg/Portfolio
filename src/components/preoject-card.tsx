import { Typography } from '@mui/material'
import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom'

interface Props {
  image: any,
  link: any,
  projectType: string,
  projectDescr: any,
  delay: string
}

export default function ProjectCard(props: Props) {

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 660px)",
  });

  const isTabletDevice = useMediaQuery({
    query: "(max-device-width: 768px)",
  });

  const { image, link, projectDescr, projectType, delay } = props

  return (
    <a href={link} target='blank'>
      <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay={delay} style={{ background: '#E7F6F2', height: '95%', padding:'10px', margin: 'auto', color: 'black', borderRadius: '8px' }} >
        <img src={image} alt="" style={{ width: '100%', aspectRatio: 16/9, borderRadius:'6px' }} />
        <Typography>{projectType}</Typography>
        <Typography fontSize={20} fontWeight={'600'} >{projectDescr}</Typography>
      </div>
    </a>
  )
}

import { Container, Typography } from '@mui/material'
import Lottie from 'lottie-react'
import React from 'react'
import { container_style_default, container_style_mobile } from '../styles/intro-section'
import { useMediaQuery } from 'react-responsive'

export default function IntroSection() {

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 660px)",
  });

  const isTabletDevice = useMediaQuery({
    query: "(max-device-width: 768px)",
  });

  const dev = require('../animations/dev.json')
  return (
    <div className="intro-section">
      <Container maxWidth='lg' sx={isMobileDevice? container_style_mobile : container_style_default} >
          <Lottie animationData={dev} style={{ height: isMobileDevice ? '350px' : isTabletDevice? '450px' : '550px' }} />
          
            <div 
              data-aos='fade-up'
              data-aos-delay="100"
              data-aos-duration="2000"
              style={{ margin: 'auto', width: 'fit-content' }} 
            >
              <Typography>hey there, I am</Typography>
              <Typography sx={{ fontWeight:'600', fontSize: isMobileDevice? '50px' : isTabletDevice ? '70px' : '100px', textAlign: 'center' }} >Joshua<br />Ansah</Typography>
              <Typography>web developer  || mobile developer</Typography>
            </div>
          
      </Container>
    </div>
  )
}

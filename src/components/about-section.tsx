import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useMediaQuery } from 'react-responsive';

export default function AboutSection() {

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 660px)",
  });

  const isTabletDevice = useMediaQuery({
    query: "(max-device-width: 768px)",
  });

  const profile_pic = require('../images/profile.png')
  const react_icon = require('../images/react.svg')
  const js_icon = require('../images/javascript.svg')
  const nodejs_icon = require('../images/node-js.svg')
  const ts_icon = require('../images/typescript.svg')
  const express_icon = require('../images/express-js.svg')
  const mongo_icon = require('../images/mongo.svg')
  const firebase_icon = require('../images/firebase.svg')
  const python_icon = require('../images/python.svg')
  const flutter_icon = require('../images/flutter.svg')
  const redux_icon = require('../images/redux.svg')
  const mui_icon = require('../images/mui.svg')
  const bootstrap_icon = require('../images/bootstrap.svg')

  const tech_icons = [js_icon, nodejs_icon, react_icon, ts_icon, express_icon, mongo_icon, firebase_icon, python_icon, flutter_icon, bootstrap_icon, mui_icon, redux_icon]

  const onDownload = () => {
    const link = document.createElement("a");
    link.download = "Joshua's CV.pdf";
    link.href = "../Joshua's CV.pdf";
    link.click();
  };
  return (
    <Container id='about' sx={{ marginTop:'125px', paddingTop:'125px' }}>
      <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="0" >
        <Typography>About Me</Typography>
      </div>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:'50px', flexDirection: isMobileDevice ? 'column-reverse' : 'row'}}
      >
        <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500" style={{ width: isMobileDevice ? '100%' : '60%' }}>
          <Typography>
          Joshua Ansah is a highly motivated front-end developer and designer with a passion for web and mobile app development.
          <br />
          <br />
          He began his career as a Flutter developer at Ghana Tech Lab in Accra before branching out into freelance work as a web and mobile app developer.
          <br />
          <br />
          Joshua specializes in web development and is also skilled in mobile development and UI/UX design. His extensive skillset includes HTML, CSS, JavaScript, TypeScript, Python, React.JS, Node.js, Express.JS, Flutter, MongoDB, and Figma. With a focus on delivering high-quality products, Joshua is committed to staying up-to-date with the latest technologies and trends in the industry.
          <br />
          <br />
          Technologies I use:
          </Typography>
          <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="750" style={{ display: 'flex', gap:'15px', flexWrap: 'wrap', marginTop: '50px' }} >
            {tech_icons.map(element=>
              <img src={element.default} alt="" style={{ height:'50px' }} />
            )}
          </div>
          <Button
           variant="contained"
           color="secondary"
           disableElevation
           style={{ borderRadius: 50, marginTop:'75px' }}
           onClick={onDownload}
          >Get My CV
          </Button>
        </div>
        <img data-aos="fade-up" data-aos-duration="1500" data-aos-delay="650" src={profile_pic} alt="" style={{ height: isMobileDevice ? '70%' : isTabletDevice ? '300px' : '400px' }} />
      </div>
    </Container>
  )
}

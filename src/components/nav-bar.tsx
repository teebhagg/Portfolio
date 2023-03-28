import { AppBar, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import MyDrawer from './drawer';

let aboutDiv = document.querySelector('#about')
let projectsDiv = document.querySelector('#projects')
let contactDiv = document.querySelector('#contact')

export default function MyNavBar() {

  const [drawerState, setDrawerState] = React.useState(false)

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 660px)",
  });

  const isTabletDevice = useMediaQuery({
    query: "(max-device-width: 768px)",
  });

  const logo = require('../images/Logo.svg')
  const ham_burger_icon = require('../images/hamburger.svg')

  const toggleDrawer =
    (open: boolean) =>
    {
      setDrawerState( open );
  };

  useEffect(() => {
    aboutDiv = document.querySelector('#about')
    projectsDiv = document.querySelector('#projects')
    contactDiv = document.querySelector('#contact')
  }, [])
    
  return (
    <AppBar elevation={0} sx={{ height: '65px', background:'rgba(44, 51, 51, 0.75)', WebkitBackdropFilter:'blue(10px)', backdropFilter:'blur(15px)'}} >
      <Container maxWidth='lg' sx={{ display:'flex', justifyContent: 'space-between' }} >
        <img src={logo.default} alt="" />
        {!isMobileDevice ? <div style={{ display:'flex', gap:'30px', marginTop:"auto", marginBottom: 'auto'}}>
          <Typography onClick={(e)=>{aboutDiv!.scrollIntoView({behavior:'smooth'})}} sx={{ cursor: 'pointer' }} >About</Typography>
          <Typography onClick={(e)=>{projectsDiv!.scrollIntoView({behavior:'smooth'})}} sx={{ cursor: 'pointer' }} >Projects</Typography>
          <Typography onClick={(e)=>{contactDiv!.scrollIntoView({behavior:'smooth'})}} sx={{ cursor: 'pointer' }} >Contact</Typography>
        </div> : null}
        {isMobileDevice ? 
          <img src={ham_burger_icon.default} onClick={e=>toggleDrawer(true)} alt="" /> 
          : null}
        <MyDrawer open={drawerState} toggleDrawer={toggleDrawer} />
      </Container>
    </AppBar>
  )
}

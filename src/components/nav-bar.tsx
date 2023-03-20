import { AppBar, Container, Typography } from '@mui/material'
import React from 'react'
import { useMediaQuery } from 'react-responsive';
import MyDrawer from './drawer';

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


  return (
    <AppBar elevation={0} sx={{ background:'rgba(44, 51, 51, 0.4)', backdropFilter:'blur(10px)', }} >
      <Container maxWidth='lg' sx={{ display:'flex', justifyContent: 'space-between' }} >
        <img src={logo.default} alt="" />
        {!isMobileDevice ? <div style={{ display:'flex', gap:'15%', marginTop:"auto", marginBottom: 'auto', marginRight:'5%' }}>
          <Typography>About</Typography>
          <Typography>Projects</Typography>
          <Typography>Contact</Typography>
        </div> : null}
        {isMobileDevice ? 
          <img src={ham_burger_icon.default} onClick={e=>toggleDrawer(true)} alt="" /> 
          : null}
        <MyDrawer open={drawerState} toggleDrawer={toggleDrawer} />
      </Container>
    </AppBar>
  )
}

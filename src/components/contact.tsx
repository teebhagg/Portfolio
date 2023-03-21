import { Container, Typography } from '@mui/material'
import React from 'react'

const linkedin_icon = require('../images/linkedln.svg')
const github_icon = require('../images/github.svg')
const mail_icon = require('../images/mail.svg')
const call_icon = require('../images/call.svg')

const contact_icons = [linkedin_icon, github_icon, mail_icon, call_icon]

export default function Contact() {
  return (
    <Container id='contact' maxWidth='lg' sx={{ marginY:'250px' }} >
      <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="0">
        <Typography sx={{ marginBottom:'50px' }} >Contact</Typography>
      </div>
      <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500" style={{ display:'flex', justifyContent: 'space-between' }} >
        <a href="https://www.linkedin.com/in/joshua-ansah-b0a15a230/" target='_blank' >
          <img src={linkedin_icon.default} height={'70px'} />
        </a>
        <a href="https://github.com/teebhagg" target='_blank'>
          <img src={github_icon.default} height={'70px'} />
        </a>
        <a href="mailto:khalijonez777@gmail.com" target='_blank'>
          <img src={mail_icon.default} height={'70px'} />
        </a>
        <a href="tel:233209540142" target='_blank'>
          <img src={call_icon.default} height={'70px'} />
        </a>
      </div>
    </Container>
  )
}

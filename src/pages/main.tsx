import React from 'react'
import MyNavBar from '../components/nav-bar'
import IntroSection from '../components/intro-section'
import AboutSection from '../components/about-section'
import ProjectsSection from '../components/projects-section'

export default function Main() {
  return (
    <>
      <MyNavBar/>
      <IntroSection/>
      <AboutSection/>
      <ProjectsSection/>
    </>
  )
}

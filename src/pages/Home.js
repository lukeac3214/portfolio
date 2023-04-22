import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../styles/Home.css'

function Home() {
  return (
    <div className='home'>
      <div className='about'>
        <h2>Hi, My Name is Luke</h2>
        <div className='prompt'>
          <p>I'm a software developer with a passion for open source software.</p>
          <a href="mailto:lukeac3214@gmail.com"><EmailIcon /></a>
            <a href="https://github.com/lukeac3214" target="_blank" rel="noreferrer"><GitHubIcon /></a>
            <a href="https://www.linkedin.com/in/luke-couture3214/" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
        </div>
      </div>
      <div className='skills'>
        <h1>Skills</h1>
        <ol className='list'>
          <li className='item'>
            <h2>Front End</h2>
            <span>ReactJS, Javascript, HTML, CSS, NPM, MaterialUI</span>
          </li>
          <li className='item'>
            <h2>Back End</h2>
            <span>NodeJS, MongoDB, ExpressJS, MS SQL, PostgreSQL</span>
          </li>
          <li className='item'>
            <h2>Languages</h2>
            <span>C, C++, Python, Java, ARMv8 Assembly</span>
          </li>
          <li className='item'>
            <h2>Open Source Operating Systems</h2>
            <span><b>Linux</b> - OpenSUSE, Arch, Debian, CentOS, Gentoo, OpenWrt</span>
          </li>
          <li className='item'>
          <span><b>BSD</b> - FreeBSD, OpenBSD, OPNsense</span>
          </li>
        </ol>
      </div>
      </div>
  )
}

export default Home;
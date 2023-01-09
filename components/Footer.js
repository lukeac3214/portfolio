import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <div className='footer'>
        <div className='socialMedia'>
            <a href="mailto:lukeac3214@gmail.com"><EmailIcon /></a>
            <a href="https://github.com/lukeac3214" target="_blank" rel="noreferrer"><GitHubIcon /></a>
            <a href="https://www.linkedin.com/in/luke-couture3214/" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
        </div>
        <p> &copy; 2023 lukeac3214.com </p>
    </div>
  )
}
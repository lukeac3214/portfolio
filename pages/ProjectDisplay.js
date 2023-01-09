import React from 'react';
import { useParams } from 'react-router-dom';
import { ProjectList } from '../helpers/ProjectList';
import GitHubIcon from '@material-ui/icons/GitHub';
import '../styles/ProjectDisplay.css'

function ProjectDisplay() {
    const { id } = useParams();
    const project = ProjectList[id];

    return (
        <div className='project'>
            <h1>{project.name}</h1>
            {project.comp}
            <a href={"https://github.com/lukeac3214/portfolio"} style={{paddingTop: "10px"}}><GitHubIcon /></a>
            <h2>{project.body}</h2>
        </div>
    );
}

export default ProjectDisplay;
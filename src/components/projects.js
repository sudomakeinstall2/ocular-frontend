import React, { Component } from 'react';
import Project from './project'

class Projects extends Component {
    render() {
        return this.props.projects.map( (project) => (
            <Project key={project.id} project={project}/>
        ));
    }
}

export default Projects;

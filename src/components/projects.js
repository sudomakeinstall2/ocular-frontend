import React, { Component } from 'react';
import Project from './project'

class Projects extends Component {
    render() {
        return (
<div style={{display: 'flex', padding: '20px'}}>
                    {this.props.projects.map( (project) => (
                        <Project key={project.id} project={project}/>
                    ))}
</div>
        );
    }
}

export default Projects;

import React, {Component} from 'react';
import ProjectCard from './projectCard'

class Projects extends Component {

    style = {
        display: 'flex', padding: '20px', flexWrap: 'wrap'
    };

    render() {
        return (
            <div style={this.style}>
                {this.props.projects.map((project) => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
            </div>
        );
    }
}

export default Projects;

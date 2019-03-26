import React, {Component} from 'react';
import Project from './project'

class Projects extends Component {

    style = {
        display: 'flex', padding: '20px', flexWrap: 'wrap'
    }

    render() {
        return (
            <div style={this.style}>
                {this.props.projects.map((project) => (
                    <Project key={project.id} project={project}/>
                ))}
            </div>
        );
    }
}

export default Projects;

import React, { Component } from 'react';
import Project from './project'

class Projects extends Component {
    render() {
        return (

                <table>
                    <tr>
                        <th>title</th>
                        <th>cost</th>
                        <th>deadline</th>
                    </tr>
                    {this.props.projects.map( (project) => (
                        <Project key={project.id} project={project}/>
                    ))}
                </table>

        );
    }
}

export default Projects;

import React, {Component} from 'react';
import ProjectCard from "./projectCard";
import Milestones from "./milestones";

class ProjectDetail extends Component {

    style = {
        display: 'flex', padding: '20px', flexWrap: 'wrap'
    };

    render() {
        const {project} = this.props.location.state;
        console.log(project.id)
        return (
            <React.Fragment>
                <ProjectCard project={project}/>
                <Milestones project_id={project.id}/>
            </React.Fragment>
        );
    }
}

export default ProjectDetail;

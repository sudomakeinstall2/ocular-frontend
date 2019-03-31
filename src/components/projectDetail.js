import React, {Component} from 'react';
import ProjectCard from "./projectCard";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Milestones from "./milestones";
import Proposals from "./proposalList";

class ProjectDetail extends Component {

    style = {
        display: 'flex', padding: '20px', flexWrap: 'wrap'
    };

    render() {
        const {project} = this.props.location.state;
        const LinkToProposalForm = props => <Link to={{
            pathname: `/add_proposal`,
            state: {
                project_id: project.id,
            }
        }} {...props} />;

        return (
            <React.Fragment>
                <ProjectCard project={project}/>
                <Milestones project_id={project.id}/>
                <Proposals project_id={project.id}/>
                <Button variant="contained" color="default" component={LinkToProposalForm}>
                    Assign to me
                </Button>
            </React.Fragment>
        );
    }
}

export default ProjectDetail;

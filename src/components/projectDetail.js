import React, {Component} from 'react';
import ProjectCard from "./projectCard";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import HorizontalTimeline from "react-horizontal-timeline";
import Milestones from "./milestones";
import Proposals from "./proposalList";

const EXAMPLE = [
    {
        data: "2018-03-22",
        status: "status",
        statusB: "Ready for Dev",
        statusE: "In Progress"
    },
    {
        data: "2018-03-23",
        status: "status",
        statusB: "In Progress",
        statusE: "Done"
    }
];

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

        const VALUES = [{"date": "2011/11/11", 'component': "<div>hi</div>"}];

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

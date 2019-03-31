import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MilestoneListItem from "./milestoneListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import {Link} from 'react-router-dom';


class Proposals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            proposals: [],
            project: props.project_id,
        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        axios.get(`http://localhost:8000/project/${this.state.project}/proposals/`).then(
            res => this.setState({proposals: res.data})
        )
    }

    updateProposalAnswer(answer_id, state) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        axios.patch(`http://localhost:8000/answer/${answer_id}/`, {state}).then(
            res => alert(res.data)
        )
    }

    styles = {
        root: {
            width: '50%',
            maxWidth: 360,
        },
    };


    render() {
        return (
            <div style={this.styles.root}>
                <List component="nav">
                    <ListItem>
                        Proposals
                    </ListItem>
                    <Divider/>
                    {this.state.proposals.map((proposal) => (
                        <ListItem>

                            {proposal.user}, {proposal.cost}, {proposal.answer}
                            <IconButton onClick={e => this.updateProposalAnswer(proposal.answer, 'rejected')}>
                                <ThumbDownAlt/>
                            </IconButton>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Delete"
                                            onClick={e => this.updateProposalAnswer(proposal.answer, 'accepted')}>
                                    <ThumbUpAlt/>
                                </IconButton>
                            </ListItemSecondaryAction>

                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default Proposals;

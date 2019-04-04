import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'


class Proposals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            proposals: [],
            project_id: props.project_id,
        };
    }

    componentDidMount() {
        const {project_id} = this.state;
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        let url = null;
        if (project_id) {
            url = `http://localhost:8000/project/${this.state.project_id}/proposals/`
        } else {
            url = `http://localhost:8000/user/${localStorage.getItem('user_id')}/proposals/`
        }
        axios.get(url).then(
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
            // width: '50%',
            // maxWidth: 360,
        },
    };

    getIconBasedOnAnswer = (proposal, is_accept) => {
        const is_disabled = proposal.answer_state !== "not_answered";
        const is_accepted = proposal.answer_state === "accepted";
        const is_rejected = proposal.answer_state === "rejected";

        if (is_accept)
            return this.getAcceptIcon(is_accepted, is_disabled, proposal.answer);
        return this.getRejectIcon(is_rejected, is_disabled, proposal.answer);

    };

    getAcceptIcon = (is_accepted, is_disabled, answer_id) => {
        const style = {};
        if (is_accepted) {
            style.color = "green";
        }
        return <IconButton
            onClick={() => this.updateProposalAnswer(answer_id, 'accepted')}
            style={style}
            disabled={is_disabled}
        >
            <ThumbUpAlt/>
        </IconButton>
    };

    getRejectIcon = (is_rejected, is_disabled, answer_id) => {
        const style = {};
        if (is_rejected) {
            style.color = "red";
        }
        return <IconButton
            onClick={() => this.updateProposalAnswer(answer_id, 'rejected')}
            style={style}
            disabled={is_disabled}
        >
            <ThumbDownAlt/>
        </IconButton>
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
                        <ListItem key={proposal.id}>
                            <ListItemText primary={proposal.cost+"$"} secondary={proposal.user} />
                            {this.getIconBasedOnAnswer(proposal, false)}
                            <ListItemSecondaryAction>
                                {this.getIconBasedOnAnswer(proposal, true)}
                            </ListItemSecondaryAction>

                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default Proposals;

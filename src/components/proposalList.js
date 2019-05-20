import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withSnackbar } from "notistack";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ProposalForm from "./proposalForm";
import * as settings from "./config";


class Proposals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            proposals: [],
            project_id: props.project_id,
            is_dialog_open: false,
        };
    }

    handleOpenDialog = () => {this.setState({is_dialog_open: true})};
    handleCloseDialog = (should_refresh) => {
        this.setState({is_dialog_open: false});
        if (should_refresh){
            this.getData();
        }
    };

    getData(){
        if (!this.props.is_owner){
            return;
        }
        const {project_id} = this.state;
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        let url = null;
        if (project_id) {
            url = `${settings.host}project/${this.state.project_id}/proposals/`
        } else {
            url = `${settings.host}user/${localStorage.getItem('user_id')}/proposals/`
        }
        axios.get(url).then(
            res => {
                this.setState({proposals: res.data});
            }
        ).catch(res=>{
            this.props.enqueueSnackbar('cant get proposal list', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        })
    }

    componentDidMount() {
        this.getData();
    }

    updateProposalAnswer(answer_id, state) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        axios.patch(`${settings.host}answer/${answer_id}/`, {state}).then(
            res => {
                this.props.enqueueSnackbar('Successfully Done!', 'success');
            }
        ).catch(
            error => {
                this.props.enqueueSnackbar(error.response.data.detail, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
            }
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
                <Fab onClick={this.handleOpenDialog} style={{margin: 0}}>
                    <AddIcon/>
                </Fab>
                <Dialog
                    open={this.state.is_dialog_open}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Milestone</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can add a proposal for this project.
                        </DialogContentText>
                        <ProposalForm is_owner={this.props.is_owner} project_id={this.state.project_id} onSubmit={this.handleCloseDialog}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{this.handleCloseDialog(false)}} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withSnackbar(Proposals);

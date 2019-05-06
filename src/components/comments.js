import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import * as settings from './config';
import CommentForm from "./commentForm";

class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            project: props.project_id,
            is_dialog_open: false,
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`${settings.host}project/${this.state.project}/comments/`).then(
            res => this.setState({comments: res.data})
        )
    }

    styles = {
        root: {
            // width: '50%',
            // maxWidth: 360,
        },
    };

    handleOpenDialog = () => {this.setState({is_dialog_open: true})};
    handleCloseDialog = (should_refresh) => {
        this.setState({is_dialog_open: false});
        if (should_refresh){
            this.getData();
        }
    };


    render() {
        return (
            <div style={this.styles.root}>
                <List >
                    <ListItem>
                        Comments
                    </ListItem>
                    <Divider/>
                    {this.state.comments.map((comment) => (
                        <ListItem key={comment.id}>
                            <ListItemText primary={comment.owner} secondary={comment.content} />
                        </ListItem>
                    ))}
                    <Fab onClick={this.handleOpenDialog} style={{margin: 10}}>
                        <AddIcon/>
                    </Fab>
                </List>
                <Dialog
                    open={this.state.is_dialog_open}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Comment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can add comment to this project.
                        </DialogContentText>
                        <CommentForm project_id={this.state.project} onSubmit={this.handleCloseDialog}/>
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

export default Comments;

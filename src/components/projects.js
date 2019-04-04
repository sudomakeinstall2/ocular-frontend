import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ProjectCard from './projectCard'
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import MilestoneForm from "./milestones";
import ProjectForm from "./projectForm";


const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
});

class Projects extends Component {

    state = {
        projects: [],
        is_dialog_open: false,
    };

    handleOpenDialog = () => {this.setState({is_dialog_open: true})};
    handleCloseDialog = (should_refresh) => {
        this.setState({is_dialog_open: false});
        if (should_refresh){
            this.getData();
        }
    };

    getData(){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get('http://localhost:8000/projects/').then(
            res => this.setState({projects: res.data})
        )
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {this.state.projects.map((project) => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
                <Fab
                    color="primary"
                    aria-label="Add"
                    onClick={this.handleOpenDialog}
                    // href="/add_project"
                >
                    <AddIcon />
                </Fab>

                <Dialog
                    open={this.state.is_dialog_open}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Milestone</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can add a project.
                        </DialogContentText>
                        <ProjectForm onSubmit={this.handleCloseDialog}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{this.handleCloseDialog(false)}} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Projects);

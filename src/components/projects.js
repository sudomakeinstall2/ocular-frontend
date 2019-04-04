import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ProjectCard from './projectCard'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';


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
        projects: []
    };

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get('http://localhost:8000/projects/').then(
            res => this.setState({projects: res.data})
        )
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
                    href="/add_project"
                    // className={classes.absolute}
                >
                    <AddIcon />
                </Fab>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Projects);

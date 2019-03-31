import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ProjectCard from './projectCard'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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

    style = {
        display: 'flex', padding: '20px', flexWrap: 'wrap'
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
            <div style={this.style}>
                {this.props.projects.map((project) => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
                <Fab
                    color="primary"
                    aria-label="Add"
                    href="/add_project"
                    className={classes.absolute}
                >
                    <AddIcon />
                </Fab>
            </div>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Projects);

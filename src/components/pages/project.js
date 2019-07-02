import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Proposals from "../proposalList";
import NavBar from "../navBar";
import MilestonesTimeline from "../milestonesTimeline";
import Comments from "../comments";

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});


function ProjectPage(props) {
    const { classes } = props;
    const { project } = props.props.location.state;


    return (
        <React.Fragment>
            <CssBaseline />
            <NavBar/>
            <main>
                {/* Hero unit */}
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            {project.title}
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            {project.description}
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            {project.cost}$
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            Due: {project.deadline}
                        </Typography>
                        <MilestonesTimeline project_id={project.id} project={project}/>

                        <div className={classes.heroButtons}>
                            <Grid container spacing={40} justify="center">
                                <Grid item>
                                    <Proposals is_owner={localStorage.getItem('user_email')===project.owner} project_id={project.id}/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={40} justify="center">
                                <Grid item>
                                    <Comments project_id={project.id}/>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    {/* End hero unit */}
                    <Grid container spacing={40}>
                        {/*<Projects/>*/}
                    </Grid>
                </div>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}

ProjectPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectPage);
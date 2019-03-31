import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea'
import {Link} from 'react-router-dom';


const classes = {
    card: {
        minWidth: '150px',
        margin: 7
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class ProjectCard extends Component {

    render() {
        const {title, cost, deadline, description, id} = this.props.project;
        return (
            <Card style={classes.card}>
                <Link to={{
                    pathname: `/project/${id}`,
                    state: {
                        project: this.props.project,
                    }
                }} style={{textDecoration: 'none'}}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {title}
                            </Typography>
                            <Typography component="p">
                                {description}
                            </Typography>
                            <Typography style={classes.title} color="textSecondary">
                                {cost} $
                            </Typography>
                            <Typography style={classes.title} color="textSecondary">
                                {deadline}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        );
    }

}

export default ProjectCard;

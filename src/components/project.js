import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const classes = {
    card: {
        minWidth: '100px',
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

class Project extends Component {
    title = this.props.project.title;
    cost = this.props.project.cost;
    deadline = this.props.project.deadline;
    description = this.props.project.description;

    render() {
        return (
            <Card className={classes.card}>
                <CardContent>

                    <Typography variant="h5" component="h2">
                        {this.title}
                    </Typography>
                    <Typography component="p">
                        {this.description}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary">
                        {this.cost} $
                    </Typography>
                    <Typography className={classes.title} color="textSecondary">
                        {this.deadline}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    }

}
export default Project;

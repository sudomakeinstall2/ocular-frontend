import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MilestoneListItem from "./milestoneListItem";
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import {Link} from 'react-router-dom';


class Milestones extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            milestones: [],
            project: props.project_id,
        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`http://localhost:8000/project/${this.state.project}/milestones/`).then(
            res => this.setState({milestones: res.data})
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
                        Milestones
                    </ListItem>
                    <Divider/>
                    {this.state.milestones.map((milestone) => (
                        <ListItem button>
                            <MilestoneListItem key={milestone.id} milestone={milestone}/>
                        </ListItem>
                    ))}
                    <Link to={{
                        pathname: `/add_milestone`,
                        state: {
                            project_id: this.state.project,
                        }
                    }} style={{textDecoration: 'none'}}>
                        <ListItem href="/add_milestone">
                            <ListItemText primary="Add Milestone"/>
                        </ListItem>
                    </Link>
                </List>
            </div>
        );
    }
}

export default Milestones;

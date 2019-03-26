import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';




class MilestoneForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            deadline: '2020-01-01',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let project_id = this.props.location.state.project_id;
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        axios.post(`http://localhost:8000/project/${project_id}/milestones/`, this.state).then(
            res => console.log(res)
        )
    }

    style = {
        display:'flex',
        flexDirection: 'column',
        maxWidth: '20%',
        padding: '30px',
    };

    render() {
        return (
            <form style={this.style}>
                <TextField
                    required
                    label="title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    required
                    label="description"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    margin="normal"
                    multiline
                    rows="4"
                />
                <TextField
                    required
                    label="deadline"
                    name="deadline"
                    value={this.state.deadline}
                    onChange={this.handleChange}
                    margin="normal"
                    type="date"
                />
                <Button variant="contained" color="primary" onClick={e => this.handleSubmit(e)}>
                    Add Milestone
                </Button>
            </form>
        );
    }
}
export default MilestoneForm;

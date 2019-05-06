import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as settings from './config';


class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit() {
        const project_id = this.props.project_id;
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        axios.post(`${settings.host}project/${project_id}/comments/`, this.state).then(
            res => console.log(res)
        );
        this.props.onSubmit(true);
    }

    style = {
        display:'flex',
        flexDirection: 'column',
        // maxWidth: '20%',
        // padding: '30px',
    };

    render() {
        return (
            <form style={this.style}>
                <TextField
                    required
                    label="content"
                    name="content"
                    value={this.state.content}
                    onChange={this.handleChange}
                    margin="normal"
                    multiline
                    rows="4"
                />
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                    Add Comment
                </Button>
            </form>
        );
    }
}
export default CommentForm;

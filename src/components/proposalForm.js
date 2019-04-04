import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class ProposalForm extends React.Component {
    style = {
        display: 'flex',
        flexDirection: 'column',
        // maxWidth: '20%',
        // padding: '30px',
    };

    constructor(props) {
        super(props);
        this.state = {
            cost: '',
            user: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.props)
        let project_id = this.props.project_id;
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        axios.post(`http://localhost:8000/project/${project_id}/proposals/`, this.state).then(
            res => console.log(res)
        )
        this.props.onSubmit(true);
    }

    render() {
        return (
            <form style={this.style}>
                <TextField
                    required
                    label="cost"
                    name="cost"
                    value={this.state.cost}
                    onChange={this.handleChange}
                    margin="normal"
                    type="number"
                />
                <TextField
                    required
                    label="user"
                    name="user"
                    value={this.state.user}
                    onChange={this.handleChange}
                    margin="normal"
                    type="number"
                />
                <Button variant="contained" color="primary" onClick={e => this.handleSubmit(e)}>
                    Add Proposal
                </Button>
            </form>
        );
    }
}

export default ProposalForm;

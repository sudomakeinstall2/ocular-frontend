import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as settings from './config';
import UserEmailAutoSuggest from "./userEmailAutoSuggest";

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

        if (!props.is_owner){
            this.state['user'] = localStorage.getItem('user_email')
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        let project_id = this.props.project_id;
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        axios.post(`${settings.host}project/${project_id}/proposals/`, this.state).then(
            res => console.log(res)
        );
        this.props.onSubmit(true);
    }

    handleUserChange = (user) => {
        this.setState({'user': user});
    };

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
                {this.props.is_owner ?
                    <UserEmailAutoSuggest handleValue={this.handleUserChange}/>
                    :
                    <div></div>
                }
                {/*<TextField*/}
                {/*    required*/}
                {/*    label="user"*/}
                {/*    name="user"*/}
                {/*    value={this.state.user}*/}
                {/*    onChange={this.handleChange}*/}
                {/*    margin="normal"*/}
                {/*    type="number"*/}
                {/*/>*/}
                <Button variant="contained" color="primary" onClick={e => this.handleSubmit(e)}>
                    Add Proposal
                </Button>
            </form>
        );
    }
}

export default ProposalForm;

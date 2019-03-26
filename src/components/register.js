import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password1: '',
            password2: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2,
        }).then( function (response) {
            localStorage.setItem('token', response.data.key)
            console.log(localStorage.getItem('token'))
        }).catch(function (error) {
            console.log(error)
        })
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
                    label="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    required
                    label="password"
                    name="password1"
                    type="password"
                    value={this.state.password1}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    required
                    label="repeat password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={e => this.handleSubmit(e)}
                >
                    Register
                </Button>
            </form>
        );
    }
}

export default Register;
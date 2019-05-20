import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from "notistack";
import * as settings from './config';


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
        axios.defaults.headers.common['Authorization'] = "";
        axios.post(`${settings.host}rest-auth/registration/`, {
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2,
        }).then( response => {
            localStorage.setItem('token', response.data.key);
            let setUser = (props) => {
                axios.defaults.headers.common['Authorization'] =
                    'Token ' + localStorage.getItem('token');
                axios.get(`${settings.host}user/self/`).then(function (response) {
                    localStorage.setItem('user_email', response.data.email);
                    localStorage.setItem('user_id', response.data.id);
                }).catch(function (error) {
                    props.enqueueSnackbar(error.response.data.detail, {
                        variant: 'error',
                        autoHideDuration: 2000,
                    });
                })
            };
            setUser(this.props);
            this.props.onSubmit(true);
        }).catch( error => {
            this.props.enqueueSnackbar("Can't register!", {
                variant: 'error',
                autoHideDuration: 2000,
            });
        })
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

export default withSnackbar(Register);
import React from 'react';
import axios from 'axios';

class Login extends React.Component{
    state = {
        email: '',
        password: ''
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSubmit = (e) => {
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            email: this.state.email,
            password: this.state.password,
        }).then( function (response) {
            localStorage.setItem('token', response.data.key)
            console.log(localStorage.getItem('token'))
        }).catch(function (error) {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <h1> Login </h1>
                <input
                    name="email"
                    placeholder="Email"
                    onChange={e => this.onChange(e)}
                    value={this.state.email}
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={e => this.onChange(e)}
                    value={this.state.password}
                />
                <input
                    name="submit"
                    type="submit"
                    onClick={e => this.onSubmit(e)}
                />
            </div>
        );
    }

}

export default Login;
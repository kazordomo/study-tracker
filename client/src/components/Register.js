import React, { Component } from 'react';
import Auth from './Auth';
import PropTypes from 'prop-types';

class Register extends Component {

    postFetch(url) {
        let formData = {};
        if(url === 'register') {
            formData = {
                name: this.refs.name.value,
                email: this.refs.email.value,
                password: this.refs.password.value,
                reenterPassword: this.refs.reenterPassword.value
            }
        } else {
            formData = {
                name: this.refs.loginUserName.value,
                password: this.refs.loginPassword.value
            }
        }

        fetch(`auth/${url}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            if(response.status === 200) {
                return response.json();
            }
        }).then((data) => {
            Auth.authenticateUser(data.token);
            this.props.handleLogin();
        });
    }

    handleLogin(e) {
        e.preventDefault();
        this.postFetch('login');
    }

    handleRegister(e) {
        e.preventDefault();
        this.postFetch('register');
    }

    render() {

        return (
            <div className="Register">
                <div className="Register-form-wrapper">
                    <form onSubmit={this.handleLogin.bind(this)}>
                        <div className="sub-title">Login</div>
                        <input type="text" ref="loginUserName" placeholder="Username..." />
                        <input type="password" ref="loginPassword" placeholder="Password..." />
                        <input type="submit" className="Login-button button" value="Login" />
                    </form>
                    <form onSubmit={this.handleRegister.bind(this)}>
                        <div className="sub-title">Register</div>
                        <input type="text" ref="name" placeholder="Username..." />
                        <input type="text" ref="email" placeholder="Email..." />
                        <input type="password" ref="password" placeholder="Password..." />
                        <input type="password" ref="reenterPassword" placeholder="Password..." />
                        <input type="submit" className="Register-button button" value="Register" />
                    </form>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    handleLogin: PropTypes.func
};

export default Register;
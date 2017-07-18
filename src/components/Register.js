import React, { Component } from 'react';

class Register extends Component {
    render() {
        return (
            <div className="Register">
                <div className="Register-form-wrapper">
                    <form>
                        <h1>Already got an account?</h1>
                        <input type="text" placeholder="Username..." />
                        <input type="password" placeholder="Password..." />
                        <input type="submit" className="button" value="Login" />
                    </form>
                    <form>
                        <h1>No? Register below!</h1>
                        <input type="text" placeholder="Username..." />
                        <input type="email" placeholder="Email..." />
                        <input type="password" placeholder="Password..." />
                        <input type="password" placeholder="Password..." />
                        <input type="submit" className="button" value="Register" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
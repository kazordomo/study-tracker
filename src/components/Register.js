import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
    render() {
        return (
            <div className="Register">
                <div className="Register-form-wrapper">
                    <form>
                        <div className="sub-title">Login</div>
                        <input type="text" placeholder="Username..." />
                        <input type="password" placeholder="Password..." />
                        <Link to='/overview'><button className="button">Login</button></Link>
                        {/*<input type="submit" className="button" value="Login" />*/}
                    </form>
                    <form>
                        <div className="sub-title">Register</div>
                        <input type="text" placeholder="Username..." />
                        <input type="email" placeholder="Email..." />
                        <input type="password" placeholder="Password..." />
                        <input type="password" placeholder="Password..." />
                        <Link to='/overview'><button className="button">Register</button></Link>
                        {/*<input type="submit" className="button" value="Register" />*/}
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
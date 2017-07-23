import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div className="Home-wrapper">
                    <div className="Home-title">STUDY TRACKER</div>
                    <div className="Home-sub-title">Track your study progress.</div>
                    <div className="Home-button">
                        <Link to='/register'><button className="button">Login/Register</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
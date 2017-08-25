import React, { Component } from 'react';

class Profile extends Component {

    //TODO: User-profile. Show stats as total commits, total hours studied and so on...

    render() {
        return (
            <div className="Profile">
                <h1>KAZORDOMO</h1>
                <div className="container">
                    <div className="Profile-stats">
                        <div className="Profile-stats-row">
                            <div className="Profile-stats-title">Total Subjects:</div>
                            <div className="Profile-stats-sum">200</div>
                        </div>
                        <div className="Profile-stats-row">
                            <div className="Profile-stats-title">Total Commits:</div>
                            <div className="Profile-stats-sum">500</div>
                        </div>
                        <div className="Profile-stats-row">
                            <div className="Profile-stats-title">Total Hours:</div>
                            <div className="Profile-stats-sum">250</div>
                        </div>
                        <div className="Profile-stats-row">
                            <div className="Profile-stats-title">Done Subjects:</div>
                            <div className="Profile-stats-sum">52</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
import React, { Component } from 'react';

class Profile extends Component {

    //TODO: User-profile. Show stats as total commits, total hours studied and so on...

    render() {
        return (
            <div className="Profile">
                <h1>USERNAME</h1>
                <div className="container">
                    <div className="Profile-stats">
                        <div>Total Commits: 200</div>
                        <div>Total Hours: 20</div>
                        <div>Blablabla: 15</div>
                        <div>Jasdasd: Nej</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
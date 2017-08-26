import React, { Component } from 'react';

class Profile extends Component {

    state = {
        profileData: {}
    };
    //TODO: User-profile. Show stats as total commits, total hours studied and so on...

    getJSON(response) {
        return response.json();
    }

    componentDidMount() {
        //TODO: should catch error if the request is bad
        return (
            fetch('api/profile')
                .then(this.getJSON)
                .then((data) => {
                    this.setState({profileData: data});
                })
        )
    }

    render() {
        return (
            <div className="Profile">
                <h1>KAZORDOMO</h1>
                <div className="container">
                    <div className="Profile-stats">
                        <div className="Profile-stats-row">
                            <div className="Profile-stats-title">Total Subjects:</div>
                            <div className="Profile-stats-sum">{this.state.profileData.totalSubjects}</div>
                        </div>
                        <div className="Profile-stats-row">
                            <div className="Profile-stats-title">Total Commits:</div>
                            <div className="Profile-stats-sum">{this.state.profileData.totalCommits}</div>
                        </div>
                        <div className="Profile-stats-row">
                            <div className="Profile-stats-title">Total Hours:</div>
                            <div className="Profile-stats-sum">{this.state.profileData.totalHours}</div>
                        </div>
                        <div className="Profile-stats-row">
                            <div className="Profile-stats-title">Done Subjects:</div>
                            <div className="Profile-stats-sum">{this.state.profileData.doneSubjects}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
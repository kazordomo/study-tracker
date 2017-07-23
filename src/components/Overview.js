import React, { Component } from 'react';
import SubjectItem from './SubjectItem';
import { Link } from 'react-router-dom';

class Overview extends Component {

    render() {
        let subjects = this.props.subjects.map(subject => {
            if(subject.inFocus) {
                return (
                    <SubjectItem key={subject.title} subject={subject} />
                )
            } else {
                return false;
            }
        });

        return (
            <div className="Overview">
                <div className="container">
                    <h1>Overview</h1>
                    <h3><Link to='/addsubject'>Add Subject</Link></h3>
                    {subjects}
                </div>
            </div>
        );
    }
}

export default Overview;
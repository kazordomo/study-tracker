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
                    <Link to='/addsubject'><div className="Overview-add-subject"><i className="fa fa-plus" aria-hidden="true"></i></div></Link>
                    {subjects}
                </div>
            </div>
        );
    }
}

export default Overview;
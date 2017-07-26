import React, { Component } from 'react';
import SubjectItem from './SubjectItem';
import { Link } from 'react-router-dom';

class Overview extends Component {

    handleSelect(e) {
        console.log(e.target.value);
    }

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
                    <div className="title">Subjects</div>
                    <div className="Overview-nav">
                        <Link to='/addsubject'><span className="Overview-add-subject">New subject</span></Link>
                        <select onChange={this.handleSelect}>
                            <option value="inFocus">In focus</option>
                            <option value="all">All</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <div className="Overview-subjects">
                        {subjects}
                    </div>
                </div>
            </div>
        );
    }
}

export default Overview;
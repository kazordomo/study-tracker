import React, { Component } from 'react';
import SubjectItem from './SubjectItem';

class Overview extends Component {

    constructor() {
        super();
        //studySubjects will be fetched from server later.
        //should probably do this from App component.
        this.state = {
            subjects: [
                {
                    id: 1,
                    title: 'SQL',
                    hoursDone: 10,
                    hoursTodo: 15,
                    inFocus: true
                },
                {
                    id: 2,
                    title: 'mongoDB',
                    hoursDone: 10,
                    hoursTodo: 25,
                    inFocus: true
                },
                {
                    id: 3,
                    title: 'Random stuff',
                    hoursDone: 5,
                    hoursTodo: 10,
                    inFocus: true
                },
                {
                    id: 4,
                    title: 'More stuff',
                    hoursDone: 7,
                    hoursTodo: 20,
                    inFocus: false
                }
            ]
        }
    }

    render() {
        let subjects = this.state.subjects.map(subject => {
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
                <h1>Overview</h1>
                {subjects}
            </div>
        );
    }
}

export default Overview;
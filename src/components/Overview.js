import React, { Component } from 'react';
import StudyItem from './StudyItem';

class Overview extends Component {

    constructor() {
        super();
        //studySubjects will be fetched from server later.
        //should probably do this from App component.
        this.state = {
            studySubjects: [
                {
                    id: 1,
                    title: 'SQL',
                    hoursDone: 10,
                    hoursToDo: 15
                },
                {
                    id: 2,
                    title: 'mongoDB',
                    hoursDone: 10,
                    hoursToDo: 25
                },
                {
                    id: 3,
                    title: 'Random stuff',
                    hoursDone: 5,
                    hoursToDo: 10
                }
            ]
        }
    }

    render() {
        let studySubjects = this.state.studySubjects.map(studySubject => {
            return (
                <StudyItem key={studySubject.title} studySubject={studySubject} />
            )
        });

        return (
            <div className="Overview">
                <h1>Overview</h1>
                {studySubjects}
            </div>
        );
    }
}

export default Overview;
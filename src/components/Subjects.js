import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Subject from './Subject';

class Subjects extends Component {

    constructor() {
        super();
        this.state = {
            subjects: []
        }
    }

    //TODO: no rerender of subject, need to reload to get the sorting done.
    handleSelect(e) {
        let sortedSubjects = this.props.subjects.sort((a, b) => {
            return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        });
        let subjects = sortedSubjects.map(subject => {
            const subjectItem = <Subject key={subject._id} subject={subject} />;
            if(e.target.value === 'all') {
                return subjectItem;
            } else if (e.target.value ==='inFocus') {
                if(subject.inFocus === true) {
                    return subjectItem;
                } else return false;
            } else if (e.target.value === 'done') {
                if(subject.hoursDone >= subject.hoursTodo && !subject.infinity) {
                    return subjectItem;
                } else return false;
            } else return false;
        });
        this.setState({subjects: subjects});
    }

    componentDidMount() {
        let sortedSubjects = this.props.subjects.sort((a, b) => {
            return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        });
        let subjects = sortedSubjects.map(subject => {
            if(subject.inFocus) {
                return (
                    <Subject key={subject._id} subject={subject} />
                )
            } else return false;
        });
        this.setState({subjects: subjects});
    }

    render() {
        const startMessage = [<div className="Subjects-start-message">Start with creating your first Subject!</div>, <Link className="Subjects-start-button" to='/addsubject'><button className="button">Create subject <i className="fa fa-plus" aria-hidden="true"></i></button></Link>];
        const populateView = this.state.subjects.length ? this.state.subjects : startMessage.map((n) => {return n});

        return (
            <div className="Subjects">
                <div className="container">
                    <div className="title">Subjects</div>
                    <div className="Subjects-nav">
                        <select onChange={this.handleSelect.bind(this)}>
                            <option value="inFocus">In focus</option>
                            <option value="all">All</option>
                            <option value="done">Done</option>
                        </select>
                        <Link to='/addsubject'><span className="Subjects-add-subject">New subject</span></Link>
                    </div>
                    <div className="Subjects-subjects">
                        {populateView}
                    </div>
                </div>
            </div>
        );
    }
}

Subjects.proTypes = {
    subjects: PropTypes.array
};

export default Subjects;
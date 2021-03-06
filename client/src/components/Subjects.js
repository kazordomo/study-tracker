import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Subject from './Subject';

class Subjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subjects: []
        }
    }

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

    componentWillMount() {
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
        const ifSubjects = () => {
            return (
                this.state.subjects.length ?
                    <div>
                        <div className="Subjects-nav">
                            <select className="Subject-select" onChange={this.handleSelect.bind(this)}>
                                <option value="inFocus">In focus</option>
                                <option value="all">All</option>
                                <option value="done">Done</option>
                            </select>
                            <Link to='/addsubject'><span className="Subjects-add-subject">New subject</span></Link>
                        </div>
                        <div className="Subjects-subjects">
                            {this.state.subjects}
                        </div>
                    </div> :
                    <div>
                        <div className="Subjects-subjects">
                            <div className="Subjects-start-wrapper">
                                <div className="Subjects-start-message">Start with creating your first Subject!</div>
                                <Link className="Subjects-start-button" to='/addsubject'>
                                    <button>Create subject <i className="fa fa-plus" aria-hidden="true"></i></button>
                                </Link>
                            </div>
                        </div>
                    </div>
            )
        };

        return (
            <div className="Subjects">
                <div className="container">
                    <div className="title">Subjects</div>
                    {ifSubjects()}
                </div>
            </div>
        );
    }
}

Subjects.defaultProps = {
    subjects: []
};

Subjects.proTypes = {
    subjects: PropTypes.array
};

export default Subjects;
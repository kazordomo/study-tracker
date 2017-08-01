import React, { Component } from 'react';
import SubjectItem from './SubjectItem';
import { Link } from 'react-router-dom';

class Overview extends Component {

    constructor() {
        super();
        this.state = {
            subjects: []
        }
    }

    //refactor this later pl0x. fugly af.
    handleSelect(e) {
        let subjects = this.props.subjects.map(subject => {
            if(e.target.value === 'all') {
                return (
                    <SubjectItem key={subject.title} subject={subject} />
                )
            } else if (e.target.value ==='inFocus') {
                if(subject.inFocus === true) {
                    return (
                        <SubjectItem key={subject.title} subject={subject} />
                    )
                } else return false;
            } else if (e.target.value === 'done') {
                if(subject.hoursDone >= subject.hoursTodo) {
                    return (
                        <SubjectItem key={subject.title} subject={subject} />
                    )
                } else return false;
            } else return false;
        });
        this.setState({subjects: subjects});
    }

    componentDidMount() {
        let subjects = this.props.subjects.map(subject => {
            if(subject.inFocus) {
                return (
                    <SubjectItem key={subject.title} subject={subject} />
                )
            } else return false;
        });
        this.setState({subjects: subjects});
    }

    render() {
        return (
            <div className="Overview">
                <div className="container">
                    <div className="title">Subjects</div>
                    <div className="Overview-nav">
                        <select onChange={this.handleSelect.bind(this)}>
                            <option value="inFocus">In focus</option>
                            <option value="all">All</option>
                            <option value="done">Done</option>
                        </select>
                        <Link to='/addsubject'><span className="Overview-add-subject">New subject</span></Link>
                    </div>
                    <div className="Overview-subjects">
                        {this.state.subjects}
                    </div>
                </div>
            </div>
        );
    }
}

export default Overview;
import React, { Component } from 'react';

class StudyItem extends Component {

    render() {
        let style = {
            width: Math.round((this.props.studySubject.hoursDone / this.props.studySubject.hoursToDo) * 100) + '%'
        };
        return (
            <div className="StudyItem">
                <div className="container">
                    <div className="sub-title">{this.props.studySubject.title}</div>
                    <div className="StudyItem-progress-bar">
                        <div className="StudyItem-hours-done" style={style}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudyItem;
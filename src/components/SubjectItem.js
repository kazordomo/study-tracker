import React, { Component } from 'react';

class SubjectItem extends Component {

    render() {
        let hoursDonePercent = Math.round((this.props.subject.hoursDone / this.props.subject.hoursTodo) * 100);
        let style = {
            width: hoursDonePercent + '%'
        };
        return (
            <div className="SubjectItem">
                <div className="container">
                    <div className="sub-title">{this.props.subject.title}</div>
                    <div className="SubjectItem-progress-bar">
                        <div className="SubjectItem-hours-done" style={style}><span className="SubjectItem-percent">{hoursDonePercent}%</span></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubjectItem;
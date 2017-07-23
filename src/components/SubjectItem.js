import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SubjectItem extends Component {

    render() {
        let hoursDonePercent = Math.round((this.props.subject.hoursDone / this.props.subject.hoursTodo) * 100);
        let style = {
            width: hoursDonePercent + '%'
        };
        return (
            <div className="SubjectItem">
                <div className="row clearfix">
                    <div className="sub-title">{this.props.subject.title}</div>
                    <div className="SubjectItem-edit"><button><Link to='/editsubject'>Edit</Link></button></div>
                </div>
                <div className="SubjectItem-progress-bar">
                    <span className="SubjectItem-percent">{hoursDonePercent}%</span>
                    <div className="SubjectItem-hours-done" style={style}></div>
                </div>
                <div className="SubjectItem-description">Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala</div>
            </div>
        );
    }
}

export default SubjectItem;
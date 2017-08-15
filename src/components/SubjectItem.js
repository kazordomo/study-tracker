import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SubjectItem extends Component {

    render() {
        let hoursDonePercent = Math.round((this.props.subject.hoursDone / this.props.subject.hoursTodo) * 100);
        hoursDonePercent = (hoursDonePercent > 100) ? 100 : hoursDonePercent;
        let color = '';
        if(hoursDonePercent <= 30) {
            color = '#FC2626';
        } else if (hoursDonePercent > 30 && hoursDonePercent <= 70) {
            color = '#FFB742';
        } else {
            color = '#24DE10';
        }

        let style = {
            width: hoursDonePercent + '%',
            backgroundColor: color,
            borderRadius: '15px 0px 0px 15px'
        };
        let commitLinkStyle = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1
        };
        let editLinkStyle = {
            position: 'relative',
            zIndex: 999
        };
        //fugly
        if(hoursDonePercent === 100) {
            style.borderRadius = '15px 15px 15px 15px';
        }
        return (
            <div className="SubjectItem">
                <div className="SubjectItem-wrapper">
                    <Link to={'/subjectStats/'+this.props.subject.id} style={commitLinkStyle} ></Link>
                    <div className="clearfix">
                        <div className="sub-title">{this.props.subject.title}</div>
                        <Link to={'/editsubject/'+this.props.subject.id} ><i className="fa fa-pencil-square-o" style={editLinkStyle} aria-hidden="true"></i></Link>
                    </div>
                    <div className="SubjectItem-progress-bar">
                        <span className="SubjectItem-percent">{hoursDonePercent}%</span>
                        <div className="SubjectItem-hours-done" style={style}></div>
                    </div>
                    <div className="SubjectItem-description">{this.props.subject.description}</div>
                </div>
            </div>
        );
    }
}

export default SubjectItem;
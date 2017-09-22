import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Subject extends Component {

    render() {
        let hoursDonePercent = Math.round((this.props.subject.hoursDone / this.props.subject.hoursTodo) * 100);
        hoursDonePercent = (hoursDonePercent > 100) ? 100 : hoursDonePercent;
        let color = '';
        if(hoursDonePercent <= 20) {
            color = '#FC2626';
        } else if (hoursDonePercent > 20 && hoursDonePercent <= 60) {
            color = '#FFC400';
        } else {
            color = '#24DE10';
        }

        let goldStarStyle = {
            display: 'none'
        };
        let style = {
            width: this.props.subject.infinity ? '100%' : hoursDonePercent + '%',
            backgroundColor: this.props.subject.infinity ? '#36D1AA' : color,
            borderRadius: '2px 0px 0px 2px'
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
        if(hoursDonePercent === 100 && !this.props.subject.infinity) {
            goldStarStyle.display = 'block';
            style.borderRadius = '2px 2px 2px 2px';
        }
        const progressBarText = this.props.subject.infinity ? (this.props.subject.hoursDone + 'h') : (hoursDonePercent + '%');
        return (
            <div className="Subject">
                <i className="fa fa-star Subject-gold-star" style={goldStarStyle} aria-hidden="true"></i>
                <div className="Subject-wrapper">
                    <Link to={'/commits/'+this.props.subject._id} style={commitLinkStyle} ></Link>
                    <div className="clearfix">
                        <Link to={'/editsubject/'+this.props.subject._id} ><i className="fa fa-pencil-square-o" style={editLinkStyle} aria-hidden="true"></i></Link>
                        <div className="sub-title">{this.props.subject.title}</div>
                    </div>
                    <div className="Subject-progress-bar">
                        <span className="Subject-percent">{progressBarText}</span>
                        <div className="Subject-hours-done" style={style}></div>
                    </div>
                    <div className="Subject-description"><span>{this.props.subject.description}</span></div>
                </div>
            </div>
        );
    }
}

Subject.proTypes = {
    subject: PropTypes.object
};

export default Subject;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth from './Auth';
import uuid from 'uuid';
import moment from 'moment';

//with the local storage approach every subject will be the same.
// if(!localStorage.getItem('subject')) {
//     localStorage.setItem('subject', JSON.stringify(isSubjectItem));
// }
// subject: JSON.parse(localStorage.getItem('subject'))

function Commit(props) {
    return (
        <div className="Commit">
            <i className="fa fa-comment" aria-hidden="true"></i>
            <span className="Commit-message">{props.value.message}</span>
            <span className="Commit-dash">-</span>
            <span className="Commit-time">{props.value.time}h, {props.value.formatedDate}</span>
            <button className="Commit-delete button" onClick={() => props.deleteCommit(props.value)} ><i className="fa fa-trash-o" aria-hidden="true"></i></button>
        </div>
    )
}

class Commits extends Component {

    constructor() {
        super();
        this.state = {
            commitMessages: [],
            subject: {},
            counter: 1
        }
    }

    renderCommitMessages(messages) {
        let quantity = this.state.counter * 5;
        let messagesArr = messages.sort((a, b) => {
            return b.timestamp - a.timestamp;
        }).slice(0, quantity);
        return (
            messagesArr.map(message => {
                //lol, no. just no.
                message.formatedDate = new moment(message.timestamp).format('MMM Do YY');
                return (
                    <Commit value={message} deleteCommit={this.handleDeleteCommit.bind(this)} key={message._id} />
                )
            })
        )
    }

    showMoreCommits() {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    handleAddCommit(e) {
        e.preventDefault();
        let formData = {
            _id: uuid.v4(),
            message: this.refs.message.value,
            time: parseInt(this.refs.time.value, 10),
            timestamp: new Date(),
            subjectId: this.state.subject._id
        };

        fetch('/api/addcommit', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            return response.json();
        }).then(() => {
            let commitMessages = this.state.commitMessages;
            commitMessages.push(formData);
            this.setState({commitMessages: commitMessages}, () => {
                this.props.addCommit(formData, this.state.subject);
            });
        });
    }

    handleDeleteCommit(message) {
        let commitData = {
            subject: this.state.subject,
            message: message
        };

        fetch('/api/deletecommit',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(commitData)
        }).then((response) => {
            return response.json();
        }).then(data => {
            let commits = this.state.commitMessages;
            let isCommitItem = commits.filter((com) => {
                return com._id === message._id;
            })[0];
            commits.splice(commits.indexOf(isCommitItem), 1);
            this.setState({commitMessages: data.commitMessages}, () => {
                this.props.deleteCommit(commitData);
            });
        });
    }

    componentWillMount() {
        let paramId = this.props.match.params.id;
        let isSubjectItem = this.props.data.filter((sub) => {
            return sub._id === paramId;
        })[0];
        this.setState({
            subject: isSubjectItem,
            commitMessages: isSubjectItem.commitMessages
        });
    }


    render() {
        let quantity = this.renderCommitMessages(this.state.commitMessages).length;
        let quantityTotal = this.state.subject.commitMessages.length;
        let showMore = this.renderCommitMessages(this.state.commitMessages).length === this.state.commitMessages.length ?
            '' :
            <span>Show more ({quantity} / {quantityTotal}) <i className="fa fa-caret-down" aria-hidden="true"></i></span>;
        return (
            <div className="Commits">
                <div className="container">
                   <h1>{this.state.subject.title}</h1>
                    <form onSubmit={this.handleAddCommit.bind(this)}>
                        <input type="text" ref="message" placeholder="Message" required />
                        <input type="number" ref="time" placeholder="Hours" required />
                        <input type="submit" value="Add" className="button button-add" />
                    </form>
                    <div className="Commits-messages">
                        {this.renderCommitMessages(this.state.commitMessages)}
                    </div>
                    <button className="Commits-show-more" onClick={() => {this.showMoreCommits()}} >{showMore}</button>
                </div>
            </div>
        );
    }
}

Commits.propTypes = {
    data: PropTypes.array,
    addCommit: PropTypes.func,
    deleteCommit: PropTypes.func
}

export default Commits;

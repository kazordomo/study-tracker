import React, { Component } from 'react';
import uuid from 'uuid';
import moment from 'moment';

//TODO: Fix error when refreshing page inside subjectItems. Localstorage? Send in props differently?
//TODO: The comp will return to initial state when page refresh, meaning we have no values to calculate isSubjectItem with.
//with the local storage approach every subject will be the same.
// if(!localStorage.getItem('subject')) {
//     localStorage.setItem('subject', JSON.stringify(isSubjectItem));
// }
// subject: JSON.parse(localStorage.getItem('subject'))

function CommitMessage(props) {
    return (
        <div className="CommitMessage">
            <i className="fa fa-comment" aria-hidden="true"></i>
            <span className="CommitMessage-message">{props.value.message}</span>
            <span className="CommitMessage-dash">-</span>
            <span className="CommitMessage-time">{props.value.time}h, {props.value.formatedDate}</span>
            <button className="CommitMessage-delete button" onClick={() => props.deleteCommit(props.value)} ><i className="fa fa-trash-o" aria-hidden="true"></i></button>
        </div>
    )
}

class SubjectStats extends Component {

    constructor() {
        super();
        this.state = {
            commitMessages: [],
            subject: {},
            counter: 1
        }
    }

    renderCommitMessages(messages) {
        //the sorting of time do work, just that the db doesnt contain any timestamps yes.
        //if there is no commits it gives us an error. FIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIX
        let quantity = this.state.counter * 5;
        let messagesArr = messages.sort((a, b) => {
            return b.timestamp - a.timestamp;
        }).slice(0, quantity);
        return (
            messagesArr.map(message => {
                //lol, no. just no.
                message.formatedDate = new moment(message.timestamp).format('MMM Do YY');
                return (
                    <CommitMessage value={message} deleteCommit={this.handleDeleteCommit.bind(this)} key={message._id} />
                )
            })
        )
    }

    showMoreCommits() {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    //TODO: REFACTOR!! we shouold have the same logics for what we're updating through App.js and here.
    handleCommit(e) {
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
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            return response.json();
        }).then((subject) => {
            let commitMessages = this.state.commitMessages;
            commitMessages.push(formData);
            this.setState({commitMessages: commitMessages}, () => {
                this.props.addCommit(formData, this.state.subject);
            });
        });
    }

    handleDeleteCommit(message) {
        // this.props.deleteCommit(message, this.state.subject);

        //TODO: find subject by subject._id and then splice commitMessages where _id === _id.
        let commitData = {
            subject: this.state.subject,
            message: message
        };

        // e.preventDefault();
        fetch('/api/deletecommit',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commitData)
        }).then((response) => {
            return response.json();
        }).then(data => {
            console.log(data);
            //commitMessages do not rerender.
            this.props.deleteCommit(data);
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
            <div className="SubjectStats">
                <div className="container">
                   <h1>{this.state.subject.title}</h1>
                    <form onSubmit={this.handleCommit.bind(this)}>
                        <input type="text" ref="message" placeholder="Message" required />
                        <input type="number" ref="time" placeholder="Hours" required />
                        <input type="submit" value="Add" className="button button-add" />
                    </form>
                    <div className="SubjectStats-messages">
                        {this.renderCommitMessages(this.state.commitMessages)}
                    </div>
                    <button className="SubjectStats-show-more" onClick={() => {this.showMoreCommits()}} >{showMore}</button>
                </div>
            </div>
        );
    }
}

export default SubjectStats;

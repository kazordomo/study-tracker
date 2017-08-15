import React, { Component } from 'react';
import uuid from 'uuid';
import moment from 'moment';

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
            commitMessage: {
                message: '',
                time: 0
            },
            subject: {},
            counter: 1
        }
    }

    renderCommitMessages(messages) {
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
                    <CommitMessage value={message} deleteCommit={this.handleDeleteCommit.bind(this)} key={uuid.v4()} />
                )
            })
        )
    }

    showMoreCommits() {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    handleCommit(e) {
        this.setState({
            commitMessage: {
                message: this.refs.message.value,
                time: this.refs.time.value,
                timestamp: new Date()
            }
        }, () => {
            this.props.addCommit(this.state.commitMessage, this.state.subject);
            this.refs.message.value = '';
            this.refs.time.value = '';
        });
        e.preventDefault();
    }

    handleDeleteCommit(message) {
        this.props.deleteCommit(message, this.state.subject);
    }

    componentWillMount() {
        let paramId = this.props.match.params.id;
        let isSubjectItem = this.props.data.filter((sub) => {
            return sub.id === paramId;
        })[0];
        this.setState({
            subject: isSubjectItem
        }, () => {
            console.log('callback');
        });
    }


    render() {
        let quantity = this.renderCommitMessages(this.state.subject.commitMessages).length;
        let quantityTotal = this.state.subject.commitMessages.length;
        let showMore = this.renderCommitMessages(this.state.subject.commitMessages).length === this.state.subject.commitMessages.length ?
            '' :
            <span>Show more ({quantity} / {quantityTotal}) <i className="fa fa-caret-down" aria-hidden="true"></i></span>;
        return (
            <div className="SubjectStats">
                <div className="container">
                   <h1>{this.state.subject.title}</h1>
                    <form onSubmit={this.handleCommit.bind(this)}>
                        <input type="text" ref="message" placeholder="Message" required />
                        <input type="number" ref="time" placeholder="Hours" required />
                        <input type="submit" value="Add" className="button" />
                    </form>
                    <div className="SubjectStats-messages">
                        {this.renderCommitMessages(this.state.subject.commitMessages)}
                    </div>
                    <button className="SubjectStats-show-more" onClick={() => {this.showMoreCommits()}} >{showMore}</button>
                </div>
            </div>
        );
    }
}

export default SubjectStats;

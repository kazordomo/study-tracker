import React, { Component } from 'react';
import uuid from 'uuid';

function CommitMessage(props) {
    return (
        <div className="CommitMessage">
            <i className="fa fa-comment" aria-hidden="true"></i>
            <span className="CommitMessage-message">{props.value.message}</span>
            <span className="CommitMessage-time">{props.value.time}h</span>
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
            }
        }
    }

    renderCommitMessages(messages) {
        return (
            messages.map(message => {
                return (
                    <CommitMessage value={message} key={uuid.v4()} />
                )
            })
        )
    }

    handleCommit(e) {
        this.setState({
            commitMessage: {
                message: this.refs.message.value,
                time: this.refs.time.value
            }
        }, () => {
            console.log(this.state);
            this.props.addCommit(this.state.commitMessage);
        });
        e.preventDefault();
    }


    render() {
        //should not be redoing this.
        let paramId = this.props.match.params.id;
        let isSubjectItem = this.props.data.filter(function(sub){
            return sub.id === paramId;
        })[0];
        console.log(isSubjectItem);
        return (
            <div className="SubjectStats">
                <div className="container">
                   <h1>{isSubjectItem.title}</h1>
                    <form onSubmit={this.handleCommit.bind(this)}>
                        <input type="text" ref="message" placeholder="Message" />
                        <input type="number" ref="time" placeholder="Add hours" />
                        <input type="submit" value="Add" className="button" />
                    </form>
                    <div className="SubjectStats-messages">
                        {this.renderCommitMessages(isSubjectItem.commitMessages)}
                    </div>
                </div>
            </div>
        );
    }
}

export default SubjectStats;

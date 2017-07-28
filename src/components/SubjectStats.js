import React, { Component } from 'react';
import uuid from 'uuid';

function CommitMessage(props) {
    return (
        <div className="CommitMessage">
            {props.value}
            <i className="fa fa-comment-o" aria-hidden="true"></i>
        </div>
    )
}

class SubjectStats extends Component {
    renderCommitMessages(messages) {
        return (
            messages.map(message => {
                return (
                    <CommitMessage value={message} key={uuid.v4()} />
                )
            })
        )
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
                    <form>
                        <input type="text" placeholder="Message" />
                        <input type="number" placeholder="Add hours" />
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

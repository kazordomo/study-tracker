import React, { Component } from 'react';

class EditSubject extends Component {

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        const paramId = parseInt(this.props.match.params.id, 10);
        const isSubjectItem = this.props.data.filter(function(sub){
            return sub.id === paramId;
        })[0];
        console.log(isSubjectItem);
        return (
            <div className="EditSubject">
                <h1>EDIT SUBJECT</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" ref="title" placeholder="Title..." />
                    <input type="number" ref="hoursTodo" placeholder="Hours to do" />
                    <input type="checkbox" ref="inFocus" />
                    {/*<textarea></textarea>*/}
                    <input type="submit" value="Add" />
                </form>
                {isSubjectItem.title}
                {isSubjectItem.hoursTodo}
            </div>
        );
    }
}

export default EditSubject;
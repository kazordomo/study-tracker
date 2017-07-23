import React, { Component } from 'react';

class AddSubject extends Component {

    constructor() {
        super();
        this.state = {
            newSubject: {}
        }
    }

    handleSubmit(e) {
        if(this.refs.title.value === '') {
            alert('nope.');
        } else {
            this.setState({newProject: {
                title: this.refs.title.value,
                hoursDone: 0,
                hoursTodo: this.refs.hoursTodo.value,
                inFocus: this.refs.inFocus.value
            }}, () => {
                console.log(this.state);
                //this.props, we're passing' this mf'r up.
                this.props.addSubject(this.state.newProject);
            });
        }
        e.preventDefault();
    }

    render() {
        return (
            <div className="AddSubject">
                <h1>ADD SUBJECT</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" ref="title" placeholder="Title..." />
                    <input type="number" ref="hoursTodo" placeholder="Hours to do" />
                    <input type="checkbox" ref="inFocus" />
                    {/*<textarea></textarea>*/}
                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    }
}

export default AddSubject;
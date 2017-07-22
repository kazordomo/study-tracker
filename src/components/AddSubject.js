import React, { Component } from 'react';

//AddEditSubject.js
//we should try to use the same component for both add and edit.
//in add there should be no "add hours done", or whatever it will be called.

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
                hoursTodo: this.refs.hoursTodo.value,
                inFocus: this.refs.inFocus.value
            }}, () => {
                console.log(this.state);
                //this will pass up the values. this.props, we're passing' this mf'r up.
                //we will need to add the function in App and send the values to Overview.
                // this.props.addProject(this.state.newProject);
            });
        }
        e.preventDefault();
    }

    render() {
        return (
            <div className="AddSubject">
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
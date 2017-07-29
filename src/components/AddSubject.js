import React, { Component } from 'react';
import uuid from 'uuid';

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
            this.setState({newSubject: {
                id: uuid.v4(),
                title: this.refs.title.value,
                hoursDone: 0,
                hoursTodo: this.refs.hoursTodo.value,
                description: this.refs.description.value,
                inFocus: this.refs.inFocus.checked
            }}, () => {
                console.log(this.state);
                //this.props, we're passing' this mf'r up.
                this.props.addSubject(this.state.newSubject);
            });
        }
        e.preventDefault();
    }

    render() {
        return (
            <div className="AddSubject">
                <div className="container">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <div>Title</div>
                            <input type="text" ref="title" />
                        </div>
                        <div className="form-group">
                            <div>Hours to do</div>
                            <input type="number" ref="hoursTodo" placeholder="0" />
                        </div>
                        <div className="form-group">
                            <div>Description</div>
                            <textarea ref="description" rows="15"></textarea>
                        </div>
                        <div className="form-group">
                            <div>In Focus?</div>
                            <input type="checkbox" ref="inFocus" defaultChecked />
                        </div>
                        <input type="submit" className="button" value="Add" />
                    </form>
                </div>
            </div>
        );
    }
}

export default AddSubject;
import React, { Component } from 'react';

class AddSubject extends Component {

    constructor() {
        super();
        this.state = {
            newSubject: {}
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let formData = {
            title: this.refs.title.value,
            hoursDone: 0,
            hoursTodo: this.refs.hoursTodo.value,
            description: this.refs.description.value,
            inFocus: this.refs.inFocus.checked,
            commitMessages: []
        };

        fetch('api/addsubject', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((data) => {
            if(data.status === 200) {
                //send to main component to update state and rerender overview.
                this.props.addSubject(formData);
            }
            // else
        });
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
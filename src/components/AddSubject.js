import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from './Auth';

class AddSubject extends Component {

    constructor(   ) {
        super();
        this.state = {
            redirect: false
        }
    }

    //TODO: no id is added to subjects directly.
    handleSubmit(e) {
        e.preventDefault();

        let subjectData = {
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
                'Content-type': 'application/json',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(subjectData)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            //case of race condition?
            this.setState({redirect: true});
            this.props.addSubject(data);
        });
    }

    render() {

        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/overview'/>;
        }

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
                        <button className="button button-cancel">Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}

AddSubject.propTypes = {
    addSubject: PropTypes.func
};

export default AddSubject;

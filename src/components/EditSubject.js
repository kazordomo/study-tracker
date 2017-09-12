import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from './Auth';

class EditSubject extends Component {

    constructor() {
        super();
        this.state = {
            redirect: false,
            subject: {}
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let subjectData = {
            _id: this.state.subject._id,
            title: this.refs.title.value,
            hoursTodo: this.refs.hoursTodo.value,
            hoursDone: this.refs.hoursDone.value,
            inFocus: this.refs.inFocus.value,
            description: this.refs.description.value,
            commits: this.state.subject.commitMessages
        };

        fetch('/api/editsubject',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(subjectData)
        }).then((response) => {
            if(response.status === 200) {
                this.props.editSubject(subjectData);
                this.setState({redirect: true});
            }
        });
    }

    handleDelete(e) {
        e.preventDefault();
        fetch('/api/deletesubject',{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(this.state.subject)
        }).then((response) => {
            if(response.status === 200) {
                this.setState({redirect: true});
            }
        });
        this.props.deleteSubject(this.state.subject);
    }

    componentWillMount() {
        let paramId = this.props.match.params.id;
        let isSubjectItem = this.props.subjects.filter((sub) => {
            return sub._id === paramId;
        })[0];
        this.setState({subject: isSubjectItem});
    }

    render() {

        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/overview'/>;
        }

        return (
            <div className="EditSubject">
                <div className="container">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <div>Title</div>
                            <input type="text" ref="title" defaultValue={this.state.subject.title} />
                        </div>
                        <div className="form-group">
                            <div>Hours to do</div>
                            <input type="number" ref="hoursTodo" defaultValue={this.state.subject.hoursTodo} />
                        </div>
                        <div className="form-group">
                            <input type="hidden" ref="hoursDone" defaultValue={this.state.subject.hoursDone} />
                        </div>
                        <div className="form-group">
                            <div>Description</div>
                            <textarea rows="15" ref="description" defaultValue={this.state.subject.description} ></textarea>
                        </div>
                        <div className="form-group">
                            <div>In Focus?</div>
                            <input type="checkbox" ref="inFocus" defaultChecked={this.state.subject.inFocus} />
                        </div>
                        <input type="submit" className="button" value="Add" />
                        <button className="EditSubject-delete button" onClick={this.handleDelete.bind(this)}>Delete</button>
                    </form>
                </div>
            </div>
        );
    }
}

EditSubject.propTypes = {
    data: PropTypes.array,
    editSubject: PropTypes.func,
    deleteSubject: PropTypes.func
};

export default EditSubject;
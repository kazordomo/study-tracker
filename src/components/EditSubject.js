import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from './Auth';
import { Link } from 'react-router-dom';

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
            infinity: this.refs.infinity.checked,
            inFocus: this.refs.inFocus.checked,
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

    openCloseDeleteModal(e) {
        e.preventDefault();
        const openModal = document.getElementsByClassName('EditSubject-delete-modal')[0];
        const fade = document.getElementsByClassName('EditSubject-fade-background')[0];
        if(openModal.style.display === 'block') {
            openModal.style.display = 'none';
            fade.style.display = 'none';
        } else {
            openModal.style.display = 'block';
            fade.style.display = 'block';
        }
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
                    <div className="EditSubject-fade-background"></div>
                    <div className="EditSubject-delete-modal">
                        <div className="title">Delete subject?</div>
                        <div className="button-wrapper">
                            <button className="button-cancel button" onClick={this.openCloseDeleteModal.bind(this)}>Cancel</button>
                            <button className="EditSubject-delete button" onClick={this.handleDelete.bind(this)}>Delete</button>
                        </div>
                    </div>
                    <div className="go-back">
                        <Link to='/overview'><i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
                    </div>
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
                            <div>Infinity</div>
                            <input type="checkbox" ref="infinity" className="switch" defaultChecked={this.state.subject.infinity} />
                        </div>
                        <div className="form-group">
                            <div>Description</div>
                            <textarea rows="15" ref="description" defaultValue={this.state.subject.description} ></textarea>
                        </div>
                        <div className="form-group">
                            <div>In Focus?</div>
                            <input type="checkbox" ref="inFocus" className="switch" defaultChecked={this.state.subject.inFocus} />
                        </div>
                        <div className="button-wrapper">
                            <input type="submit" className="button" value="Edit" />
                            <button className="EditSubject-delete button" onClick={this.openCloseDeleteModal.bind(this)}>Delete</button>
                        </div>
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
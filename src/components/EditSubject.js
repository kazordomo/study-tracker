import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from './Auth';

class EditSubject extends Component {

    //should prob not need a constructor here.
    constructor() {
        super();
        this.state = {
            redirect: false,
            subject: {}
        }
    }

    handleSubmit(e) {
        this.setState({subject: {
            _id: this.props.match.params.id,
            title: this.refs.title.value,
            hoursTodo: this.refs.hoursTodo.value,
            hoursDone: this.refs.hoursDone.value,
            inFocus: this.refs.inFocus.value,
            description: this.refs.description.value
        }}, () => {
            this.props.editSubject(this.state.subject);
        });
        e.preventDefault();
    }

    //ERROR
    //TODO: fix the redirect.
    handleDelete(e) {
        e.preventDefault();
        console.log(this.props);
        fetch('/api/deletesubject',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(this.state.subject)
        }).then((data) => {
            if(data.status === 200) {
                this.setState({redirect: true});
            }
        });
        this.props.deleteSubject(this.state.subject);
    }

    componentWillMount() {
        let paramId = this.props.match.params.id;
        let isSubjectItem = this.props.data.filter((sub) => {
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

export default EditSubject;
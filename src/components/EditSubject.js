import React, { Component } from 'react';

class EditSubject extends Component {

    //should prob not need a constructor here.
    constructor() {
        super();
        this.state = {
            updateSubject: {}
        }
    }

    handleSubmit(e) {
        this.setState({updateSubject: {
            id: this.props.match.params.id,
            title: this.refs.title.value,
            hoursDone: this.refs.hoursDone.value,
            hoursTodo: this.refs.hoursTodo.value,
            inFocus: this.refs.inFocus.value,
            description: this.refs.description.value
        }}, () => {
            this.props.editSubject(this.state.updateSubject);
        });
        e.preventDefault();
    }

    componentWillMount() {
        let paramId = this.props.match.params.id;
        let isSubjectItem = this.props.data.filter((sub) => {
            return sub.id === paramId;
        })[0];
        console.log(isSubjectItem);
        this.setState({updateSubject: isSubjectItem});
    }

    render() {
        return (
            <div className="EditSubject">
                <div className="container">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <div>Title</div>
                            <input type="text" ref="title" defaultValue={this.state.updateSubject.title} />
                        </div>
                        <div className="form-group">
                            <div>Hours todo</div>
                            <input type="number" ref="hoursTodo" defaultValue={this.state.updateSubject.hoursTodo} />
                        </div>
                        <div className="form-group">
                            <div>Hours done</div>
                            <input type="number" ref="hoursDone" defaultValue={this.state.updateSubject.hoursDone} />
                        </div>
                        <div className="form-group">
                            <div>Description</div>
                            <textarea rows="15" ref="description" defaultValue={this.state.updateSubject.description} ></textarea>
                        </div>
                        <div className="form-group">
                            <div>In Focus?</div>
                            <input type="checkbox" ref="inFocus" defaultChecked={this.state.updateSubject.inFocus} />
                        </div>
                        <input type="submit" className="button" value="Add" />
                    </form>
                </div>
            </div>
        );
    }
}

export default EditSubject;
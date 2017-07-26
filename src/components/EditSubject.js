import React, { Component } from 'react';

class EditSubject extends Component {

    //should prob not need a constructor here.
    constructor() {
        super();
        this.state = {
            updatedSubject: {}
        }
    }

    handleSubmit(e) {
        this.setState({updatedSubject: {
            id: this.props.match.params.id,
            title: this.refs.title.value,
            hoursDone: this.refs.hoursDone.value,
            hoursTodo: this.refs.hoursTodo.value,
            inFocus: this.refs.inFocus.value
        }}, () => {
            this.props.editSubject(this.state.updatedSubject);
        });
        e.preventDefault();
    }

    // componentWillUpdate
    componentDidMount() {
        console.log(this.props.data);
        // this.refs.title = isSubjectItem.title;
    }

    render() {
        const paramId = this.props.match.params.id;
        const isSubjectItem = this.props.data.filter(function(sub){
            return sub.id === paramId;
        })[0];
        return (
            <div className="EditSubject">
                <div className="container">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <div>Title</div>
                            <input type="text" ref="title" />
                        </div>
                        <div className="form-group">
                            <div>Hours todo</div>
                            <input type="number" ref="hoursTodo" />
                        </div>
                        <div className="form-group">
                            <div>Hours done</div>
                            <input type="number" ref="hoursDone" />
                        </div>
                        <div className="form-group">
                            <div>Description</div>
                            <textarea rows="15"></textarea>
                        </div>
                        <div className="form-group">
                            <div>In Focus?</div>
                            <input type="checkbox" ref="inFocus" />
                        </div>
                        <input type="submit" className="button" value="Add" />
                    </form>
                    {isSubjectItem.title}
                    {isSubjectItem.hoursTodo}
                </div>
            </div>
        );
    }
}

export default EditSubject;
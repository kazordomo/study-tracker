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
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" ref="title" placeholder="Title..." />
                    <input type="number" ref="hoursTodo" placeholder="Hours to do" />
                    <input type="number" ref="hoursDone" placeholder="Hours Done" />
                    <input type="checkbox" ref="inFocus" />
                    {/*<textarea></textarea>*/}
                    <input type="submit" value="Add" />
                </form>
                {isSubjectItem.title}
                {isSubjectItem.hoursTodo}
            </div>
        );
    }
}

export default EditSubject;
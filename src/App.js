import React, { Component } from 'react';
import Home from './components/Home';
import Register from './components/Register';
import Overview from './components/Overview';
import AddSubject from './components/AddSubject';
import EditSubject from './components/EditSubject';
import SubjectStats from './components/SubjectStats';
import Profile from './components/Profile';
import { Switch, Route, Link } from 'react-router-dom'
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            subjects: []
        }
    }

    getJSON(response) {
        return response.json();
    }

    componentDidMount() {
        //TODO: should catch error if the request is bad
        return (
            fetch('api/subjects')
                .then(this.getJSON)
                .then((data) => {
                    this.setState({
                        subjects: data.doc
                    });
                })
        )
    }

    handleAddSubject(subject) {
        let subjects = this.state.subjects;
        //TODO: commitMessages should prob be its own schema. adding it empty here does not make that much sense...
        //default commit, subject started. timestamp should be added and id should be set differently.
        subject.commitMessages = [{
            'id': '1',
            'message': 'Subject created',
            'time': 0
        }];
        subjects.push(subject);
        this.setState({subjects: subjects}, () => {
            console.log(this.state.subjects);
        });
    }

    handleEditSubject(subject) {
        let subjects = this.state.subjects;
        //please remove tha for loop.
        for(let i = 0; i < subjects.length; i++) {
            if(subjects[i]._id === subject._id) {
                let cm = subjects[i].commitMessages;
                subjects[i] = subject;
                //bad bad bad bad
                subjects[i].commitMessages = cm;
                return;
            }
        }
        this.setState({subjects: subjects});
    }

    handleDeleteSubject(subject) {
        let subjects = this.state.subjects;
        let isSubjectItem = subjects.filter((sub) => {
            return sub._id === subject._id;
        })[0];
        subjects.splice(subjects.indexOf(isSubjectItem), 1);
        this.setState({subjects: subjects});
    }

    //add commit message and time
    handleAddCommit(commit, subject) {
        let subjects = this.state.subjects;
        subject.hoursDone += parseInt(commit.time, 10);
        subject.commitMessages.push(commit);
        this.setState({subjects: subjects});
    }

    //send in commit as well.
    handleDeleteCommit(subject) {
        let subjects = this.state.subjects;
        // let commitMessage = subject.commitMessages.filter((com) => {
        //     return com.id === commit.id;
        // })[0];
        //because hoursDone is its on field we need to calculate the time from the deleted commit manually.
        // subject.hoursDone -= parseInt(commit.time, 10);
        // subject.commitMessages.splice(subject.commitMessages.indexOf(commitMessage), 1);
        this.setState({subjects: subjects});
    }

    render() {
        // loggedIn ? (
        //     <Redirect to="/dashboard"/>
        // )

        return (
            <div>
                <Header />
                <main>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/register' component={Register} />
                        <Route path='/overview' component={() => (<Overview subjects={this.state.subjects} />)} />
                        <Route path='/addsubject' component={() => (<AddSubject addSubject={this.handleAddSubject.bind(this)} />)} />
                        <Route path='/editsubject/:id' render={(props) => <EditSubject {...props} data={this.state.subjects} editSubject={this.handleEditSubject.bind(this)} deleteSubject={this.handleDeleteSubject.bind(this)} />} />
                        <Route path='/subjectStats/:id' render={(props) => <SubjectStats {...props} data={this.state.subjects} addCommit={this.handleAddCommit.bind(this)} deleteCommit={this.handleDeleteCommit.bind(this)} />} />
                        <Route path='/profile' component={Profile} />
                    </Switch>
                </main>
                <Footer />
            </div>
        );
    }
}

//Links component
const Header = () => (
    <header>
        <Link to="/"><span className="Header-logo">ST</span></Link>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/register'>Login/Register</Link></li>
                <li><Link to='/overview'>Overview</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
            </ul>
        </nav>
    </header>
);

const Footer = () => (
    <footer>
        <p>Kazordomo productions <span className="Footer-cr">&copy;</span></p>
    </footer>
);

export default App;

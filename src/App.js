import React, { Component } from 'react';
import Home from './components/Home';
import Register from './components/Register';
import Subjects from './components/Subjects';
import AddSubject from './components/AddSubject';
import EditSubject from './components/EditSubject';
import Commits from './components/Commits';
import Profile from './components/Profile';
import { Switch, Route, Link } from 'react-router-dom'
import Auth from './components/Auth';
import './App.css';

class App extends Component {

    //TODO: If we only fetch when we are auth, the page need to be reloaded for the subjects to render.
    //TODO: You should only be able to access for instance Subjects if you are logged in.

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
        if(Auth.getToken()) {
            let headers = new Headers();
            headers.append('Authorization', `bearer ${Auth.getToken()}`);
            let fetchInit = {
                method: 'GET',
                headers: headers
            };

            return (
                fetch('api/subjects', fetchInit)
                    .then(this.getJSON)
                    .then((data) => {
                        this.setState({
                            subjects: data.doc
                        }, () => {

                        });
                    })
            )
        }
    }

    handleAddSubject(subject) {
        let subjects = this.state.subjects;
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
        this.setState({subjects: subjects});
    }

    //send in commit as well.
    handleDeleteCommit(data) {
        let subjects = this.state.subjects;
        data.subject.hoursDone -= parseInt(data.message.time, 10);
        this.setState({subjects: subjects});
    }

    render() {
        return (
            <div>
                <Header />
                <main>
                    <Switch>
                        {/*'/' should go to overview if the user is authorized/has a token */}
                        <Route exact path='/' component={Home} />
                        <Route path='/register' component={Register} />
                        <Route path='/overview' component={() => (<Subjects subjects={this.state.subjects} />)} />
                        <Route path='/addsubject' component={() => (<AddSubject addSubject={this.handleAddSubject.bind(this)} />)} />
                        <Route path='/editsubject/:id' render={(props) => <EditSubject {...props} data={this.state.subjects} editSubject={this.handleEditSubject.bind(this)} deleteSubject={this.handleDeleteSubject.bind(this)} />} />
                        <Route path='/commits/:id' render={(props) => <Commits {...props} data={this.state.subjects} addCommit={this.handleAddCommit.bind(this)} deleteCommit={this.handleDeleteCommit.bind(this)} />} />
                        <Route path='/profile' component={Profile} />
                        <Route path="*" component={NotFound} />
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
                <li><Link to='/overview'>Subjects</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/' onClick={() => {Auth.removeToken()}}>Logout</Link></li>
            </ul>
        </nav>
    </header>
);

const Footer = () => (
    <footer>
        <p>Kazordomo productions <span className="Footer-cr">&copy;</span></p>
    </footer>
);

const NotFound = () => {
    return (
        <div className="NotFound">
            <h1>NOT FOUND</h1>
        </div>
    )
};

export default App;

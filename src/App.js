import React, { Component } from 'react';
import Home from './components/Home';
import Register from './components/Register';
import Subjects from './components/Subjects';
import AddSubject from './components/AddSubject';
import EditSubject from './components/EditSubject';
import Commits from './components/Commits';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Auth from './components/Auth';
import './App.css';

class App extends Component {

    //TODO: If we only fetch when we are auth, the page need to be reloaded for the subjects to render.
    //TODO: You should only be able to access for instance Subjects if you are logged in.

    constructor(props) {
        super(props);
        this.state = {
            subjects: []
        }
    }

    getJSON(response) {
        return response.json();
    }

    getSubjects() {
        if(Auth.isUserAuthenticated()) {
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
                        });
                    })
            )
        }
    }

    handleAddSubject(subject) {
        let subjects = this.state.subjects;
        subjects.push(subject);
        this.setState({subjects: subjects});
    }

    handleEditSubject(subject) {
        let subjects = this.state.subjects;
        for(let i = 0; i < subjects.length; i++) {
            if(subjects[i]._id === subject._id) {
                let cm = subjects[i].commitMessages;
                subjects[i] = subject;
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

    handleAddCommit(commit, subject) {
        let subjects = this.state.subjects;
        let isSubjectItem = subjects.filter((sub) => {
            return sub._id === subject._id;
        })[0];
        isSubjectItem.hoursDone += parseInt(commit.time, 10);
        isSubjectItem.lastUpdated = subject.lastUpdated;
        this.setState({subjects: subjects});
    }

    handleDeleteCommit(data) {
        let subjects = this.state.subjects;
        data.subject.hoursDone -= parseInt(data.message.time, 10);
        this.setState({subjects: subjects});
    }

    //"Creative" (or bad, your choice) async solution to, for instance, send subjects as props to overview.
    fetchSubjectThenRedirect() {
        this.getSubjects().then(() => {
            return <Redirect to='/overview'/>;
        });
    }

    componentDidMount() {
        this.getSubjects();
    }

    render() {

        //TODO: Fix the private route to work with routes with parameters.
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={props => (
                Auth.isUserAuthenticated() ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: '/register',
                        state: { from: props.location }
                    }}/>
                )
            )}/>
        );

        const HasTokenRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={props => (
                Auth.isUserAuthenticated() ? (
                    <Redirect to={{
                        pathname: '/overview',
                        state: { from: props.location }
                    }}/>
                ) : (
                    <Component {...props}/>
                )
            )}/>
        );

        return (
            <div>
                <Header />
                <main>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <HasTokenRoute path='/register' component={() => (<Register handleLogin={this.fetchSubjectThenRedirect.bind(this)} /> )} />
                        <PrivateRoute path='/overview' component={() => (<Subjects subjects={this.state.subjects} />)} />
                        {/*<Route path='/overview' render={(props) => (<Subjects {...props} subjects={this.state.subjects} />)} />*/}
                        <PrivateRoute path='/addsubject' component={() => (<AddSubject addSubject={this.handleAddSubject.bind(this)} />)} />
                        <Route path='/editsubject/:id' render={(props) => <EditSubject {...props} subjects={this.state.subjects} editSubject={this.handleEditSubject.bind(this)} deleteSubject={this.handleDeleteSubject.bind(this)} />} />
                        <Route path='/commits/:id' render={(props) => <Commits {...props} commits={this.state.subjects} addCommit={this.handleAddCommit.bind(this)} deleteCommit={this.handleDeleteCommit.bind(this)} />} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </main>
                <Footer />
            </div>
        );
    }
}

const Header = () => (
    <header>
        <Link to="/"><span className="Header-logo">ST</span></Link>
        <nav>
            <ul>
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

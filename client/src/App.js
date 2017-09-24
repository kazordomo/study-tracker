import React, { Component } from 'react';
import Home from './components/Home';
import Register from './components/Register';
import Subjects from './components/Subjects';
import AddSubject from './components/AddSubject';
import EditSubject from './components/EditSubject';
import Commits from './components/Commits';
import Auth from './components/Auth';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import './App.css';

//TODO: error-handling have not been implemented through out the app.

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            isFetched: false
        }
    }

    getSubjects() {
        if(Auth.isUserAuthenticated()) {
            return (
                fetch('api/subjects', {
                    method: 'get',
                    headers: {
                        'Authorization': `bearer ${Auth.getToken()}`
                    }
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.setState({
                        subjects: data.doc,
                        isFetched: true
                    });
                })
            )
        }
    }

    getItem(arr, item) {
        return arr.filter((i) => {
            return i._id === item._id;
        })[0];
    }

    //PROP FUNCTIONS
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
        let isSubjectItem = this.getItem(subjects, subject);
        subjects.splice(subjects.indexOf(isSubjectItem), 1);
        this.setState({subjects: subjects});
    }

    handleAddCommit(commit, subject) {
        let subjects = this.state.subjects;
        let isSubjectItem = this.getItem(subjects, subject);
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

    //MOUNT
    componentWillMount() {
        this.getSubjects();
    }

    render() {

        //CUSTOM ROUTES
        //routes only avaible if login
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

        //redirect to overview if auth-token
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
            this.state.isFetched || !Auth.isUserAuthenticated() ?
                <div>
                    <Header />
                    <main>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <HasTokenRoute path='/register' component={() => (<Register handleLogin={this.fetchSubjectThenRedirect.bind(this)} /> )} />
                            <PrivateRoute path='/overview' component={() => (<Subjects subjects={this.state.subjects} />)} />
                            <PrivateRoute path='/addsubject' component={() => (<AddSubject addSubject={this.handleAddSubject.bind(this)} />)} />
                            <PrivateRoute path='/editsubject/:id' component={(props) => <EditSubject {...props} subjects={this.state.subjects} editSubject={this.handleEditSubject.bind(this)} deleteSubject={this.handleDeleteSubject.bind(this)} />} />
                            <PrivateRoute path='/commits/:id' component={(props) => <Commits {...props} commits={this.state.subjects} addCommit={this.handleAddCommit.bind(this)} deleteCommit={this.handleDeleteCommit.bind(this)} />} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </main>
                    <Footer />
                </div> :
                <Route path="*" component={Loader} />
        );
    }
}

//INLINE COMPS/ELEMENTS
const Header = () => {
    let logout = Auth.isUserAuthenticated() ? <nav><ul><li><Link to ='/' onClick={()=>{Auth.removeToken()}}>Logout</Link></li></ul></nav> : '';
    return (
        <header>
            <Link to="/"><span className="Header-logo">ST</span></Link>
            {logout}
        </header>
    )
};

const Footer = () => (
    <footer>
        <p>Kazordomo productions <span className="Footer-cr">&copy;</span></p>
    </footer>
);

const Loader = () => (
    <div className="Loader-container">
        <div className="Loader-symbol"></div>
    </div>
);

const NotFound = () => {
    return (
        <div className="NotFound">
            <h1>PAGE NOT FOUND</h1>
        </div>
    )
};

export default App;

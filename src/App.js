import React, { Component } from 'react';
import Home from './components/Home';
import Register from './components/Register';
import Overview from './components/Overview';
import AddSubject from './components/AddSubject';
import EditSubject from './components/EditSubject';
import SubjectStats from './components/SubjectStats';
import { Switch, Route, Link } from 'react-router-dom'
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            subjects: [],
            test: [
                {
                    id: '2',
                    title: 'SQL',
                    hoursDone: 10,
                    hoursTodo: 15,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: true,
                    commitMessages: [
                        {
                            message: 'yeees duuude',
                            time: 2,
                            timestamp: new Date(17, 7, 28)
                        },
                        {
                            message: 'hulabaluba',
                            time: 1,
                            timestamp: new Date(17, 7, 27)
                        },
                        {
                            message: 'ooh yes',
                            time: 4,
                            timestamp: new Date(17, 7, 29)
                        }
                    ]
                },
                {
                    id: '3',
                    title: 'mongoDB',
                    hoursDone: 10,
                    hoursTodo: 25,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: true,
                    commitMessages: [
                        {
                            message: 'yeees duuude',
                            time: 2,
                            timestamp: new Date(17, 7, 28)
                        },
                        {
                            message: 'hulabaluba',
                            time: 1,
                            timestamp: new Date(17, 7, 27)
                        },
                        {
                            message: 'ooh yes',
                            time: 4,
                            timestamp: new Date(17, 7, 29)
                        }
                    ]
                },
                {
                    id: '4',
                    title: 'React',
                    hoursDone: 20,
                    hoursTodo: 25,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: true,
                    commitMessages: [
                        {
                            message: 'yeees duuude',
                            time: 2,
                            timestamp: new Date(17, 7, 28)
                        },
                        {
                            message: 'hulabaluba',
                            time: 1,
                            timestamp: new Date(17, 7, 27)
                        },
                        {
                            message: 'ooh yes',
                            time: 4,
                            timestamp: new Date(17, 7, 29)
                        }
                    ]
                },
                {
                    id: '5',
                    title: 'Barbara OS',
                    hoursDone: 10,
                    hoursTodo: 20,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: false,
                    commitMessages: [
                        {
                            message: 'yeees duuude',
                            time: 2,
                            timestamp: new Date(17, 7, 28)
                        },
                        {
                            message: 'hulabaluba',
                            time: 1,
                            timestamp: new Date(17, 7, 27)
                        },
                        {
                            message: 'ooh yes',
                            time: 4,
                            timestamp: new Date(17, 7, 29)
                        }
                    ]
                },
                {
                    id: '1',
                    title: 'Windows OS',
                    hoursDone: 12,
                    hoursTodo: 20,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: true,
                    commitMessages: [
                        {
                            id: '1',
                            message: 'yeees duuude',
                            time: 2,
                            timestamp: new Date(17, 7, 28)
                        },
                        {
                            id: '2',
                            message: 'hulabaluba',
                            time: 1,
                            timestamp: new Date(17, 7, 27)
                        },
                        {
                            id: '3',
                            message: 'ooh yes',
                            time: 4,
                            timestamp: new Date(17, 7, 29)
                        },
                        {
                            id: '4',
                            message: 'yeees duuude',
                            time: 2,
                            timestamp: new Date(17, 7, 28)
                        },
                        {
                            id: '5',
                            message: 'hulabaluba',
                            time: 1,
                            timestamp: new Date(17, 7, 27)
                        },
                        {
                            id: '6',
                            message: 'ooh yes',
                            time: 4,
                            timestamp: new Date(17, 7, 29)
                        },
                        {
                            id: '7',
                            message: 'yeees duuude',
                            time: 2,
                            timestamp: new Date(17, 7, 28)
                        },
                        {
                            id: '8',
                            message: 'hulabaluba',
                            time: 1,
                            timestamp: new Date(17, 7, 27)
                        },
                        {
                            id: '9',
                            message: 'ooh yes',
                            time: 4,
                            timestamp: new Date(17, 7, 29)
                        },
                        {
                            id: '10',
                            message: 'yeees duuude',
                            time: 2,
                            timestamp: new Date(17, 7, 28)
                        },
                        {
                            id: '11',
                            message: 'hulabaluba',
                            time: 1,
                            timestamp: new Date(17, 7, 27)
                        },
                        {
                            id: '12',
                            message: 'ooh yes',
                            time: 4,
                            timestamp: new Date(17, 7, 29)
                        },
                        {
                            id: '13',
                            message: 'yeees duuude',
                            time: 2,
                            timestamp: new Date(17, 7, 28)
                        },
                        {
                            id: '14',
                            message: 'hulabaluba',
                            time: 1,
                            timestamp: new Date(17, 7, 27)
                        },
                        {
                            id: '15',
                            message: 'ooh yes',
                            time: 4,
                            timestamp: new Date(17, 7, 29)
                        },
                        {
                            id: '16',
                            message: 'yeees duuude',
                            time: 2,
                            timestamp: new Date(17, 7, 28)
                        },
                        {
                            id: '17',
                            message: 'hulabaluba',
                            time: 1,
                            timestamp: new Date(17, 7, 27)
                        },
                        {
                            id: '18',
                            message: 'ooh yes',
                            time: 4,
                            timestamp: new Date(17, 7, 29)
                        }
                    ]
                },
                {
                    id: '6',
                    title: 'Mac OS',
                    hoursDone: 20,
                    hoursTodo: 20,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: true,
                    commitMessages: [
                        {
                            message: 'yeees duuude',
                            time: 2,
                            timestamp: new Date(17, 7, 28)
                        },
                        {
                            message: 'hulabaluba',
                            time: 1,
                            timestamp: new Date(17, 7, 27)
                        },
                        {
                            message: 'ooh yes',
                            time: 4,
                            timestamp: new Date(17, 7, 29)
                        }
                    ]
                },
                {
                    id: '7',
                    title: 'Linux OS',
                    hoursDone: 10,
                    hoursTodo: 20,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: true,
                    commitMessages: [
                        {
                            message: 'yeees duuude',
                            time: 2,
                            timestamp: new Date(17, 7, 28)
                        },
                        {
                            message: 'hulabaluba',
                            time: 1,
                            timestamp: new Date(17, 7, 27)
                        },
                        {
                            message: 'ooh yes',
                            time: 4,
                            timestamp: new Date(17, 7, 29)
                        }
                    ]
                },
                {
                    id: '8',
                    title: 'Hidden OS',
                    hoursDone: 10,
                    hoursTodo: 20,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: false,
                    commitMessages: [
                        {
                            message: 'yeees duuude',
                            time: 2,
                            timestamp: new Date(17, 7, 28)
                        },
                        {
                            message: 'hulabaluba',
                            time: 1,
                            timestamp: new Date(17, 7, 27)
                        },
                        {
                            message: 'ooh yes',
                            time: 4,
                            timestamp: new Date(17, 7, 29)
                        }
                    ]
                }
            ]
        }
    }

    componentDidMount() {
        return fetch('/api/subjects')
            .then(response => response.json())
            .then(subjects => this.setState({subjects}));
    }

    handleAddSubject(subject) {
        console.log(this.state.test);
        let subjects = this.state.subjects;
        //TODO: commitMessages should prop be its own schema. adding it empty here does not make that much sense...
        //to prevent error in SubjectStats
        subject.commitMessages = [];
        subjects.push(subject);
        this.setState({subjects: subjects});
    }

    handleEditSubject(subject) {
        let subjects = this.state.subjects;
        //please remove tha for loop.
        for(let i = 0; i < subjects.length; i++) {
            console.log(subjects[i].id, subject.id);
            if(subjects[i].id === subject.id) {
                subjects[i] = {title: subject.title, hoursTodo: subject.hoursTodo, hoursDone: subject.hoursDone, inFocus: subject.inFocus, description: subject.description};
                return;
            }
        }
        this.setState(subjects);
    }

    //add commit message and time
    handleAddCommit(commit, subject) {
        let subjects = this.state.subjects;
        //TODO: delete all of the hardcoded IDs
        commit.id = '19';
        subject.hoursDone += parseInt(commit.time, 10);
        subject.commitMessages.push(commit);
        this.setState({subjects: subjects});
    }

    handleDeleteCommit(commit, subject) {
        let subjects = this.state.subjects;
        let commitMessage = subject.commitMessages.filter((com) => {
            return com.id === commit.id;
        })[0];
        //because hoursDone is its on field we need to calculate the time from the deleted commit manually.
        subject.hoursDone -= parseInt(commit.time, 10);
        subject.commitMessages.splice(subject.commitMessages.indexOf(commitMessage), 1);
        this.setState({subjects: subjects});
    }

    render() {
        return (
            <div>
                <Header />
                <main>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/register' component={Register} />
                        <Route path='/overview' component={() => (<Overview subjects={this.state.subjects} />)} />
                        <Route path='/addsubject' component={() => (<AddSubject addSubject={this.handleAddSubject.bind(this)} />)} />
                        <Route path='/editsubject/:id' render={(props) => <EditSubject {...props} data={this.state.subjects} editSubject={this.handleEditSubject.bind(this)} />} />
                        <Route path='/subjectStats/:id' render={(props) => <SubjectStats {...props} data={this.state.subjects} addCommit={this.handleAddCommit.bind(this)} deleteCommit={this.handleDeleteCommit.bind(this)} />} />
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

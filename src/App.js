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
            subjects: [
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
                        },
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
                        },
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
                        },
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
                        },
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
                        },
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

    handleAddSubject(subject) {
        let subjects = this.state.subjects;
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
        subject.hoursDone += parseInt(commit.time, 10);
        subject.commitMessages.push(commit);
        this.setState({subjects: subjects});
    }

    handleDeleteCommit(commit, subject) {
        //we should make hoursDone so that it takes all the commit hours.
        // let subjects = this.state.subjects;
        // subject.hoursDone += parseInt(commit.time, 10);
        // subject.commitMessages.push(commit);
        // this.setState({subjects: subjects});
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
                        <Route path='/subjectStats/:id' render={(props) => <SubjectStats {...props} data={this.state.subjects} addCommit={this.handleAddCommit.bind(this)} />} />
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

import React, { Component } from 'react';
import uuid from 'uuid';
import Home from './components/Home';
import Register from './components/Register';
import Overview from './components/Overview';
import AddSubject from './components/AddSubject';
import EditSubject from './components/EditSubject';
import { Switch, Route, Link } from 'react-router-dom'
import './App.css';

//TODO: refactor the code and put the logic in the same place.
//TODO: we should render the rest of the app in here.

class App extends Component {

    constructor() {
        super();
        this.state = {
            subjects: [
                {
                    id: uuid.v4(),
                    title: 'SQL',
                    hoursDone: 10,
                    hoursTodo: 15,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: true
                },
                {
                    id: uuid.v4(),
                    title: 'mongoDB',
                    hoursDone: 10,
                    hoursTodo: 25,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: true
                },
                {
                    id: uuid.v4(),
                    title: 'React',
                    hoursDone: 20,
                    hoursTodo: 25,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: true
                },
                {
                    id: uuid.v4(),
                    title: 'Barbara OS',
                    hoursDone: 10,
                    hoursTodo: 20,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: false
                },
                {
                    id: uuid.v4(),
                    title: 'Windows OS',
                    hoursDone: 10,
                    hoursTodo: 20,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: true
                },
                {
                    id: uuid.v4(),
                    title: 'Mac OS',
                    hoursDone: 10,
                    hoursTodo: 20,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: true
                },
                {
                    id: uuid.v4(),
                    title: 'Linux OS',
                    hoursDone: 10,
                    hoursTodo: 20,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: true
                },
                {
                    id: uuid.v4(),
                    title: 'Hidden OS',
                    hoursDone: 10,
                    hoursTodo: 20,
                    description: 'Lorem ipsum dorem ipsum hipsum bitsum lara kara vara bara nille snahala',
                    inFocus: false
                }
            ]
        }
    }

    //we should be able to reuse the addSubject as updateSubject as well.
    handleAddSubject(subject) {
        let subjects = this.state.subjects;
        subjects.push(subject);
        this.setState({subjects: subjects});
        console.log(this.state.subjects);
    }

    handleEditSubject(subject) {
        let subjects = this.state.subjects;
        //please remove tha for loop.
        for(let i = 0; i < subjects.length; i++) {
            console.log(subjects[i].id, subject.id);
            if(subjects[i].id === subject.id) {
                subjects[i] = {title: subject.title, hoursTodo: subject.hoursTodo, hoursDone: subject.hoursDone, inFocus: subject.inFocus};
                return;
            }
        }
        this.setState(subjects);
    }

    //learn the right way to send props within the router.
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
                        {/*<Route path='/editsubject/:id' component={() => (<EditSubject subjects={this.state.subjects} />)} />*/}
                    </Switch>
                </main>
            </div>
        );
    }
}

//Links component
const Header = () => (
    <header>
        <Link to="/"><span>ST</span></Link>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/register'>Login/Register</Link></li>
                <li><Link to='/overview'>Overview</Link></li>
            </ul>
        </nav>
    </header>
);

export default App;

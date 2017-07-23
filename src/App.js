import React, { Component } from 'react';
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
                    id: 1,
                    title: 'SQL',
                    hoursDone: 10,
                    hoursTodo: 15,
                    inFocus: true
                },
                {
                    id: 2,
                    title: 'mongoDB',
                    hoursDone: 10,
                    hoursTodo: 25,
                    inFocus: true
                }
            ]
        }
    }

    handleAddSubject(subject) {
        let subjects = this.state.subjects;
        subjects.push(subject);
        this.setState({subjects: subjects});
        console.log(this.state.subjects);
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
                        <Route path='/editsubject/:id' render={(props) => <EditSubject {...props} data={this.state.subjects} />} />
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

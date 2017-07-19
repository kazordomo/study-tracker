import React, { Component } from 'react';
import Home from './components/Home';
import Register from './components/Register';
import Overview from './components/Overview';
import AddSubject from './components/AddSubject';
import { Switch, Route, Link } from 'react-router-dom'
import './App.css';

//The main app should stay in this component.
//TODO: refactor the code and put the logic in the same place.

//Use for state
class App extends Component {

    render() {
        return (
            <div>
                <Header />
                <Main />
            </div>
        );
    }
}



//TODO: add a render-function that makes it possible to pass the handleAddProject func.
//TODO: <Route exact path="/addsubject" render={AddSubject} />
// handleAddProject(project) {
//     let subjects = this.state.subjects;
//     subjects.push(subject);
//     //update the project-array
//     this.setState({subjects: subjects});
// }
// const AddSubject = (props) => {
//     return (
//
//     )
// }

//Links component
const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/register'>Login/Register</Link></li>
                <li><Link to='/overview'>Overview</Link></li>
                <li><Link to='/addsubject'>Add Subject</Link></li>
            </ul>
        </nav>
    </header>
);

//Router component.
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/register' component={Register} />
            <Route path='/overview' component={Overview}  />
            <Route path='/addsubject' component={AddSubject} />
        </Switch>
    </main>
);

export default App;

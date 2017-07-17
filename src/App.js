import React, { Component } from 'react';
import Register from './components/Register';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <Register />
      </div>
    );
  }
}

export default App;

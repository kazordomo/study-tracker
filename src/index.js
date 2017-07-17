import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import App from './App';

// const Main = () => (
//     <main>
//         <Switch>
//             <Route exact path='/' component={Home}/>
//             <Route path='/roster' component={Roster}/>
//             <Route path='/schedule' component={Schedule}/>
//         </Switch>
//     </main>
// )

ReactDOM.render(<App />, document.getElementById('root'));

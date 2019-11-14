import React, { Component } from 'react';
// eslint-disable-next-line
import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/home';
import Recommendations from './pages/recommendations';

import './App.css';



class App extends Component {
    render() {
        return (
            <Router basename="/react-auth-ui/">
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/recommendations" component={Recommendations}></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
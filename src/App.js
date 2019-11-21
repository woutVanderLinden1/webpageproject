import React, { Component } from 'react';
// eslint-disable-next-line
import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/home';
import Recommendations from './pages/recommendations';

import './App.css';
import Profile from "./pages/profile";



class App extends Component {

    sendmessage(message){
        this.socket.send(message);
    }

    startwebsocket(){
        this.socket=new WebSocket("ws://localhost:9000");

        let payload={
            action: "initialise"
        }
        this.socket.onopen = () => {
            this.socket.send(JSON.stringify(payload));
            // do something after connection is opened
        }
        this.socket.onmessage = (message) => {
            this.initialised=true;

            // handle message from backend
        }
    }

    render() {
        this.initialised=false;
        this.startwebsocket();
        /*
        while(!this.initialised){
            //await sleep(500);
        }
        */



        return (
            <Router basename="/react-auth-ui/">
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/recommendations" component={Recommendations}></Route>
                        <Route exact path="/profile" component={Profile}></Route>

                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

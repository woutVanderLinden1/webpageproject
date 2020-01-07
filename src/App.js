import React, { Component } from 'react';
// eslint-disable-next-line
import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/home';
import Recommendations from './pages/recommendations';
import TinderCards from './pages/tinderCards';
import UserSelection from './pages/userSelection';
import GettingToKnow from './pages/gettingToKnow';
import SwipeTest from './pages/SwipeTest';
import RecommendationsA from "./pages/recommendationsA";

import './App.css';
import Profile from "./pages/profile";



class App extends Component {




    sendmessage(message){
        let socket = new WebSocket("ws://localhost:9000");
        //get an amount of recommends
        // account is acount factors
        //amount is the number of things to recommend
        //prolist is the list of previously liked recipes each as a string of the name
        let payload = {
                action: "Recommend",
                account: {vegan: 1, easy: 1, preparation: 1},
                amount: 3,
                prolist: [{name:"hot tamale  burgers", rating:0.5},{name:"hot tamale  burgers", rating:0.5}]
            }
        ;

        //example output
        let recipeoutput= {
           // recommends1=[{name:"hot tamale  burgers"}];

        }

        //get similar elements
        //recipe is the name ofe recipe to get similar to
        //prolist is the list of previously liked recipes each as a string of the name
        let Similar={
            action: "Similar",
            recipe: "hot tamale  burgers",
            prolist: [{name:"hot tamale  burgers", rating:0.5}]
        }
        //get the recipe of an element
        //recipe is the name of the recipe to get the similar element to
        let Recipe={
            action: "Recipe",
            recipe: "little kick  jalapeno burgers"

        }
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
                        <Route exact path="/test" component={SwipeTest}></Route>
                        <Route exact path="/" component={UserSelection}></Route>
                        <Route exact path="/recommendations" component={Recommendations}></Route>
                        <Route exact path="/profile" component={Profile}></Route>
                        <Route exact path="/tinderCards" component={TinderCards}></Route>
                        <Route exact path="/home" component={Home}></Route>
                        <Route exact path="/gettingToKnow" component={Recommendations}></Route>
                        <Route exact path="/recommendationsA" component={RecommendationsA}></Route>

                    </Switch>
                </div>
            </Router>
        );
    }

    static socketchange(f) {
        this.socket.onopen=f;
    }
}

export default App;

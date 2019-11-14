import React from 'react';
//import './App.css';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";

class Recommendations extends React.Component {
    constructor() {
        super();
        this.state = {
            timesClicked: 0
        };
        this.increaseCounter = this.increaseCounter.bind(this);
        this.generateMeal    = this.generateMeal.bind(this);
    }

    increaseCounter() {
        let clicked = this.state.timesClicked + 1;
        this.setState({timesClicked: clicked})
    }

    generateMeal() {
        let foods = ["Spicy rice", "Curry chicken", "Thai noodles", "Ice cream sundae", "Veggie green smoothie"];
        let html = [];

        for (let i = 1; i <= 5; i++) {
            html.push(<Popup trigger={<div><button key={i} className="FoodItem" onClick={this.increaseCounter}>{foods[i-1]}</button></div>} position="right center">
                <div><p className="DarkText">Recipe for {foods[i-1]} goes here.</p></div>
            </Popup>)
        }
        return html
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    Here are your recommendations.
                    <div>
                        {this.generateMeal()}
                    </div>
                    Times clicked: {this.state.timesClicked}
                    <Link to="/"><button className="Button">Go back</button></Link>
                </header>
            </div>
        );
    }

}

export default Recommendations;

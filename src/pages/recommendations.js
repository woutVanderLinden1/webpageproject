import React from 'react';
//import './App.css';
import { Link } from 'react-router-dom';

function Recommendations() {

    function generateMeal() {
        let foods = ["Spicy rice", "Curry chicken", "Thai noodles", "Ice cream sundae", "Veggie green smoothie"];
        let html = [];

        for (let i = 1; i <= 5; i++) {
            html.push(<div><button key={i} className="FoodItem">{foods[i-1]}</button></div>)
        }
        return html
    }

    return (
        <div className="App">
            <header className="App-header">
                Here are your recommendations.
                <div>
                    {generateMeal()}
                </div>
                <Link to="/"><button className="Button">Go back</button></Link>
            </header>
        </div>
    );
}

export default Recommendations;

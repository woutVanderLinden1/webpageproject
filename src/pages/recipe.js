import React from 'react';
//import './App.css';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";

class Recipe extends React.Component {
    constructor() {
        super();
        this.state = {

        };

    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    Recipe
                    <div>
                        Ingredients
                    </div>
                    <div>
                        Instructions
                    </div>
                    <Link to="/"><button className="Button">Go back</button></Link>

                </header>
            </div>
        );
    }

}

export default Recipe;

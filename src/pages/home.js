import React from 'react';
//import './App.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                Welcome to our recommender app.
                <Link to="/recommendations"><button className="Button">Go to recommendations</button></Link>
            </header>
        </div>
    );
}

export default Home;

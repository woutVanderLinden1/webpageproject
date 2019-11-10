import React from 'react';
import { Link, Redirect } from 'react-router-dom';


class Home extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    Welcome to our recommender app.
                    <Link to="/recommendations">
                        <button className="Button">Go to recommendations</button>
                    </Link>
                </header>
            </div>
        );
    }
}

export default Home;

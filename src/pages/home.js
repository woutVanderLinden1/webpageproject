import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'


class Home extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="Circle">

                </div>
                <h1 className="fadeInLeft1">Welcome!</h1>
                <p className="fadeInLeft2">Let's get you started.</p>
                <Link to="/profile">
                    <button className="StartButton fadeInLeft3"><b>CONTINUE</b></button>
                </Link>
                <div className='plate1 fadeInRight1'> </div>
                <div className='plate2 fadeInRight2'> </div>
                <div className='plate3 fadeInRight3'> </div>
            </div>
        );
    }
}

export default Home;

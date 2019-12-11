import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class UserProfile extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="DarkBackground">
                        <div>
                            <input type="text" className="textBox" id="fname" name="firstname" placeholder="Your name"></input>
                        </div>


                        <Link to="/home"><button className="NextButton White"><b>NEXT</b></button></Link>
                    </div>
                </header>


            </div>

        );
    }
}

export default UserProfile;

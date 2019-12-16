import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class UserProfile extends React.Component {
    constructor() {
        super();
        if(localStorage.getItem("users")===null){
            let tempList = [];
            localStorage.setItem("users", JSON.stringify(tempList));
        }
        this.state = {
            name : ""
        }
    }
    handleChange = event => {
        this.setState({ name: event.target.value });
    };
    updateUsers(){

        let tempUsers = JSON.parse(localStorage.getItem('users'));
        let alreadyInUsers = false;
        for (let i = 0; i<tempUsers.length;i++){
            if(tempUsers[i].Name === this.state.name) {
                alreadyInUsers = true;
                break;
            }
        }
        if (!alreadyInUsers){
            let emptyDict = {
                Name: this.state.name,
                Preferences: [],
                Allergies: [],
                Log: [],
                Liked: [],
                Disliked: []
            };
            tempUsers.push(emptyDict);
            localStorage.setItem('users', JSON.stringify(tempUsers));
        }

        localStorage.setItem('currentUser', this.state.name);
    }
    render() {

        return (

            <div className="App">
                <header className="App-header">
                    <div className="DarkBackground">
                        <div>
                            <input
                                type="text"
                                name="username"
                                className={"textBox fadeInLeft2"}
                                placeholder={"Your name"}
                                value={this.state.username}
                                onChange={this.handleChange}
                            />

                        </div>
                        <Link to="/home"><button className="NextButton White fadeInLeft3"
                             onClick={
                                ()=>{this.updateUsers()}
                             }>
                        <b>NEXT</b></button></Link>
                    </div>
                </header>
            </div>

        );
    }
}

export default UserProfile;

import React from 'react';
//import './App.css';
import { Link } from 'react-router-dom';
import Checkbox from "./checkBox";

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            box1: this.getState("box11"),
            box2: this.getState("box12"),
            box3: this.getState("box13"),
            box4: this.getState("box14"),
            box5: this.getState("box21"),
            box6: this.getState("box22"),
            box7: this.getState("box23"),
            box8: this.getState("box24")
        };

}


    getState(name){
        if (localStorage.getItem(name)==="true"){
            return true
        }
        else {
            return false
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        Food preferences
                        <table>
                            <tr>
                                <td><div> <Checkbox name={"Vegetarian"} checked={this.state.box1} id={"box11"}/></div></td>
                                <td><div> <Checkbox name={"Gluten"} checked={this.state.box2} id={"box12"}/></div></td>

                            </tr>
                            <tr>
                                <td><div><Checkbox name={"Vegan"} checked={this.state.box3} id={"box13"}/></div></td>
                                <td><div><Checkbox name={"Halal"} checked={this.state.box4} id={"box14"}/></div></td>
                            </tr>

                        </table>
                    </div>

                    <br/>

                    Allergies
                    <table>
                        <tr>
                            <td><div> <Checkbox name={"Vegetarian"} checked={this.state.box5} id={"box21"}/></div></td>
                            <td><div> <Checkbox name={"Gluten"} checked={this.state.box6} id={"box22"}/></div></td>

                        </tr>
                        <tr>
                            <td><div><Checkbox name={"Vegan"} checked={this.state.box7} id={"box23"}/></div></td>
                            <td><div><Checkbox name={"Halal"} checked={this.state.box8} id={"box24"}/></div></td>
                        </tr>

                    </table>
                    <div>
                    </div>





                    <Link to="/"><button className="Button">Go back</button></Link>

                </header>
            </div>
        );
    }

}

export default Profile;

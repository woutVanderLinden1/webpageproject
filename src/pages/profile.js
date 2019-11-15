import React from 'react';
//import './App.css';
import { Link } from 'react-router-dom';
import Checkbox from "./checkBox";


let namesPref = ["Vegetarian", "Gluten", "Vegan", "Kosher"];
let namesAllergies = ["Vegetarian", "Gluten", "Vegan", "Kosher"];
let amountOfPref = namesPref.length;
let amountOfAllergies = namesAllergies.length;
class Profile extends React.Component {
    constructor() {
        super();
        if(localStorage.getItem("boxes")===null){
            let list = [];
            for (let i = 0; i<amountOfAllergies+amountOfPref;i++){
                list[i] = false;
            }
            localStorage.setItem("boxes", JSON.stringify(list))
        }
        this.state = {
            boxes: this.getItemLocal("boxes"),
        };

    }


    getItemLocal(name) {
        return (JSON.parse(localStorage.getItem(name)))
    }

    getRender() {
        let returnVal = [];
        returnVal.push(<h3> Preferences </h3>);
        for (let i = 0; i < amountOfPref; i++) {
            returnVal.push(<Checkbox name={namesPref[i]} checked={this.state.boxes[i]} id={i}/>)
        }
        returnVal.push(<h3> Allergies </h3>);
        for (let i = amountOfPref; i < this.state.boxes.length; i++) {
            returnVal.push(<Checkbox name={namesAllergies[i-amountOfPref]} checked={this.state.boxes[i]} id={i}/>)
        }
        return returnVal

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h3>Your profile</h3>
                    {this.getRender()}
                    <Link to="/"><button className="Button">Go back</button></Link>
                </header>
            </div>

        );
    }
}

export default Profile;

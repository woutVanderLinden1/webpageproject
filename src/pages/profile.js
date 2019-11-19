import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Checkbox from "./checkBox";
import Swal from 'sweetalert2';


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
        this.success = this.success.bind(this);

    }


    getItemLocal(name) {
        return (JSON.parse(localStorage.getItem(name)))
    }

    getRender() {
        Swal.fire({
            title: 'Welcome!',
            text: "Let's set you up! First, choose your preferences and your allergies if you have some.",
            icon: 'info',
            confirmButtonText: 'Okay!'
        });
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

    success() {
        Swal.fire({
            title: 'Saved!',
            text: "Great, now let's choose some of your liked or disliked meals, so we can get a small glimpse into your preferences.",
            icon: 'success',
            confirmButtonText: 'Okay!'
        });
    }

    render() {
        return (
            <div className="App">
                <div className="PageHeader"> <b className="PageTitle">Profile</b>
                </div>
                <header className="App-header">
                    {this.getRender()}
                    <Link to="/recommendations"><button className="NextButton" onClick={this.success}><b>NEXT</b></button></Link>
                </header>
            </div>

        );
    }
}

export default Profile;

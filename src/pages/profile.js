import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Checkbox from "./checkBox";
import Swal from 'sweetalert2';


let namesPref = ["Vegetarian", "Gluten free", "Low Carb", "Vegan","Lactose Free","Low Cholesterol","Kosher","Halal", "Low Protein"];
let namesAllergies = ["Shrimp", "Cherries", "Nuts", "Shellfish","Plums","Mushrooms","Fish","Avocado", "Gelatin"];
let amountOfPref = namesPref.length;
let amountOfAllergies = namesAllergies.length;
class Profile extends React.Component {
    constructor() {
        super();
        let alreadySet = false;
        if(localStorage.getItem('users') != null){
            let users = JSON.parse(localStorage.getItem('users'));
            for(let i = 0; i<users.length; i++){
                let a = localStorage.getItem('currentUser');
                if(users[i].Name === localStorage.getItem('currentUser')){

                    if(users[i].Preferences && users[i].Preferences.length && users[i].Allergies&& users[i].Preferences){
                        localStorage.setItem("boxes", JSON.stringify(users[i].Preferences.concat(users[i].Allergies)));
                        alreadySet = true;
                        break;
                    }

                }
            }
        }
        if(!alreadySet){
            let list = [];
            for (let i = 0; i<amountOfAllergies+amountOfPref;i++){
                list[i] = false;
            }
            localStorage.setItem("boxes", JSON.stringify(list));
        }

        this.state = {
            boxes: this.getItemLocal("boxes"),
        };
        this.success = this.success.bind(this);
        this.updateAccount = this.updateAccount.bind(this);

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
        let returnList = [];
        returnVal.push(<div className="newclass"> <h3> Preferences </h3></div>);
        for (let i = 0; i < amountOfPref; i++) {
            returnList.push(<Checkbox name={namesPref[i]} checked={this.state.boxes[i]} id={i}/>)
        }

        returnVal.push(<div class={"container"}><ul class={"ks-cboxtags"}> {returnList} </ul></div>);
        returnVal.push(<h3> Allergies </h3>);
        returnList = [];
        for (let i = amountOfPref; i < this.state.boxes.length; i++) {
            returnList.push(<Checkbox name={namesAllergies[i-amountOfPref]} checked={this.state.boxes[i]} id={i}/>)
        }
        returnVal.push(<div class={"container"}><ul class={"ks-cboxtags"}> {returnList} </ul></div>);
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
    updateAccount(){
        let users = JSON.parse(localStorage.getItem('users'));
        let a = users[0];
        localStorage.setItem('k', toString(a));
        for(let i = 0; i<users.length; i++){


            if(users[i].Name === localStorage.getItem('currentUser')){
                let prefAndAllergies = JSON.parse(localStorage.getItem('boxes'));
                users[i].Preferences = prefAndAllergies.slice(0, amountOfPref);
                users[i].Allergies = prefAndAllergies.slice(9, amountOfAllergies+amountOfPref)
                break;

            }
        }
        localStorage.setItem('users', JSON.stringify(users));
        this.success();
    }

    render() {
        return (

            <div className="App">
                <div className="PageHeader"> <b className="PageTitle">Profile</b>
                </div>
                <header className="App-header">
                    {this.getRender()}
                    <Link to="/recommendations"><button className="NextButton Green" onClick={this.updateAccount}><b>NEXT</b></button></Link>

                </header>
            </div>

        );
    }
}

export default Profile;

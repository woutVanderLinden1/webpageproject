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
        this.items = ['Test', 'NewTest', 'OldTest', 'Tttttt', 'TTttTTTTtt'];

        this.state = {
            boxes: this.getItemLocal("boxes"),
            suggestions: [],
            text: ''
        };

        this.success = this.success.bind(this);
        this.updateAccount = this.updateAccount.bind(this);

    }


    getItemLocal(name) {
        return (JSON.parse(localStorage.getItem(name)))
    }

    getRender() {
        let users = JSON.parse(localStorage.getItem('users'));
        for (let i = users.length-1; i>=0; i--) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                if (users[i].FirstTime){
                    Swal.fire({
                        title: 'Welcome!',
                        text: "Let's set you up! First, choose your preferences and your allergies if you have some.",
                        icon: 'info',
                        confirmButtonText: 'Okay!'
                    });
                    users[i].FirstTime = false;
                    localStorage.setItem('users', JSON.stringify(users));
                }
            }
        }

        let returnVal = [];
        let returnList = [];
        returnVal.push( <h3> Preferences </h3>);
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
            text: "Great, now let's choose some of your liked or disliked meals, so we can get a small glimpse into your preferences. Drag an item left to dislike it, or right to like it.",
            icon: 'success',
            confirmButtonText: 'Okay!'
        });
    }
    updateAccount(){
        let users = JSON.parse(localStorage.getItem('users'));
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

    renderButton() {
        let users = JSON.parse(localStorage.getItem('users'));
        for (let i = users.length -1; i>=0; i--) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                if (users[i].FirstTime1){
                    users[i].FirstTime1 = false;
                    localStorage.setItem('users', JSON.stringify(users));
                    return <Link to="/gettingToKnow"><button className="NextButton Green" onClick={this.updateAccount}><b>NEXT</b></button></Link>

                }
                else
                    return <Link to="/recommendations"><button className="NextButton Green" onClick={this.updateAccount}><b>NEXT</b></button></Link>
            }
        }




    }

    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));


        }

        this.setState(() => ({suggestions: suggestions, text: value}))
    }
    suggestionSelected(value){
        this.setState(()=>({
            text: value,
            suggestions: []
        }))
    }
    renderSuggestions(){

        const {suggestions} = this.state;
        localStorage.setItem("s", JSON.stringify(suggestions))

        if(suggestions.length === 0 ){
            return null;
        }
        return(
            <div className={"AutoCompleteText"}>
            <ul>
                {suggestions.map((i) => <li onClick={() =>this.suggestionSelected(i)}>{i}</li>)}
            </ul>
            </div>
        );
    }

    render() {
        const {text} = this.state;
        return (

            <div className="App">
                <div className="PageHeader"> <b className="PageTitle">Your profile</b>
                </div>
                <header className="App-header">
                    {this.getRender()}
                    {this.renderButton()}
                    <input value={text} onChange={this.onTextChanged}  type={'text'}/>
                        {this.renderSuggestions()}

                </header>
            </div>


        );
    }
}

export default Profile;

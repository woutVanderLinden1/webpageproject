import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Checkbox from "./checkBox";
import Swal from 'sweetalert2';

class Profile extends React.Component {
    constructor() {
        super();
        let alreadySet = false;
        this.amountOfLikes = 0;
        this.amountOfDislikes = 0;
        if(localStorage.getItem('users') != null){
            let users = JSON.parse(localStorage.getItem('users'));
            for(let i = 0; i<users.length; i++){
                if(users[i].Name === localStorage.getItem('currentUser')){
                    if(users[i].Preferences && users[i].Preferences.length && users[i].Allergies&& users[i].Preferences){
                        alreadySet = true;
                        this.amountOfDislikes = users[i].Allergies.length;
                        this.amountOfLikes = users[i].Preferences.length;
                        break;
                    }

                }
            }
        }
        if(!alreadySet){
            let list = [];
        }
        this.items = ["Vegetarian", "Gluten free", "Low Carb", "Vegan","Lactose Free","Low Cholesterol","Kosher","Halal", "Low Protein","Shrimp", "Cherries", "Nuts", "Shellfish","Plums","Mushrooms","Fish","Avocado", "Gelatin"];


        this.state = {
            boxes: this.getItemLocal("boxes"),
            suggestionsLiked: [],
            suggestionsDisliked: [],
            textLiked: '',
            textDisliked: ''
        };

        this.success = this.success.bind(this);
        this.updateAccount = this.updateAccount.bind(this);

    }


    getItemLocal(name) {
        return (JSON.parse(localStorage.getItem(name)))
    }

    getRender() {
        let users = JSON.parse(localStorage.getItem('users'));
        let tempIndex = -1;
        for (let i = users.length-1; i>=0; i--) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                tempIndex = i;
                if (users[i].FirstTime){
                    Swal.fire({
                        title: 'Welcome!',
                        text: "Let's set you up! First, choose your preferences and your allergies if you have some.",
                        icon: 'info',
                        confirmButtonText: 'Okay!'
                    });

                    users[i].FirstTime = false;
                    localStorage.setItem('users', JSON.stringify(users));

                    break;
                }
            }
        }

        let returnVal = [];
        let returnList = [];
        returnVal.push( <h3> Preferences </h3>);
        const {textLiked} = this.state;
        const {textDisliked} = this.state;

        for (let i = 0; i < this.amountOfLikes; i++) {
            returnList.push(<Checkbox name={users[tempIndex].Preferences[i]} checked={users[tempIndex].booleansPreferences[i]} id={i} prefs={true}/>)
        }


        returnVal.push(<div class={"container"}><ul class={"ks-cboxtags"}> {returnList} </ul></div>);
        returnVal.push( <input value={textLiked}  onChange={this.onTextChangedLiked}  type={'text'}/>);
        returnVal.push(this.renderSuggestionsLiked());
        returnVal.push(<input type={"submit"} value={"Add something you like"} onClick={() =>this.doChange(textLiked, 1)}/>);
        returnVal.push(<h3> Allergies </h3>);
        returnList = [];
        for (let i = 0; i <  this.amountOfDislikes; i++) {
            returnList.push(<Checkbox name={users[tempIndex].Allergies[i]} checked={users[tempIndex].booleanAllergies[i]} id={-i-1} prefs={false}/>)
        }

        returnVal.push(<div class={"container"}><ul class={"ks-cboxtags"}> {returnList} </ul></div>);
        returnVal.push( <input value={textDisliked}  onChange={this.onTextChangedDisliked}  type={'text'}/>);
        returnVal.push(this.renderSuggestionsDisliked());
        returnVal.push(<input type={"submit"} value={"Add something you dislike"} onClick={() =>this.doChange(textDisliked, 2)}/>);
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
                //let prefAndAllergies = JSON.parse(localStorage.getItem('boxes'));
                //users[i].booleanAllergies = prefAndAllergies.slice(0, this.amountOfLikes);
                //users[i].booleansPreferences = prefAndAllergies.slice(this.amountOfLikes+1, this.amountOfLikes+this.amountOfDislikes);
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

    onTextChangedLiked = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({suggestionsLiked: suggestions, textLiked: value}));
    }
    onTextChangedDisliked = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }

        this.setState(() => ({suggestionsDisliked: suggestions, textDisliked: value}));
    }
    suggestionSelectedLiked(value){

        this.setState(()=>({
            textLiked: value,
            suggestionsLiked: []
        }))
        this.state.textLiked = value;
    }
    suggestionSelectedDisliked(value){
        this.setState(()=>({
            textDisliked: value,
            suggestionsDisliked: []
        }))
        this.state.textDisliked = value;
    }
    renderSuggestionsLiked(){

        const {suggestionsLiked} = this.state;

        if(suggestionsLiked.length === 0 ){
            return null;
        }
        return(
            <div className={"AutoCompleteText"}>
            <ul>
                {suggestionsLiked.map((i) => <li onClick={() =>this.suggestionSelectedLiked(i)}>{i}</li>)}
            </ul>
            </div>
        );
    }
    renderSuggestionsDisliked(){

        const {suggestionsDisliked} = this.state;

        if(suggestionsDisliked.length === 0 ){
            return null;
        }
        return(
            <div className={"AutoCompleteText"}>
                <ul>
                    {suggestionsDisliked.map((i) => <li onClick={() =>this.suggestionSelectedDisliked(i)}>{i}</li>)}
                </ul>
            </div>
        );
    }
    doChange(item, buttonNb){
        let items = this.items;
        let users = JSON.parse(localStorage.getItem('users'));
        for(let i = 0; i<users.length; i++) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                if(items.includes(item)){
                    if(buttonNb === 1){
                        users[i].Preferences.push(item);
                        users[i].booleansPreferences.push(true);
                        this.amountOfLikes = this.amountOfLikes + 1;
                        this.setState(() => ({textLiked: item}));

                    }
                    else if(buttonNb === 2){
                        users[i].Allergies.push(item);
                        users[i].booleanAllergies.push(true);
                        this.amountOfDislikes = this.amountOfDislikes + 1;
                        this.setState(() => ({textDisliked: item}));

                    }
                    items.splice(this.items.indexOf(item),1);
                    this.items = items
                    localStorage.setItem("j", JSON.stringify(this.items))

                    break;
                }
            }

        }
        localStorage.setItem('users', JSON.stringify(users));
    }
    render() {

        return (

            <div className="App">
                <div className="PageHeader"> <b className="PageTitle">Your profile</b>
                </div>
                <header className="App-header">
                    {this.getRender()}
                    {this.renderButton()}


                </header>
            </div>


        );
    }
}

export default Profile;

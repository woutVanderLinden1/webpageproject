import React from 'react';
import './FoodPage.css';
import './Popup.css';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import Swipeable from "react-swipy";
import {Swipeable as Swiping} from "react-swipeable";
import './tinderCards.css';
import Swal, {clickConfirm} from "sweetalert2";
import styled from "styled-components";
import {  Popup as InfoPopup } from "semantic-ui-react";
import ReactSwing from "react-swing";
let lastItem = null;
let lastAction  = null;
export const icanswipe = styled.div`
  display: flex;
  transition: ${props => (props.sliding ? "none" : "transform 1s ease")};
  transform: ${props => {
    if (!props.sliding) return "translateX(calc(-80% - 20px))";
    if (props.dir === "PREV") return "translateX(calc(2 * (-80% - 20px)))";
    return "translateX(0%)";
}};
`;

const wrapperStyles = {position: "relative", width: "250px", height: "300px"};
const actionsStyles = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
};

function capitalizeFLetter(string) {
    let returnVal = string;
    try {
        returnVal = string[0].toUpperCase() + string.slice(1);
    } catch (e) {

    }
    return returnVal;
}

function perc2color(perc) {
    var r, g, b = 0;
    if(perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
    }
    else {
        g = 255;
        r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
}

function shuffle(array,array2,array3) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        temporaryValue = array2[currentIndex];
        array2[currentIndex] = array2[randomIndex];
        array2[randomIndex] = temporaryValue;
        temporaryValue = array3[currentIndex];
        array3[currentIndex] = array3[randomIndex];
        array3[randomIndex] = temporaryValue;
    }
    let answer=[];
    answer.push(array,array2,array3);

    return answer;
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Recommendations extends React.Component {
    constructor() {
        super();

        this.state = {
            foods: [],
            tags: [],
            images: [],
            recipe: [],
            nutrition: [],
            ingredients: [],
            similar: [],


        };



        this.socket=this.initialiseSocket();
        this.sendable=false;

        this.generateMeal=this.generateMeal.bind(this);
        this.getRecommendations=this.getRecommendations.bind(this);
        this.switchViews=this.switchViews.bind(this);
        this.generateView=this.generateView.bind(this);
        this.resetSwipes=this.resetSwipes.bind(this);
        this.generateFavorites=this.generateFavorites.bind(this);
        this.goToFavorites=this.goToFavorites.bind(this);
        this.goToRecommends=this.goToRecommends.bind(this);
        this.generateBadges=this.generateBadges.bind(this);
        this.swipeItem = this.swipeItem.bind(this);
        this.saveAlert = this.saveAlert.bind(this);
        this.createCards = this.createCards.bind(this);


        this.socket.onopen = () => {
            let users = JSON.parse(localStorage.getItem('users'));
            let payload= {
                action: "initialise"
            };
            for (let i = users.length-1; i>=0; i--) {
                if (users[i].Name === localStorage.getItem('currentUser')) {
                    let liked=users[i].Liked;
                     payload={
                        action: "initialise",
                        favorites:liked,
                         name: localStorage.getItem('currentUser')
                    };
                }
            }
            this.socket.send(JSON.stringify(payload));
            if (!this.sendable){
                this.loading=false;
                this.sendable=true;
                if(this.state.favorite){
                    this.goToFavorites()
                }
                else{
                    this.getRecommendations();
                }
            }
            // do something after connection is opened
        };

        this.state.favorite=JSON.parse(localStorage.getItem('favorite'));

        this.socket.onmessage=((message) => {
            let translation=JSON.parse(message.data);
            console.log(translation);
            switch(translation.action){
                case "Recommends":
                    if(this.loading){
                        this.loading=false;
                       // alert("this");
                        Swal.fire({
                            title: "Finished!",
                            showConfirmButton: false,
                            timer: 1000
                        });
                    }
                    let users = JSON.parse(localStorage.getItem('users'));
                    for (let i = users.length-1; i>=0; i--) {
                        if (users[i].Name === localStorage.getItem('currentUser')) {
                            if(users[i].FirstTime1){
                                Swal.fire({

                                    text: "Drag an item left to dislike it, or right to like it.",
                                    icon: 'info',
                                    confirmButtonText: 'Okay!'
                                }).then(() => {{
                                    if (clickConfirm) {
                                        Swal.fire({
                                            text: "To see the recipe of the dish or the nutritional values, press the small buttons on the cards.",

                                            icon: 'info',
                                            confirmButtonText: 'Okay!'
                                        }).then(() => {
                                            if (clickConfirm) {
                                                Swal.fire({
                                                    text: "You can navigate to your profile and to your liked items by clicking on the icons on top of the page. ",
                                                    icon: 'info',
                                                    confirmButtonText: 'Okay!'
                                                })
                                            }
                                        })
                                    }
                                }});
                                users[i].FirstTime1 = false;
                                users[i].FirstTime2 = false;
                                localStorage.setItem("users", JSON.stringify(users));
                            }
                            else if(users[i].FirstTime2){
                                Swal.fire({
                                    title: "You're getting the hang of this!",
                                    icon: 'success',
                                    confirmButtonText: 'Okay!'
                                }).then(() => {
                                    if (clickConfirm) {
                                        Swal.fire({
                                            text: "To see the recipe of the dish or the nutritional values, press the small buttons on the cards.",

                                            icon: 'info',
                                            confirmButtonText: 'Okay!'
                                        }).then(() => {
                                            if (clickConfirm) {
                                                Swal.fire({
                                                    text: "You can navigate to your profile and to your liked items by clicking on the icons on top of the page. ",
                                                    icon: 'info',
                                                    confirmButtonText: 'Okay!'
                                                })
                                            }
                                        })
                                    }
                                });
                                users[i].FirstTime2 = false;
                                localStorage.setItem('users', JSON.stringify(users));
                            }
                        }
                        }


                    let initialfoods = translation.recommends;
                    let initialtags = translation.tags;
                    let initialimages = translation.images;
                    let shuffled=this.filterfoods(initialfoods,initialtags,initialimages);
                    let filteredfoods=shuffled[0];
                    let filteredTags=shuffled[1];
                    let filteredImages=shuffled[2];
                    this.setState({tags: filteredTags});
                    this.setState({foods: filteredfoods});
                    this.setState({images: filteredImages});
                    if(JSON.parse(localStorage.getItem('viewInit'))==1 && this.state.initialised!=true){
                        this.state.view=0;
                        sleep(5).then(() => {
                            this.state.view= JSON.parse(localStorage.getItem('viewInit'));
                            if(this.state.view==1){
                                this.state.swipednumber=0;
                                const value = (this.state.view + 1) % 2;
                                localStorage.setItem("view", value);
                                this.state.initialised=true;
                                this.setState({view: 1});
                            }
                        })


                    }
                    break;
                case "favorites":

                    if(this.loading){
                       // alert("this favorites");
                        this.loading=false;
                        Swal.fire({
                            title: "Finished!",
                            showConfirmButton: false,
                            timer: 1000
                        });
                        let users = JSON.parse(localStorage.getItem('users'));
                        for (let i = users.length-1; i>=0; i--) {
                            if (users[i].Name === localStorage.getItem('currentUser')) {
                               if(users[i].FirstTime3){
                                   Swal.fire({
                                       title: "Do not lose any of your liked recipes!",
                                       text: "You can find them here!",
                                       icon:"info"
                                   });
                                   users[i].FirstTime3 = false;
                                   localStorage.setItem('users', JSON.stringify(users));
                               }
                            }
                        }
                    }
                    this.setState({favorites: translation.favorites});
                  //  alert('favorites set '+ translation.favorites);
                    break;
                case "Similar":

                        // alert("this favorites");
                        this.loading=false;
                        Swal.fire({
                            title: "Finished!",
                            showConfirmButton: false,
                            timer: 1000
                        });

                    this.setState({similar: translation.similar});
                    break;
                case "Recipe":
                    this.setState({recipe: translation.recipe});
                    break;
                case "Nutrition":
                    this.setState({nutrition: translation.nutrition});
                    break;
                case "Ingredients":
                    this.setState({ingredients: translation.ingredients});
                    break
            }
        });
        if(this.state.swipednumber===undefined){
            this.state.swipednumber=0;
        }

        if(this.state.favorite){
            this.goToFavorites()
        }
        if(this.state.initialised==undefined||this.state.initialised==false){
            this.state.view=0;
        }


    }

    filterfoods(initialfoods,initialtags,initialimages){
        let shuffled=shuffle(initialfoods,initialtags,initialimages);
        let newinitialfoods=shuffled[0];
        let newinitialtags=shuffled[1];
        let newinitialimages=shuffled[2];

        //initialfoods shuffle

        let likedItems = null;
        let dislikedItems = null;
        let users = JSON.parse(localStorage.getItem('users'));
        for (let i = users.length-1; i>=0; i--) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                likedItems = users[i].Liked;
                dislikedItems = users[i].Disliked;
            }
        }

        if(likedItems==null){
            likedItems=[];
        }

        if(dislikedItems==null){
            dislikedItems=[];
        }
        let filteredFoods  =[];
        let filteredtags  =[];
        let filteredimages  =[];
        let p=0;
        for (let i = 0; p<7 ; i++) {
            if (newinitialfoods[i] !=="" && !likedItems.includes(newinitialfoods[i]) && !dislikedItems.includes(newinitialfoods[i])) {
                p++;
                filteredFoods.push(newinitialfoods[i]);
                filteredtags.push(newinitialtags[i]);
                filteredimages.push((newinitialimages[i]));
                //alert(initialfoods[i]);
            }
        }
        let answer=[];
        answer.push(filteredFoods,filteredtags,filteredimages);
        return answer;
    }

    initialiseSocket() {
        if(this.socket!==undefined){
            return this.socket;
        }
        this.setState({favorite: false});
        return new WebSocket("ws://localhost:9000");
    }

    getInfo(string) {


        this.sendRecipe(string);
        this.sendNuttritionSimilar(string);
    }
    sendRecipe(name) {
        name=name.toLowerCase();
        console.log("send recipe");
        this.socket=this.initialiseSocket();
        let payload = {
            action: "Recipe",
            recipe: name
        };
        let ingredipayload = {
            action: "Ingredients",
            name: name
        };
        //  this.socket.close();
        if(this.sendable!==undefined&&this.sendable){
            this.socket.send(JSON.stringify(payload));
            this.socket.send(JSON.stringify(ingredipayload));
        }
    }


    sendNuttritionSimilar(name) {
        name=name.toLowerCase();
        this.socket=this.initialiseSocket();
        let payload = {
            action: "Nutrition",
            name: name
        };
        if(this.sendable!==undefined&&this.sendable) {
            this.socket.send(JSON.stringify(payload));

        }
        let similarpayload={
            action: "Similar",
            recipe: name,
            prolist:[]
        };
        let users = JSON.parse(localStorage.getItem('users'));
        let likedItems = null;
        let dislikedItems = null;
        for (let i = users.length-1; i>=0; i--) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                likedItems = users[i].Liked;
                dislikedItems = users[i].Disliked;
            }
        }

        if(likedItems==null){
            likedItems=[];
        }

        if(dislikedItems==null){
            dislikedItems=[];
        }
        let prolist = [];
        for (let i = 0; i < likedItems.length; i++) {
           if(likedItems[i]!=name){
               let item = {};
               item['name'] = likedItems[i];
               item['rating']= 1.0;
               prolist.push(item);
           }

        }

        for (let i = 0; i < dislikedItems.length; i++) {
            let item = {};
            item['name'] = dislikedItems[i];
            item['rating'] = -1.0;
            prolist.push(item)
        }
        similarpayload.prolist = prolist;
        this.state.proto=!this.state.proto;
        if(this.sendable) {
            if(this.state.proto){
                this.socket.send(JSON.stringify(similarpayload));
                Swal.fire({
                    title: "Loading...",
                    text: "Please wait",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
            }

        }


    }

    getFavorites(){
        let users = JSON.parse(localStorage.getItem('users'));
        let likedItems = null;
        for (let i = users.length-1; i>=0; i--) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                likedItems = users[i].Liked;
            }
        }
        if(likedItems==null){
            likedItems=[];
        }

        let payload = {
            action: "Favorites",
            prolist: [{name:"hot tamale  burgers", rating:0.5}]
        };

        const names = ["vegetarian", "gluten-free", "low-carb", "vegan", "dairy-free","low-cholesterol","kosher","ramadan", "low-protein"];
        const likes = JSON.parse(localStorage.getItem('boxes'));

        // Creating prolist
        let prolist = [];

        for (let i = 0; i < likedItems.length; i++) {
            let item = {};
            item['name'] = likedItems[i];
            item['rating'] = 1.0;
            prolist.push(item)
        }

        payload.prolist = prolist;
        console.log(prolist);

        console.log(payload);

        if(this.sendable) {
            this.socket.send(JSON.stringify(payload));
            Swal.fire({
                title: "Loading...",
                text: "Please wait",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            this.loading=true;
        }
    }

    getRecommendations(){
        let users = JSON.parse(localStorage.getItem('users'));
        let tempUserIndex = -1;
        let likedItems = null;
        let dislikedItems = null;
        for (let i = users.length-1; i>=0; i--) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                tempUserIndex = i;
                likedItems = users[i].Liked;
                dislikedItems = users[i].Disliked;
            }
        }
        if(likedItems==null){
            likedItems=[];
        }
        if(dislikedItems==null){
            dislikedItems=[];
        }
        let payload = {
            action: "Recommend",
            account: {vegan: 1, easy: 1, preparation: 1},
            amount: 7,
            prolist: [{name:"hot tamale  burgers", rating:0.5}]
        };
        let amount=7;

        if(likedItems!=null && likedItems!==undefined){
            amount+=likedItems.length;
        }
        if(dislikedItems!=null &&dislikedItems!==undefined){
            amount+=dislikedItems.length;
        }

        payload.amount=amount;
        let names = users[tempUserIndex].Preferences;
        let likes = users[tempUserIndex].booleansPreferences;
        for (let k = 0; k<names.length; k++){
            names[k] = names[k].toLowerCase();
        }

        let account = {};
        // Creating account
        for (let i = 0; i < names.length; i++) {
            if (likes[i] === true) {
                account[names[i]] = 1;
            }
        }
        console.log(account);
        payload.account = account;
        console.log(payload);

        // Creating prolist
        let prolist = [];

        for (let i = 0; i < likedItems.length; i++) {
            let item = {};
            item['name'] = likedItems[i];
            item['rating'] = 1.0;
            prolist.push(item)
        }

        for (let i = 0; i < dislikedItems.length; i++) {
            let item = {};
            item['name'] = dislikedItems[i];
            item['rating'] = -1.0;
            prolist.push(item)
        }

        payload.prolist = prolist;
        console.log(prolist);
        payload.account = account;
        console.log(payload);

        console.log(payload)
        if(this.sendable) {

            this.socket.send(JSON.stringify(payload));
            Swal.fire({
                title: "Loading...",
                text: "Please wait",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            this.state.initialised=false;
            this.loading=true;
        }
    }

    //POPUP CODE
    nutritionalPopup(name){

        let nutritionLabels = ['Carbs','Total Fats', 'Sugar', 'Sodium', 'Protein', 'Saturated Fats', 'Carbohydrates'];
        let nutritionalInfo = this.getNutritionInfo(name);
        let nutritionalInfoHtml = [];
        let nutritionalInfoHtmlTemp = [];
        let nutritionalInfoHtmlTemp2 = [];
        let explanationHtmlTemp = [];
        let similarMeals = this.getExplanation();
        let title=capitalizeFLetter(name);
        if(nutritionalInfo!==undefined){
            for (let i = 0; i < nutritionalInfo.length; i++){
                nutritionalInfoHtmlTemp.push(
                    <div className = "popupText">
                        {nutritionLabels[i]}
                        <br/>
                    </div>);
                nutritionalInfoHtmlTemp2.push(
                    <div className = "popupText">
                        {nutritionalInfo[i]}
                        <br/>
                    </div>);
            }
        }
        let empty = true;
        if(similarMeals!==undefined){

            for (let i = 0; i < similarMeals.length; i++) {
                let number=Math.floor(similarMeals[i]["matchfactor"]*100);
                let color=perc2color(number);
                if (number >= 60){
                    empty= false;
                    explanationHtmlTemp.push(
                        <div className="popupText2">
                            <div className="container2">
                                <img className="FoodPhotoLarge3" onClick={this.goToFavorites} title={similarMeals[i]["name"]} align="left" src={similarMeals[i]["image"]} alt="Food"/>
                                <button className="OnTopButton" style={{backgroundColor: color}}>{number}%</button>
                            </div>

                            <br/>

                        </div>);
                    }
            }
        }
        if (empty){
            nutritionalInfoHtml.push(
                <div className="row">
                    <div className="Nutritioncolumn">
                        <div className="popupTextTitle">
                            Nutritional info:
                            <br/>
                        </div>
                        <div className="textrow">
                            <div className="textcolumn1">{nutritionalInfoHtmlTemp}</div>
                            <div className="textcolumn2">{nutritionalInfoHtmlTemp2}</div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="popupTextTitle2">
                            You did not try anything like this! Try it out!
                            <br/>
                        </div>
                    </div>
                </div>

            );
        }
        else{
        nutritionalInfoHtml.push(
            <div className="row">
                <div className="Nutritioncolumn">
                    <div className="popupTextTitle">
                        Nutritional info:
                        <br/>
                    </div>
                    <div className="textrow">
                        <div className="textcolumn1">{nutritionalInfoHtmlTemp}</div>
                        <div className="textcolumn2">{nutritionalInfoHtmlTemp2}</div>
                    </div>

                </div>
                <div className="column">
                    <div className="popupTextTitle2">
                        Because you liked:
                        <br/>
                    </div>
                    {explanationHtmlTemp}
                </div>
            </div>

        );}
        let html = [
            <Popup  modal trigger={<button title="nutrition" className="IconLayout NutritionIcon" >
            </button>} >
                <div className="popUp2">
                    <div className="popupHeader">Nutritional info for
                        <br/>
                        {title}</div>
                    <br/>
                    {nutritionalInfoHtml}
                </div>
            </Popup>];

        return html;
    }

    recipePopup(name,image){
        //Recipe list
        let recept = this.getRecipe();
        let recipeHtmlTemp = [];
        let ingredients = this.getIngredients();
        let popUpHtml = [];
        let ingredientsHtmlTemp = [];
        let title=capitalizeFLetter(name);

        if(ingredients!==undefined){
            for (let i = 0; i < ingredients.length; i++){
                ingredientsHtmlTemp.push(
                    <div className = "popupText">
                        {ingredients[i]}
                        <br/>

                    </div>)
            }
        }
        if(recept!==undefined){
            for (let i = 0; i < recept.length; i++){
                recipeHtmlTemp.push(
                    <div className = "popupRecipeText">
                        {i + 1}. {recept[i]}
                        <br/>
                    </div>)
            }
        }
        //, width: "30%" vs 70%
        //add an extra element to the column that includes the image
        popUpHtml.push(
            <div className="row:after">
                <div className="column">
                    <div className="rowingredi">
                        <div className="popupTextTitle">
                            Ingredients:
                        <br/>
                        </div>
                        {ingredientsHtmlTemp}
                    </div>
                    <div className="row2">
                        <img className="FoodPhotoLarge" align="left" src={image} alt="Food"/>
                    </div>
                </div>
                <div className="column2">
                    <div className="reciperow">
                        <div className="popupTextTitleRecipe">
                            Steps:
                            <br/>
                        </div>
                        {recipeHtmlTemp}
                    </div>
                </div>
            </div>

        );
        let html = [];
        html.push(
            <Popup className="poptry" modal trigger={<button  title= "recipe" className="IconLayout RecipeIcon" onClick={() => this.sendRecipe(name)}>
            </button>} position="right center" >
                <div className="popUp2">
                    <div className="popupHeader">Recipe for
                        <br/>
                        {title}</div>
                    <br/>
                    {popUpHtml}
                </div>
            </Popup>);
        return html;
    }

    recipePopupForTinder(name,image){
        //Recipe list
        let recept = this.getRecipe();
        let recipeHtmlTemp = [];
        let ingredients = this.getIngredients();
        let popUpHtml = [];
        let ingredientsHtmlTemp = [];
        let title=capitalizeFLetter(name);

        if(ingredients!==undefined){
            for (let i = 0; i < ingredients.length; i++){
                ingredientsHtmlTemp.push(
                    <div className = "popupText">
                        {ingredients[i]}
                        <br/>
                    </div>)
            }
        }
        if(recept!==undefined){
            for (let i = 0; i < recept.length; i++){
                recipeHtmlTemp.push(
                    <div className = "popupRecipeText">
                        {i + 1}. {recept[i]}
                        <br/>
                    </div>)
            }
        }

        //, width: "30%" vs 70%
        //add an extra element to the column that includes the image

        popUpHtml.push(
            <div className="row:after">
                <div className="column">
                    <div className="rowingredi">
                        <div className="popupTextTitle">
                            Ingredients:
                            <br/>
                        </div>
                        {ingredientsHtmlTemp}
                    </div>
                    <div className="row2">
                        <img className="FoodPhotoLarge3" onClick={() => this.setState({open: false})} align="left" src={image} alt="Food"/>
                    </div>
                </div>
                <div className="column2">
                    <div className="reciperow">
                        <div className="popupTextTitleRecipe">
                            Steps:
                            <br/>
                        </div>
                        {recipeHtmlTemp}
                    </div>
                </div>
            </div>

        );
        let html = [];

        html.push(
            <div>
                <button  title= "recipe" className="RecipeButton" title="recipe" align="left" onClick={() => {this.sendRecipe(name); this.setState({opened: name});this.logAction("get recipe",name)}} src={image} >
                </button>
                <Popup  open={this.state.opened==name} onClick={() => this.setState({opened: "none"})} closeOnDocumentClick
                        position="right center" >
                    <div className="popUp3" onClick={() => {this.setState({opened: "none"});this.logAction("get recipe",name) }}>
                        <div className="popupHeader" onClick={() => this.setState({opened: "none"})}>Recipe for
                            <br/>
                            {title}</div>
                        <br/>
                        {popUpHtml}
                    </div>
                </Popup>
            </div>
        );

        return html;
    }

    recipePopupFromImage(name,image){
        //Recipe list
        let recept = this.getRecipe();
        let recipeHtmlTemp = [];
        let ingredients = this.getIngredients();
        let popUpHtml = [];
        let ingredientsHtmlTemp = [];
        let title=capitalizeFLetter(name);

        if(ingredients!==undefined){
            for (let i = 0; i < ingredients.length; i++){
                ingredientsHtmlTemp.push(
                    <div className = "popupText">
                        {ingredients[i]}
                        <br/>
                    </div>)
            }
        }
        if(recept!==undefined) {
            for (let i = 0; i < recept.length; i++){
                recipeHtmlTemp.push(
                    <div className = "popupRecipeText">
                        {i + 1}. {recept[i]}
                        <br/>
                    </div>)
            }
        }

        //, width: "30%" vs 70%
        //add an extra element to the column that includes the image

        popUpHtml.push(
            <div className="row:after">
                <div className="column">
                    <div className="rowingredi">
                        <div className="popupTextTitle">
                            Ingredients:
                            <br/>
                        </div>
                        {ingredientsHtmlTemp}
                    </div>
                    <div className="row2">

                        <img className="FoodPhotoLarge3" onClick={() => this.setState({open: false})} align="left" src={image} alt="Food"/>
                    </div>
                </div>
                <div className="column2">
                    <div className="reciperow">
                        <div className="popupTextTitleRecipe">
                            Steps:
                            <br/>
                        </div>
                        {recipeHtmlTemp}
                    </div>
                </div>
            </div>
        );


        let html = [];

        html.push(
            <div>
            <img className="FoodPhotoTinder" title="recipe" align="left" onClick={() => {this.sendRecipe(name); this.setState({open: true});}} src={image} >
            </img>
            <Popup  open={false} onClick={() => this.setState({open: false})} closeOnDocumentClick
                      position="right center" >
                <div className="popUp3" onClick={() => this.setState({open: false})}>
                    <div className="popupHeader" onClick={() => this.setState({open: false})}>Recipe for
                        <br/>
                        {title}</div>
                    <br/>
                    {popUpHtml}
                </div>
            </Popup>
            </div>
        );

        return html;
    }

    nutritionalPopupForTinder(name,image){
        //Recipe list
        let nutritionLabels = ['Carbs','Total Fats', 'Sugar', 'Sodium', 'Protein', 'Saturated Fats', 'Carbohydrates'];
        let nutritionalInfo = this.getNutritionInfo(name);
        let nutritionalInfoHtml = [];
        let nutritionalInfoHtmlTemp = [];
        let nutritionalInfoHtmlTemp2 = [];
        let explanationHtmlTemp = [];
        let similarMeals = this.getExplanation();
        let title=capitalizeFLetter(name);

        if(nutritionalInfo!==undefined){

            for (let i = 0; i < nutritionalInfo.length; i++){

                nutritionalInfoHtmlTemp.push(
                    <div className = "popupText">

                        {nutritionLabels[i]}
                        <br/>

                    </div>);
                nutritionalInfoHtmlTemp2.push(
                    <div className = "popupText">

                        {nutritionalInfo[i]}
                        <br/>

                    </div>);
            }
        }
        let empty = true;
        if(similarMeals!==undefined){

            for (let i = 0; i < similarMeals.length; i++) {
                let number=Math.floor(similarMeals[i]["matchfactor"]*100);
                let color=perc2color(number);
                if (number >= 60){
                    empty= false;
                    explanationHtmlTemp.push(
                        <div className="popupText2">
                            <div className="container2">
                                <img className="FoodPhotoLarge3" onClick={this.goToFavorites} title={similarMeals[i]["name"]} align="left" src={similarMeals[i]["image"]} alt="Food"/>
                                <button className="OnTopButton" style={{backgroundColor: color}}>{number}%</button>
                            </div>

                            <br/>

                        </div>);
                }
            }

        }
        if (empty){
            nutritionalInfoHtml.push(
                <div className="row">
                    <div className="Nutritioncolumn">
                        <div className="popupTextTitle">
                            Nutritional info:
                            <br/>
                        </div>
                        <div className="textrow">
                            <div className="textcolumn1">{nutritionalInfoHtmlTemp}</div>
                            <div className="textcolumn2">{nutritionalInfoHtmlTemp2}</div>
                        </div>

                    </div>
                    <div className="column">
                        <div className="popupTextTitle2">
                            You did not try anything like this! Try it out!
                            <br/>
                        </div>
                    </div>
                </div>

            );
        }
        else{
            nutritionalInfoHtml.push(
                <div className="row">
                    <div className="Nutritioncolumn">
                        <div className="popupTextTitle">
                            Nutritional info:
                            <br/>
                        </div>
                        <div className="textrow">
                            <div className="textcolumn1">{nutritionalInfoHtmlTemp}</div>
                            <div className="textcolumn2">{nutritionalInfoHtmlTemp2}</div>
                        </div>

                    </div>
                    <div className="column">
                        <div className="popupTextTitle2">
                            Because you liked:
                            <br/>
                        </div>
                        {explanationHtmlTemp}
                    </div>
                </div>

            );}

        let html = [];


        html.push(
            <div>
                <button  title= "recipe" className="NutritionButton" title="Nutrition" align="left" onClick={() => {this.sendNuttritionSimilar(name); this.setState({nutritionopened: name});this.logAction("get nutritional values",name)}} src={image} >

                </button>
                <Popup  open={this.state.nutritionopened==name} onClick={() => this.setState({nutritionopened: 'none'})} closeOnDocumentClick
                        position="right center" >

                    <div className="popUp3" onClick={() => this.setState({nutritionopened: "none"})}>

                        <div className="popupHeader" onClick={() => {this.setState({nutritionopened: "none"});this.logAction("get nutritional values",name)}}>Recipe for
                            <br/>
                            {title}</div>
                        <br/>

                        {nutritionalInfoHtml}
                    </div>



                </Popup>
            </div>
        );

        return html;
    }

    //GET DATA
    getIngredients(gerecht){
        //TODO implementeren
        return this.state.ingredients;
    }
    getRecipe(gerecht){
        //TODO implementeren
        return this.state.recipe;

    }
    getNutritionInfo(gerecht){
        //TODO implementeren
        //volgorde:
        // Calories in g
        // Total fat in %
        // Suiker in %
        // Sodium in %
        // Protein in %
        // Saturated Fat in %
        // Total Carbohydrate in %
        return this.state.nutrition


    }
    getExplanation(){
        return this.state.similar;
    }


    getAssets(){
        return this.state.tags;
    }

    saveAlert() {
       /* Swal.fire({
            title: 'Saved!',
            text: "Your liked and disliked meals are saved.",
            icon: 'success',
            confirmButtonText: 'Great!'
        });*/
        this.getRecommendations();
    }



    swipeItem(action) {
        let thisCard = this.state.foods[this.state.swipednumber];
        if (action === 'left') {
            this.dislike(thisCard);
        }
        else if (action === 'right') {
            this.like(thisCard);
        }
    }

    resetSwipes(){
        this.state.swipednumber=0;
        this.getRecommendations();
        this.setState({view: 1});
        this.setState({favorite: false});
        localStorage.setItem("view", 1);
    }

    switchViews() {
        this.state.swipednumber=0;
        let  value = (this.state.view + 1) % 2;
        localStorage.setItem("viewInit", value);
        this.setState({view: value});
        this.setState({favorite: false});

        localStorage.setItem("view", value);
    }


    goToFavorites(){
        this.getFavorites();
        localStorage.setItem("favorite", JSON.stringify(true));
        this.setState({favorite: true});

    }
    goToRecommends(){
        this.getRecommendations();
        localStorage.setItem("favorite", JSON.stringify(false));
        this.setState({favorite: false});

    }

/*
    generateView() {
        if(this.state.favorite){
            return(
                <div>
                    <div className="Listing">
                        favoritestate
                        {this.generateFavorites()}
                    </div>
                    Times clicked: {this.state.timesClicked}
                    <div className="buttons">
                        <Link to="/"><button className="NextButton Green"><b>SAVE</b></button></Link>
                    </div>
                </div>
            )
        }
        else{
            if (this.state.view === 0) {
                return (
                    <div>

                        <div className="Listing">
                            {this.generateMeal()}
                        </div>
                        Times clicked: {this.state.timesClicked}
                        <div className="buttons">
                            <button className="NextButton Green" onClick={this.saveAlert}><b>SAVE</b></button>
                        </div>
                    </div>)
            }
            else {
                if (this.state.swipednumber < 6) {
                    return (
                        <div className="Span">
                        <div style={wrapperStyles}>

                            {this.state.foods.length > 0 ? (
                                <div style={wrapperStyles}>

                                    <Swipeable
                                        buttons={({left, right}) => (
                                            <div style={actionsStyles}>
                                                <button className="tinderButton dislike fadeInLeft1" onClick={left}><b>Reject</b></button>
                                                <button className="tinderButton like fadeInLeft1" onClick={right}><b>Accept</b></button>
                                            </div>
                                        )}
                                        onAfterSwipe={this.remove}
                                        onSwipe={this.swipeItem}
                                    >

                                        <div className="FoodCard fadeInLeft0">
                                            <div className="FoodHeader">
                                                <b>{capitalizeFLetter(this.getname(this.state.swipednumber))}</b>
                                            </div>
                                            <div className="table">

                                                    <div className="tablerow1">
                                                        {this.recipePopupFromImage(this.getname(this.state.swipednumber),this.getimage(this.state.swipednumber))}
                                                    </div>
                                                    <div className="tablerow2">
                                                        {this.generateBadges(this.state.swipednumber)}
                                                    </div>
                                                    <div className="tablerow3">
                                                        {this.recipePopupForTinder(this.state.foods[this.state.swipednumber],this.getimage(this.state.swipednumber))}
                                                        {this.nutritionalPopupForTinder(this.state.foods[this.state.swipednumber])}
                                                    </div>
                                            </div>

                                        </div>
                                    </Swipeable>

                                </div>
                            ) : (
                                <div >
                                    <div className="FoodItem" zIndex={-2}>No more cards</div>
                                    <button className="NextButton Green"  onClick={() => this.setState({view: 0}) }>Recommendations</button>
                                    <button className="NextButton Green"  onClick={this.resetSwipes}>New Cards</button>
                                </div>
                            )}
                        </div>
                        </div>

                    )
                }
                else{
                    return(
                        <div >
                            <div className="FoodItem" zIndex={-2}>No more cards</div>
                            <button className="NextButton"  onClick={() => this.setState({view: 0}) }>Recommendations</button>
                            <button className="NextButton"  onClick={this.resetSwipes}>New Cards</button>
                        </div>
                    )
                }
            }

        }
    } */

    createCards() {
        let html = [];
        for (let i = 0; i < this.state.foods.length; i++) {
            const refName = "card"+ i;
            html.push(<div className="card"  ref={refName}>
                <div className="FoodHeader"><b>{capitalizeFLetter(this.state.foods[i])}</b></div>
                {this.recipePopupFromImage(this.getname(i),this.getimage(i))}
                {this.generateBadges(i)}
                <div className="tablerow3">
                    {this.recipePopupForTinder(this.state.foods[i],this.getimage(i))}
                    {this.nutritionalPopupForTinder(this.state.foods[i])}
                </div>
            </div>)

        }
        return html
    }

    generateView() {


        if(this.state.favorite){
            return(
                <div>
                    <div className="Listing">
                        favoritestate
                        {this.generateFavorites()}
                    </div>

                </div>
            )
        }
        else {
            if (this.state.view === 0) {

                return (
                    <div>

                        <div className="Listing">
                            {this.generateMeal()}
                        </div>
                        <div className="buttons">
                            <br/>
                            <button className="NextButton Green" onClick={this.saveAlert}><b>Recommend!</b></button>
                        </div>
                    </div>)
            }


            else {

                return (
                    <div>
                        <div id="viewport">
                            <div className="dislikeStack"><b>Dislike</b></div>
                            <div className="likeStack"><b>Like</b></div>
                            <ReactSwing
                                className="stack"
                                tagName="div"
                                setStack={stack => this.setState({ stack })}
                                ref={this.stackEl}
                                throwoutleft={()=>this.dislike("")}
                                throwoutright={()=>this.like("")}
                            >
                                {this.createCards()}
                            </ReactSwing>
                        </div>
                        <div className="buttons">
                            <br/>
                            <button className="NextButton Green" onClick={this.saveAlert}><b>Recommend!</b></button>
                        </div>
                    </div>
                )
            }
        }
    }

    generateFavorites() {
        let favorites = this.state.favorites;
        if(favorites==null||favorites==undefined){
            return;
        }
       // alert(JSON.stringify(favorites));
        let html = [];
        for (let i = 0; i < favorites.length; i++) {
            let currentfavorite=favorites[i];
            let name =currentfavorite["name"];
            let image=currentfavorite["image"];
            let badges = [];

            if(currentfavorite["tags"]==undefined){

            }
            else{
                if(currentfavorite["tags"].length!=0) {


                    if (currentfavorite["tags"].length <= 1) {
                        badges.push(<button className={"FoodBadge " + currentfavorite["tags"]}></button>)
                    } else {
                        currentfavorite["tags"].forEach(function (item, index) {
                            let badgeName = "FoodBadge " + item;
                            if (item === "15-minutes-or-less") {
                                badgeName = "FoodBadge fifteen-minutes-or-less";
                            }
                            badges.push(<button className={badgeName}></button>);

                        });
                    }
                }
            }


            let className = "FoodItem fadeInLeft" + i;
            const config = {
                onSwiped: ()=>this.endSwipe(),
                onSwipedLeft:()=>this.unlike(name),
                display:"flex",
                preventDefaultTouchmoveEvent: true,
                trackMouse: true,
                transition: "transform 1s ease",
                delta:10
            };
            let tryouy=1;
            let swipingspecials=[];
            if(this.state.showThumbs==name||this.state.translation!=undefined) {
                if (this.state.showThumbs == name || this.state.translation[name] != undefined) {
                    if (Math.abs(this.state.shadownr) > 10) {
                        if (this.state.shadownr > 0) {
                            swipingspecials.push(
                                <div>
                                    <img className="dislikedimagewithshadow2"/>
                                </div>
                            );
                        } else {
                            swipingspecials.push(
                                <div>
                                    <img className="dislikedimage2"/>
                                </div>
                            );
                        }
                    } else {
                        swipingspecials.push(
                            <div>
                                <img className="dislikedimage2"/>
                            </div>
                        );
                    }
                }
            }
            html.push(<div className="icanswipe"  >
                {swipingspecials}
                <Swiping onSwiping={(eventData => this.swiped(eventData,name))}  {...config}  >
                    <button   onMouseEnter={()=>this.setState({showThumbs:name})}
                              onMouseLeave={()=>this.setState({showThumbs:""})} className={className} style={{transform: this.transformfunc(name)
                        , opacity: this.transparfunc(name)} }  >
                        <div className="rowbutton">
                            <div className="columbuttonimage">
                                <img className="FoodPhoto" align="left" src={image} alt="Food"/>
                            </div>
                            <div className="columtitle">
                                <div className="foodtitle2"> <b className="FoodTitle">{name}</b> <br/> </div>
                                <div className="foodtags2">
                                    <div className="badgesContainer">
                                        {badges}
                                    </div>
                                </div>
                            </div>
                            <div className="informationbuttonscolum">
                                <div className="informationbutton1" onClick={() => {this.logAction("get recipe",name);this.sendRecipe(name)}}>
                                    {this.recipePopup(name,this.getimage(i))}
                                </div>
                                <div className="informationbutton2" onClick={() => {this.logAction("get nutritional values",name);this.sendNuttritionSimilar(name)}}>
                                {this.nutritionalPopup(name)}
                                    </div>
                            </div>
                        </div>
                    </button>
                </Swiping>
            </div>);
        }
        return html
    }

    generateBadges(food) {
        let badges = [];
        let assets = this.getAssets();

        if(assets!=undefined && assets.length>0){
            if(assets[food]!=undefined){
            assets[food].forEach(function (item, i) {
                let badgeName = "FoodBadge " + item;
                if (item === "15-minutes-or-less") {
                    badgeName = "FoodBadge fifteen-minutes-or-less";
                }
                badges.push(<InfoPopup  position='bottom center' content={<h5>{item}</h5>} trigger={<button className={badgeName}> </button>} />);

            });
        }}
        return badges;
    }

    //GENERATE MEAL
    generateMeal() {
        if (this.state.foods === undefined) {
            return
        }
        let foods = this.state.foods;
        let assets = this.getAssets();
        let html = [];

        for (let i = 0; i < foods.length; i++) {
            let name=capitalizeFLetter(foods[i]);
            let badges = [];

            if(assets!=undefined && assets.length>0){
                if(assets[i]!=undefined){
                    assets[i].forEach(function (item, i) {
                        let badgeName = "FoodBadge " + item;
                        if (item === "15-minutes-or-less") {
                            badgeName = "FoodBadge fifteen-minutes-or-less";
                        }
                        badges.push(<InfoPopup position='bottom center' content={<h5>{item}</h5>} trigger={<button className={badgeName}> </button>} />);
                    });
                }

            }
            //this.setState({translation: "translate(500%,10%)"});
            let className = "FoodItem fadeInLeft" + i;
            const config = {
                onSwiped: ()=>this.endSwipe(),
                onSwipedRight:()=>this.like(name),
                onSwipedLeft:()=>this.dislike(name),
                display:"flex",
                preventDefaultTouchmoveEvent: true,
                trackMouse: true,
                transition: "transform 1s ease",
                delta:10
            };
            let tryouy=1;
            let swipingspecials=[];
            if(this.state.showThumbs==name||this.state.translation!=undefined){
                if(this.state.showThumbs==name||this.state.translation[name]!=undefined) {
                    if(Math.abs(this.state.shadownr)>10){
                        if (this.state.shadownr>0){
                            swipingspecials.push(
                                <div>
                                    <img className="likedimage" />
                                    <img className="dislikedimagewithshadow" />
                                </div>
                            );
                        }
                        else{
                            swipingspecials.push(
                                <div>
                                    <img className="likedimagewithshadow" />
                                    <img className="dislikedimage" />
                                </div>
                            );
                        }
                    }
                    else{
                        swipingspecials.push(
                            <div>
                                <img className="likedimage" />
                                <img className="dislikedimage" />
                            </div>
                        );
                    }
                }
            }



            // <button className={className} onClick={this.increaseCounter}
            html.push(<div className="icanswipe"  >
                {swipingspecials}
                <Swiping onSwiping={(eventData => this.swiped(eventData,name))}  {...config}  >
                            <button   onMouseEnter={()=>this.setState({showThumbs:name})}
                                      onMouseLeave={()=>this.setState({showThumbs:""})} className={className} style={{transform: this.transformfunc(name)
                               , opacity: this.transparfunc(name)} } onClick={() => {}}  >
                                <div className="rowbutton">
                                    <div className="columbuttonimage">
                                        <img className="FoodPhoto" align="left" src={this.getimage(i)} alt="Food"/>
                                    </div>
                                    <div className="columtitle">
                                        <div className="foodtitle2"> <b className="FoodTitle">{name}</b> <br/> </div>
                                        <div className="foodtags2">
                                            <div className="badgesContainer">
                                                {badges}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="informationbuttonscolum">
                                        <div className="informationbutton1" onClick={() => {this.logAction("get recipe",name);this.sendRecipe(name)}}>
                                            {this.recipePopup(foods[i],this.getimage(i))}
                                        </div>
                                        <div className="informationbutton2" onClick={() => {this.logAction("get nutritional values",name);this.sendNuttritionSimilar(name)}} >
                                            {this.nutritionalPopup(foods[i])}
                                        </div>
                                    </div>
                                </div>
                            </button>
                </Swiping>
                        </div>)
        }

        return html
    }

    transformfunc(name) {
        if(this.state.translation!=undefined){
            return this.state.translation[name];
        }
        return "";

    }
    transparfunc(name){
        if(this.state.transparency!=undefined){
            return this.state.transparency[name];
        }
        return 1;
    }

    like(name){
        if(name==="") name = this.state.foods[this.state.foods.length-1];
        let f2 = name.toLowerCase();
        let users = JSON.parse(localStorage.getItem('users'));
        for (let i = users.length-1; i>=0; i--) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                let liked = users[i].Liked;
                let foods = this.state.foods;
                let tags = this.state.tags;
                let images = this.state.images;
                let t=0;
                for(let j=0;j<foods.length;j++){
                    if(foods[j]!=undefined){
                        let f1 = foods[j].toLowerCase();
                        if(f1===f2){
                            t=j;
                        }
                    }
                }

               // alert(liked.length);
                if( liked.length==undefined){
                    let newliked=[];
                    if(liked!=undefined){
                        newliked.push(liked);
                    }

                    newliked.push(f2);
                    liked=newliked;
                }
                else{

                    liked.push(f2);
                }

                foods.splice(t,1);
                this.setState({foods: foods});
                tags.splice(t,1);
                this.setState({tags: tags});
                images.splice(t,1);
                this.setState({images: images});

                this.setState({likedItems: liked});
                users[i].Liked = liked;
                localStorage.setItem("users", JSON.stringify(users));
                this.logAction("like", name);
               // alert(users[i].Liked);
                break;
            }
        }

    }

    unlike(name){
        let f2 = name.toLowerCase();
        let users = JSON.parse(localStorage.getItem('users'));
        for (let i = users.length -1; i>=0; i--) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                let liked = users[i].Liked;

                let t = 0;
                for (let j = 0; j < liked.length; j++) {
                    if(liked[j]!=undefined) {
                        let f1 = liked[j].toLowerCase();
                        if (f1 === f2) {
                            t = j;
                        }
                    }
                }
                if (liked==undefined){
                    liked=[];
                }

                liked.splice(t, 1);
                let favorites=this.state.favorites;
                favorites.splice(t,1);
                this.setState({liked: liked});
                this.setState({favorites: favorites});
                users[i].Liked = liked;
                localStorage.setItem("users", JSON.stringify(users));
                this.setState({likedItems: liked});
                this.logAction("unlike", name);

                break;
            }
            this.setState({favorite:true});
        }

    }
    dislike(name){

        if(name==="") name = this.state.foods[this.state.foods.length-1];
        let f2 = name.toLowerCase();
        let users = JSON.parse(localStorage.getItem('users'));
        for (let i = users.length -1; i>=0; i--) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                let disliked = users[i].Disliked;
                let foods = this.state.foods;
                let tags = this.state.tags;
                let images = this.state.images;
                let t = 0;
                for (let j = 0; j < foods.length; j++) {
                    if(foods[j]!=undefined) {
                        let f1 = foods[j].toLowerCase();
                        if (f1 === f2) {
                            localStorage.setItem("n", "kked")

                            t = j;
                        }
                    }
                }
                foods.splice(t, 1);
                this.setState({foods: foods});
                tags.splice(t, 1);
                this.setState({tags: tags});
                images.splice(t, 1);
                this.setState({images: images});

                if (disliked == null) {
                    disliked = [];
                }
                disliked.push(f2);
                this.setState({dislikedItems: disliked});
                users[i].Disliked = disliked;
                localStorage.setItem("users", JSON.stringify(users));
                this.logAction("dislike", f2);
                break;
            }
        }
    }

    logAction(thisAction, thisItem){
        let users = JSON.parse(localStorage.getItem('users'));
        for (let i = users.length-1; i>=0; i--){
            if(users[i].Name === localStorage.getItem('currentUser')){
                lastItem = thisItem;
                lastAction = thisAction;
                let item = [];
                item.push(Date.now());
                item.push(thisAction);
                let v = 0;
                if(JSON.parse(localStorage.getItem("viewInit")) === 0){
                    v = "list mode";
                }
                else v = "swipe mode";
                item.push(v);
                item.push(thisItem);
                users[i].Log.push(item);
                localStorage.setItem("users", JSON.stringify(users));
                break;
            }
        }
    }

    endSwipe(){
        this.setState({swiping: false});
        this.setState({shadownr: 0});
        let item = {};
        this.setState({translation: item, transparency: item});

    }

    swiped(eventData,name) {
        this.setState({swiping: true});
        this.setState({shadownr: eventData.deltaX});
        //show smiles
        let number=-1*eventData.deltaX;
        let item = {};
        item[name] = "translate("+number+"px,0%)";
        //alert(item[name]);
        let item2 = {};
        item2[name] = 10/Math.abs(eventData.deltaX);
        this.setState({translation: item, transparency: item2});
    }

    getname(i){
        if(this.state.foods!==undefined) {
            return this.state.foods[i];
        }
        return "";
    }

    getimage(i) {
        if(this.state.images!==undefined){
            return this.state.images[i];
        }
        return "";
    }


    //RENDER
    render() {

        if(this.state.favorite){
            return (
                <div className="App">
                    <header className="App-header">
                        <div className="PageHeader"> <b className="PageTitle">Favorites</b>
                            <Link to="/profile"><button title="profile" className="profile" ><b> </b></button></Link>
                            <button className="favorites" title="favorites" onClick={this.goToFavorites} ><b></b></button>
                            <button className="toRecommendButton" title="recommends" onClick={this.goToRecommends} ><b></b></button>
                        </div>
                        {this.generateView()}

                    </header>

                </div>
            );
        }


        // Favorites view
        else{
           let  estratext;
            if(this.state.tutor==undefined){
                estratext=(  <div className="PageHeader2" onClick={()=>this.setState({tutor:false})}> Slide to like or dislike, press recommend to get recommendations based on what you liked</div>
                );
            }
            return (
                <div className="App">
                    <header className="App-header">
                        <div className="PageHeader"> <b className="PageTitle">Recommendations</b>
                            <Link to="/profile"><button title="profile" className="profile" ><b> </b></button></Link>
                            <button className="favorites" title="favorites" onClick={this.goToFavorites} ><b></b></button>
                            <button className="toRecommendButton" title="recommends" onClick={this.goToRecommends} ><b></b></button>
                        </div>
                        {estratext}
                        {this.generateView()}

                    </header>
                </div>
            );

        }
        //<Link to="/recommendations"><button onclick={() => localStorage.setItem("favorite", JSON.stringify(true)} title="recommends" className="toRecommendButton" ><b> </b></button></Link>

    }
}

export default Recommendations;

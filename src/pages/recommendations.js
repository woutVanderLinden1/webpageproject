import React from 'react';
import './FoodPage.css';
import './Popup.css';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import Swipeable from "react-swipy";
import './tinderCards.css';
import Swal from "sweetalert2";


const wrapperStyles = {position: "relative", width: "250px", height: "250px"};
const actionsStyles = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
};
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

class Recommendations extends React.Component {
    constructor() {
        super();
        this.state = {
            timesClicked: 0,
            foods: ["Spicy rice", "Curry chicken", "Thai noodles", "Veggie Burritos", "Fish pie"],
            tags: [],
            images: [],
            recipe: [],
            nutrition: [],
            ingredients: [],
            similar: [],
            view: 0

        };
        //alert(this.state.foods);

        this.socket=this.initialiseSocket();
        this.sendable=false;
        this.increaseCounter = this.increaseCounter.bind(this);
        this.generateMeal    = this.generateMeal.bind(this);
        this.getRecommendations    = this.getRecommendations.bind(this);
        this.switchViews = this.switchViews.bind(this);
        this.generateView=this.generateView.bind(this);


        let payload={
            action: "initialise"
        };
        this.socket.onopen = () => {
            this.socket.send(JSON.stringify(payload));
            if (!this.sendable){
                this.sendable=true;
                this.getRecommendations();
            }

            // do something after connection is opened
        };
        this.socket.onmessage=((message) => {

            let translation=JSON.parse(message.data);
            console.log(translation);
            switch(translation.action){
                case "Recommends":

                    let initialfoods = translation.recommends;
                    let initialtags = translation.tags;
                    let initialimages = translation.images;
                    //initialfoods.randomise
                    let shuffled=this.filterfoods(initialfoods,initialtags,initialimages);
                    let filteredfoods=shuffled[0];
                    let filteredTags=shuffled[1];
                    let filteredImages=shuffled[2];

                    this.setState({tags: filteredTags});
                    this.setState({foods: filteredfoods});
                    this.setState({images: filteredImages});
                    break;
                case "Similar":
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
           //alert("message got "+JSON.stringify(translation));

           // alert(this.state.foods);

        });
        if(this.state.swipednumber==undefined){
            this.state.swipednumber=0;

        }

    }
    filterfoods(initialfoods,initialtags,initialimages){
        let shuffled=shuffle(initialfoods,initialtags,initialimages);
        let newinitialfoods=shuffled[0];
        let newinitialtags=shuffled[1];
        let newinitialimages=shuffled[2];

        //initialfoods shuffle
        let likedItems = JSON.parse(localStorage.getItem('likedItems'));
        if(likedItems==null){
            likedItems=[];
        }
        let  dislikedItems = JSON.parse(localStorage.getItem('dislikedItems'));
        if(dislikedItems==null){
            dislikedItems=[];
        }
        let filteredFoods  =[];
        let filteredtags  =[];
        let filteredimages  =[];
        let p=0;
        for (let i = 0; i<newinitialfoods.length ; i++) {

            if (newinitialfoods[i] !=="" && !likedItems.includes(newinitialfoods[i]) && !dislikedItems.includes(newinitialfoods[i])) {
                p++;
                filteredFoods.push(newinitialfoods[i]);
                filteredtags.push(newinitialtags[i]);
                filteredimages.push((newinitialimages[i]));
                //alert(initialfoods[i]);
            }

        }
        let answer=[]
        answer.push(filteredFoods,filteredtags,filteredimages);

        return answer;
    }

    initialiseSocket() {
        if(this.socket!=undefined){
            return this.socket;
        }
        return new WebSocket("ws://localhost:9000");
    }

    increaseCounter() {

        console.log("increased");
        let clicked = this.state.timesClicked + 1;
        this.setState({timesClicked: clicked})
    }
    getInfo(string) {
        this.sendRecipe(string);
        this.sendNuttritionSimilar(string);
    }
    sendRecipe(name) {
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
        let likedItems = JSON.parse(localStorage.getItem('likedItems'));
        if(likedItems==null){
            likedItems=[];
        }
       let  dislikedItems = JSON.parse(localStorage.getItem('dislikedItems'));
        if(dislikedItems==null){
            dislikedItems=[];
        }
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
        similarpayload.prolist = prolist;
        if(this.sendable!==undefined&&this.sendable) {
            this.socket.send(JSON.stringify(similarpayload));
        }
    }

    getRecommendations(recommendation){

        let likedItems = JSON.parse(localStorage.getItem('likedItems'));
        if(likedItems==null){
            likedItems=[];
        }
        let  dislikedItems = JSON.parse(localStorage.getItem('dislikedItems'));
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
        const names = ["vegetarian", "gluten-free", "low-carb", "vegan", "dairy-free","low-cholesterol","kosher","ramadan", "low-protein"];
        const likes = JSON.parse(localStorage.getItem('boxes'));

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

        if(this.sendable) {
            this.socket.send(JSON.stringify(payload));
        }
        /*
        Swal.fire({
            title: 'Results',
            text: "Waiting for results",
            icon: 'load',

        });

         */
    }

    //POPUP CODE
    nutritionalPopup(name){


        let nutritionLabels = ['Carbs','Total Fats', 'Sugar', 'Sodium', 'Protein', 'Saturated Fats', 'Carbohydrates'];
        let nutritionalInfo = this.getNutritionInfo(name);
        let nutritionalInfoHtml = [];
        let nutritionalInfoHtmlTemp = [];
        let explanationHtmlTemp = [];
        let similarMeals = this.getExplanation(name);
        if(nutritionalInfo!==undefined){
            for (let i = 0; i < nutritionalInfo.length; i++){

                nutritionalInfoHtmlTemp.push(
                    <div className = "popupText">
                        {nutritionLabels[i]}: {nutritionalInfo[i]}
                        <br/>

                    </div>);
            }
        }
        if(similarMeals!==undefined){
            for (let i = 0; i < similarMeals.length; i++) {

                explanationHtmlTemp.push(
                    <div className="popupText2">
                        <img className="FoodPhotoLarge3" align="left" src={similarMeals[i]["image"]} alt="Food"/>
                        {name[0]} is {similarMeals[i]["name"]}% similar to {similarMeals[i]["matchfactor"]}
                        <br/>

                    </div>);
            }
        }


        nutritionalInfoHtml.push(
            <div className="row:after">
                <div className="Nutritioncolumn">
                    <div className="popupTextTitle">
                        Nutritional info:
                        <br/>
                    </div>
                    {nutritionalInfoHtmlTemp}

                </div>
                <div className="column">
                    <div className="popupTextTitle2">
                        Similarities:
                        <br/>
                    </div>
                    {explanationHtmlTemp}
                </div>
            </div>

        );


        // onClick={this.sendNutritionSimilar(name)}

        let html = [
            <Popup modal trigger={<button className="IconLayout NutritionIcon" onClick={() => this.sendNuttritionSimilar(name)}>
            </button>} position="right center">
                <div className="popUp">
                    <div className="popupHeader">Nutritional info for
                        <br/>
                        {name}</div>
                    <br/>
                    {nutritionalInfoHtml}
                </div>
            </Popup>];

        return html;
    }
    recipePopup(name,number){

        //Recipe list
        let recept = this.getRecipe();
        let recipeHtmlTemp = [];
        let ingredients = this.getIngredients();
        let popUpHtml = [];
        let ingredientsHtmlTemp = [];


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
                    <div className="row">
                        <div className="popupTextTitle">
                            Ingredients:
                        <br/>
                        </div>
                        {ingredientsHtmlTemp}
                    </div>
                    <div className="row2">
                        <img className="FoodPhotoLarge" align="left" src={this.getimage(number)} alt="Food"/>
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
        //onClick={this.sendRecipe(name)}
        html.push(
            <Popup  modal trigger={<button className="IconLayout RecipeIcon" onClick={() => this.sendRecipe(name)}>

            </button>} position="right center" >
                <div className="popUp">
                    <div className="popupHeader">Recipe for
                        <br/>
                        {name}</div>
                    <br/>

                    {popUpHtml}
                </div>

            </Popup>);

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
        //return [428.5, 12.0, 112.0, 41.0, 19.0, 6.0, 27.0];

    }
    getExplanation(gerecht){
        //TODO implementeren
        return this.state.similar;
    }
    getImage(naam,id){
        return "./assets/dish.png";
/*
        let parsedName = naam.split(" ");
        let url = ["https://www.food.com/recipe/"];
        for (let i = 0; i < parsedName.length; i++){
            url.push(parsedName[i] + "-");
        }
        url.push("-" + id);
        */
    }
    getImages(foods){
        //TODO scrape this site
        //let images = []
       // for(let i = 0; i < foods.length; i++){
       //     images.push(this.getImage(foods[i][0], foods[i][1]));
       // }
        return this.state.images;
    }
    getAssets(foods){
        //TODO get relevant assets
        return [["Meat"], ["Meat", "Cheap"]];
    }
    getRecommendation(){
        //TODO implement
        return [['Cream  of spinach soup',76808] , ['Global gourmet  taco casserole', 59952]];
    }

    remove = () => {
        //this.state.swipednumber++;
        //this.setState(({cards}) => ({
        //    cards: cards.slice(1, cards.length),
        //}))
    };


    swipeItem(action,food) {

        let thisCard = food;
       // alert("swipednumber " +this.state.swipednumber);
        let k=this.state.swipednumber++;

       // alert("swipednumber " +this.state.swipednumber);

        let liked = JSON.parse(localStorage.getItem("likedItems"));
        let disliked = JSON.parse(localStorage.getItem("dislikedItems"));


        if (action === 'left') {

            let index = liked.indexOf(thisCard);
            if(index >= 0){
                liked.splice(index, 1);
            }
            if(!disliked.includes(thisCard)) {
                disliked.push(thisCard);
            }


        }
        else if (action === 'right') {
            let index = disliked.indexOf(thisCard);
            if(index >= 0){
                disliked.splice(index, 1);
            }
            if(!liked.includes(thisCard)){
                liked.push(thisCard);

            }

        }
        this.state.likedItems = liked;
        this.state.dislikedItems = disliked;
        this.setState({likedItems: liked, dislikedItems: disliked});
        localStorage.setItem("likedItems", JSON.stringify(this.state.likedItems));
        localStorage.setItem("dislikedItems", JSON.stringify(this.state.dislikedItems));

        //this.generateView();
    }

    switchViews() {
        this.state.swipednumber=0;
        const value = (this.state.view + 1) % 2;
        this.setState({view: value})
    }



    generateView() {
        if (this.state.view === 0) {
            return (
                <div>

                    <div>
                        {this.generateMeal()}
                    </div>
                    Times clicked: {this.state.timesClicked}
                    <div className="buttons">
                        <Link to="/"><button className="NextButton"><b>SAVE</b></button></Link>
                        <button className="NextButton" onClick={this.getRecommendations}>Test</button>
                    </div>
                </div>)
        }
        else {
            if (this.state.swipednumber < 6) {
                return (
                    <div style={wrapperStyles}>
                        {this.state.foods.length > 0 ? (
                            <div style={wrapperStyles}>
                                <Swipeable

                                    onAfterSwipe={this.remove}
                                    onSwipe={() => this.swipeItem(this.state.foods[this.state.swipednumber])}
                                >
                                    <div className="FoodCard">
                                        <div className="FoodHeader">
                                            <b>{this.getname(this.state.swipednumber)}</b>
                                        </div>
                                        <img className="FoodPhotoTinder" align="left"
                                             src={this.getimage(this.state.swipednumber)} alt="Food"/>
                                        buttons={({left, right}) => (
                                        <div style={actionsStyles}>
                                            <button className="tinderButton dislike" onClick={left}><b>Reject</b>
                                            </button>
                                            <button className="tinderButton like" onClick={right}><b>Accept</b></button>
                                        </div>
                                    )}

                                    </div>
                                </Swipeable>
                            </div>
                        ) : (
                            <div className="FoodItem" zIndex={-2}>No more cards</div>
                        )}
                    </div>

                )
            }
            else{
                return(
                    <div className="FoodItem" zIndex={-2}>No more cards</div>


                    )


            }
        }
    }

    //GENERATE MEAL
    generateMeal() {
      /*  let foods = ["Spicy rice", "Curry chicken", "Thai noodles", "Veggie Burritos", "Fish pie"];
        let images = ["https://www.dinneratthezoo.com/wp-content/uploads/2017/10/firecracker-chicken-1.jpg",
        "https://www.chelseasmessyapron.com/wp-content/uploads/2015/08/Coconut-Chicken-Curry-2.jpg",
        "https://minimalistbaker.com/wp-content/uploads/2019/01/Easy-Vegan-Pad-Thai-SQUARE.jpg",
        "https://assets.epicurious.com/photos/57978b27c9298e54495917d5/master/pass/black-bean-and-vegetable-burritos.jpg",
        "https://www.soscuisine.com/media/images/recettes/very_large/36.jpg?lang=en"];
        let assets = [
            ["Meat"],
            ["Meat", "Cheap"],
            ["Veggie", "DairyFree"],
            ["Veggie", "Cheap"],
            ["Fish", "Oven"]
        ]

*/

        if (this.state.foods === undefined) {
            return
        }
        let foods = this.state.foods;
        let images = this.getImages(foods);
        let assets = this.getAssets(foods);
        let html = [];


        for (let i = 0; i < foods.length; i++) {


            let badges = [];
            assets[1].forEach(function (item, index) {
                let badgeName = "FoodBadge " + item;
                //console.log(badgeName);
                badges.push(<button className={badgeName}> </button>);

            });
            let className = "FoodItem fadeInLeft" + i;
            // <button className={className} onClick={this.increaseCounter}
            html.push(<div>
                            <button className={className} onClick={() => this.getInfo(foods[i])}  >

                            <img className="FoodPhoto" align="left" src={this.getimage(i)} alt="Food"/>

                            <b className="FoodTitle">{foods[i]}</b> <br/>
                            {badges}

                            {this.recipePopup(foods[i],i)}
                            {this.nutritionalPopup(foods[i])}
                            </button>
                        </div>)

        }

        return html
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
        return (
            <div className="App">
                <header className="App-header">
                    <div className="PageHeader"> <b className="PageTitle">Recommendations</b>
                        <div className="sliderBox" >
                            <label className="switch">
                                <input type="checkbox"></input>
                                <span className="slider round" onClick={this.switchViews}></span>
                            </label>
                        </div>
                    </div>
                        {this.generateView()}
                </header>
            </div>
        );
    }


}

export default Recommendations;

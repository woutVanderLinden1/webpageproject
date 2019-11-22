import React from 'react';
import './FoodPage.css';
import './Popup.css';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";

class Recommendations extends React.Component {
    constructor() {
        super();
        this.state = {
            timesClicked: 0
        };
        this.increaseCounter = this.increaseCounter.bind(this);
        this.generateMeal    = this.generateMeal.bind(this);
    }

    increaseCounter() {
        let clicked = this.state.timesClicked + 1;
        this.setState({timesClicked: clicked})
    }

    getRecommendations(recommendation){
        //sendmessage(recommendation);
        //websocket.onmessage ((message) => {
            //whatever you want to do with the message
        //});
    }

    //POPUP CODE
    nutritionalPopup(name){
        let nutritionIcons = [<button className="IconLayout NutritionIcon"></button> ];

        let nutritionLabels = ['Carbs','Total Fats', 'Sugar', 'Sodium', 'Protein', 'Saturated Fats', 'Carbohydrates'];
        let nutritionalInfo = this.getNutritionInfo(name);
        let nutritionalInfoHtml = [];
        let nutritionalInfoHtmlTemp = [];
        let explanationHtmlTemp = [];
        let similarMeals = this.getExplanation(name);

        for (let i = 0; i < nutritionalInfo.length; i++){

            nutritionalInfoHtmlTemp.push(
                <div className = "popupText">
                    {nutritionLabels[i]}: {nutritionalInfo[i]}
                    <br/>

                </div>);
        }
        for (let i = 0; i < similarMeals.length; i++) {

            explanationHtmlTemp.push(
                <div className="popupText">
                    {name[0]} is {similarMeals[i][1]}% similar to {similarMeals[i][0]}
                    <br/>

                </div>);
        }

        nutritionalInfoHtml.push(
            <div className="row:after">
                <div className="column">
                    <div className="popupTextTitle">
                        Nutritional info:
                        <br/>
                    </div>
                    {nutritionalInfoHtmlTemp}

                </div>
                <div className="column">
                    <div className="popupTextTitle">
                        Similarities:
                        <br/>
                    </div>
                    {explanationHtmlTemp}
                </div>
            </div>

        );




        let html = [
            <Popup modal trigger={
                <div>
                    <button>
                        {nutritionIcons}
                    </button>
                </div>} position="right center">
                <div className="popUp">
                    <div className="popupHeader">Nutritional info for
                        <br/>
                        {name[0]}</div>
                    <br/>

                    {nutritionalInfoHtml}
                </div>

            </Popup>]

        return html;
    }
    recipePopup(name){
        let recipeIcons = [<button className="IconLayout RecipeIcon"></button> ];
        //Recipe list
        let recept = this.getRecipe(name);
        let recipeHtmlTemp = []
        let ingredients = this.getIngredients(name);
        let popUpHtml = [];
        let ingredientsHtmlTemp = [];




        for (let i = 0; i < ingredients.length; i++){
            ingredientsHtmlTemp.push(
                <div className = "popupText">
                    {ingredients[i]}
                    <br/>

                </div>)
        }
        for (let i = 0; i < recept.length; i++){

            recipeHtmlTemp.push(
                <div className = "popupText">
                    {i + 1}. {recept[i]}
                    <br/>

                </div>)
        }


        popUpHtml.push(
            <div className="row:after">
                <div className="column">
                    <div className="popupTextTitle">
                        Ingredients:
                        <br/>
                    </div>
                    {ingredientsHtmlTemp}

                </div>
                <div className="column">
                    <div className="popupTextTitle">
                        Steps:
                        <br/>
                    </div>
                    {recipeHtmlTemp}
                </div>
            </div>

        );




        let html = [
            <Popup  modal trigger={
                <div>
                    <button>
                        {recipeIcons}
                    </button>
                </div>} position="right center">
                <div className="popUp">
                    <div className="popupHeader">Recipe for
                        <br/>
                        {name[0]}</div>
                    <br/>

                    {popUpHtml}
                </div>

            </Popup>]

        return html;
    }



    //GET DATA
    getIngredients(gerecht){
        //TODO implementeren
        return [['pineapple tidbits'],[ 'vegetable oil'],[ 'garlic cloves'],[ 'yellow onion'],[ 'celery'],[ 'rice'],[ 'salt'],[ 'ground cumin'],[ 'ground ginger'],[ 'turmeric'],[ 'cayenne pepper'],[ 'chicken broth'],[ 'raisins'],[ 'frozen peas'],[ 'green onion']];
     }
    getRecipe(gerecht){
        //TODO implementeren
        return [['drain pineapple' ],[ 'reserve juice'],[ 'heat oil in large skillet'],[ 'saute garlic '],[' onion '],[' and celery until onion is soft'],[ 'stir in rice' ],[ 'reserved juice' ],[ 'seasonings '],[ 'chicken broth and raisins'],[ 'bring to a boil'],[ 'cover '],[ 'simmer 20 minutes until rice is tender'],[ 'stir in peas '],[' green onion and pineapple'] ];

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
        return [428.5, 12.0, 112.0, 41.0, 19.0, 6.0, 27.0];

    }
    getExplanation(gerecht){
        //TODO implementeren
        return [["Thai Rice", 83],["Spicy Chicken", 76],["Random meal",72]];
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
        let images = []
        for(let i = 0; i < foods.length; i++){
            images.push(this.getImage(foods[i][0], foods[i][1]));
        }
        return images;
    }
    getAssets(foods){
        //TODO get relevant assets
        return [["Meat"], ["Meat", "Cheap"]];
    }
    getRecommendation(){
        //TODO implement
        return [['Cream  of spinach soup',76808] , ['Global gourmet  taco casserole', 59952]];
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
        let foods = this.getRecommendation();
        let images = this.getImages(foods);
        let assets = this.getAssets(foods);
        let html = [];


        for (let i = 0; i < foods.length; i++) {


            let badges = [];
            assets[i].forEach(function (item, index) {
                let badgeName = "FoodBadge " + item;
                console.log(badgeName);
                badges.push(<button className={badgeName}> </button>);

            });
            let className = "FoodItem fadeInLeft" + i;
            html.push(<div>
                                                <button className={className} onClick={this.increaseCounter}>
                                                    <img className="FoodPhoto" align="left" src={images[i]} alt="Food"/>
                                                    <b className="FoodTitle">{foods[i][0]}</b> <br/>
                                                    {badges}

                                                    {this.recipePopup(foods[i])}
                                                    {this.nutritionalPopup(foods[i])}
                                                </button>
                                                </div>)

        }

        return html
    }

    //RENDER
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="PageHeader"> <b className="PageTitle">Recommendations</b>
                    </div>
                    <div>
                        {this.generateMeal()}
                    </div>
                    Times clicked: {this.state.timesClicked}
                    <Link to="/"><button className="NextButton"><b>SAVE</b></button></Link>

                </header>
            </div>
        );
    }

}

export default Recommendations;

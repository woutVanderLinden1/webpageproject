import React from 'react';
import './FoodPage.css';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import sendmessage from "App";
import {websocket} from "App";

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
        sendmessage(recommendation);
        websocket.onmessage ((message) => {
            //whatever you want to do with the message
        });
    }

    //POPUP CODE
    nutritionalPopup(name, food){
       //TODO get nutritional info
        let nutritionIcons = [<button className="IconLayout NutritionIcon"></button> ];

        let nutritionLabels = ['Carbs','Total Fats', 'Sugar', 'Sodium', 'Protein', 'Saturated Fats', 'Carbohydrates'];
        let nutritionalInfo = this.getNutritionInfo(name);
        let nutritionalInfoHtml = []
        nutritionalInfoHtml.push(<div className="Recipe">
                Nutritional info:
            </div>
        );
        for (let i = 0; i < nutritionalInfo.length; i++){

            nutritionalInfoHtml.push(
                <div className = "Recipe">
                    {nutritionLabels[i]}: {nutritionalInfo[i]}
                    <br/>

                </div>)
        }
        let html = [
            <Popup modal trigger={
                <div>
                    <button>
                        {nutritionIcons}
                    </button>
                </div>} position="right center">
                <div className="RecipeTitle"><h2> Nutritional info for {name}</h2></div>
                <br/>

                {nutritionalInfoHtml}

            </Popup>]

        return html;
    }
    recipePopup(name, food){
        let recipeIcons = [<button className="IconLayout RecipeIcon"></button> ];
        //Recipe list
        let recept = this.getRecipe(name);
        let recipeHtml = []
        recipeHtml.push(<div className="Recipe">
                Steps:
            </div>
        );
        for (let i = 0; i < recept.length; i++){

            recipeHtml.push(
                <div className = "Recipe">
                    {i + 1}. {recept[i]}
                    <br/>

                </div>)
        }

        //Ingredients list
        let ingredients = this.getIngredients(name);
        let ingredientsHtml = []
        ingredientsHtml.push(<div className="Recipe">
                Ingredients:
            </div>
        );
        for (let i = 0; i < ingredients.length; i++){
            ingredientsHtml.push(
                <div className = "Recipe">
                    {ingredients[i]}
                    <br/>

                </div>)
        }

        let html = [
            <Popup modal trigger={
                <div>
                    <button>
                        {recipeIcons}
                    </button>
                </div>} position="right center">
                <div className="RecipeTitle"><h2>Recipe for {name}</h2></div>
                <br/>

                {ingredientsHtml}

                {recipeHtml}
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

    //GENERATE MEAL
    generateMeal() {
        let foods = ["Spicy rice", "Curry chicken", "Thai noodles", "Veggie Burritos", "Fish pie"];
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


        let html = [];


        for (let i = 1; i <= 5; i++) {


            let badges = [];
            assets[i-1].forEach(function (item, index) {
                let badgeName = "FoodBadge " + item;
                console.log(badgeName);
                badges.push(<button className={badgeName}> </button>);

            });
            let className = "FoodItem fadeInLeft" + i;
            html.push(<div>
                                                <button className={className} onClick={this.increaseCounter}>
                                                    <img className="FoodPhoto" align="left" src={images[i-1]} alt="Food"/>
                                                    <b className="FoodTitle">{foods[i-1]}</b> <br/>
                                                    {badges}

                                                    {this.recipePopup(foods[i-1], i-1)}
                                                    {this.nutritionalPopup(foods[i-1], i-1)}
                                                </button>
                                                </div>)

        }

        return html
    }
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

import React from 'react';
import './FoodPage.css';
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

    getRecommendations(){

    }

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
            html.push(<Popup modal trigger={<div>
                                                <button className={className} onClick={this.increaseCounter}>
                                                    <img className="FoodPhoto" align="left" src={images[i-1]} alt="Food"/>
                                                    <b className="FoodTitle">{foods[i-1]}</b> <br/>
                                                    {badges}
                                                </button>
                                            </div>} position="right center">
                        <div><h2>Recipe for {foods[i-1]}</h2></div>
                    </Popup>)
        }
        return html
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    Here are your recommendations.
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

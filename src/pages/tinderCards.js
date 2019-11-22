import React, {Component} from "react";
import Swipeable from "react-swipy";
import './tinderCards.css'
import {Link} from "react-router-dom";


const wrapperStyles = {position: "relative", width: "250px", height: "250px"};
const actionsStyles = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
};

class TinderCards extends Component {


    constructor(props) {
        super(props);
        this.swipeItem = this.swipeItem.bind(this);
        let likedItems = [];
        let dislikedItems = [];
        if(localStorage.getItem("likedItems") != null){
            likedItems = JSON.parse(localStorage.getItem("likedItems"));
        }
        else localStorage.setItem("likedItems", JSON.stringify(likedItems));
        if(localStorage.getItem("dislikedItems") != null){
            dislikedItems = JSON.parse(localStorage.getItem("dislikedItems"));
        }
        else localStorage.setItem("dislikedItems", JSON.stringify(dislikedItems));
        this.state = {
            cards: ["Spicy Rice", "Ice Cream", "Chicken Tikka Masala"],
            likedItems: likedItems,
            dislikedItems: dislikedItems,
        };
    }

    remove = () =>
        this.setState(({cards}) => ({
            cards: cards.slice(1, cards.length),
        }));


    swipeItem(action) {
        let thisCard = this.state.cards[0];


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
        localStorage.setItem("likedItems", JSON.stringify(this.state.likedItems));
        localStorage.setItem("dislikedItems", JSON.stringify(this.state.dislikedItems));

    }



    render() {
        const {cards} = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <div className="PageHeader"> <b className="PageTitle">Recommendations</b>
                    </div>
                    <div style={wrapperStyles}>
                        {cards.length > 0 ? (
                            <div style={wrapperStyles}>
                                <Swipeable
                                    buttons={({left, right}) => (
                                        <div style={actionsStyles}>
                                            <button className="tinderButton dislike" onClick={left}><b>Reject</b></button>
                                            <button className="tinderButton like" onClick={right}><b>Accept</b></button>
                                        </div>
                                    )}
                                    onAfterSwipe={this.remove}
                                    onSwipe={this.swipeItem}
                                >
                                    <div className="FoodCard">
                                        <div className="FoodHeader">
                                            <b>{cards[0]}</b>
                                        </div>
                                        <p>
                                            Recipe goes here.
                                        </p>
                                    </div>
                                </Swipeable>
                            </div>
                        ) : (
                            <div className="FoodItem" zIndex={-2}>No more cards</div>
                        )}
                    </div>
                </header>
            </div>

        );
    }
}

export default TinderCards;
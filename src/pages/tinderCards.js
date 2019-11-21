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
    state = {
        cards: ["Spicy Rice", "Ice Cream", "Chicken Tikka Masala"],
        likedItems: [],
        dislikedItems: [],
    };

    constructor(props) {
        super(props);
        this.swipeItem = this.swipeItem.bind(this)
    }

    remove = () =>
        this.setState(({cards}) => ({
            cards: cards.slice(1, cards.length),
        }));


    swipeItem(action) {
        if (action === 'left') {
            let liked = this.state.likedItems;
            liked.push(this.state.cards[0]);
            this.setState({likedItems: liked});
        }
        else if (action === 'right') {
            let disliked = this.state.dislikedItems;
            disliked.push(this.state.cards[0]);
            this.setState({dislikedItems: disliked});
        }

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
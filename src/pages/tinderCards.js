import React, {Component} from "react";
import Swipeable from "react-swipy";
import './tinderCards.css'


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
        counter: 0
    };

    constructor() {
        super();
        this.swipeItem()
    }

    remove = () =>
        this.setState(({cards}) => ({
            cards: cards.slice(1, cards.length),
        }));

    swipeItem(action) {
        this.setState({counter: this.state.counter + 1})
        if (action === 'left') {
            this.setState({likedItems: this.state.likedItems.add(this.state.cards[this.state.counter])})
        }
        else if (action === 'right') {

        }
    }

    render() {
        const {cards} = this.state;

        return (
            <div className="App">
                <div style={wrapperStyles}>
                    {cards.length > 0 ? (
                        <div style={wrapperStyles}>
                            <Swipeable
                                buttons={({left, right}) => (
                                    <div style={actionsStyles}>
                                        <button onClick={left}>Reject</button>
                                        <button onClick={right}>Accept</button>
                                    </div>
                                )}
                                onAfterSwipe={this.remove}
                                onSwipe={}
                            >
                                <div className="FoodCard">
                                    <div className="FoodHeader">
                                        <b>{cards[0]}</b>
                                    </div>
                                    Recipe goes here.
                                </div>
                            </Swipeable>
                        </div>
                    ) : (
                        <div className="FoodItem" zIndex={-2}>No more cards</div>
                    )}
                </div>
            </div>
        );
    }
}

export default TinderCards;
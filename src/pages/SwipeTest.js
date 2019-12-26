import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ReactSwing from "react-swing";

class SwipeTest extends Component {
    stackEl = React.createRef();

    constructor(props, context) {
        super(props, context);

        // An instance of the Stack
        this.state = {
            stack: null,
            foods: ["Turkey", "Ham", "Pineapple", "Test", 'Seeds']
        };

        this.createCards = this.createCards.bind(this);
    }

    createCards() {
        let html = [];
        for (let i = 0; i < this.state.foods.length; i++) {
            const refName = "card"+ i;
            html.push(<div className="card clubs" ref={refName}>
                <div className="FoodHeader"><b>{this.state.foods[i]}</b></div>

            </div>)
        }
        return html
    }

    render() {
        return (
            <div>
                <div id="viewport">
                    <div className="dislikeStack"><b>Dislike</b></div>
                    <div className="likeStack"><b>Like</b></div>
                    {/*ReactSwing Element*/}
                    <ReactSwing
                        className="stack"
                        tagName="div"
                        setStack={stack => this.setState({ stack })}
                        ref={this.stackEl}
                    >
                        {/*children elements is will be Card*/}
                        {this.createCards()}
                    </ReactSwing>
                </div>
            </div>
        );
    }
}

export default SwipeTest;
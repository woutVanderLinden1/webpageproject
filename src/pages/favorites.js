import React from 'react';
import './FoodPage.css';
import './Popup.css';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import Swipeable from "react-swipy";
import {Swipeable as Swiping} from "react-swipeable";
import './tinderCards.css';
import Swal from "sweetalert2";
import styled from "styled-components";
import {  Popup as InfoPopup } from "semantic-ui-react";
import Recommendations from "./recommendations";

class Favorites extends React.Component {
    constructor() {
        super();
        this.generateView=this.generateView.bind(this);
        this.generateFavorites=this.generateFavorites.bind(this);
    }


    generateView(){
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

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="PageHeader"> <b className="PageTitle">Favorites</b>
                        <Link to="/profile"><button title="profile" className="profile" ><b> </b></button></Link>
                        <button className="favorites" title="favorites" onClick={this.goToFavorites} ><b></b></button>
                    </div>
                    {this.generateView()}
                    <div className="sliderBox" >
                        <label className="switch">
                            <input type="checkbox"></input>
                            <span className="slider round" onClick={this.switchViews}></span>
                        </label>
                    </div>
                </header>

            </div>
        );
    }
}
export default Favorites;

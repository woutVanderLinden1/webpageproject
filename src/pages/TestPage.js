import React from "react";
import './loginpage.css';
//my key : AIzaSyDq5mcEWM7xLE2ptKxma3bCQYY-p0C2D6I
//https://www.googleapis.com/customsearch/v1?key=YOUR-KEY&cx=017576662512468239146:omuauf_lfve&q=tomato&callback=hndlr


class BackgroundImagePage extends React.Component{
    constructor(props){
        super(props);
        this.state = "name";
    }



    renderItem(){
        console.log("hi");
        let socket = new WebSocket("ws://localhost:9000");
        let payload = {
            account: {vegan: 1,  easy: 1, preparation: 1},
            amount: 3
        };

        socket.onmessage = (message) => {

            console.log(message);
            socket.send(message);
            // handle message from backend
        }
        socket.onopen = () => {
            socket.send(JSON.stringify(payload));
            // do something after connection is opened
        }
        return("hi")
    }
    // triggered when backend broadcasts a message



    render(){
        return(
            <div > {this.renderItem()} hi {this.state}</div>
        )
    }
}

export default  BackgroundImagePage;

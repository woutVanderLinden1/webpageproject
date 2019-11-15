import React from 'react';
//import './App.css';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: props.checked,
            name: props.name,
            id: props.id
        };
    }
    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
        let boxesCopy = JSON.parse(localStorage.getItem("boxes"));
        for(let i = 0; i<boxesCopy.length;i++){

                boxesCopy[this.state.id] = !boxesCopy[this.state.id];
                break;

        }
        localStorage.setItem("boxes", JSON.stringify(boxesCopy))
    }
    render() {
        return (
            <label>
                <input type="checkbox"
                       checked={this.state.isChecked}
                       onChange={this.toggleChange}
                />
                {this.state.name}
            </label>
        );
    }
}

export default Checkbox;
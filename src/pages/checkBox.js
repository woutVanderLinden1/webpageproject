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
        localStorage.setItem(this.state.id, !this.state.isChecked)
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
import React from 'react';
import './Profile.css';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: props.checked,
            name: props.name,
            id: props.id,
            prefs : props.prefs
        };
    }
    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
        let users = JSON.parse(localStorage.getItem('users'));
        for(let i = 0; i<users.length; i++) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                let prefs = users[i].booleansPreferences;
                let all = users[i].booleanAllergies;
                if (this.state.prefs === true) {

                        prefs[this.state.id] = !prefs[this.state.id];
                        users[i].booleansPreferences = prefs;

                }
                else {
                        all[-this.state.id -1] = !all[-this.state.id -1];
                        users[i].booleanAllergies = all;

                }


            }
        }

        localStorage.setItem("users", JSON.stringify(users))
    }
    render() {
        return (
            <li>
                <input type="checkbox"
                       checked={this.state.isChecked}
                       onChange={this.toggleChange}
                       id={this.state.id}
                />
            <label for={this.state.id}>
                {this.state.name}
            </label>
            </li>

        );
    }
}

export default Checkbox;
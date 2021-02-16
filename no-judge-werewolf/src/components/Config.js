import React from 'react'

import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

import './css/Config.css'

class Config extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 9,
            enabled_roles: ['Ancient', 'Savior'],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRoleToggle = this.handleRoleToggle.bind(this);
    }

    handleChange(event) {
        var x = { ...this.state };
        x.count = event.target.value;
        this.setState(x);
    }

    handleSubmit(event) {
        this.setState({
            count: event.target.value,
        });
        this.props.cb(this.state.count, this.state.enabled_roles)
        event.preventDefault();
    }

    handleRoleToggle(selected_roles) {
        console.log(selected_roles);
        this.setState({ enabled_roles: selected_roles });
    }

    render() {
        if (this.props.enabled) {
            return (
                <div>
                    <p>請輸入遊戲配置：</p>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            人數:
          <select value={this.state.count} onChange={this.handleChange}>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                            </select>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>

                    <ToggleButtonGroup
                        type="checkbox"
                        value={this.state.enabled_roles}
                        onChange={this.handleRoleToggle}
                        className="mb-2">
                        <ToggleButton value='Ancient'>長老</ToggleButton>
                        <ToggleButton value='Savior'>守衛</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            );
        }

        return (
            <div></div>
        );
    }
}

export default Config;
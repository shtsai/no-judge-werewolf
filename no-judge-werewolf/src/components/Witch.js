import React from 'react'

import './css/Witch.css'

class Witch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Witch',
            selected: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if (this.state.selected === null) {
            alert('You must select something');
            return;
        }
        this.props.cb(this.state.selected);
    }

    render() {
        if (this.props.current === this.state.name) {
            let saveClassName = this.state.selected === true ? "save selected" : "save";
            let notSaveClassName = this.state.selected === false ? "not-save selected" : "not-save";
            return (
                <div className="Witch">
                    <p>女巫請睜眼</p>
                    <p>今晚死的是：{this.props.killed}</p>
                    <button
                        className={saveClassName}
                        onClick={() => this.setState({ selected: true })}>救</button>
                    <button
                        className={notSaveClassName}
                        onClick={() => this.setState({ selected: false })}>不救</button>
                    <div onClick={this.handleSubmit} className="board-row">
                        <button className="confirmation">確認</button>
                    </div>
                </div>
            );
        }

        return (
            <div></div>
        );
    }
}

export default Witch;
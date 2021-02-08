import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      werewolf_enabled: true,
      killed_by_werewolf: null,
      witch_enabled: false,
    };

    this.werewolf_complete_cb = this.werewolf_complete_cb.bind(this);
    this.witch_complete_cb = this.witch_complete_cb.bind(this);
    this.is_finished = this.is_finished.bind(this);
  }

  werewolf_complete_cb(killed) {
    this.setState({ werewolf_enabled: false, killed_by_werewolf: killed, witch_enabled: true });
  }

  witch_complete_cb(event) {
    var x = { ... this.state };
    x.witch_enabled = false;
    if (event.target.value === 'true') {
      x.killed_by_werewolf = null;
    }
    this.setState(x);
  }

  is_finished() {
    return !this.state.werewolf_enabled && !this.state.witch_enabled;
  }

  render() {
    var title = this.is_finished() ? "天亮了：" : "天黑請閉眼";
    return (
      <div className="App">
        <header className="App-header">
          <p>{title}</p>
          <Werewolf enabled={this.state.werewolf_enabled} cb={this.werewolf_complete_cb} />

          <Witch enabled={this.state.witch_enabled} killed={this.state.killed_by_werewolf} cb={this.witch_complete_cb} />

          {this.is_finished() ? <Result killed={this.state.killed_by_werewolf} /> : ''}
        </header>
        <p>Dead: {this.state.killed_by_werewolf}</p>
        <p>witch enabled: {this.state.witch_enabled ? 1 : 0}</p>
      </div>
    );
  }
}

class Result extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var msg = this.props.killed === null ? "昨晚是平安夜" : "昨晚死的是：" + this.props.killed;
    return (
      <div className="Result">
        <p>{msg}</p>
      </div>
    );
  }
}

class Witch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.enabled) {
      return (
        <div className="Witch">
          <p>女巫請睜眼</p>
          <p>今晚死的是：{this.props.killed}</p>
          <button value={true} onClick={this.props.cb}>救</button>
          <button value={false} onClick={this.props.cb}>不救</button>
        </div>
      );
    }

    return (
      <div></div>
    );
  }
}


class Werewolf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      killed: -1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var x = { ... this.state };
    x.killed = event.target.value;
    this.setState(x);
  }

  handleSubmit(event) {
    this.setState({
      killed: event.target.value,
    });
    this.props.cb(this.state.killed)
    event.preventDefault();
  }

  render() {
    if (this.props.enabled === true) {
      return (
        <div>
          <p>狼人請睁眼：</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              今晚杀:
          <input type="text" value={this.state.killed} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }

    return (
      <div></div>
    );
  }
}

export default App;

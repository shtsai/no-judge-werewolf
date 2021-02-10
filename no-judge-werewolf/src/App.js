import React from 'react'
import Werewolf from './components/Werewolf'
import Witch from './components/Witch'
import Result from './components/Result'
import Savior from './components/Savior'
import Config from './components/Config'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config_enabled: true,
      savior_enabled: false,
      werewolf_enabled: false,
      witch_enabled: false,

      player_count: null,
      killed_by_werewolf: null,
      saved_by_witch: null,
      saved_by_savior: null,
    };

    this.config_complete_cb = this.config_complete_cb.bind(this);
    this.savior_complete_cb = this.savior_complete_cb.bind(this);
    this.werewolf_complete_cb = this.werewolf_complete_cb.bind(this);
    this.witch_complete_cb = this.witch_complete_cb.bind(this);
    this.is_finished = this.is_finished.bind(this);
  }

  config_complete_cb(count) {
    this.setState({ config_enabled: false, player_count: count, savior_enabled: true });
  }

  savior_complete_cb(saved) {
    this.setState({ savior_enabled: false, saved_by_savior: saved, werewolf_enabled: true });
  }

  werewolf_complete_cb(killed) {
    this.setState({ werewolf_enabled: false, killed_by_werewolf: killed, witch_enabled: true });
  }

  witch_complete_cb(event) {
    var x = { ...this.state };
    x.witch_enabled = false;
    if (event.target.value === 'true') {
      x.saved_by_witch = x.killed_by_werewolf;
    }
    this.setState(x);
  }

  is_finished() {
    return !this.state.werewolf_enabled && !this.state.witch_enabled && !this.state.savior_enabled;
  }

  render() {
    var title = this.is_finished() ? "天亮了：" : "天黑請閉眼";
    return (
      <div className="App">
        <header className="App-header">
          <p>{title}</p>
          <Config enabled={this.state.config_enabled} cb={this.config_complete_cb} />

          <Savior
            enabled={this.state.savior_enabled}
            player_count={this.state.player_count}
            cb={this.savior_complete_cb}
          />

          <Werewolf
            enabled={this.state.werewolf_enabled}
            player_count={this.state.player_count}
            cb={this.werewolf_complete_cb}
          />

          <Witch enabled={this.state.witch_enabled} killed={this.state.killed_by_werewolf} cb={this.witch_complete_cb} />

          <Result
            enabled={!this.state.config_enabled && this.is_finished()}
            killed_by_werewolf={this.state.killed_by_werewolf}
            saved_by_witch={this.state.saved_by_witch}
            saved_by_savior={this.state.saved_by_savior}
          />

        </header>

        {/* <p>Dead: {this.state.killed_by_werewolf}</p>
        <p>witch enabled: {this.state.witch_enabled ? 1 : 0}</p>
        <p>saved: {this.state.saved_by_savior}</p>
        <p>player count: {this.state.player_count}</p> */}
      </div>
    );
  }
}

export default App;

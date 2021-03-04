import React from 'react'
import Config from './components/Config'
import Game from './components/Game'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player_count: null,
      orders: null,

      config_enabled: true,
      game_start: false,
    };

    this.config_complete_cb = this.config_complete_cb.bind(this);
  }

  config_complete_cb(count, enabled_roles) {
    let orders = [
      'Ancient',
      'Savior',
      'Werewolf',
      'Witch',
      'Result',
    ];
    if (!enabled_roles.includes('Ancient')) {
      orders = orders.filter(x => x !== 'Ancient');
    }
    if (!enabled_roles.includes('Savior')) {
      orders = orders.filter(x => x !== 'Savior');
    }

    this.setState({
      player_count: count,
      orders: orders,
      config_enabled: false,
      game_start: true,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Config enabled={this.state.config_enabled} cb={this.config_complete_cb} />

          <Game
            enabled={this.state.game_start}
            player_count={this.state.player_count}
            orders={this.state.orders}
          />
        </header>
      </div>
    );
  }
}

export default App;

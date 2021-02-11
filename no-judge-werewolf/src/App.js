import React from 'react'
import Werewolf from './components/Werewolf'
import Witch from './components/Witch'
import Result from './components/Result'
import Savior from './components/Savior'
import Ancient from './components/Ancient'
import Config from './components/Config'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player_count: null,
      orders: null,
      current: 'Config',

      ancient_index: null,
      killed_by_werewolf: null,
      saved_by_witch: null,
      saved_by_savior: null,
    };

    this.next_role = this.next_role.bind(this);
    this.config_complete_cb = this.config_complete_cb.bind(this);
    this.ancient_complete_cb = this.ancient_complete_cb.bind(this);
    this.savior_complete_cb = this.savior_complete_cb.bind(this);
    this.werewolf_complete_cb = this.werewolf_complete_cb.bind(this);
    this.witch_complete_cb = this.witch_complete_cb.bind(this);
    this.is_finished = this.is_finished.bind(this);
  }

  next_role(orders) {
    let current = this.state.current;
    console.log(current);
    let index = orders.indexOf(current);
    console.log(index);
    if (index === orders.size) {
      // Reach end
      this.setState({ current: null });
    } else {
      this.setState({ current: orders[index + 1] });
    }
  }

  config_complete_cb(count, enabled_roles) {
    let orders = [
      'Config',
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

    this.setState({ player_count: count, orders: orders });
    this.next_role(orders);
  }

  ancient_complete_cb(ancient_index) {
    this.setState({ ancient_index: ancient_index });
    this.next_role(this.state.orders);
  }

  savior_complete_cb(saved) {
    this.setState({ saved_by_savior: saved });
    this.next_role(this.state.orders);
  }

  werewolf_complete_cb(killed) {
    this.setState({ killed_by_werewolf: killed });
    this.next_role(this.state.orders);
  }

  witch_complete_cb(event) {
    var x = { ...this.state };
    if (event.target.value === 'true') {
      x.saved_by_witch = x.killed_by_werewolf;
    }
    this.setState(x);
    this.next_role(this.state.orders);
  }

  is_finished() {
    return this.state.current === 'Result';
  }

  render() {
    var title = this.is_finished() ? "天亮了：" : "天黑請閉眼";
    return (
      <div className="App">
        <header className="App-header">
          <p>{title}</p>
          <Config current={this.state.current} cb={this.config_complete_cb} />

          <Ancient
            current={this.state.current}
            player_count={this.state.player_count}
            cb={this.ancient_complete_cb}
          />

          <Savior
            current={this.state.current}
            player_count={this.state.player_count}
            cb={this.savior_complete_cb}
          />

          <Werewolf
            current={this.state.current}
            player_count={this.state.player_count}
            cb={this.werewolf_complete_cb}
          />

          <Witch
            current={this.state.current}
            killed={this.state.killed_by_werewolf}
            cb={this.witch_complete_cb} />

          <Result
            current={this.state.current}
            killed_by_werewolf={this.state.killed_by_werewolf}
            saved_by_witch={this.state.saved_by_witch}
            saved_by_savior={this.state.saved_by_savior}
            ancient_index={this.state.ancient_index}
          />

        </header>

        <p>Dead: {this.state.killed_by_werewolf}</p>
        <p>saved: {this.state.saved_by_savior}</p>
        <p>player count: {this.state.player_count}</p>
        <p>Ancient index: {this.state.ancient_index}</p>
        <p>enabled_roles: {this.state.enabled_roles}</p>
        <p>current: {this.state.current}</p>

      </div>
    );
  }
}

export default App;

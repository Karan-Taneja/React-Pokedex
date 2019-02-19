import React, { Component } from 'react';
import List from './containers/list';
import Profile from './components/profile';

class App extends Component {

  state = {
    activeView: 0,
    pokemon:{},
    move:{},
  }

  toggleState = () => {
    const {activeView} = this.state
    if(activeView === 0) this.setState({activeView: 1})
    else this.setState({activeView: 0})
  }

  sendPokemon = (data) => {
    this.setState({pokemon:data})
  }

  render() {

    const {activeView} = this.state

    return (
       <>
        <div>Search bar</div>
        <hr/>
        {activeView === 0 ?
              <List toggle={this.toggleState} sendPokemon={this.sendPokemon}/> :
              <Profile toggle={this.toggleState} pokemon={this.state.pokemon} sendPokemon={this.sendPokemon}/>}
      </>
    );
  }
}

export default App;

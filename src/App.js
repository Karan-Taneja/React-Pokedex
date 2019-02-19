import React, { Component } from 'react';
import List from './containers/list';
import Profile from './components/profile';
import './App.css'

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

  returnHome = () => {
    const {activeView} = this.state
    if(activeView !== 0) this.setState({activeView: 0})
    else return;
  }

  sendPokemon = (data) => {
    this.setState({pokemon:data})
  }

  render() {

    const {activeView} = this.state

    return (
       <>
        <nav className="navbar bg-danger justify-content-between">
          <a href="#" className="navbar-brand" onClick={this.returnHome} style={{'color':'white', 'font-weight':'700'}}>Home</a>
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          </form>
        </nav>
        {activeView === 0 ?
              <List toggle={this.toggleState} sendPokemon={this.sendPokemon}/> :
              <Profile toggle={this.toggleState} pokemon={this.state.pokemon} sendPokemon={this.sendPokemon}/>}
      </>
    );
  }
}

export default App;

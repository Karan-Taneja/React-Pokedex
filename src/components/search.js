import React, { Component } from 'react'
import Pokemon from './pokemon';
import Results from '../containers/results';
import './search.css';

class Search extends Component {
  constructor(props) {
    super();

    this.state = {
      input: '',
      results: [],
      display: true,
    }
  }

  handleInput = (e) => {
    this.filter(e.target.value)
  };

  filter = (input) => {
    let pkmn = this.props.pkmn || "null"
    let results = []
    for(let i = 0; i < Pokemon.length; i++){
      if(Pokemon[i].toLowerCase().includes(input.toLowerCase()) && Pokemon[i].toLowerCase() !== pkmn.toLowerCase()) results.push(Pokemon[i])
    }
    results = results.slice(0, 10)
    this.setState({input: input, results:results, display: true})
  }

  closeResults = (e) => {
    if(!e.target.getAttribute('open')) this.setState({display: false})
  }

  render() {
    return (
      <>
      <input className="form-control mr-sm-2 searchbar" type="search" placeholder="Search" aria-label="Search" onChange={this.handleInput}/>
      {this.state.input.length > 0 ? 
        this.state.display ?
        <Results results={this.state.results} close={this.closeResults}/>:  <></>
        : <></>
      }
      </>
    )
  }


}

export default Search;




import React, { Component } from 'react'
import Pokemon from './components/pokemon';
import './search.css';



class App extends Component {
  constructor(props) {
    super();

    this.state = {
      input: '',
      list: Pokemon
    }
  }

  handleInputChange = e => {
    this.setState({
      input: e.target.value,

    });
  };



  //   inputResults() {
  //     this.handleInputChange(this.input).then(e => {
  //         this.setState({list: e.value})
  //     });
  // }

  render() {
    const { filteredList } = this.state.list
      .filter(e => this.state.input === '' || e.includes(this.state.input))
      .map((e, index) => <li key={index}>{e}</li>);




    return (
      <>
        <h3 className="container">Pursuit Pokedex</h3>
        <div className="container">

          <input type="text" onChange={this.handleInputChange} value={this.state.input} name="search" placeholder="Search..."></input>
        </div>
        <br />


        <ul className="list-group" id="myList">
          <li className="list-group-item">Hi</li>
          <li className="list-group-item">Shi</li>
          <li className="list-group-item">Thirm</li>
          <li className="list-group-item">Fou</li>
        </ul>

        <filteredList />


        }
        
</>
    );
  }
}
      
export default Search;




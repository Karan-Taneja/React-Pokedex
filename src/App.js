import React, { Component } from 'react';
import { HashRouter, Route,} from 'react-router-dom';
import './App.css';

//------Components
import List from './containers/list';
import Profile from './components/profile';
import Navbar from './components/navbar';

class App extends Component {

  state = {
    isLoading: true,
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 1000);
  };

  render() {

    return (
      <HashRouter>
        <Route path='/' exact component={ Navbar } />
        <div className='max'>
            <Route path='/' exact component={ List } />
            <Route path='/:pokemon' exact component={ Navbar } />
            <Route path='/:pokemon' exact component={ Profile } />
        </div>
      </HashRouter>
    );
  }
}

export default App;

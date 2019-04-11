import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Search from './search';

const Navbar = (props) => {
  return (
    <nav className="navbar bg-danger justify-content-between navbar-fixed">
      <Link to="/" className="navbar-brand" style={{ 'color': 'white', 'fontWeight': '700' }}>Home</Link>
      <Search pkmn = {props.match.params.pokemon}/>
    </nav>
    )
}

export default Navbar;
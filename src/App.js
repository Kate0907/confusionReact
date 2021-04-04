import React, { Component } from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap'
import Menu from './components/MenuComponent';
import './App.css';

// this is the App component
class App extends Component {
  render() {
    return (
      <div >
        { /* render the Navbar component */ }
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>

        {/* render the Menu component  */}
        <Menu />

      </div>
    );
  }
}

export default App;

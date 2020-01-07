import React, { Component } from "react";
import pokemonLogo from "./pokemon.png";
import "./navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <img src={pokemonLogo} alt="Pokemon" className="logo" />
      </div>
    );
  }
}

export default Navbar;

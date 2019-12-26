import React, { Component } from "react";
import "antd/dist/antd.css";
import pokemonLogo from "./pokemon.png";

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

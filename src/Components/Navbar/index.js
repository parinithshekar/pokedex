import React, { Component } from "react";
import pokemonLogo from "./pokemon.png";
import { Link } from "react-router-dom";
// import { Switch } from "antd";
import "./navbar.css";

class Navbar extends Component {
  onChange() {
    console.log("hel");
  }
  render() {
    return (
      <div className="navbar">
        <Link to="/">
          <img src={pokemonLogo} alt="Pokemon" className="logo" />
        </Link>
        {/* <Switch defaultChecked onChange={this.onChange} /> */}
      </div>
    );
  }
}

export default Navbar;

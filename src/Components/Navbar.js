import React, { Component } from "react";
import { PageHeader } from "antd";
import "antd/dist/antd.css";

const navStyle = {
  backgroundColor: "#D53141",
  color: "#ffffff"
};

class Navbar extends Component {
  render() {
    return <PageHeader style={navStyle} title="Pokedex" />;
  }
}

export default Navbar;

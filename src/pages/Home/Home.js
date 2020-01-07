import React, { Component } from "react";
import Navbar from "../../Components/Navbar/";
import PokemonContainer from "../../Components/PokemonContainer";

export default () => {
  return (
    <div className="App">
      <Navbar />
      <PokemonContainer />
    </div>
  );
};

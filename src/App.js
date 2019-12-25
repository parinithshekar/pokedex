import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import PokemonContainer from "./Components/PokemonContainer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <PokemonContainer />
    </div>
  );
}

export default App;

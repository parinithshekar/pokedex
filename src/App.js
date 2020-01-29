import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import PokemonDetails from "./pages/PokemonDetails/PokemonDetails";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}></Route>
      <Route path="/pokemon/:id" component={PokemonDetails}></Route>
      <Route path="/" exact>
        404 not found
      </Route>
    </BrowserRouter>
  );
}

export default App;

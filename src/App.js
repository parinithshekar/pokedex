import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import PokemonDetails from "./pages/PokemonDetails/PokemonDetails";
import history from "./history";

function App() {
  return (
    <BrowserRouter history={history}>
      <Route path="/" exact component={Home}></Route>
      <Route path="/pokemon/:id" exact component={PokemonDetails}></Route>
    </BrowserRouter>
  );
}

export default App;

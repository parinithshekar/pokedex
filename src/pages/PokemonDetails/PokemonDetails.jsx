import React, { Component } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";

export default class PokemonDetails extends Component {
  state = {};

  render() {
    const { id } = this.props.match.params;
    const imgString = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
    return (
      <>
        <div className="pokemon-view">
          <img src={imgString} alt={`Pokemon No: ${id}`} />
        </div>
        <div className="pokemon-info">
          <h1>maybe something</h1>
        </div>
      </>
    );
  }
}

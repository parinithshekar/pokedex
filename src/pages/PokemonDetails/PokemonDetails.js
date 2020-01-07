import React from "react";
import "./PokemonDetails.css";

const PokemonDetails = props => {
  const { id } = props.match.params;
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
};

export default PokemonDetails;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";
import pokeballLogo from "./pokeball_black.png";
import { getString, capitalize } from "../utils";
import styles from "../colors";

export default class PokemonCard extends Component {
  state = {
    name: capitalize(this.props.name),
    id: getString(this.props.number),
    types: []
  };

  async componentDidMount() {
    const url = `https://pokeapi.co/api/v2/pokemon/${this.props.number}/`;
    const response = await fetch(url);
    const pokemonInfo = await response.json();

    const types = pokemonInfo.types
      .sort((a, b) => (a.slot > b.slot ? 1 : -1))
      .map(typeInfo => {
        return capitalize(typeInfo.type.name);
      });
    this.setState({
      types: types,
      primaryColor: styles[types[0]]
        ? styles[types[0]].primary
        : styles.Default.primary,
      accentColor: styles[types[0]]
        ? styles[types[0]].accent
        : styles.Default.accent,
      filter: styles[types[0]] ? styles[types[0]].filter : styles.Default.filter
    });
  }

  render() {
    const { primaryColor, accentColor, types, filter, id, name } = this.state;

    //   const imgString = `https://pokeres.bastionbot.org/images/pokemon/${props.number}.png`; // Incomplete asset pack
    const pokemonSprite = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`; // Official Pokemon.com assets
    return (
      <Link
        to={{
          pathname: `/pokemon/${id}`
        }}
      >
        <div
          className="card-container"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="text-container">
            <div className="title">{name}</div>
            <div className="types-container">
              {types.map(type => (
                <div
                  className="type"
                  key={type}
                  style={{ backgroundColor: accentColor }}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>
          <div className="pokemon-card-id" style={{ color: accentColor }}>
            #{id}
          </div>
          <img
            className="pokemon-card-pokeball"
            alt=""
            src={pokeballLogo}
            style={{ filter: filter }}
          />
          <img
            className="pokemon-card-sprite"
            alt={`Pokemon No ${id}`}
            src={pokemonSprite}
          />
        </div>
      </Link>
    );
  }
}

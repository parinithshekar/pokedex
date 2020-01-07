import React, { Component } from "react";
import "./PokemonCard.css";
import pokeballLogo from "./pokeball_black.png";
import styles from "./colors";

const getNum = num => {
  if (num < 10) return `00${num}`;
  else if (num < 100) return `0${num}`;
  else return num;
};

export default class PokemonCard extends Component {
  state = {
    name: this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1),
    id: getNum(this.props.number),
    types: []
  };

  async componentDidMount() {
    const url = `https://pokeapi.co/api/v2/pokemon/${this.props.number}/`;
    const response = await fetch(url);
    const pokemonInfo = await response.json();

    const types = pokemonInfo.types
      .sort((a, b) => (a.slot > b.slot ? 1 : -1))
      .map(typeInfo => {
        return (
          typeInfo.type.name.charAt(0).toUpperCase() +
          typeInfo.type.name.slice(1)
        );
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
      <div className="card-container" style={{ backgroundColor: primaryColor }}>
        <div className="text-sprite-container">
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
            <div className="pokemon-id" style={{ color: accentColor }}>
              #{id}
            </div>
          </div>
          <div className="sprite-container">
            <img
              className="pokeball"
              alt=""
              src={pokeballLogo}
              style={{ filter: filter }}
            />
            <img
              className="pokemon-sprite"
              alt={`Pokemon No ${id}`}
              src={pokemonSprite}
            />
          </div>
        </div>
      </div>
    );
  }
}

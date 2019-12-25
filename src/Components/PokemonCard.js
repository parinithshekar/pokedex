import React, { Component } from "react";
import "./PokemonCard.css";
import pokeballLogo from "./pokeball_black.png";

const getNum = num => {
  if (num < 10) return `00${num}`;
  else if (num < 100) return `0${num}`;
  else return num;
};

const styles = {
  Grass: {
    primary: "#49d0b0",
    accent: "#62e0ca",
    filter:
      "invert(81%) sepia(28%) saturate(707%) hue-rotate(112deg) brightness(95%) contrast(90%)"
  },
  Fire: {
    primary: "#fc6c6c",
    accent: "#fc7f7d",
    filter:
      "invert(89%) sepia(26%) saturate(6854%) hue-rotate(308deg) brightness(100%) contrast(98%)"
  },
  Water: {
    primary: "#77befe",
    accent: "#95d0fa",
    filter:
      "invert(76%) sepia(12%) saturate(1223%) hue-rotate(171deg) brightness(102%) contrast(96%)"
  },
  Electric: {
    primary: "#fed76e",
    accent: "#fde689",
    filter:
      "invert(88%) sepia(34%) saturate(579%) hue-rotate(340deg) brightness(103%) contrast(98%)"
  },
  Default: {
    primary: "#3f3f3f",
    accent: "#818181",
    filter:
      "invert(40%) sepia(46%) saturate(0%) hue-rotate(207deg) brightness(115%) contrast(92%)"
  }
};

export default class PokemonCard extends Component {
  //   console.log(props);
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
    console.log(this.state);
  }

  render() {
    const { primaryColor, accentColor, types, filter, id, name } = this.state;
    //   const imgString = `https://pokeres.bastionbot.org/images/pokemon/${props.number}.png`; // Incomplete asset pack
    const pokemonSprite = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.state.id}.png`;
    return (
      <div>
        <div
          className="card-container"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="text-sprite-container">
            <div className="text-container">
              <div className="title">{name}</div>
              <div className="types-container">
                {this.state.types.map(type => (
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
              ></img>
              <img
                className="pokemon-sprite"
                alt={`Pokemon No ${id}`}
                src={pokemonSprite}
              ></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

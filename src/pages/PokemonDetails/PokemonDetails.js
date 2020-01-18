import React, { Component } from "react";
import { Link } from "react-router-dom";
import About from "./About";
import BaseStats from "./BaseStats";
import Navbar from "../../Components/Navbar/";
import { Tabs } from "antd";
import history from "../../history";
import { getNum, capitalize, getString } from "../../utils";
import styles from "../../colors";
import "./PokemonDetails.css";
import pokeballLogo from "./pokeball_black.png";

const { TabPane } = Tabs;

export default class PokemonDetails extends Component {
  state = { id: this.props.match.params.id, types: [] };

  async populateState() {
    const url = `https://pokeapi.co/api/v2/pokemon/${getNum(this.state.id)}/`;
    let response = await fetch(url);
    const pokemonInfo = await response.json();

    const speciesUrl = pokemonInfo.species.url;
    response = await fetch(speciesUrl);
    const speciesInfo = await response.json();

    const name = capitalize(pokemonInfo.name);

    const types = pokemonInfo.types
      .sort((a, b) => (a.slot > b.slot ? 1 : -1))
      .map(typeInfo => {
        return capitalize(typeInfo.type.name);
      });

    const species = speciesInfo.genera.filter(
      geneItem => geneItem.language.name === "en"
    )[0].genus;

    this.setState({
      name,
      species,
      types,
      primaryColor: styles[types[0]]
        ? styles[types[0]].primary
        : styles.Default.primary,
      accentColor: styles[types[0]]
        ? styles[types[0]].accent
        : styles.Default.accent,
      filter: styles[types[0]] ? styles[types[0]].filter : styles.Default.filter
    });
  }

  async componentDidMount() {
    await this.populateState();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({ id: this.props.match.params.id, types: [] }, async () => {
        await this.populateState();
      });
    }
  }

  // componentDidUpdate() {
  //   let inkbar = document.getElementsByClassName(
  //     "ant-tabs-ink-bar ant-tabs-ink-bar-animated"
  //   )[0]; //.style.backgroundColor = `${this.state.primaryColor} important!`);
  //   inkbar.style.backgroundColor = `${this.state.primaryColor} important!`;
  //   console.log(inkbar.style.backgroundColor);
  //   console.log(inkbar);
  // }

  render() {
    const {
      primaryColor,
      accentColor,
      types,
      filter,
      id,
      name,
      species
    } = this.state;
    const imgString = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
    const url = `https://pokeapi.co/api/v2/pokemon/${getNum(id)}/`;
    console.log(url);

    const prevId = getNum(id) - 1;
    const nextId = getNum(id) + 1;

    const prevPokemonImgString = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${getString(
      prevId
    )}.png`;
    const nextPokemonImgString = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${getString(
      nextId
    )}.png`;

    const prevPokemon =
      prevId > 1 ? (
        <Link to={`/pokemon/${getString(prevId)}`}>
          <img
            className="prev-pokemon-sprite"
            src={prevPokemonImgString}
            alt={`Pokemon No: ${id - 1}`}
            width="475"
            height="475"
          />
        </Link>
      ) : null;

    const nextPokemon =
      nextId <= 807 ? (
        <Link to={`/pokemon/${getString(nextId)}`}>
          <img
            className="next-pokemon-sprite"
            src={nextPokemonImgString}
            alt={`Pokemon No: ${id + 1}`}
            width="475"
            height="475"
          />
        </Link>
      ) : null;

    return (
      <>
        <Navbar />
        <div
          className="pokemon-view"
          style={{
            backgroundImage: `linear-gradient(${primaryColor}, ${primaryColor}, ${primaryColor}, #353b48)`
          }}
        >
          <div className="pokemon-view-container">
            <div className="details-text-container">
              <div className="name-types-container">
                <div className="details-pokemon-name">{name}</div>
                <div className="details-types-container">
                  {types.map(type => (
                    <div
                      className="details-pokemon-type"
                      key={type}
                      style={{ backgroundColor: accentColor }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="details-pokemon-id"
                style={{ color: accentColor }}
              >
                #{id}
              </div>
              <div
                className="details-pokemon-species"
                style={{ color: accentColor }}
              >
                {species}
              </div>
            </div>
            {prevPokemon}
            <img
              className="pokemon-sprite"
              src={imgString}
              alt={`Pokemon No: ${id}`}
              width="475"
              height="475"
            />
            {nextPokemon}
            <img
              className="pokemon-view-pokeball"
              src={pokeballLogo}
              style={{ filter: filter }}
              alt="Pokeball"
              width="300"
              height="300"
            ></img>
            <div className="pokemon-info">
              <Tabs tabPosition="top" defaultActiveKey="3">
                <TabPane tab="About" key="1">
                  <About url={url} />
                </TabPane>
                <TabPane tab="Base Stats" key="2">
                  <BaseStats url={url} primaryColor={primaryColor} />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </>
    );
  }
}

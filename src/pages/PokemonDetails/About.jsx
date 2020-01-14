import React, { Component } from "react";
import {
  decimetersToFeetInches,
  decimetersToMeters,
  hectogramsToKilograms,
  hectogramsToPounds,
  capitalize
} from "../../utils";

export default class About extends Component {
  state = {};

  async componentDidMount() {
    let response = await fetch(this.props.url);
    const pokemonInfo = await response.json();

    const speciesUrl = pokemonInfo.species.url;
    response = await fetch(speciesUrl);
    const speciesInfo = await response.json();

    let descriptionEntries = speciesInfo.flavor_text_entries
      .filter(descriptionItem => descriptionItem.language.name === "en")
      .map(descriptionItem => {
        return descriptionItem.flavor_text;
      });
    descriptionEntries = [...new Set(descriptionEntries)];
    const description = descriptionEntries[0].split("\n").join(" ");

    let { height, weight } = pokemonInfo;
    let { abilities } = pokemonInfo;

    // metrics obtained in hectograms and decimeters for some reason
    height = `${decimetersToFeetInches(height)} (${decimetersToMeters(
      height
    )})`;

    weight = `${hectogramsToPounds(weight)} (${hectogramsToKilograms(weight)})`;

    abilities = abilities.map(ability => {
      const abilityNameArray = ability.ability.name
        .split("-")
        .map(name => capitalize(name));
      return abilityNameArray.join("-");
    });

    const aboutDetails = [{ abilities: abilities.join(", ") }];
    this.setState({
      height,
      weight,
      description,
      aboutDetails
    });
  }

  render() {
    return (
      <div className="about-container">
        <div className="description">{this.state.description}</div>

        <div className="metrics-container">
          <div className="metric">
            <div className="metric-heading">Height</div>
            <div className="metric-value">{this.state.height}</div>
          </div>
          <div className="metric">
            <div className="metric-heading">Weight</div>
            <div className="metric-value">{this.state.weight}</div>
          </div>
        </div>

        {this.state.aboutDetails &&
          this.state.aboutDetails.map((property, index) => (
            <div className="about-property" key={index}>
              <p className="property-key">
                {capitalize(Object.keys(property)[0])}
              </p>
              <p className="property-value">{Object.values(property)[0]}</p>
            </div>
          ))}
      </div>
    );
  }
}

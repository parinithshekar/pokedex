import React, { Component } from "react";
import { getNum } from "../../utils";

export default class Evolution extends Component {
  state = { id: this.props.id, primaryColor: this.props.primaryColor };

  async componentDidMount() {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${getNum(
      this.state.id
    )}/`;
    let response = await fetch(speciesUrl);
    const speciesInfo = await response.json();

    const evolutionUrl = speciesInfo.evolution_chain.url;
    response = await fetch(evolutionUrl);
    const evolutionChainResponse = await response.json();

    let evolutionChain = [];
    let currentEvolution = evolutionChainResponse.chain;
    while (currentEvolution) {
      const name = currentEvolution.species.name;
      let id = currentEvolution.species.url.split("/");
      id = Number(id[id.length - 2]);
      evolutionChain.push({
        name: name,
        id: id
      });
      currentEvolution = currentEvolution.evolves_to[0];
    }

    console.log(evolutionChain);
  }

  render() {
    return (
      <div className="evolution-chain-container">
        <div className="title">Evolution Chain</div>
        <div className="evolution-list-container"></div>
      </div>
    );
  }
}

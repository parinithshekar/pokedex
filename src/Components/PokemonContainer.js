import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import PokemonCard from "./PokemonCard";
import "antd/dist/antd.css";
import "./PokemonContainer.css";

class PokemonContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      hasMore: true,
      next: null
    };
  }

  loadItems = async () => {
    const { next, pokemon } = this.state;
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0`;

    if (next) {
      url = next;
    }

    const response = await fetch(url);
    const newPokemon = await response.json();

    const length = pokemon.length;
    const newLength = newPokemon.results.length;
    const newPokemonArray = newPokemon.results
      .filter(pokemonItem => {
        const urlArray = pokemonItem.url.split("/");
        const pokemonId = Number(urlArray[urlArray.length - 2]);
        return pokemonId <= length + newLength;
      })
      .map((pokemonItem, localIndex) => {
        const name = pokemonItem.name
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        const id = length + localIndex + 1;
        return {
          name: name,
          id: id
        };
      });

    if (newPokemon.next) {
      this.setState({
        pokemon: pokemon.concat(newPokemonArray),
        next: newPokemon.next
      });
    } else {
      this.setState({
        pokemon: pokemon.concat(newPokemonArray),
        hasMore: false
      });
    }
  };

  render() {
    const { pokemon, hasMore } = this.state;
    const loader = (
      <div className="loader" key={0}>
        Loading ...
      </div>
    );

    if (pokemon) {
      return (
        <div className="container">
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems}
            hasMore={hasMore}
            loader={loader}
            threshold={700}
          >
            <div className="row">
              {pokemon.map(currentPokemon => (
                <div className="per-card" key={currentPokemon.id}>
                  <PokemonCard
                    number={currentPokemon.id}
                    name={currentPokemon.name}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      );
    }
    return null;
  }
}

export default PokemonContainer;

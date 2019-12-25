import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import PokemonCard from "./PokemonCard";
import "antd/dist/antd.css";
import "./PokemonContainer.css";

class PokemonContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 24,
      pokemon: [],
      hasMore: true,
      next: null
    };
  }

  loadItems = async () => {
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0`;

    if (this.state.next) {
      url = this.state.next;
    }

    const response = await fetch(url);
    const newPokemon = await response.json();

    const length = this.state.pokemon.length;
    const newPokemonArray = newPokemon.results.map(
      (pokemonItem, localIndex) => {
        return {
          name: pokemonItem.name.split("-")[0],
          id: length + localIndex + 1
        };
      }
    );

    // console.log(this.state.pokemon);
    if (newPokemon.next) {
      this.setState({
        pokemon: this.state.pokemon.concat(newPokemonArray),
        next: newPokemon.next
      });
    } else {
      this.setState({
        pokemon: this.state.pokemon.concat(newPokemonArray),
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
            threshold={500}
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

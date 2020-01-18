import React, { Component } from "react";
import { Progress } from "antd";
import { formatStatName } from "../../utils";
import maxStats from "./maxStats";

export default class BaseStats extends Component {
  state = {
    baseStats: []
  };

  async populateState() {
    let response = await fetch(this.props.url);
    const pokemonInfo = await response.json();
    const baseStats = pokemonInfo.stats.reverse();
    this.setState({
      baseStats
    });
  }

  async componentDidMount() {
    await this.populateState();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      await this.populateState();
    }
  }

  statValue = (percent, successPercent) => {
    console.log(percent, successPercent);
    return percent;
  };

  render() {
    const { primaryColor } = this.props;
    return this.state.baseStats.map(statItem => (
      <div className="stat-container" key={statItem.stat.name}>
        <div className="stat-name">{formatStatName(statItem.stat.name)}</div>
        <Progress
          strokeColor={{
            "0%": "#2f3640ea",
            "50%": primaryColor,
            "100%": primaryColor
          }}
          size="small"
          showInfo={false}
          percent={Math.round(
            (statItem.base_stat * 100) / maxStats[statItem.stat.name]
          )}
        ></Progress>
        <div className="stat-value">{statItem.base_stat}</div>
      </div>
    ));
  }
}

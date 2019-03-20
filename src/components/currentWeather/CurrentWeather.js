import React, { Component } from 'react'

export default class CurrentWeather extends Component {
  state = {
    celsius: false,
  };

  handleClick = () => {
    this.setState({
      celsius: !this.state.celsius,
    });
  };

  render() {
    const { temp, clouds, wind, image, weather, description } = this.props;
    const { celsius } = this.state;
    return (
      <div>
        <img src={image} alt={weather} />
        <p onClick={this.handleClick}>
          {(celsius) 
            ? (temp - 32) * (5 / 9)
            : temp
          }
        </p>
        <p>{description}</p>
        <p>{clouds}</p>
        <p>{wind}</p>
      </div>
    )
  }
}

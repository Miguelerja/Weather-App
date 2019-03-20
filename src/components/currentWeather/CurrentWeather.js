import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CurrentWeather extends Component {
  state = {
    celsius: false,
    image: null,
  };

  setIcon = (weather) => {
    switch(weather) {
      case 'Thunderstorm':
        this.setState({
          image: '/images/storm.png',
        })
        break;
      case 'Drizzle':
        this.setState({
          image: '/images/Drizzle.png',
        })
        break;
      case 'Rain':
        this.setState({
          image: '/images/rain.png',
        })
        break;
      case 'Snow':
        this.setState({
          image: '/images/snow.png',
        })
        break;
      case 'Clear':
        this.setState({
          image: '/images/sunny.png',
        })
        break;
      case 'Fog':
        this.setState({
          image: '/images/fog.png',
        })
        break;
      case 'Tornado':
        this.setState({
          image: '/images/tornado.png',
        })
        break;
      case 'Clouds':
        this.setState({
          image: '/images/cloudy.png',
        })
        break;
      default:
        return null;
    };
  };

  componentDidMount () {
    const { weather } = this.props;
    this.setIcon(weather);
  };

  handleClick = () => {
    this.setState({
      celsius: !this.state.celsius,
    });
  };

  render() {
    const { temp, clouds, wind, weather, description } = this.props;
    const { celsius, image } = this.state;
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

CurrentWeather.propTypes = {
  description: PropTypes.string.isRequired,
  clouds: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  temp: PropTypes.number.isRequired,
  weather: PropTypes.string.isRequired,
};

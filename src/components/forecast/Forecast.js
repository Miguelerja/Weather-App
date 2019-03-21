import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Temperature from '../temperature/Temperature';

export default class Forecast extends Component {

  listForescast = () => {
    const { forecast, farenheit, icon } = this.props;
    return forecast.map(forecast => {
      const { temp } = forecast.main;
      const { description, main } = forecast.weather[0];
      
      return(
        <div>
          <img src={icon} alt={description}/>
          <Temperature
            temp={temp}
            farenheit={farenheit}
            containerClassName='forecast-temp-container'
            pContainer='forecast-temp'
          />
          <p>{main}</p>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

Forecast.propTypes = {
  forecast: PropTypes.array.isRequired,
  farenheit: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
};


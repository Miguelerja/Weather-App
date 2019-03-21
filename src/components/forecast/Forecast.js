import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Temperature from '../temperature/Temperature';
import './forecast.css';
import setIcon from '../../utils/setIcon';


class Forecast extends Component {
  state = {
    image: null,
  };

  listForescast = () => {
    const { forecast, farenheit } = this.props;
    
    return forecast.map((forecast, index) => {
      const { temp } = forecast.main;
      const { description, main } = forecast.weather[0];
      const icon = setIcon(main);

      return(
        <div className='forecast-item' key={`${temp}${index}`}>
          <img className='forecast-icon' src={icon} alt={description}/>
          <Temperature
            temp={temp}
            farenheit={farenheit}
            containerClassName='forecast-temp-container'
            pClassName='forecast-temp'
          />
          <p className='forecast-desc'>{main}</p>
        </div>
      );
    });
  };

  render () {
    return(
      <div className='forecast-container'>
        {this.listForescast()}
      </div>
    )
  }
};

Forecast.propTypes = {
  forecast: PropTypes.array.isRequired,
  farenheit: PropTypes.bool.isRequired,
};

export default Forecast;

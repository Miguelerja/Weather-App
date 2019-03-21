import React from 'react';
import PropTypes from 'prop-types';
import Temperature from '../temperature/Temperature';
import './forecast.css';

const Forecast = (props) => {
  const listForescast = () => {
    const { forecast, farenheit, icon } = props;

    return forecast.map((forecast, index) => {
      const { temp } = forecast.main;
      const { description, main } = forecast.weather[0];

      return(
        <div className='forecast-item' key={`${temp}${index}`}>
          <img className='forecast-icon' src={icon} alt={description}/>
          <Temperature
            temp={temp}
            farenheit={farenheit}
            containerClassName='forecast-temp-container'
            pContainer='forecast-temp'
          />
          <p className='forecast-desc'>{main}</p>
        </div>
      );
    });
  };

  return(
    <div className='forecast-container'>
      {listForescast()}
    </div>
  )
};

Forecast.propTypes = {
  forecast: PropTypes.array.isRequired,
  farenheit: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Forecast;

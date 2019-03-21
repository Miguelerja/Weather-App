import React from 'react';
import PropTypes from 'prop-types';
import Temperature from '../temperature/Temperature';

const Forecast = (props) => {
  const listForescast = () => {
    const { forecast, farenheit, icon } = props;

    return forecast.map(forecast => {
      const { temp } = forecast.main;
      const { description, main } = forecast.weather[0];

      return(
        <div className='forecast-item'>
          <img className='forescast-icon' src={icon} alt={description}/>
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
    <div>
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

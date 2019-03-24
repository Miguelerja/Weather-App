import React from 'react';
import PropTypes from 'prop-types';
import './weather.css';
import Temperature from '../temperature/Temperature';
import Header from '../header/Header';
import Forecast from '../forecast/Forecast';

const Weather = (props) => {

  const handleClick = () => {
    const { toggleTemp } = props;
    toggleTemp();
  };

  const {
    temp,
    clouds,
    wind,
    weather,
    farenheit,
    description,
    icon,
    forecast,
    city
  } = props;
  
  return (
    <div className='container'>
      <div className='icon-container'>
        <Header description={description} weather={weather} city={city} />
        <img 
          className='icon' 
          src={icon} 
          alt={weather} 
        />
        
        <Temperature 
          temp={temp} 
          farenheit={farenheit} 
          handleClick={handleClick}
          containerClassName='temp-container'
          pClassName='temp'
        />         
      </div>

      <div className='info-panel'>
        <img src='/images/cloud-small.png' alt='clouds'/>
        <p className='clouds'>{clouds}%</p>
        <img src='/images/wind-small.png' alt='wind'/>
        <p className='wind'>{wind} Km/h</p>
      </div>
      
      <Forecast 
        forecast={forecast}
        farenheit={farenheit}
        icon={icon}

      />
    </div>
  )
}

Weather.propTypes = {
  city: PropTypes.string,
  description: PropTypes.string.isRequired,
  clouds: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  temp: PropTypes.number.isRequired,
  weather: PropTypes.string.isRequired,
  toggleTemp: PropTypes.func.isRequired,
  farenheit: PropTypes.bool.isRequired,
};

export default Weather;

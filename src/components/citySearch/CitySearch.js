import React, { Component } from 'react';
import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import weatherService from '../../utils/weather-service';
import setIcon from '../../utils/setIcon';
import './citySearch.css';
import Weather from '../weather/Weather';

const Form = (props) => {
  const { handleSearchInput, name, buttonClick } = props;

  const handleChange = (event) => {
    handleSearchInput(event);
  };

  const handleClick = (event) => {
    event.preventDefault();
    buttonClick();
  };

  return (
    <form className='search-form'>
      <div className='search-form-container'>
        <input 
          className='input'
          autoComplete='off'
          type="text" 
          onChange={handleChange}
          name='city'
          value={name} 
          placeholder='Barcelona, ES' />
        <button
          className='btn'
          onClick={handleClick}>
          Get Weather
        </button>
      </div>
    </form>
  )
};

Form.propTypes = {
  handleSearchInput: PropTypes.func.isRequired,
  buttonClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default class CitySearch extends Component {
  state = {
    clicked: false,
    loading: true,
    currentWeather: {},
    forecast: [],
    farenheit: false,
    image: null,
  }

  getCityWeather = (name) => {    
    Promise.all([
      weatherService.getWeatherByName(name),
      weatherService.getForecastByName(name),
    ]).then((response) => {
      console.log(response)
      const { main, weather, clouds, wind } = response[0];
      const currentWeather = {
        weather: weather[0],
        clouds: clouds,
        wind: wind,
        conditions: main,
      };
      const forecast = [
        response[1].list[8],
        response[1].list[16],
        response[1].list[24],
        response[1].list[32],
        response[1].list[39]
      ];
      
      this.setState({
        currentWeather: currentWeather,
        image: setIcon(weather[0].main),
        forecast: forecast,
        clicked: !this.state.clicked,
        loading: false,
      });
    }).catch(error => console.log(error));
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClick = () => {
    const { city } = this.state;
    this.getCityWeather(city);
  };

  toggleTemp = () => {
    this.setState({
      farenheit: !this.state.farenheit,
    });
  };
  
  render() {
    const { clicked, city, inputName, loading, forecast, farenheit, image } = this.state;
    const { weather, clouds, wind, conditions } = this.state.currentWeather;
    
    return (
      <>
        {(clicked) ?
          (loading)
            ? <p>Loading</p>
            : <Weather 
              city={city}
              weather={weather.main}
              temp={conditions.temp}
              description={weather.description}
              wind={wind.speed}
              clouds={clouds.all}
              farenheit={farenheit}
              toggleTemp={this.toggleTemp}
              icon={image}
              forecast={forecast} 
            />
          :
          <Form 
            handleSearchInput={this.handleChange}
            buttonClick={this.handleClick}
            name={inputName}
          />
        }
      </>
    )
  }
}

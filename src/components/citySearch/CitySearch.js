import React, { Component } from 'react';
import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import './citySearch.css';
import Weather from '../weather/Weather';
import { getCityWeather } from '../../utils/getWeather';

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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClick = async () => {
    const { city } = this.state;
    try {
      const { currentWeather, image, forecast } = await getCityWeather(city);
      this.setState({
        currentWeather: currentWeather,
        image: image,
        forecast: forecast,
        clicked: !this.state.clicked,
        loading: false,
      })
    } catch(error) {console.warn(error)};
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
            ? <Weather />
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

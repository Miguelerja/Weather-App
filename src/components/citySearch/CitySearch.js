import React, { Component } from 'react';
import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import './citySearch.css';
import Weather from '../weather/Weather';

const Form = (props) => {
  const { handleSearchInput, name, buttonClick } = props;

  const handleChange = (event) => {
    handleSearchInput(event);
  };

  const handleClick = () => buttonClick();

  return (
    <form className='search-form'>
      <div className='search-form-container'>
        <input 
          className='input'
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
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      clicked: !this.state.clicked,
    });
  }
  
  render() {
    const { clicked, name } = this.state;
    return (
      <>
        {(clicked) ?
          <Weather />
          :
          <Form 
            handleSearchInput={this.handleChange}
            buttonClick={this.handleClick}
            name={name}
          />
        }
      </>
    )
  }
}

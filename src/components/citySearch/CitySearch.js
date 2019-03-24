import React, { Component } from 'react'

export default class CitySearch extends Component {
  state = {
    clicked: false,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
  }
  
  render() {
    const { clicked } = this.state;
    return (
      <form>
        <input 
          className='input'
          type="text" 
          onChange={this.handleChange}
          name='city'
          value={this.state.name} 
          placeholder='Barcelona, ES' />
        <button
          className='btn'
          onClick={this.handleClick}>
          Get Weather
        </button>
      </form>
    )
  }
}

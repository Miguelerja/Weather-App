import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './header.css';



class Header extends Component  {
  state = {
    clicked: false,
  };

  setMessage = (weather) => {
    switch(weather) {
      case 'Thunderstorm':
        return 'There\'s a thunderstorm, be careful';
      case 'Drizzle':
        return 'It\'s raining lightly, don\'t forget your umbrella';
      case 'Rain':
        return 'It\'s rainig hard, inside plan maybe?';
      case 'Snow':
        return 'Snow falling. Time for a snowman';
      case 'Clear':
        return 'It\'s a clear and sunny day. Go enjoy';
      case 'Fog':
        return 'Foggy day, visibility is complicated';
      case 'Tornado':
        return 'There\'s a tornado in the area. Better stay inside';
      case 'Clouds':
        return 'Cloudy day. Better take your jacket';
      default:
        return null;
    };
  };

  toggleDescription = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
  };

  render () {
    const { clicked } = this.state;
    const { weather, description } = this.props;
    return (
      <p className={(clicked) ? 'weather' : 'description'} onClick={this.toggleDescription}>
        {(clicked) 
          ? this.setMessage(weather)
          : weather
        }
      </p>
    )
  }
};

Header.propTypes = {
  description: PropTypes.string.isRequired,
  weather: PropTypes.string.isRequired,
};

export default Header;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './currentWeather.css';

const Temperature = (props) => {
  const { temp, celsius, handleClick } = props;

  const click = () => {
    handleClick()
  };
  
  return(
    <div className='temp-container'>
      <img src='/images/farenheit-small.png' alt='thermometer'/>
      <p className='temp' onClick={click}>
        {(celsius) 
          ? Math.round((temp - 32) * (5 / 9))
          : temp
        }
      </p>
    </div>
  )
};

Temperature.propTypes = {
  temp: PropTypes.number.isRequired,
  celsius: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default class CurrentWeather extends Component {
  state = {
    celsius: false,
    image: null,
  };

  setIcon = (weather) => {
    switch(weather) {
      case 'Thunderstorm':
        this.setState({
          image: '/images/storm.png',
        })
        break;
      case 'Drizzle':
        this.setState({
          image: '/images/Drizzle.png',
        })
        break;
      case 'Rain':
        this.setState({
          image: '/images/rain.png',
        })
        break;
      case 'Snow':
        this.setState({
          image: '/images/snow.png',
        })
        break;
      case 'Clear':
        this.setState({
          image: '/images/sunny.png',
        })
        break;
      case 'Fog':
        this.setState({
          image: '/images/fog.png',
        })
        break;
      case 'Tornado':
        this.setState({
          image: '/images/tornado.png',
        })
        break;
      case 'Clouds':
        this.setState({
          image: '/images/cloudy.png',
        })
        break;
      default:
        return null;
    };
  };

  componentDidMount () {
    const { weather } = this.props;
    this.setIcon(weather);
  };

  handleClick = () => {
    this.setState({
      celsius: !this.state.celsius,
    });
  };

  render() {
    const { temp, clouds, wind, weather, description } = this.props;
    const { celsius, image } = this.state;
    return (
      <div className='container'>
        <div className='icon-container'>
          <h1 className='description'>{description}</h1>
          <img className='icon' src={image} alt={weather} />
          
          <Temperature 
            temp={temp} 
            celsius={celsius} 
            handleClick={this.handleClick}
          />         
        </div>

        <div className='info-panel'>
          <img src='/images/cloud-small.png' alt='clouds'/>
          <p className='clouds'>{clouds}%</p>
          <img src='/images/wind-small.png' alt='wind'/>
          <p className='wind'>{wind} Km/h</p>
        </div>
      </div>
    )
  }
}

CurrentWeather.propTypes = {
  description: PropTypes.string.isRequired,
  clouds: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  temp: PropTypes.number.isRequired,
  weather: PropTypes.string.isRequired,
};

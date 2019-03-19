import React, { Component } from 'react';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import weatherService from './utils/weather-service';
class App extends Component {
  state = {
    location: null,
  };

  setCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          long: position.coords.longitude,
          lat: position.coords.latitude,
        }
      });
    });
  };

  componentDidMount () {
    this.setCoordinates();
  };

  componentDidUpdate () {
    weatherService.getWeatherByCoords(this.state.location)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error))
  };

  render() {
    const { location } = this.state;
    return (
      <div className="App">
      {(location) ? 
        <CurrentWeather />
        :
        <p>Loading</p>
      }
      </div>
    );
  }
}

export default App;

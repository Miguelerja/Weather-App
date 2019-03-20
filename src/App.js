import React, { Component } from 'react';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import weatherService from './utils/weather-service';
class App extends Component {
  state = {
    location: null,
  };

  getLocationWeather = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = {
        long: position.coords.longitude,
        lat: position.coords.latitude,
      };
      
      weatherService.getWeatherByCoords(location)
        .then(response => {
          const { main, weather, clouds, wind } = response;
          this.setState({
            location: location,
            weather: weather[0],
            clouds: clouds,
            wind: wind,
            conditions: main,
          });
        })
        .catch(error => console.log(error))
    });
  };

  componentDidMount () {
    this.getLocationWeather();
  };

  render() {
    const { location, weather, clouds, wind, conditions } = this.state;
    return (
      <div className="App">
      {(location) ? 
        <CurrentWeather 
          weather={weather.main}
          temp={conditions.temp}
          description={weather.description}
          wind={wind.speed}
          clouds={clouds.all}
        />
        :
        <p>Loading</p>
      }
      </div>
    );
  }
}

export default App;

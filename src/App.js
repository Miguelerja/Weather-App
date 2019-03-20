import React, { Component } from 'react';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import weatherService from './utils/weather-service';
class App extends Component {
  state = {
    location: null,
    currentWeather: {},
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
          const currentWeather = {
            weather: weather[0],
            clouds: clouds,
            wind: wind,
            conditions: main,
          };

          this.setState({
            location: location,
            currentWeather: currentWeather,
          });
        })
        .then(() => {
          weatherService.getForecastByCoords(location)
            .then((response => console.log(response)))
        })
        .catch(error => console.log(error))
    });
  };

  componentDidMount () {
    this.getLocationWeather();
  };

  render() {
    const { weather, clouds, wind, conditions } = this.state.currentWeather;
    const { location } = this.state;
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

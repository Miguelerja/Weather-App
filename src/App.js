import React, { Component } from 'react';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import weatherService from './utils/weather-service';
import setIcon from './utils/setIcon';
class App extends Component {
  state = {
    location: null,
    currentWeather: {},
    forecast: [],
    farenheit: false,
    image: null,
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
          const weather = this.state.currentWeather.weather.main;
          this.setState({
            image : setIcon(weather),
          });
        })
        .then(() => {
          weatherService.getForecastByCoords(location)
            .then(response => {
              const forecast = [
                response.list[8],
                response.list[16],
                response.list[24],
                response.list[32],
                response.list[39]
              ];
              this.setState({
                forecast: forecast,
              });
            })
        })
        .catch(error => console.log(error))
    });
  };

  componentDidMount () {
    this.getLocationWeather();
  };

  toggleTemp = () => {
    this.setState({
      farenheit: !this.state.farenheit,
    });
  };

  render() {
    const { weather, clouds, wind, conditions } = this.state.currentWeather;
    const { location, forecast, farenheit, image } = this.state;
    return (
      <div className="App">
      {(location) ? 
        <CurrentWeather 
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
        <p>Loading</p>
      }
      </div>
    );
  }
}

export default App;

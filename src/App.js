import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Weather from './components/weather/Weather';
import CitySearch from './components/citySearch/CitySearch';
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
    
    Promise.all([
      weatherService.getWeatherByCoords(location),
      weatherService.getForecastByCoords(location),
    ]).then((response) => {
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
        location: location,
        currentWeather: currentWeather,
        image: setIcon(weather[0].main),
        forecast: forecast,
      });
    }).catch(error => console.log(error));
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
      <Router className="App">
        <Route exact path='/' render={() => (
          (location) ? 
            <Weather 
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
        )} />

        <Route path='/search' component={CitySearch} />
      </Router>
    );
  }
}

export default App;

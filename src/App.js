import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Weather from './components/weather/Weather';
import CitySearch from './components/citySearch/CitySearch';
import URLNotFound from './components/urlNotFound/URLNotFound';
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
    ]).then(([coordsWeather, coordsForecast]) => {
      const { main, weather, clouds, wind, name } = coordsWeather;
      const currentWeather = {
        weather: weather[0],
        clouds: clouds,
        wind: wind,
        conditions: main,
      };
      const forecast = [
        coordsForecast.list[8],
        coordsForecast.list[16],
        coordsForecast.list[24],
        coordsForecast.list[32],
        coordsForecast.list[39]
      ];
      
      this.setState({
        city: name,
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
    const { location, forecast, farenheit, image, city } = this.state;
    return (
      <Router className="App">
        <Switch>
          <Route exact path='/' render={() => (
            (location) ?
            <>
              <Weather 
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
            </>
              :
              <Weather />
          )} />

          <Route path='/search' component={CitySearch} />
          <Route component={URLNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;

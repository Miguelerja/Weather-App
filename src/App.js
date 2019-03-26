import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Weather from './components/weather/Weather';
import CitySearch from './components/citySearch/CitySearch';
import URLNotFound from './components/urlNotFound/URLNotFound';
import { getLocationWeather } from './utils/getWeather';

class App extends Component {
  state = {
    location: null,
    currentWeather: {},
    forecast: [],
    farenheit: false,
    image: null,
  };

  async componentDidMount () {
    try {
      const { forecast, city, location, currentWeather, image } = await getLocationWeather();
      this.setState({
        city: city,
        location: location,
        currentWeather: currentWeather,
        image: image,
        forecast: forecast,
      });
    } catch(error) {console.warn(error)};
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

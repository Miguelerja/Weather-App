import setIcon from "./setIcon";
import weatherService from './weather-service';

export function getLocationWeather() {
  return new Promise((resolve, reject) => {
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
        
        resolve({
          forecast: forecast,
          location: location,
          currentWeather: currentWeather,
          city: name,
          image: setIcon(weather[0].main),
        });
  
      }).catch(error => {
        reject(error)
      });
    });
  })
};

export function getCityWeather(name) {    
  return Promise.all([
    weatherService.getWeatherByName(name),
    weatherService.getForecastByName(name),
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
    
    return {
      currentWeather: currentWeather,
      image: setIcon(weather[0].main),
      forecast: forecast,
    }
  }).catch(error => console.log(error));
};

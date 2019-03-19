import axios from 'axios';

class WeatherService {
  constructor() {
    this.weather = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5',
    });
    this.token = process.env.REACT_APP_WEATHER_KEY;
  };

  getWeatherByCoords(location){
    const { long, lat } = location;
    return this.weather.get(`/weather?lat=${lat}&lon=${long}&appid=${this.token}`)
      .then(({ data }) => data);
  }
};

const weatherService = new WeatherService();

export default weatherService;


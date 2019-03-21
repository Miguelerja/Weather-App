const setIcon = (weather) => {
  switch(weather) {
    case 'Thunderstorm':
      return '/images/storm.png';
    case 'Drizzle':
      return '/images/Drizzle.png';
    case 'Rain':
      return '/images/rain.png';
    case 'Snow':
      return '/images/snow.png';
    case 'Clear':
      return '/images/sunny.png';
    case 'Fog':
      return '/images/fog.png';
    case 'Tornado':
      return '/images/tornado.png';
    case 'Clouds':
      return '/images/cloudy.png';
    default:
      return null;
  };
};

export default setIcon;
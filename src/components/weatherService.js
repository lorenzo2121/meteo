import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeather = async (latitude, longitude) => {
  const response = await axios.get(BASE_URL, {
    params: {
      latitude,
      longitude,
      current_weather: true,
      hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m'
    },
  });

  // Log del JSON di risposta completo
  console.log(response.data);

  return response.data;
};

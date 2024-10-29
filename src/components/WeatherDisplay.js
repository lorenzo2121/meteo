// WeatherDisplay.js
import React, { useEffect, useState } from 'react';
import TemperatureChart from './TemperatureChart';
import { fetchWeather } from './weatherService';
import '../styles/WeatherDisplay.css';

function WeatherDisplay({ city, onAddFavorite }) {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeather(city.latitude, city.longitude);
      const currentWeather = data.current_weather;

      // Parsing dell'orario corrente
      const currentTime = new Date();
      const adjustedTime = new Date(currentTime);
      
      // Arrotondamento dell'ora in base ai minuti
      if (currentTime.getMinutes() <= 30) {
        adjustedTime.setMinutes(0);  // Arrotonda all'ora precedente
      } else {
        adjustedTime.setHours(currentTime.getHours() + 1);  // Arrotonda all'ora successiva
        adjustedTime.setMinutes(0);
      }
      console.log("adjusted",adjustedTime)

      // Generazione delle prossime 24 ore in formato ISO
      const next24Hours = [];
      const nextHour = new Date(adjustedTime);
      console.log("next",nextHour)
      for (let i = 0; i < 24; i++) {
        nextHour.setHours(adjustedTime.getHours() + i);
        next24Hours.push(nextHour.toISOString().slice(0, -8)); // Rimuovi i secondi e il suffisso 'Z'
    }
    console.log(next24Hours);


      // Ottieni l'indice dell'umidità e della temperatura per l'ora attuale 
      const temperatureIndex = data.hourly.time.findIndex(time => time.startsWith(adjustedTime.toISOString().slice(0, -8)));
      const humidityIndex = data.hourly.time.findIndex(time => time.startsWith(adjustedTime.toISOString().slice(0, -8)));
      const currentHumidity = humidityIndex !== -1 ? data.hourly.relative_humidity_2m[humidityIndex] : 'N/A';

      setWeatherData({
        temperature: currentWeather.temperature,
        windSpeed: currentWeather.windspeed,
        humidity: currentHumidity,
      });

      // Impostiamo i dati orari per il grafico della temperatura
      setHourlyData({
        time: next24Hours,  // Utilizza le prossime 24 ore in formato ISO
        temperature_2m: data.hourly.temperature_2m.slice(temperatureIndex, temperatureIndex + 24), // Assicurati di avere dati per 24 ore
      });
    };

    getWeather();
  }, [city]);

  if (!weatherData) return <div>Loading...</div>;

  return (
    <div className="WeatherDisplay">
      <h2>{city.name}</h2>
      <p>Temperatura: {weatherData.temperature}°C</p>
      <p>Umidità: {weatherData.humidity}%</p>
      <p>Vento: {weatherData.windSpeed} km/h</p>
      <button onClick={() => onAddFavorite({ ...city, weatherData })}>
        Aggiungi ai preferiti
      </button>
      
      {/* Componente per il grafico della temperatura */}
      <TemperatureChart hourlyData={hourlyData} />
    </div>
  );
}

export default WeatherDisplay;

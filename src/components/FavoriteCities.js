// FavoriteCities.js
import React from 'react';
import '../styles/FavoriteCities.css';

function FavoriteCities({ cities, onRemoveFavorite }) {
  return (
    <div className="FavoriteCities">
      <h2>Città Preferite</h2>
      <ul>
        {cities.map(city => (
          <li key={city.name}>
            <p>{city.name}</p>
            <p>Temperatura: {city.weatherData?.temperature || 'N/A'}°C</p>
            <p>Umidità: {city.weatherData?.humidity || 'N/A'}%</p>
            <p>Vento: {city.weatherData?.windSpeed || 'N/A'} km/h</p>
            <button onClick={() => onRemoveFavorite(city.name)}>Rimuovi</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteCities;

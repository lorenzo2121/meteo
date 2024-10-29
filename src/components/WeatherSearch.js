import React, { useState } from 'react';
import cities from '../italian_cities.json';
import '../styles/WeatherSearch.css'

function WeatherSearch({ onCitySelect }) {
  const [cityName, setCityName] = useState('');

  const handleSearch = () => {
    if (!cityName) return;

    // Cerca la città nel JSON
    const cityData = cities[cityName];
    if (cityData) {
      // Passa il nome, la latitudine e la longitudine al componente principale
      onCitySelect({ name: cityName, latitude: cityData.lat, longitude: cityData.lon });
    } else {
      alert("Città non trovata nel database!");
    }
    setCityName('');
  };

  return (
    <div className="WeatherSearch">
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Cerca una città"
      />
      <button onClick={handleSearch}>Cerca</button>
    </div>
  );
}

export default WeatherSearch;

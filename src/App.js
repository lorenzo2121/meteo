// App.js
import React, { useState, useEffect } from 'react';
import WeatherSearch from './components/WeatherSearch';
import WeatherDisplay from './components/WeatherDisplay';
import FavoriteCities from './components/FavoriteCities';
import './App.css';

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Stato per l'ordine

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteCities(savedFavorites);
  }, []);

  const handleAddFavorite = (cityWithWeatherData) => {
    // Cerca l'indice della città esistente
    const cityIndex = favoriteCities.findIndex(
      city => city.name === cityWithWeatherData.name
    );

    if (cityIndex !== -1) {
      // Se la città esiste già, sostituisci i dati
      const updatedFavorites = [...favoriteCities];
      updatedFavorites[cityIndex] = cityWithWeatherData; // Sostituisci
      setFavoriteCities(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Se la città non esiste, aggiungila
      const updatedFavorites = [...favoriteCities, cityWithWeatherData];
      setFavoriteCities(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleRemoveFavorite = (cityName) => {
    const updatedFavorites = favoriteCities.filter(city => city.name !== cityName);
    setFavoriteCities(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleSortFavorites = () => {
    const sortedFavorites = [...favoriteCities].sort((a, b) => {
      const tempA = a.weatherData?.temperature ?? Infinity;
      const tempB = b.weatherData?.temperature ?? Infinity;

      return sortOrder === 'asc' ? tempA - tempB : tempB - tempA;
    });
    setFavoriteCities(sortedFavorites);
    
    // Alterna l'ordine
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="App">
      <WeatherSearch onCitySelect={setSelectedCity} />
      {selectedCity && (
        <WeatherDisplay
          city={selectedCity}
          onAddFavorite={handleAddFavorite} // Passiamo la funzione direttamente
        />
      )}
      <div className="sort-controls">
        <button onClick={handleSortFavorites}>
          Ordina {sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}
        </button>
      </div>
      <FavoriteCities
        cities={favoriteCities}
        onRemoveFavorite={handleRemoveFavorite}
      />
    </div>
  );
}

export default App;

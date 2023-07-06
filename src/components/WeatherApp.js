import React, { useState, useEffect } from 'react';
import WeatherService from '../services/WeatherService';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = ''; // ! Replace with the desired location

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await WeatherService.getWeatherData(location);
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching weather data');
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {weatherData && (
        <div>
          {/* Render weather data here */}
          <h2>{weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          {/* Add more weather information as needed */}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

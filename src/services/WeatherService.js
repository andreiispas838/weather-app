import axios from 'axios';

const API_KEY = '';

const WeatherService = {
  getWeatherData: async (location) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`
      );
      
      // ! Handle the response and extract the relevant data 

      const weatherData = response.data; 

      // ! Customize as per the API response structure
      
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },
};

export default WeatherService;

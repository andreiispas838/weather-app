import { useState } from 'react';
import Search from './components/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import Favorites from './components/favorites';
import { Box, Button, Container, Grid, Switch, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from './mititei-logo.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2979FF',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  const handleToggleFavorites = () => {
    setShowFavorites((prevShowFavorites) => !prevShowFavorites);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box minHeight='100vh' bgcolor='#F5F5F5' py={4}>
        <Container maxWidth='md'>
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <a href=''>
                <img src={logo} alt='Logo' style={{ width: '100px', height: '100px' }} />
              </a>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Search onSearchChange={handleOnSearchChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box textAlign='right'>
                <Switch color='primary' checked={showFavorites} onChange={handleToggleFavorites} />
                <Typography variant='caption'>{showFavorites ? 'Show Forecast' : 'Show Favorites'}</Typography>
              </Box>
            </Grid>
            {currentWeather && (
              <Grid item xs={12} mt={3}>
                <CurrentWeather data={currentWeather} />
              </Grid>
            )}
            {showFavorites ? (
              <Grid item xs={12} mt={3}>
                <Favorites />
              </Grid>
            ) : (
              forecast && (
                <Grid item xs={12} mt={3}>
                  <Forecast data={forecast} />
                </Grid>
              )
            )}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import { setFavorites, getFavorites } from '../../services/local-storage';
import { calculateMititeiPercentage } from '../../services/Herculean-Proportions-Mititei-Success';
import 'react-toastify/dist/ReactToastify.css';
import './forecast.css';
import { Box, Typography, IconButton } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { StyledAccordionItemButton, StyledMititeiPercentage } from '../styled';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  const handleAddToFavorites = (item, idx) => {
    const favorites = getFavorites();
    const favoriteItem = {
      day: forecastDays[idx],
      date: item.dt_txt,
      temperature: `${Math.round(item.main.temp_max)}°C / ${Math.round(item.main.temp_min)}°C`,
      icon: item.weather[0].icon,
      mititei: calculateMititeiPercentage(item),
    };

    const isItemAlreadyFavorite = favorites.some((favorite) => {
      return favorite.day === favoriteItem.day && favorite.date === favoriteItem.date && favorite.temperature === favoriteItem.temperature && favorite.icon === favoriteItem.icon;
    });

    if (!isItemAlreadyFavorite) {
      const updatedFavorites = [...favorites, favoriteItem];
      setFavorites(updatedFavorites);
      toast.success('🙏🏾 Inshallah brother! ✨');
    } else {
      toast.error('👹 Not Halal, brother ! 👺');
    }
  };

  return (
    <>
      <ToastContainer position='bottom-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme='light' />
      <Typography variant='h6' className='title'>
        Daily
      </Typography>
      <Accordion allowZeroExpanded>
        {data.list
          .filter((item, index) => index % 8 === 0)
          .map((item, idx) => (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <StyledAccordionItemButton>
                  <Box display='flex' alignItems='center' justifyContent='space-between' padding={2} borderBottom='1px solid #e0e0e0' transition='background-color 0.3s ease-out' borderRadius={8} width='100%'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={`icons/${item.weather[0].icon}.png`} className='icon-small' alt='weather' />
                      <Typography variant='subtitle1' className='day' style={{marginLeft:'.7em'}}>
                        {forecastDays[idx]}
                      </Typography>
                    </div>
                    <StyledMititeiPercentage variant='subtitle2' className='mititei' percentage={calculateMititeiPercentage(item)}>
                      MITITEI {calculateMititeiPercentage(item)}%
                    </StyledMititeiPercentage>
                    <Typography variant='subtitle1' className='min-max'>
                      {Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C
                    </Typography>
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        handleAddToFavorites(item, idx);
                      }}
                      color='primary'>
                      <BookmarkAddIcon />
                    </IconButton>
                  </Box>
                </StyledAccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className='daily-details-grid'>
                  <div className='daily-details-grid-item'>
                    <Typography variant='body1'>Pressure:</Typography>
                    <Typography variant='body2'>{item.main.pressure} hPa</Typography>
                  </div>
                  <div className='daily-details-grid-item'>
                    <Typography variant='body1'>Humidity:</Typography>
                    <Typography variant='body2'>{item.main.humidity} %</Typography>
                  </div>
                  <div className='daily-details-grid-item'>
                    <Typography variant='body1'>Clouds:</Typography>
                    <Typography variant='body2'>{item.clouds.all} %</Typography>
                  </div>
                  <div className='daily-details-grid-item'>
                    <Typography variant='body1'>Wind speed:</Typography>
                    <Typography variant='body2'>{item.wind.speed} m/s</Typography>
                  </div>
                  <div className='daily-details-grid-item'>
                    <Typography variant='body1'>Sea level:</Typography>
                    <Typography variant='body2'>{item.main.sea_level} m</Typography>
                  </div>
                  <div className='daily-details-grid-item'>
                    <Typography variant='body1'>Feels like:</Typography>
                    <Typography variant='body2'>{item.main.feels_like} °C</Typography>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </>
  );
};

export default Forecast;

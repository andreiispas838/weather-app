import React from 'react';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import './forecast.css';
import { setFavorites, getFavorites } from '../../services/local-storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { calculateMititeiPercentage } from '../../services/Herculean-Proportions-Mititei-Success';

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
    // console.log(isItemAlreadyFavorite);
    if (!isItemAlreadyFavorite) {
      const updatedFavorites = [...favorites, favoriteItem];
      setFavorites(updatedFavorites);
      toast.success('Success');
    } else {
      toast.error('Nope');
    }
  };

  return (
    <>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme='colored' />
      <label className='title'>Daily</label>
      <Accordion allowZeroExpanded>
        {data.list
          .filter((item, index) => index % 8 === 0)
          .map((item, idx) => (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className='daily-item'>
                    <img src={`icons/${item.weather[0].icon}.png`} className='icon-small' alt='weather' />
                    <label className='day'>{forecastDays[idx]}</label>
                    <label className='description'>MITITEI {calculateMititeiPercentage(item)}</label>
                    <label className='min-max'>
                      {Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C
                    </label>
                    <button onClick={(event) => { event.stopPropagation(); handleAddToFavorites(item, idx); }}>Add to Favorites</button>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className='daily-details-grid'>
                  <div className='daily-details-grid-item'>
                    <label>Pressure:</label>
                    <label>{item.main.pressure}</label>
                  </div>
                  <div className='daily-details-grid-item'>
                    <label>Humidity:</label>
                    <label>{item.main.humidity}</label>
                  </div>
                  <div className='daily-details-grid-item'>
                    <label>Clouds:</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className='daily-details-grid-item'>
                    <label>Wind speed:</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className='daily-details-grid-item'>
                    <label>Sea level:</label>
                    <label>{item.main.sea_level}m</label>
                  </div>
                  <div className='daily-details-grid-item'>
                    <label>Feels like:</label>
                    <label>{item.main.feels_like}°C</label>
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

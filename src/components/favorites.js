import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import { getFavorites, setFavorites } from '../services/local-storage';

const Favorites = () => {
  const [favoritesArray, setFavoritesArray] = useState(getFavorites());
  const handleRemoveFavorite = (index) => {
    const updatedFavorites = [...favoritesArray];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
    setFavoritesArray(updatedFavorites);
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    setFavoritesArray([]);
  };

  return (
    <div className='favorites'>
      <h1>Favorite Days</h1>
      {favoritesArray.length > 0 ? (
        <div>
          <Accordion allowZeroExpanded>
            {favoritesArray.map((favorite, index) => (
              <AccordionItem key={index}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className='daily-item'>
                      <img src={`icons/${favorite.icon}.png`} className='icon-small' alt='weather' />
                      <label className='day'>{favorite.day}</label>
                      <label className='mititei'> MITITEI {favorite.mititei} </label>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRemoveFavorite(index);
                        }}>
                        Remove
                      </button>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div>
                    <p>Date: {favorite.date}</p>
                    <p>Temperature: {favorite.temperature}</p>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
          <button onClick={handleClearFavorites}>Clear All Favorites</button>
        </div>
      ) : (
        <p>No favorite days selected.</p>
      )}
    </div>
  );
};

export default Favorites;

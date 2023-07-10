import React from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import { getFavorites, setFavorites } from '../services/local-storage';

const Favorites = () => {
  const favorites = getFavorites();

  const handleRemoveFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    console.log(updatedFavorites);
    setFavorites([...updatedFavorites]);
  };

  const handleClearFavorites = () => {
    setFavorites([]);
  };

  return (
    <div className='favorites'>
      <h1>Favorite Days</h1>
      {favorites.length > 0 ? (
        <div>
          <Accordion allowZeroExpanded>
            {favorites.map((favorite, index) => (
              <AccordionItem key={index}>
                <AccordionItemHeading>
                <AccordionItemButton>
                  <div className='daily-item'>
                    <img src={`icons/${favorite.icon}.png`} className='icon-small' alt='weather' />
                    <label className='day'>{favorite.day}</label>
                                        {/* //TODO: mititei */}
                    <label className='mititei'> mititei % </label>
                  </div>
                    <button onClick={() => handleRemoveFavorite(index)}>Remove</button>
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

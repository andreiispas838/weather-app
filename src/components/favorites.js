import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import { getFavorites, setFavorites } from '../services/local-storage';
import { Box, Typography, IconButton, Button } from '@mui/material';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { StyledAccordionItemButton, StyledMititeiPercentage } from './styled';

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
                  <StyledAccordionItemButton>
                    <Box display='flex' alignItems='center' justifyContent='space-between' padding={2} borderBottom='1px solid #e0e0e0' transition='background-color 0.3s ease-out' borderRadius={8} width='100%'>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={`icons/${favorite.icon}.png`} className='icon-small' alt='weather' />
                        <Typography variant='subtitle1' className='day' style={{ marginLeft: '.7em' }}>
                          {favorite.day}
                        </Typography>
                      </div>
                      <StyledMititeiPercentage variant='subtitle2' className='mititei' percentage={favorite.mititei}>
                        MITITEI {favorite.mititei}%
                      </StyledMititeiPercentage>
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRemoveFavorite(index);
                        }}
                        color='primary'>
                        <BookmarkRemoveIcon style={{ color: '#c40219' }} />
                      </IconButton>
                    </Box>
                  </StyledAccordionItemButton>
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
          <Button style={{marginTop:'1em'}} variant='contained' onClick={handleClearFavorites}>
            Clear All Favorites
          </Button>
        </div>
      ) : (
        <p>No favorite days selected.</p>
      )}
    </div>
  );
};

export default Favorites;

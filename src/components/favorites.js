import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import { getFavorites, setFavorites } from '../services/local-storage';
import { styled, keyframes } from '@mui/system';
import { Box, Typography, IconButton } from '@mui/material';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { getAnimationKeyframes } from '../services/animations.js';

const StyledAccordionItemButton = styled(AccordionItemButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledMititeiPercentage = styled(Typography)(({ theme, percentage }) => ({
  animation: `${getAnimationKeyframes(percentage)} 0.8s infinite`,
}));


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
                    <Box display='flex' alignItems='center' padding={2} borderBottom='1px solid #e0e0e0' transition='background-color 0.3s ease-out' borderRadius={8} width='100%'>
                      <img src={`icons/${favorite.icon}.png`} className='icon-small' alt='weather' />
                      <Box flex='1' marginLeft={2}>
                        <Typography variant='subtitle1' className='day'>
                          {favorite.day}
                        </Typography>
                        <StyledMititeiPercentage variant='subtitle2' className='mititei'>
                          MITITEI {favorite.mititei}%
                        </StyledMititeiPercentage>
                      </Box>
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
          <button onClick={handleClearFavorites}>Clear All Favorites</button>
        </div>
      ) : (
        <p>No favorite days selected.</p>
      )}
    </div>
  );
};

export default Favorites;

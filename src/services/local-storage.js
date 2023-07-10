export const getFavorites = () => {
  const favorites = localStorage.getItem('favorites');
  // console.log('getFavorites:', favorites);
  return favorites ? JSON.parse(favorites) : [];
};

export const setFavorites = (favoritesArray) => {
  // console.log('setFavorites:', favoritesArray);
  localStorage.setItem('favorites', JSON.stringify(favoritesArray));
};


export const clearFavorites = () => {
  localStorage.removeItem('favorites');
};

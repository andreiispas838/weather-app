/* const calculateMititeiPercentage = (item) => {
  const { clouds, wind, main } = item;
  const cloudsPercentage = clouds.all;
  const windSpeed = wind.speed;
  const humidity = main.humidity;
  const feelsLike = main.feels_like;

  // Normalize the values to a 0-100 range
  const normalizedClouds = (cloudsPercentage / 100) * 100;
  const normalizedWind = (windSpeed / 9) * 100;
  const normalizedHumidity = ((humidity - 45) / (75 - 45)) * 100;
  const normalizedFeelsLike = ((feelsLike - 25) / (100 - 25)) * 100;

  // Calculate the average of the normalized values
  const average = (normalizedClouds + normalizedWind + normalizedHumidity + normalizedFeelsLike) / 4;

  // Round the average and convert it to a percentage string
  const mititeiPercentage = Math.round(average) + '%';

  return mititeiPercentage;
}; */


export const calculateMititeiPercentage = (item) => {
  const { clouds, wind, main } = item;
  const { all: cloudsPercentage } = clouds;
  const { speed: windSpeed } = wind;
  const { humidity, feels_like: feelsLike } = main;

  const criteriaMatched = [
    cloudsPercentage < 45,
    windSpeed < 9,
    humidity > 45 && humidity < 75,
    feelsLike > 25
  ].filter(Boolean).length;

  const mititeiPercentage = [0, 25, 50, 75, 100][criteriaMatched];
  
  return mititeiPercentage;
};

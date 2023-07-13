import React, { useState, useEffect } from 'react';
import './current-weather.css';

const CurrentWeather = ({ data }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const calculateTransform = () => {
    const maxLeanAngle = 15; // Adjust this value to control the maximum lean angle
    const maxTranslate = 10; // Adjust this value to control the maximum translation distance
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angleX = maxLeanAngle * ((mousePosition.y - centerY) / centerY);
    const angleY = -maxLeanAngle * ((mousePosition.x - centerX) / centerX);
    const translateX = maxTranslate * ((mousePosition.x - centerX) / centerX);
    const translateY = maxTranslate * ((mousePosition.y - centerY) / centerY);

    return `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateX(${translateX}px) translateY(${translateY}px)`;
  };

  return (
    <div className='weather' style={{ transform: calculateTransform(),  transition: 'transform 0.2s ease-out' }}>
      <div className='top'>
        <div>
          <p className='city'>{data.city}</p>
          <p className='weather-description'>{data.weather[0].description}</p>
        </div>
        <img alt='weather' className='weather-icon' src={`icons/${data.weather[0].icon}.png`} />
      </div>
      <div className='bottom'>
        <p className='temperature'>{Math.round(data.main.temp)}°C</p>
        <div className='details'>
          <div className='parameter-row'>
            <span className='parameter-label'>Details</span>
          </div>
          <div className='parameter-row'>
            <span className='parameter-label'>Feels like</span>
            <span className='parameter-value'>{Math.round(data.main.feels_like)} °C</span>
          </div>
          <div className='parameter-row'>
            <span className='parameter-label'>Wind</span>
            <span className='parameter-value'>{data.wind.speed} m/s</span>
          </div>
          <div className='parameter-row'>
            <span className='parameter-label'>Humidity</span>
            <span className='parameter-value'>{data.main.humidity} %</span>
          </div>
          <div className='parameter-row'>
            <span className='parameter-label'>Pressure</span>
            <span className='parameter-value'>{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>{' '}
    </div>
  );
};

export default CurrentWeather;

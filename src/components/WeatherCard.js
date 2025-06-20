import React from 'react';

function WeatherCard({ data }) {
  const { name, main, weather } = data;
  return (
    <div className="bg-white shadow-md p-6 rounded text-center w-72">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-4xl font-semibold">{Math.round(main.temp)}°C</p>
      <p className="capitalize">{weather[0].description}</p>
    </div>
  );
}

export default WeatherCard;

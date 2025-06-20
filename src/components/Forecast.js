import React from 'react';

function Forecast({ data }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">5-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {data.map((item, index) => {
          const date = new Date(item.dt_txt);
          return (
            <div key={index} className="bg-white p-4 rounded shadow text-center">
              <p className="font-semibold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className="mx-auto w-12 h-12"
              />
              <p>{Math.round(item.main.temp)}°C</p>
              <p className="capitalize text-sm">{item.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;

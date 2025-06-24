import {useEffect, useState} from "react";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import axios from "axios";

const API_KEY = '2c0bef5d13d81b46231ccb42f7ea3516';

function App() {
  const [city, setCity] = useState('dhaka');
  const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (res.statusText !== 'OK') throw new Error('City not found');
      setWeather(res.data);


      // Fetch forecast
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);

      // Filter forecast: 12:00:00 entries only
      const daily = forecastRes.data.list.filter(item =>
        item.dt_txt.includes('12:00:00')
      );
      setForecast(daily);
      setError('');

    } catch (error) {
      setError(error.message);
      setWeather(null);
      setForecast([]);
    }
  }
  useEffect(() => {
    return () => {
      fetchWeather();
    };
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if(city) fetchWeather();
  }

  return (
     <div className="min-h-screen flex flex-col items-center bg-blue-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🌤️ Weather + Forecast</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded border border-gray-400"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Search
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
      {weather && <WeatherCard data={weather} />}
      {forecast.length > 0 && <Forecast data={forecast} />}
    </div>
  );
}

export default App;

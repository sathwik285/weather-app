import { useState } from "react";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const inputValues = [ "Bangalore", "Delhi", "Mumbai", "Pune", "Kochi", "Hyderabad", "Kolkata", "Chennai" ]; 

  const [searchQuery, setSearchQuery] = useState("");

  const WEATHER_API_CURRENT_WEATHER_ENDPOINT = `${WEATHER_API_BASE_URL}weather?q=${searchQuery}&appid=${WEATHER_API_KEY}&units=metric`;
  const WEATHER_API_FORECAST_ENDPOINT = `${WEATHER_API_BASE_URL}forecast?q=${searchQuery}&appid=${WEATHER_API_KEY}&units=metric`;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleClick = (e) => {
    const currentWeatherFetch = fetch(WEATHER_API_CURRENT_WEATHER_ENDPOINT);
    const forecastFetch = fetch(WEATHER_API_FORECAST_ENDPOINT);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather(weatherResponse);
        setForecast(forcastResponse);
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search inputValues={inputValues} handleClick ={handleClick} handleSearch={handleSearch}/>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;

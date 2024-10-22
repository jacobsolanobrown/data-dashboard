import { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "";
const CITIES = ["Raleigh,NC", "Providence,RI", "New+York,NY", "Seattle,WA", "Los+Angeles,CA", "Paris", "Tokyo", "Yakima,WA"];

function App() {
  const [weatherData, setWeather] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const responses = await Promise.all(
          CITIES.map((city) =>
            fetch(
              // THIS IS HOW WE ARE FETCHING THE API DATA 
              `https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`
            )
          )
        );
        const data = await Promise.all(
          responses.map((response) => response.json())
        );
        setWeather(data.map((item) => item.data[0]));
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <>
      <h1>Weather Galore</h1>
      <ul>
        {weatherData.map((cityWeather, index) => (
          <li key={index}>
            <h2>{cityWeather.city_name}</h2>
            <p>Temperature: {cityWeather.temp}°C</p>
            <p>Weather Conditions: {cityWeather.weather.description}</p>
            <p>UV Index: {cityWeather.uv}</p>
            <p></p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

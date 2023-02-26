import "./App.css";
import { useEffect, useState } from "react";
import {
  getCurrentWeatherEndpoint,
  getWeatherForecastEndpoint,
} from "./api/endpoints";

import { CurrentWeather } from "./components/CurrentWeather";
import { getDayOfWeek, getMonth } from "./utils/date";

import { windToKmPerHour } from "./utils/weather";
import background from "./images/background_image.jpg";
import { CitySearch } from "./components/CitySearch";
import { WeatherForecastList } from "./components/WeatherForecastList";

function App() {
  const [city, setCity] = useState("Oradea");
  const [updatedCity, setUpdatedCity] = useState(city);
  const [weatherDetails, setWeatherDetails] = useState([]);
  const [forecastWeatherDetails, setForecastWeatherDetails] = useState([]);
  const [input, setInput] = useState("");

  const currentWeatherEndpoint = getCurrentWeatherEndpoint(updatedCity);
  console.log("currentWeatherEndpoint", currentWeatherEndpoint);

  const forecastWeatherEndpoint = getWeatherForecastEndpoint(updatedCity);
  console.log("forecastWeatherEndpoint", forecastWeatherEndpoint);

  useEffect(() => {
    fetch(currentWeatherEndpoint)
      .then((response) => response.json())
      .then((json) => {
        setWeatherDetails(json);
        // console.log("weatherDetails", weatherDetails);
      });
  }, [currentWeatherEndpoint]);

  // setWeatherDetails(useFetch(currentWeatherEndpoint));

  const { name, dt, main, weather, wind, cod } = weatherDetails;

  const currentWeatherDetails = {};
  if (cod === 200) {
    currentWeatherDetails.day = getDayOfWeek(dt);
    currentWeatherDetails.date = getMonth(dt);
    currentWeatherDetails.cityName = name;
    currentWeatherDetails.temperature = Math.trunc(main.temp);
    currentWeatherDetails.windSpeed = Math.round(windToKmPerHour(wind.speed));
    currentWeatherDetails.maxTemperature = Math.trunc(main.temp_max);
    currentWeatherDetails.minTemperature = Math.trunc(main.temp_min);
    currentWeatherDetails.weatherDescription = weather[0].description;
  }
  console.log("current Weather Details", currentWeatherDetails);

  useEffect(() => {
    fetch(forecastWeatherEndpoint)
      .then((response) => response.json())
      .then((json) => {
        const dailyForecastData = json.list.filter((forecast, index) => {
          return index % 8 === 0;
        });
        setForecastWeatherDetails(dailyForecastData);
        // console.log("forecast weatherDetails", forecastWeatherDetails);
      });
  }, [forecastWeatherEndpoint]);

  console.log("forecast weather details", forecastWeatherDetails);
  const forecastDetails = forecastWeatherDetails.map((forecast) => {
    return [forecast, forecast.dt];
  });
  console.log("forecastDetails", forecastDetails);

  const handleChange = (e) => {
    setCity(e.target.value);
    e.preventDefault();
    console.log("salut din handleChange");
  };

  const handleClick = () => {
    setUpdatedCity(city);
    setInput("");
    console.log("salut din handleClick", updatedCity, city);
  };

  return (
    <div className="App">
      <div
        className="Weather"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
          height: "100vh",
        }}
      >
        <CitySearch
          handleChange={handleChange}
          handleClick={handleClick}
        ></CitySearch>{" "}
        {cod === 200 && forecastWeatherDetails ? (
          <div className="Weather">
            <CurrentWeather
              day={currentWeatherDetails.day}
              date={`${currentWeatherDetails.date[0]} ${currentWeatherDetails.date[1]}`}
              city={currentWeatherDetails.cityName}
              temp={currentWeatherDetails.temperature}
              maxTemp={currentWeatherDetails.maxTemperature}
              wind={currentWeatherDetails.windSpeed}
              description={currentWeatherDetails.weatherDescription}
            ></CurrentWeather>

            <WeatherForecastList forecastDetails={forecastDetails} />
            {/* <div>{forecastItems}</div> */}
          </div>
        ) : (
          <p>The city you are searching for doesn't exist.</p>
        )}
      </div>
    </div>
  );
}

export default App;

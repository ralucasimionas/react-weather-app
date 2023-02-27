import "./App.css";
import background from "./images/background_image.jpg";
import { useEffect, useRef, useState } from "react";
import {
  getCurrentWeatherEndpoint,
  getWeatherForecastEndpoint,
} from "./api/endpoints";
import { getDayOfWeek, getMonth } from "./utils/date";
import { windToKmPerHour } from "./utils/weather";
import { CurrentWeather } from "./components/CurrentWeather";
import { CitySearch } from "./components/CitySearch";
import { WeatherForecastList } from "./components/WeatherForecastList";

function App() {
  const [city, setCity] = useState("Oradea");
  const [updatedCity, setUpdatedCity] = useState(city);
  const [weatherDetails, setWeatherDetails] = useState([]);
  const [forecastWeatherDetails, setForecastWeatherDetails] = useState([]);
  const inputRef = useRef(null);
  const placeholder = "enter your city";

  const currentWeatherEndpoint = getCurrentWeatherEndpoint(updatedCity);
  // console.log("currentWeatherEndpoint", currentWeatherEndpoint);

  const forecastWeatherEndpoint = getWeatherForecastEndpoint(updatedCity);
  // console.log("forecastWeatherEndpoint", forecastWeatherEndpoint);

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
  // console.log("current Weather Details", currentWeatherDetails);

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

  // console.log("forecast weather details", forecastWeatherDetails);
  const forecastDetails = forecastWeatherDetails.map((forecast) => {
    return [forecast, forecast.dt];
  });
  // console.log("forecastDetails", forecastDetails);

  const handleChange = (event) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setUpdatedCity(city);
  };

  const handleBlur = (event) => {
    if (event.target.value === "") {
      event.target.value = placeholder;
    }
  };

  return (
    <div className="App">
      <div
        className="Weather"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <CitySearch
          handleChange={handleChange}
          handleClick={handleClick}
          handleBlur={handleBlur}
          inputRef={inputRef}
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
            />

            <WeatherForecastList forecastDetails={forecastDetails} />
          </div>
        ) : (
          <p
            style={{
              margin: "auto",
              padding: "80px 0px 80px 0px",
              marginTop: "20px",

              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",

              backgroundColor: "#f0f8ff",
              opacity: "0.7",
              borderRadius: "10px",
              width: "60%",
            }}
          >
            The city you are searching for doesn't exist.
          </p>
        )}
        <p
          style={{
            textAlign: "center",
            display: "block",
            position: "fixed",
            bottom: "0px",
            left: "0",
            right: "0",
            color: "#FFFFFF",
          }}
        >
          Raluca Simionaș © 2023. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default App;

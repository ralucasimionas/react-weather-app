import { Container } from "react-bootstrap";
import { DailyWeatherForecast } from "./DailyWeatherForecast";

export function WeatherForecastList({ forecastWeatherDetails }) {
  const forecastDetails = forecastWeatherDetails.map((forecast) => {
    return <DailyWeatherForecast forecast={forecast} key={forecast.dt} />;
  });
  console.log("forecastDetails", forecastDetails);

  return <Container>{forecastDetails}</Container>;
}

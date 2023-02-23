import { Container, Row, Col } from "react-bootstrap";
import { getDayOfWeek } from "../utils/hooks/date";
import { getWeatherIcon } from "../utils/hooks/weather";

export function DailyWeatherForecast({ forecast }) {
  const day = getDayOfWeek(forecast.dt);
  const temp = Math.trunc(forecast.main.temp);
  const icon = getWeatherIcon(forecast.weather[0].icon);
  return (
    <div>
      <p className="date"> {day}</p>
      <img src={icon} alt="imagine" />
      <p>{temp}°C</p>
    </div>
  );
}

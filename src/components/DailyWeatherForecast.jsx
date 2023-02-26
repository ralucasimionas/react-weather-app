import { getDayOfWeek } from "../utils/date";
import { getWeatherIcon } from "../utils/weather";
import styles from "./DailyWeatherForecast.module.css";

export function DailyWeatherForecast({ forecast }) {
  const day = getDayOfWeek(forecast[0].dt).slice(0, 3);
  const temp = Math.trunc(forecast[0].main.temp);
  const icon = getWeatherIcon(forecast[0].weather[0].icon);
  return (
    <div className={styles.Daily}>
      <p> {day}</p>
      <img src={icon} alt="imagine" />
      <p>{temp}°C</p>
    </div>
  );
}

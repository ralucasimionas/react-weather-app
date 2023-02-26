import styles from "./CurrentWeather.module.css";
export function CurrentWeather(props) {
  const { day, date, city, maxTemp, wind, description, temp } = props;
  return (
    <div className={styles.CurrentWeather}>
      <div className={styles.ShortInfo}>
        <p className="date">
          {" "}
          {day}, {date}
        </p>
        <h4>{city}</h4>
        <h2>{temp}°C</h2>
      </div>

      <div className={styles.ShortDescription}>
        <p>{description}</p>
        <p>
          The high today will be of {maxTemp}°C, <br></br>with wind speed of{" "}
          {wind} km/h.
        </p>
      </div>
    </div>
  );
}

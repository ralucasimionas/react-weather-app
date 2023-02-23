export function CurrentWeather(props) {
  const { day, date, city, maxTemp, wind, description, temp } = props;
  return (
    <div className="current-weather bgColor white">
      <p className="date">
        {" "}
        {day}, {date}
      </p>
      <h2>{city}</h2>
      <h2>{temp}°C</h2>
      <p>
        {maxTemp}°C, {wind}km/h, {description}
      </p>
    </div>
  );
}

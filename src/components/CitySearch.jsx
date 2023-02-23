export function CitySearch(props) {
  const { handleChange, handleClick } = props;

  return (
    <div>
      <input
        placeholder="enter your city"
        type="text"
        onChange={handleChange}
      ></input>

      <button
        className="getWeather"
        type="submit"
        value="submit"
        onClick={handleClick}
      >
        Get weather forecast
      </button>
    </div>
  );
}

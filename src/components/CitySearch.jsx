import styles from "./CitySearch.module.css";
export function CitySearch(props) {
  const { handleChange, handleClick } = props;

  return (
    <div className={styles.Search}>
      <input
        className={styles.CityInput}
        placeholder="enter your city"
        onChange={handleChange}
      ></input>

      <button
        className={styles.GetWeatherButton}
        type="submit"
        value="submit"
        onClick={handleClick}
      >
        Get weather forecast
      </button>
    </div>
  );
}

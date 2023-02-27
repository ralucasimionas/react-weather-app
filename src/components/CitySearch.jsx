import styles from "./CitySearch.module.css";
export function CitySearch(props) {
  const { handleChange, handleClick, handleBlur, inputRef } =
    props;

  return (
    <div className={styles.Search}>
      <input
        className={styles.CityInput}
        placeholder="Enter your city"
        type="text"
        onChange={handleChange}

        onBlur={handleBlur}
        ref={inputRef}
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

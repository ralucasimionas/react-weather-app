import { Col, Container, Row } from "react-bootstrap";
import { DailyWeatherForecast } from "./DailyWeatherForecast";
import styles from "./WeatherForecastList.module.css";

export function WeatherForecastList({ forecastDetails }) {
  return (
    <Container className={styles.Container}>
      <Row className={styles.Row}>
        {forecastDetails.map((forecast) => (
          <Col className={styles.Col} key={forecast}>
            <DailyWeatherForecast forecast={forecast} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

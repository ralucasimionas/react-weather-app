const APPID = "bf2c8f8ee2bcb6883864649d2998d13d";

export function getCurrentWeatherEndpoint(city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APPID}&units=metric`;
}

export function getWeatherForecastEndpoint(city) {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APPID}&units=metric`;
}

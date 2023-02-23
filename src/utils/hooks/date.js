export function getDayOfWeek(utc) {
  const currentDate = new Date(utc * 1000);

  const dayIndex = currentDate.getDay();

  // if (dayIndex < 10) {
  //   dayIndex = "0" + dayIndex;
  // }

  let day;
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (let i = 0; i <= 6; i++) {
    if (dayIndex === i) {
      day = weekDay[i];
    }
  }
  return day;
}

export function getMonth(utc) {
  const currentDate = new Date(utc * 1000);
  let monthIndex = currentDate.getMonth();

  const date = currentDate.getDate();
  let month;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  for (let i = 0; i <= 11; i++) {
    if (monthIndex === i) {
      month = months[i];
    }
  }
  return [date, month]
}

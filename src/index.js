let now = new Date();

function formatDate(now) {
  let date = now.getDate();
  let year = now.getFullYear();

  let months = [
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
  let month = months[now.getMonth()];
  let todayDay = month + " " + date + ", " + year;
  return todayDay;
}

document.getElementById("currentDay").innerHTML = formatDate(now);

let week = new Date();
let hour = week.getHours();
hour = hour <= 9 ? "0" + hour : hour;
let minutes = week.getMinutes();
minutes = minutes <= 9 ? "0" + minutes : minutes;

//
function daysWeek(week) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[week.getDay()];

  let todayDayweek = day;
  return todayDayweek;
}

document.getElementById("dayWeek").innerHTML =
  daysWeek(week) + " " + hour + ":" + minutes;
//

function showTemperature(response) {
  let showTemp = document.querySelector("#temperatureCur");
  let showCityName = document.querySelector("#showCity");
  let cityName = response.data.name;
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  showCityName.innerHTML = cityName;
  showTemp.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//

function showFahrDegree(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureCur");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrTemp);
}
//
function showCelsiusDegree(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let showTemp = document.querySelector("#temperatureCur");
  showTemp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", showFahrDegree);
//
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusDegree);
//
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let apiKey = "4a4b1d82c8a7fedfd1508e6662f1d50f";
  let apiMainUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiMainUrl).then(showTemperature);
}

function getPosition(position) {
  let apiKey = "4a4b1d82c8a7fedfd1508e6662f1d50f";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiCurrent = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiCurrent}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
//
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let searchTown = document.querySelector("#search-form");
searchTown.addEventListener("click", searchCity);

let currentButton = document.querySelector("#input-current");
currentButton.addEventListener("click", getLocation);

searchCity(`Toronto`);

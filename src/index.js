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
  let temperature = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#temperatureCur");

  showTemp.innerHTML =
    temperature +
    ` <a href="javascript:celsiusDegree()">°C</a> / <a href="#fahrDegree()">°F</a>`;
  let cityName = response.data.name;
  let showCityName = document.querySelector("#showCity");

  showCityName.innerHTML = cityName;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//
function celsiusDegree(event) {
  event.preventDefault();
  let temperature = Math.round(data.main.temp);
  let showTemp = document.querySelector("#temperatureCur");
  let celsiusTemp = Math.round((temperature - 32) / 1.8);
  showTemp.innerHTML = `${celsiusTemp}`;
}
let celsius = document.querySelector("#temperatureCur");
celsius.addEventListener("click", celsiusDegree);
//
function fahrDegree(event) {
  event.preventDefault();
  let temperature = Math.round(data.main.temp);
  let showTemp = document.querySelector("#temperatureCur");
  let fahrTemp = Math.round(temperature * 1.8 + 32);
  showTemp.innerHTML = `${fahrTemp}`;
}
let fahrenheit = document.querySelector("#temperatureCur");
fahrenheit.addEventListener("click", fahrDegree);
//
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let apiKey = "4a4b1d82c8a7fedfd1508e6662f1d50f";
  let apiMainUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //let h3 = document.querySelector("h3");

  //if (searchInput.value) {
  //h3.innerHTML = searchInput.value;
  //} else {
  //h3.innerHTML = null;
  //alert("Please type a city");
  //}

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

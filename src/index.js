//Declare Days of Week & Abbrev Month Arrays
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

//Declare Default Temp Value from HTML as Current Temp
let currentTemp = document.querySelector(".current-temp").innerHTML;
currentTemp = parseInt(currentTemp, 10);

//Function to display Current Date & Time
function displayCurrentDT(days, months) {
  //Declare Current Date
  let currentDT = new Date();

  //Select Date HTML Placeholder and Replace with Current Day (ie. Sun, Aug 15)
  let dateValue = document.querySelector("#date-value");
  dateValue.innerHTML = `${days[currentDT.getDay()]}, ${
    months[currentDT.getMonth()]
  } ${currentDT.getDate()}`;

  //Select Time HTML Placeholder and Replace with Current Time in 24h (ie. 15:49)
  let timeValue = document.querySelector("#time-value");
  let currentMinutes = currentDT.getMinutes();
  //getMinutes does not return leading 0; therefore need to add to displaye
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  timeValue.innerHTML = `${currentDT.getHours()}:${currentMinutes}`;
}

//Display Weather from Search Results
function displaySearchTemp(weatherReponse) {
  currentTemp = Math.round(weatherReponse.data.main.temp);
  let currentTempDisplay = document.querySelector(".current-temp");
  currentTempDisplay.innerHTML = `${currentTemp}°C`;

  let cityDefault = document.querySelector("#current-city");
  cityDefault.innerHTML = weatherReponse.data.name;

  return currentTemp;
}

//Call Open Weather API
function getTemp(queryPath) {
  let weatherApiKey = "8a7d387ef910673e2322fa2db8174c73";
  let weatherRoot = "https://api.openweathermap.org/data/2.5/weather";
  let weatherUnits = "metric";

  axios
    .get(
      weatherRoot +
        queryPath +
        "&appid=" +
        weatherApiKey +
        "&&units=" +
        weatherUnits
    )
    .then(displaySearchTemp);
}

//Search Engine Function
function searchFormEnter(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  let queryPath = `?q=${cityInput.value}`;

  //Get Temp of Searched Location
  getTemp(queryPath);
}

//Convert Fahrenheit to C and vice versa
function convertC2F(event) {
  event.preventDefault();
  currentTemp = currentTemp * (9 / 5) + 32;
  let currentTempDisplay = document.querySelector(".current-temp");
  currentTempDisplay.innerHTML = `${Math.round(currentTemp)}°F`;
}

function convertF2C(event) {
  event.preventDefault();
  currentTemp = ((currentTemp - 32) * 5) / 9;
  let currentTempDisplay = document.querySelector(".current-temp");
  currentTempDisplay.innerHTML = `${Math.round(currentTemp)}°C`;
}

//Get Current Location and Replace Display Data
function getLocSuccess(response) {
  let currentLat = response.coords.latitude;
  let currentLon = response.coords.longitude;
  let queryPath = `?lat=${currentLat}&lon=${currentLon}`;
  alert("Getting Current Location");

  //Get Temp of Searched Location
  getTemp(queryPath);
}

//Unable to Get Current Location
function getLocError() {
  alert("Unable to retrieve your location!");
}

//Functions to Run on Load
//Run Function to Display Current Date & Time
displayCurrentDT(days, months);

//Declare Entered City Value & Add Listener
let searchCity = document.querySelector(".search-city-form");
searchCity.addEventListener("submit", searchFormEnter);

//Listeners for C/F toggles
let convertC2FButton = document.querySelector("#radioFah");
convertC2FButton.addEventListener("change", convertC2F);

let convertF2CButton = document.querySelector("#radioCel");
convertF2CButton.addEventListener("change", convertF2C);

//Listener for Current Location
let currentLocButton = document.querySelector("#get-current-location");
currentLocButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(getLocSuccess, getLocError);
});

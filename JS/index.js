/*
 * Route - Frontend
 * JS program Week 9
 * Weather Web APP
 * JS + Bootstrap + Ajax + APIs
 * 23/12/2023
 * Weather page JS
 * Mostafa Badr >> LinkedIn:
 * Mostafa Badr >> GitHub:
 */

//..................................... Global varaibles ....................................//
const menuBtn = document.querySelector(".mobile-menu-icon");
const mobileMenu = document.querySelector(".nav-lists-mobile");
const navItems = document.querySelectorAll(".nav-item-a");
const navMobUl = document.querySelector(".nav-lists-mobile ul");
const searchBox = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const warningBoxMsg = document.querySelector(".error-msg");
const weatherLocation = document.querySelector(".location");
const weatherDegree = document.querySelector(".c-js");
const conditionImg = document.querySelector(".condition-img");
const weatherStatment = document.querySelector(".weather-status");
const todayName = document.querySelector(".today-name");
const currentMonth = document.querySelector(".today-num-month");
const direction = document.querySelector(".direction");
const wind = document.querySelector(".wind");
const rain = document.querySelector(".rain");
const secondDay = document.querySelector(".second-day");
const _3rdDay = document.querySelector("._3rd-day");
const forecastDaysImg = document.querySelectorAll(".forecast-days-img");
const forecastDaysDeg = document.querySelectorAll(".forecast-days-deg");
const weatherStatus = document.querySelectorAll(".weather-status");
//.................................. Search Location weather ...............................//
searchButton.addEventListener("click", () => {
  if (searchBox != null) {
    let locationName = searchBox.value;
    showWeather(locationName);
  }
});
searchBox.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    if (searchBox != null) {
      let locationName = searchBox.value;
      showWeather(locationName);
    }
  }
});
//...................................... Mobile Menu  .......................................//

//open & close mobile screen menu + changing the menu icon
menuBtn.addEventListener("click", () => {
  console.log(mobileMenu.classList.toggle("display"));
  mobileMenu.classList.toggle("display");
  navMobUl.classList.toggle("ul-transition");
  if (mobileMenu.classList.toggle("display") === true) {
    menuBtn.innerHTML =
      '<i class="menu-icon fa-solid fa-pause words-color pb-3 mb-0 pt-0"></i>';
  } else {
    menuBtn.innerHTML =
      '<i class="menu-icon fa-solid fa-bars words-color pb-3 mb-0 pt-0"></i>';
  }
});

//....................................... API Results ..................................//
async function showWeather(locationName = "cairo") {
  // Local variables to not take memory space globally
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

  // API Connection
  const myHttp = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=bc6dd23432b04578a9e135527240101&q=${locationName}&days=3`
  );
  resp = await myHttp.json();

  // if CST's input doesn't get a response from the API >> show him MSG
  if (resp.location == undefined) {
    alertMsg("Not exist");
  }

  const d = new Date(`${resp.current.last_updated}`);
  const day = weekday[d.getDay()]; // transfer the curent day num to the day's name
  const month = d.getDay() + " " + months[d.getMonth()]; // day's num next to the month's name
  const secondDayName = new Date(resp.forecast.forecastday[1].date);
  const _3rdDayName = new Date(resp.forecast.forecastday[2].date);

  weatherLocation.innerHTML = `${resp.location.name}`;
  weatherDegree.innerHTML = `${resp.current.temp_c}`;
  weatherStatment.innerHTML = `${resp.current.condition.text}`;
  todayName.innerHTML = `${day}`;
  currentMonth.innerHTML = `${month}`;
  // the 3 addons info of the first day ( rain , wind, direction)
  direction.innerHTML = `${resp.current.wind_dir}`;
  wind.innerHTML = `${resp.current.wind_kph} km/h`;
  rain.innerHTML = `${resp.current.precip_in} %`;
  //the second and third Days' name
  secondDay.innerHTML = `${weekday[secondDayName.getDay()]}`;
  _3rdDay.innerHTML = `${weekday[_3rdDayName.getDay()]}`;

  conditionImg.setAttribute("src", `${resp.current.condition.icon}`);

  //loop on the days started from the second day - because the first day already got its data from the last updated data
  for (let i = 1; i < forecastDaysImg.length + 1; i++) {
    forecastDaysImg[i - 1].setAttribute(
      "src",
      resp.forecast.forecastday[i].day.condition.icon
    );
    forecastDaysDeg[
      i - 1
    ].innerHTML = `${resp.forecast.forecastday[i].day.avgtemp_c}<sup>o</sup>C`;
    weatherStatus[
      i
    ].innerHTML = `${resp.forecast.forecastday[i].day.condition.text}`;
  }
}
showWeather();

//...................................... Automation Functions ..............................//

// function show error MSG for 3 seconds then dissappear
function alertMsg(msg) {
  warningBoxMsg.innerHTML = msg;
  warningBoxMsg.classList.add("display");
  setTimeout(() => {
    warningBoxMsg.classList.remove("display");
    warningBoxMsg.innerHTML = "";
  }, "3000");
}

// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
  // Prompt user for permission to access their location
  navigator.geolocation.getCurrentPosition(
    // Success callback function
    (position) => {
      // Get the user's latitude and longitude coordinates
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Do something with the location data, e.g. display on a map
      console.log(`Latitude: ${lat}, longitude: ${lng}`);
    },
    // Error callback function
    (error) => {
      // Handle errors, e.g. user denied location sharing permissions
      console.error("Error getting user location:", error);
    }
  );
} else {
  // Geolocation is not supported by the browser
  console.error("Geolocation is not supported by this browser.");
}

function displayLocation(latitude, longitude) {
  var request = new XMLHttpRequest();

  var method = "GET";
  var url =
    "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    latitude +
    "," +
    longitude +
    "&sensor=true";
  var async = true;

  request.open(method, url, async);
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      console.log(request);

      var data = JSON.parse(request.responseText);
      var address = data.results[0];
      console.log(address);
    }
  };
  request.send();
}

var successCallback = function (position) {
  var x = position.coords.latitude;
  var y = position.coords.longitude;
  displayLocation(x, y);
};

var errorCallback = function (error) {
  var errorMessage = "Unknown error";
  switch (error.code) {
    case 1:
      errorMessage = "Permission denied";
      break;
    case 2:
      errorMessage = "Position unavailable";
      break;
    case 3:
      errorMessage = "Timeout";
      break;
  }
  console.log(errorMessage);
};

var options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0,
};

navigator.geolocation.getCurrentPosition(
  successCallback,
  errorCallback,
  options
);

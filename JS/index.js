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
const input = document.querySelector("#mode");

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

//...................................... User's Location .......................................//
// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
  // Prompt user for permission to access their location
  navigator.geolocation.getCurrentPosition(
    // Success callback function
    (position) => {
      // Get the user's latitude and longitude coordinates
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      let locationAutomatic = `${lat},${lng}`;
      // Do something with the location data
      showWeather(locationAutomatic);
    },
    // Error callback function
    (error) => {
      // Handle errors, e.g. user denied location sharing permissions
      console.error("Error getting user location:", error.message);
    }
  );
} else {
  // Geolocation is not supported by the browser
  console.error("Geolocation is not supported by this browser.");
}
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
  const forecastDaysMaxTemp = document.querySelectorAll(".max-temp");
  const forecastDaysMinTemp = document.querySelectorAll(".min-temp");
  const todayMinTemp = document.querySelector(".current-min");
  const weatherStatus = document.querySelectorAll(".weather-status");
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

  // Local Variables after getting API response
  const forecastDays = resp.forecast.forecastday;
  const currentDay = resp.current;
  const d = new Date(`${currentDay.last_updated}`);
  const day = weekday[d.getDay()]; // transfer the curent day num to the day's name
  const month = d.getDay() + " " + months[d.getMonth()]; // day's num next to the month's name
  const secondDayName = new Date(forecastDays[1].date);
  const _3rdDayName = new Date(forecastDays[2].date);
  console.log(currentDay);
  // Filling in the page the data we got
  weatherLocation.innerHTML = `${resp.location.name}`;
  weatherDegree.innerHTML = `${currentDay.temp_c}`;
  todayMinTemp.innerHTML = `min. ${forecastDays[0].day.mintemp_c}`;
  weatherStatment.innerHTML = `${currentDay.condition.text}`;
  todayName.innerHTML = `${day}`;
  currentMonth.innerHTML = `${month}`;
  // the 3 addons info of the first day ( rain , wind, direction)
  direction.innerHTML = `${currentDay.wind_dir}`;
  wind.innerHTML = `${currentDay.wind_kph} km/h`;
  rain.innerHTML = `${currentDay.precip_in} %`;
  //the second and third Days' name
  secondDay.innerHTML = `${weekday[secondDayName.getDay()]}`;
  _3rdDay.innerHTML = `${weekday[_3rdDayName.getDay()]}`;

  conditionImg.setAttribute("src", `${currentDay.condition.icon}`);

  //loop on the days started from the second day - because the first day already got its data from the last updated data
  for (let i = 1; i < forecastDaysImg.length + 1; i++) {
    forecastDaysImg[i - 1].setAttribute(
      "src",
      forecastDays[i].day.condition.icon
    );
    forecastDaysDeg[
      i - 1
    ].innerHTML = `${forecastDays[i].day.avgtemp_c}<sup>o</sup>C`;
    forecastDaysMaxTemp[
      i - 1
    ].innerHTML = `<span class="min-word">max.</span> ${forecastDays[i].day.maxtemp_c}<sup>o</sup>C`;
    forecastDaysMinTemp[
      i - 1
    ].innerHTML = `<span class="min-word">min.</span> ${forecastDays[i].day.mintemp_c}<sup>o</sup>C`;
    weatherStatus[i].innerHTML = `${forecastDays[i].day.condition.text}`;
  }
}
showWeather();
//....................................... Dark Theme ..................................//
if (localTheme == "light") {
  input.checked = true;
}
input.addEventListener("click", () => {
  const root = document.documentElement;
  let dataTheme = root.getAttribute("data-theme");
  let newTheme = dataTheme == "light" ? "dark" : "light";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

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

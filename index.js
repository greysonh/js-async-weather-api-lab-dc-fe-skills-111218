const API_KEY = "&APPID=ffbeeb25cb7d223ae466535b49b0250c"
var cityName

function handleFormSubmit(event) {
  //handle submit event
  cityName = document.getElementById("city").value;
  cityName = cityName.replace(/ {1,}/g," ").trim();
  cityName = cityName.replace(" ", "+");
  return cityName;
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}${API_KEY}`)
    .then(response => response.json())
    .then(json => displayCurrentWeather(json));
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
  
  var temp = json.main.temp;
  var low = Math.round(json.main.temp_min * 9/5 - 459.67) + "° F";
  var high = Math.round(json.main.temp_max * 9/5 - 459.67) + "° F";
  var humidity = json.main.humidity + "%";
  var cloud = json.clouds.all + "%";
  
  document.getElementById("temp").innerText = temp;
  document.getElementById("low").innerText = low;
  document.getElementById("high").innerText = high;
  document.getElementById("humidity").innerText = humidity;
  document.getElementById("cloud").innerText = cloud;
}

function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}${API_KEY}`)
    .then(response => response.json())
    .then(json => displayFiveDayForecast(json));
}

function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
document.getElementById("forecast").innerHTML = "";

for (var x of json.list) {
  var fiveDay = x.dt_txt + ", " + Math.round(x.main.temp * 9/5 - 459.67) + "° F" + ", " + x.main.humidity + "% humidity";
  var element = document.createElement("div");
  var text = document.createTextNode(fiveDay);
  element.appendChild(text);
  document.getElementById("forecast").appendChild(element);
  }
}

function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
}

document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
  document.getElementById("citySubmit").addEventListener("click", function(e) {
    event.preventDefault();
    handleFormSubmit();
    fetchCurrentWeather(cityName);
    fetchFiveDayForecast(cityName);
  })

})
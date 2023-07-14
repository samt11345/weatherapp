const apiKey = '13ef001e053d1c1a140492e9f0ab4962';
function getWeather(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

  // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

  document.getElementById('weather-container').innerHTML = '<h2>Loading...</h2>';


  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
console.log(data)
      displayWeatherData(data);
      setToSearchHistory(data);
    })
    .catch(error => {

      console.log(error);
      document.getElementById('weather-container').innerHTML = '<h2>Error fetching weather data</h2>';
    });
}
document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault()
  const location = document.getElementById('search-input').value;

  getWeather(location)
});


function displayWeatherData(data) {
  const weatherContainer = document.getElementById('weather-container');
  console.log(data.list[0])
  for (let i = 0; i < 5; i++){
  const temperatureCelsius = Math.round(data.list[i].main.temp - 273.15); // Convert temperature from Kelvin to Celsius
  const temperatureFahrenheit = Math.round((temperatureCelsius * 9 / 5) + 32); // Convert temperature from Celsius to Fahrenheit
  
  const description = data.list[i].weather[0].description;
  const weatherIcon = data.list[i].weather[0].icon;
  const weatherHTML = `
      <h2>Current Weather</h2>
      <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
      <p>Temperature: ${temperatureFahrenheit}°F</p>
      <p>Description: ${description}</p>
    `;
    var element = document.createElement("div")
element.innerHTML=weatherHTML
weatherContainer.append(element)
}
}
function setToSearchHistory(data) {
  console.log(data.city)
  var searchHistoryContainer = document.getElementById('search-history')
  var arrayInfo = JSON.parse(localStorage.getItem("mysearches")) || []
  if (!arrayInfo.includes(data.city.name)) {
    console.log(data.city.name)
    var cityNameHTML =
      `<h4 class="search-item">${data.city.name}</h4>`;
    var element = document.createElement("div")
    element.innerHTML = cityNameHTML
    searchHistoryContainer.append(element)
    arrayInfo.push(data.city.name)
    localStorage.setItem("mysearches", JSON.stringify(arrayInfo))
    hotSauce()
  }
}
$(document).ready(function () {
  var searchData = JSON.parse(localStorage.getItem("mysearches")) || {}
  console.log(searchData)
  var searchHistoryContainer = document.getElementById('search-history')
  for (let i = 0; i < searchData.length; i++) {
    var cityNameHTML =
      `<h4 class="search-item">${searchData[i]}</h4>`;
    var element = document.createElement("div")
    element.innerHTML = cityNameHTML
    searchHistoryContainer.append(element)
    hotSauce()
  }


})

function hotSauce() {
  console.log("hotSauce")
  $(".search-item").click(function (event) {
    console.log("search-item")
    console.log(event.target.tagName)
    const location = event.target.textContent
    getWeather(location)
  })

}


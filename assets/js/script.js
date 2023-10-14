const apiKey = '13ef001e053d1c1a140492e9f0ab4962';


// Fetches weather data from OpenWeatherMap
function getWeather(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

  // Display loading message while fetching data
  document.getElementById('weather-container').innerHTML = '<h2>Loading...</h2>';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeatherData(data);
      setToSearchHistory(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('weather-container').innerHTML = '<h2>Error fetching weather data</h2>';
    });
}

// Handle form submission to get weather
document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const location = document.getElementById('search-input').value;
  getWeather(location);
});

// Display weather information
function displayWeatherData(data) {
  const weatherContainer = document.getElementById('weather-container');
  const city = data.city.name;

  for (let i = 0; i < 5; i++) {
    const temperatureCelsius = Math.round(data.list[i].main.temp - 273.15);
    const temperatureFahrenheit = Math.round((temperatureCelsius * 9 / 5) + 32);
    const humidity = data.list[i].main.humidity;
    const windSpeed = data.list[i].wind.speed;
    const date = new Date(data.list[i].dt * 1000).toLocaleDateString(); // Convert from UNIX timestamp to formatted date

    const weatherHTML = `
      <div class="card col-md-3 mb-4">
        <div class="card-body">
          <h5 class="card-title">Weather Details</h5>
          <p class="card-text">City: ${city}</p>
          <p class="card-text">Date: ${date}</p>
          <p class="card-text">Temperature: ${temperatureFahrenheit}°F</p>
          <p class="card-text">Humidity: ${humidity}%</p>
          <p class="card-text">Wind Speed: ${windSpeed} MPH</p>
        </div>
      </div>
    `;

    weatherContainer.innerHTML += weatherHTML;
  }
}

// Handle adding to search history
function setToSearchHistory(data) {
  const searchHistoryContainer = document.getElementById('search-history');
  const cityName = data.city.name;

  if (!localStorage.getItem('mysearches')) {
    localStorage.setItem('mysearches', JSON.stringify([cityName]));
  } else {
    const arrayInfo = JSON.parse(localStorage.getItem('mysearches'));
    if (!arrayInfo.includes(cityName)) {
      arrayInfo.push(cityName);
      localStorage.setItem('mysearches', JSON.stringify(arrayInfo));
    }
  }

  // Display in search history
  const cityNameHTML = `<h4 class="search-item">${cityName}</h4>`;
  const element = document.createElement('div');
  element.innerHTML = cityNameHTML;
  searchHistoryContainer.appendChild(element);

  hotSauce();
}

// Click event for search history
function hotSauce() {
  console.log('hotSauce');
  $(".search-item").click(function (event) {
    const location = event.target.textContent;
    getWeather(location);
  });
}

// Load search history on page load
$(document).ready(function () {
  const searchData = JSON.parse(localStorage.getItem('mysearches')) || {};
  const searchHistoryContainer = document.getElementById('search-history');

  for (let i = 0; i < searchData.length; i++) {
    const cityNameHTML = `<h4 class="search-item">${searchData[i]}</h4>`;
    const element = document.createElement('div');
    element.innerHTML = cityNameHTML;
    searchHistoryContainer.appendChild(element);
    hotSauce();
  }
});

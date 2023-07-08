document.getElementById('search-btn').addEventListener('click', function() {
    const apiKey = '13ef001e053d1c1a140492e9f0ab4962';
    const searchInput = document.getElementById('search-input');
    const location = searchInput.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  
    // Clear previous weather data
    document.getElementById('weather-container').innerHTML = '<h2>Loading...</h2>';
  
    // Make a request to the API endpoint
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Handle the retrieved weather data here
        displayWeatherData(data);
      })
      .catch(error => {
        // Handle any errors
        console.log(error);
        document.getElementById('weather-container').innerHTML = '<h2>Error fetching weather data</h2>';
      });
  });
  
  function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather-container');
    const temperatureCelsius = Math.round(data.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
    const temperatureFahrenheit = Math.round((temperatureCelsius * 9/5) + 32); // Convert temperature from Celsius to Fahrenheit
    const description = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
  
    const weatherHTML = `
      <h2>Current Weather</h2>
      <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
      <p>Temperature: ${temperatureFahrenheit}°F</p>
      <p>Description: ${description}</p>
    `;
  
    weatherContainer.innerHTML = weatherHTML;
  }
  
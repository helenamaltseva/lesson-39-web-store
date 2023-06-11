const apiKey = 'ed2dfe1138b483ad02c2ee4ca1f30e6e';
const weatherInfoElement = document.getElementById('weatherInfo');

function fetchWeatherData(city, countryCode) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weather = data.weather[0];
      const temperature = Math.round(data.main.temp - 273.15); 

      const weatherData = {
        city,
        countryCode,
        weather,
        temperature,
        timestamp: Date.now(),
      };

      localStorage.setItem('weatherData', JSON.stringify(weatherData));

      return weatherData;
    });
}

function displayWeatherData(weatherData) {
  const { city, countryCode, weather, temperature } = weatherData;

  weatherInfoElement.innerHTML = `
    <h2>${city}, ${countryCode}</h2>
    <p>Weather: ${weather.main}</p>
    <p>Temperature: ${temperature}°C</p>
  `;
}

function getWeatherData() {
  fetchWeatherData('London', 'GB')
    .then(weatherData => {
      displayWeatherData(weatherData);
    })
    .catch(error => {
      console.log('Error fetching weather data:', error);
    });
}

getWeatherData();
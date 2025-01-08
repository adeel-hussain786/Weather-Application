const weather = document.getElementById("getWeather");
const alertBox = document.getElementById("customAlert");
const alertMessage = document.getElementById("alertMessage");
const closeAlert = document.getElementById("closeAlert");

weather.addEventListener("click", function () {
  const cityInput = document.getElementById("cityinput").value.trim();
  const selectCity = document.getElementById("selectcity").value;
  const city = cityInput || selectCity;

  if (!city) {
    showAlert("Please enter or select a city.");
    return;
  }

  fetchWeather(city);
});

async function fetchWeather(city) {
  const apiKey = "f19975079edc0d25ea33659c13f4b477";
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.error) {
      throw new Error(data.error ? data.error.info : "City not found");
    }

    displayWeather(data);
  } catch (error) {
    showAlert("Error: " + error.message);
  }
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weatherResult");
  weatherDiv.innerHTML = `
    <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
    <p>Temperature: ${data.current.temperature}°C</p>
    <p>Humidity: ${data.current.humidity}%</p>
    <p>Description: ${data.current.weather_descriptions[0]}</p>
  `;
}

function showAlert(message) {
  alertMessage.textContent = message;
  alertBox.classList.remove("hidden");
}

closeAlert.addEventListener("click", function () {
  alertBox.classList.add("hidden");
});

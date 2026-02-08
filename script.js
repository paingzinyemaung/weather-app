const searchInput = document.querySelector(".search-input");
const currentWeather = document.querySelector(".current-weather");

// Weather codes for mapping to custom icons
const weatherCodes = {
    clear: [1000],
    clouds: [1003, 1006, 1009],
    mist: [1030, 1135, 1147],
    rain: [1063, 1150, 1153, 1168, 1171, 1188, 1183, 1198, 1201, 1240, 1243, 1246, 1273, 1276],
    moderate_heavy_rain: [1186, 1189, 1192, 1195, 1243, 1246],
    snow: [1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282],
    thunder: [1887, 1279, 1282],
    thunder_rain: [1273, 1276],
}

const API_KEY = "8c137235d9b14689a8b75807263001";

const getWeatherDetails = async(API_URL) => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);  

        const temperature = data.current.temp_c;
        const description = data.current.condition.text;
        const weatherIcon = Object.keys(weatherCodes).find( icon => weatherCodes[icon].includes(data.current.condition.code));
        console.log(temperature, description);

        currentWeather.querySelector(".weather-icon").src = `icons/${weatherIcon}.svg`;
        currentWeather.querySelector(".temperature").innerHTML = `${temperature}<span>°C</span>`;
        currentWeather.querySelector(".description").innerText = `${description}`;
          
    }catch(error) {
        console.log("Error fetching weather data:", error); 
    }
}

const setupWeatherRequests = (cityName) => {
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=2`;
    getWeatherDetails(API_URL);
}

searchInput.addEventListener("keyup", (e) => {
    let cityName = searchInput.value.trim();
    if (e.key == "Enter" && cityName) {        
        setupWeatherRequests(cityName);
    }
});
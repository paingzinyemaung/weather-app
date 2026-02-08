const searchInput = document.querySelector(".search-input");
const currentWeather = document.querySelector(".current-weather");
const hourlyWeather = document.querySelector(".hourly-weather .weather-list");

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

const displayHourlyForecast = (hourlyData) => {
    const currentHours = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHours + 24 * 60 * 60 * 1000;
    
    const next24HoursData = hourlyData.filter(({time}) => {
        const forecastTime = new Date(time).getTime();
        return forecastTime > currentHours && forecastTime <= next24Hours;
    });
    console.log(next24HoursData);
    
    hourlyWeather.innerHTML = next24HoursData.map( item => {
        const temperature = Math.floor(item.temp_c);
        const time = item.time.split(" ")[1].substring(0, 5);
        const weatherIcon = Object.keys(weatherCodes).find( icon => weatherCodes[icon].includes(item.condition.code));
        return `<li class="weather-item">
                    <p class="item">${time}</p>
                    <img src="icons/${weatherIcon}.svg" class="weather-icon" alt="" srcset="">
                    <p class="temperature">${temperature}°</p>
            </li>`;
    }).join(" ");
    
}


const getWeatherDetails = async(API_URL) => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // console.log(data);  

        const temperature = Math.floor(data.current.temp_c);
        const description = data.current.condition.text;
        const weatherIcon = Object.keys(weatherCodes).find( icon => weatherCodes[icon].includes(data.current.condition.code));
        // console.log(temperature, description);

        currentWeather.querySelector(".weather-icon").src = `icons/${weatherIcon}.svg`;
        currentWeather.querySelector(".temperature").innerHTML = `${temperature}<span>°C</span>`;
        currentWeather.querySelector(".description").innerText = `${description}`;

        const combineHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];
        // console.log(combineHourlyData);
        displayHourlyForecast(combineHourlyData);

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
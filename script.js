const searchInput = document.querySelector(".search-input");


const API_KEY = "8c137235d9b14689a8b75807263001";
const getWeatherDetails = async(API_URL) => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);
        
    }catch {
        
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
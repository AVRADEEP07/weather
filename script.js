// 1. Paste your API Key here from your OpenWeath
const fetchWeather  = async (city) => {
  try {
    const url = `/weather?city=${city}`;
    
    const response = await fetch(url);
    const data = await response.json();
    

    // Check for errors
    if (data.cod === "404") {
      alert("City not found!");
      return;
    }

    // ✅ These are correct for OpenWeatherMap
    document.getElementById('cityName').innerHTML = data.name;
    document.getElementById('temp').innerHTML = data.main.temp.toFixed(2);
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('humidity').innerHTML = data.main.humidity;
    document.getElementById('wind_speed').innerHTML = (data.wind.speed*3.6).toFixed(1);
    document.getElementById('cloud_pct').innerHTML = data.clouds.all;
     // % cloud cover
     document.getElementById('temp_min').innerHTML = data.main.temp_min;
     document.getElementById('temp_max').innerHTML = data.main.temp_max;
     document.getElementById('feels_like').innerHTML = data.main.feels_like;
     document.getElementById('visibility').innerHTML = (data.visibility / 1000).toFixed(1);
     document.getElementById('condition').innerHTML = data.weather[0].description;
     document.getElementById('pressure').innerHTML = data.main.pressure;
     document.getElementById('wind_deg').innerHTML = data.wind.deg;
     const condition = data.weather[0].main.toLowerCase();
     const weatherId = data.weather[0].id;
     const backgrounds = {
       clear:        "linear-gradient(135deg, #87CEEB, #f9d71c)",
        clouds:       "linear-gradient(135deg, #6a7d90, #9aaabb)",
        rain:         "linear-gradient(135deg, #3a4f6a, #1e2d40)",
       drizzle:      "linear-gradient(135deg, #4a6080, #2a3d55)",
       thunderstorm: "linear-gradient(135deg, #1a1e2e, #0d0f1a)",
       snow:         "linear-gradient(135deg, #c8d8ec, #dde8f4)",
       mist:         "linear-gradient(135deg, #8a9aa8, #c0cdd8)",
        haze:         "linear-gradient(135deg, #8a9aa8, #c0cdd8)",
       fog:          "linear-gradient(135deg, #7a8a98, #b0c0cc)",
      
     };
     
     
     document.body.style.background = backgrounds[condition] || backgrounds["clear"];
     document.body.style.transition = "background 1.5 ease";
     
     document.body.style.backgroundSize = "cover";
     document.body.style.backgroundPosition = "center";
     document.body.style.backgroundAttachment = "fixed";







    console.log(data);

  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}




// 3. Search Button Logic
document.getElementById('submit').addEventListener("click", (e) => {
    e.preventDefault(); // Stops the page from refreshing
    const cityValue = document.getElementById('city').value;
    fetchWeather(cityValue);
});
// Cities table - fetch data for each city
const cities = ["Manchester", "Kolkata", "Lucknow", "Melbourne", "Wellington", "Colombo"];

cities.forEach(async (city) => {
    const cityUrl = `/weather?city=${city}`;
    const response = await fetch(cityUrl);
    const data = await response.json();
    
    document.getElementById(`${city}-temp`).innerHTML = data.main.temp;
    document.getElementById(`${city}-humidity`).innerHTML = data.main.humidity;
    document.getElementById(`${city}-rain`).innerHTML = data.rain ?  (data.rain['1h'] || data.rain['3h'] || 0).toFixed(1) + ' mm' : '0 mm';
});
// Auto detect location on page load
navigator.geolocation.getCurrentPosition(
    (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const geoUrl =  `/weather?lat=${lat}&lon=${lon}`; 
        fetch(geoUrl)
            .then(res => res.json())
            .then(data => fetchWeather(data.name));
    },
    () => {
        fetchWeather("Delhi"); // fallback if user denies location
    }
);

// 4. Default city on load
fetchWeather("Delhi");
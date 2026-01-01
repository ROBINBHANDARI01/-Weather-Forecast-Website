<<<<<<< HEAD

let city = document.getElementById("city");
let type = document.getElementById("type");
let temp = document.getElementById("temp");
let ico = document.getElementById("icon")
let input = document.getElementById("inp");
let wind = document.getElementById("wind");
let humid = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let visibility = document.getElementById("visibility");
let minTemp = document.getElementById("min-temp");
let maxTemp = document.getElementById("max-temp");
let c = document.getElementById("title");
let API_key = "6d83156e4e40ca97d0c6924b832fe00c";

  //Weather ICONS 
 const weatherIcons = {
      clouds: "wi-cloudy.svg",
      clear: "wi-day-sunny.svg",
      rain: "wi-rain.svg",
      snow: "wi-snow.svg",
      haze: "wi-day-haze.svg",
      mist: "wi-day-haze.svg",
      thunderstorm: "wi-day-sleet-storm.svg",
      smoke: "wi-smoke.svg",
    };

input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        loader();
       function loader() {
        
    // Check if loader already exists
    if (!document.getElementById("loader")) {
        const img = document.createElement("img");
        img.id = "loader";
        img.src = "assets/icons/loader.gif";
        const ele1 = document.getElementById("city");
        ele1.append(img);
    }

    myFun();
}
    }
})
const data = async function (search) {
  
    let getData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}&units=metric`);
    console.log(getData);
    let jsonData = await getData.json();
    console.log(jsonData);
    console.log(jsonData.name);

    let weatherContent = document.getElementById("weather-content");
    let errorScreen = document.getElementById("error");
const errorText = errorScreen.querySelector("p");
    let errorImg = document.getElementById("errimg");

    if (jsonData.cod == 400) {
        errorText.innerText = "Enter a city name !"
        weatherContent.style.display = "none";
        errorScreen.style.display = "block";
        errorImg.src = "assets/icons/error1.png";
        return;
    }
    if (jsonData.cod == 404) {
        errorText.innerText = "Can't find city !"
        weatherContent.style.display = "none";
        errorScreen.style.display = "block";
        errorImg.src = "assets/icons/error2.png";
        return;
    }

    weatherContent.style.display = "block";
    errorScreen.style.display = "none";

    city.innerHTML = jsonData.name;
    getForecast(jsonData.coord.lat, jsonData.coord.lon);
    temp.innerHTML = Math.floor(jsonData.main.temp) + " °C";
    type.innerHTML = jsonData.weather[0].main;
    humidity.innerHTML = `Humidity : ${jsonData.main.humidity}`;
    visibility.innerHTML = `Visibility : ${jsonData.visibility}`;
    pressure.innerHTML = `Pressure : ${jsonData.main.pressure} Pa`;
    wind.innerHTML = `Speed : ${jsonData.wind.speed} m/s, Direction ${jsonData.wind.deg} `
    minTemp.innerHTML = `Minimum temperature : ${jsonData.main.temp_min}`;
    maxTemp.innerHTML = `Maximum tempreature : ${jsonData.main.temp_max}`;

    c.style.display = "none";
    const weatherType = jsonData.weather[0].main.toLowerCase();

    const weatherBackgrounds = {
      clouds: "cloudy2.jpg",
      clear: "clear.jpg",
      rain: "rainy.jpg",
      snow: "snow.jpg",
      haze: "haze.jpg",
      mist: "haze.jpg",
      thunderstorm: "Thunderstorm.jpg",
      smoke: "smoke.jpg",
    };

    ico.src = `assets/images/${weatherIcons[weatherType] || "wi-day-sunny.svg"}`;
document.body.style.background = `url("assets/bg-images/${weatherBackgrounds[weatherType] || "clear.jpg"}") center center/cover no-repeat fixed`;
    input.value = ""
}

//Creating a new function to fetch hourly data from onecall api

async function getForecast(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
  );
  const data = await res.json();
  renderForecastFrom3Hour(data.list);
}


//rendring function for 
function renderForecastFrom3Hour(list) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  const days = {};

  // 1️⃣ Group data by date
  list.forEach(item => {
    const [date, time] = item.dt_txt.split(" ");

    if (!days[date]) {
      days[date] = {
        temps: [],
        icon: null,
        dt: item.dt
      };
    }

    // Collect all temperatures of the day
    days[date].temps.push(item.main.temp);

    // Prefer 12:00 PM icon
    if (time === "12:00:00") {
      days[date].icon = item.weather[0].main.toLowerCase();
      days[date].dt = item.dt;
    }

    // Fallback icon (first available)
    if (!days[date].icon) {
      days[date].icon = item.weather[0].main.toLowerCase();
      days[date].dt = item.dt;
    }
  });

  // 2️⃣ Render next 6 days (skip today)
  Object.values(days).slice(1, 7).forEach(day => {
    const minTemp = Math.min(...day.temps);
    const maxTemp = Math.max(...day.temps);

    const date = new Date(day.dt * 1000).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short"
    });

    forecastDiv.innerHTML += `
      <div class="forecast-card">
        <p>${date}</p>
        <img src="assets/images/${weatherIcons[day.icon] || "wi-day-sunny.svg"}">
        <p>${Math.round(maxTemp)}° / ${Math.round(minTemp)}°</p>
      </div>
    `;
  });
}



function myFun() {
    search = input.value;
    data(search)
}

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const getData = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
        );
        const jsonData = await getData.json();
        data(jsonData.name); // use detected city name
        getForecast(lat,lon)
      },
      (err) => {
        console.warn("Geolocation denied, showing default city.");
        data("New Delhi"); // fallback
      }
    );
  } else {
    data("New Delhi"); // fallback
  }
=======

let city = document.getElementById("city");
let type = document.getElementById("type");
let temp = document.getElementById("temp");
let ico = document.getElementById("icon")
let input = document.getElementById("inp");
let wind = document.getElementById("wind");
let humid = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let visibility = document.getElementById("visibility");
let minTemp = document.getElementById("min-temp");
let maxTemp = document.getElementById("max-temp");
let c = document.getElementById("title");
let API_key = "6d83156e4e40ca97d0c6924b832fe00c";

input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        loader();
       function loader() {
        
    // Check if loader already exists
    if (!document.getElementById("loader")) {
        const img = document.createElement("img");
        img.id = "loader";
        img.src = "assets/icons/loader.gif";
        const ele1 = document.getElementById("city");
        ele1.append(img);
    }

    myFun();
}
    }
})
const data = async function (search) {
    let getData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}&units=metric`);
    console.log(getData);
    let jsonData = await getData.json();
    console.log(jsonData);
    console.log(jsonData.name);


    let weatherContent = document.getElementById("weather-content");
    let errorScreen = document.getElementById("error");
const errorText = errorScreen.querySelector("p");
    let errorImg = document.getElementById("errimg");

    if (jsonData.cod == 400) {
        errorText.innerText = "Enter a city name !"
        weatherContent.style.display = "none";
        errorScreen.style.display = "block";
        errorImg.src = "assets/icons/error1.png";
        return;
    }
    if (jsonData.cod == 404) {
        errorText.innerText = "Can't find city !"
        weatherContent.style.display = "none";
        errorScreen.style.display = "block";
        errorImg.src = "assets/icons/error2.png";
        return;
    }

    weatherContent.style.display = "block";
    errorScreen.style.display = "none";

    city.innerHTML = jsonData.name;
    temp.innerHTML = Math.floor(jsonData.main.temp) + " °C";
    type.innerHTML = jsonData.weather[0].main;
    humidity.innerHTML = `Humidity : ${jsonData.main.humidity}`;
    visibility.innerHTML = `Visibility : ${jsonData.visibility}`;
    pressure.innerHTML = `Pressure : ${jsonData.main.pressure} Pa`;
    wind.innerHTML = `Speed : ${jsonData.wind.speed} m/s, Direction ${jsonData.wind.deg} `
    minTemp.innerHTML = `Minimum temperature : ${jsonData.main.temp_min}`;
    maxTemp.innerHTML = `Maximum tempreature : ${jsonData.main.temp_max}`;

    c.style.display = "none";
    const weatherType = jsonData.weather[0].main.toLowerCase();

    const weatherBackgrounds = {
      clouds: "cloudy2.jpg",
      clear: "clear.jpg",
      rain: "rainy.jpg",
      snow: "snow.jpg",
      haze: "haze.jpg",
      mist: "haze.jpg",
      thunderstorm: "Thunderstorm.jpg",
      smoke: "smoke.jpg",
    };

    const weatherIcons = {
      clouds: "wi-cloudy.svg",
      clear: "wi-day-sunny.svg",
      rain: "wi-rain.svg",
      snow: "wi-snow.svg",
      haze: "wi-day-haze.svg",
      mist: "wi-day-haze.svg",
      thunderstorm: "wi-day-sleet-storm.svg",
      smoke: "wi-smoke.svg",
    };

    ico.src = `assets/images/${weatherIcons[weatherType] || "wi-day-sunny.svg"}`;
document.body.style.background = `url("assets/bg-images/${weatherBackgrounds[weatherType] || "clear.jpg"}") center center/cover no-repeat fixed`;
    input.value = ""
}



function myFun() {
    search = input.value;
    data(search)
}

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const getData = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
        );
        const jsonData = await getData.json();
        data(jsonData.name); // use detected city name
      },
      (err) => {
        console.warn("Geolocation denied, showing default city.");
        data("New Delhi"); // fallback
      }
    );
  } else {
    data("New Delhi"); // fallback
  }
>>>>>>> 8722241beefb86c6db785042298fb1d558792c5e
});
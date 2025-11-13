let city = document.getElementById("city");
let type = document.getElementById("type");
let temp = document.getElementById("temp");
let image = document.getElementById("img");
let input = document.getElementById("inp");
let wind = document.getElementById("wind");





input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        loader();
        function loader() {
            let ma = document.getElementById("main");
            ma.innerHTML = "";
            const image1 = document.createElement("img");
            image1.id = "Load"
            image1.src = "assets/icons/loader.gif"

            let l = document.getElementById("main")
            l.append(image1)
        }
    }

    var cityInputValue = city.value;

    let API_key = "6d83156e4e40ca97d0c6924b832fe00c";
    var unit = "metric";
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${API_key}&units=${unit}`;

    if (cityInputValue != "") {
        async function getWeather() {
            var response = await fetch(apiUrl);
            var data = await response.json();

            if (data.message != "city not found" && data.cod != "404") {

                var location = data.name;
                var temperature = data.main.temp;
                var weatherType = data.weather[0].description;
                var realFeel = data.main.feels_like;
                var windSpeed = data.wind.speed;
                var windDirection = data.wind.deg;
                var visibility = data.visibility / 1000;
                var pressure = data.main.pressure;
                var maxTemperature = data.main.temp_max;
                var minTemperature = data.main.temp_min;
                var humidity = data.main.humidity;
                var sunrise = data.sys.sunrise;
                var sunset = data.sys.sunset;

                fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInputValue}&appid=${apiKey}`)
                    .then(response => response.json())
                    .then(data => {
                        const forecastContainer = document.getElementById('daily');

                        forecastContainer.innerHTML = "";

                        const dailyForecasts = {};
                        data.list.forEach(entry => {
                            const dateTime = new Date(entry.dt * 1000);
                            const date = dateTime.toLocaleDateString('en-US', { weekday: 'short', day: "numeric" });

                            if (!dailyForecasts[date]) {
                                dailyForecasts[date]={
                                        date: date,
                                         icon: `https://openweathermap.org/img/w/${entry.weather[0].icon}.png`,
                                        maxTemp: -Infinity,
                                        minTemp: Infinity,
                                        weatherType: entry.weather[0].main
                                    };
                                }
                                if (entry.main.temp_max > dailyForecasts[date].maxTemp) {
                                    dailyForecasts[date].maxTemp = entry.main.temp_max;
                                }
                                if (entry.main.temp_min < dailyForecasts[date].minTemp) {
                                    dailyForecasts[date].minTemp = entry.main.temp_min;
                                }
                            });
                        Object.values(dailyForecasts).forEach(day => {
                            const forecastCard = document.createElement('div');
                            forecastCard.classList.add('daily-forecast-card');

                            forecastCard.innerHTML = `
        <p class="daily-forecast-date">${day.date}</p>
        <div class="daily-forecast-logo"><img class="imgs-as-icons" src="${day.icon}"></div>
        <div class="max-min-temperature-daily-forecast">
          <span class="max-daily-forecast">${Math.round(day.maxTemp - 273.15)}<sup>o</sup>C</span>
          <span class="min-daily-forecast">${Math.round(day.minTemp - 273.15)}<sup>o</sup>C</span>
        </div>
        <p class="weather-type-daily-forecast">${day.weatherType}</p>
      `;

                            forecastContainer.appendChild(forecastCard);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });



                document.getElementById("locationName").innerHTML = location;
                document.getElementById("temperatureValue").innerHTML = temperature + "<sup>o</sup>C";
                document.getElementById("weatherType").innerHTML = weatherType;
                document.getElementById("realFeelAdditionalValue").innerHTML = realFeel + "<sup>o</sup>C";
                document.getElementById("windSpeedAdditionalValue").innerHTML = windSpeed + " km/h";
                document.getElementById("windDirectionAdditionalValue").innerHTML = windDirection;
                document.getElementById("visibilityAdditionalValue").innerHTML = visibility + " km";
                document.getElementById("pressureAdditionalValue").innerHTML = pressure;
                document.getElementById("maxTemperatureAdditionalValue").innerHTML = maxTemperature + "<sup>o</sup>C";
                document.getElementById("minTemperatureAdditionalValue").innerHTML = minTemperature + "<sup>o</sup>C";
                document.getElementById("humidityAdditionalValue").innerHTML = humidity;
                document.getElementById("sunriseAdditionalValue").innerHTML = sunrise;
                document.getElementById("sunsetAdditionalValue").innerHTML = sunset;
            }
            else {
                document.getElementById("locationName").innerHTML = "City Not Found";
                document.getElementById("temperatureValue").innerHTML = "";
                document.getElementById("weatherType").innerHTML = "";
            }
        }

        getWeather();
    }
    else document.getElementById("locationName").innerHTML = "Enter a city name...";
}
);


document.getElementById("resetBtn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevents page reload if reset button is <a>

    // Clear input field (correct ID is "searchCity")
    document.getElementById("searchCity").value = "";

    // Reset main weather display
    document.getElementById("locationName").innerHTML = "";
    document.getElementById("temperatureValue").innerHTML = "";
    document.getElementById("weatherType").innerHTML = "";

    // Reset additional weather details
    document.getElementById("realFeelAdditionalValue").innerHTML = "";
    document.getElementById("windSpeedAdditionalValue").innerHTML = "";
    document.getElementById("windDirectionAdditionalValue").innerHTML = "";
    document.getElementById("visibilityAdditionalValue").innerHTML = "";
    document.getElementById("pressureAdditionalValue").innerHTML = "";
    document.getElementById("maxTemperatureAdditionalValue").innerHTML = "";
    document.getElementById("minTemperatureAdditionalValue").innerHTML = "";
    document.getElementById("humidityAdditionalValue").innerHTML = "";
    document.getElementById("sunriseAdditionalValue").innerHTML = "";
    document.getElementById("sunsetAdditionalValue").innerHTML = "";

    // Clear forecast cards
    document.getElementById("forecast-container").innerHTML = "";

    // Optionally show default message
    document.getElementById("locationName").innerHTML = "Enter a city to get weather details";
});





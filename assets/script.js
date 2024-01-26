const APIkey = "2ae0fed7d9cace10869d3b92643028e3";
var cityName;
var cityArray = [];

// Getting LAT&LON
function getLatLon() {
    cityName = $('#cityName')[0].value;
    saveCity(cityName);
    const apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&units=imperial&appid=2ae0fed7d9cace10869d3b92643028e3"
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                getCurrentWeather(data[0].lat, data[0].lon);
                getForecast();
            })
        }
    })

}

// Getting Current Weather
function getCurrentWeather(lat, lon) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
        
                renderCurrentWeather(data);
            })
        }
    })
}

// Getting Forecast for 5 day
function getForecast(data) {


    const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=2ae0fed7d9cace10869d3b92643028e3"
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                renderFutureWeather(data);
            })
        }
    })
}

// Render Weather details onto the page 
function renderCurrentWeather(data) {
    $("#city-name").text(cityName).val
    $("#date-now").text(dayjs().format("MM/DD/YYYY"));
    $("#currentIcon").attr('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    $("#temperature").text("Temp: " + data.main.temp + " Fahrenheit");
    $("#wind-speed").text("Wind Speed: " + data.wind.speed + " MPH");
    $("#humidity").text("Humidity: " + data.main.humidity + " %");
}


// Render Future Weather details for 5 day Forecast onto the page 
function renderFutureWeather(data) {
    var iconUrl = "https://openweathermap.org/img/w/"

    var forecast = data.list.filter((forecastItem) => forecastItem.dt_txt.includes("03:00:00"));

    for (var i = 0; i < forecast.length; i++) {
        const formattedDate = dayjs(forecast[i].dt_txt).format('MM/DD/YYYY');

        $(`#day-${i}`).text(formattedDate);
        $(`#img-${i}`).attr('src', `https://openweathermap.org/img/w/${forecast[i].weather[0].icon}.png`);
        $(`#temp-${i}`).text("Temp: " + forecast[i].main.temp + " Fahrenheit");
        $(`#wind-speed-${i}`).text("Wind Speed: " + forecast[i].wind.speed + " MPH");
        $(`#hum-${i}`).text("Humidity: " + forecast[i].main.humidity + " %");
    }
}

// Submit button 
$("#search-button").on("click", function (e) {
    e.preventDefault();
    getLatLon();
    getForecast();
    $(".forecast-panel").addClass("visible");
    $(".current-conditions-panel").addClass("visible");
});

function saveCity(city) {
    if(cityArray.indexOf(city) !== -1){
        return;
    }
    cityArray.push(city)
    localStorage.setItem("search-history", JSON.stringify(cityArray))
    update();
}

function update() {
    var cityHistory = localStorage.getItem("search-history")
    if(cityHistory){
        cityArray = JSON.parse(cityHistory)
        document.querySelector("#city-list").innerHTML = ""
        for(var i = cityArray.length -1; i >= 0; i--){
                console.log(cityArray[i]);
            var btn = document.createElement("button")
            btn.setAttribute("class", "historyBtn")
            btn.textContent = cityArray[i]
            document.querySelector("#city-list").append(btn)
        }
    }
}

update();

document.querySelector("#city-list").addEventListener("click", function(e){
    e.preventDefault();
    if(e.target.matches(".historyBtn")) {
        cityName = e.target.textContent
        console.log(cityName);
        const apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&units=imperial&appid=2ae0fed7d9cace10869d3b92643028e3"
        fetch(apiUrl).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    $(".forecast-panel").addClass("visible");
                    $(".current-conditions-panel").addClass("visible");
                    getCurrentWeather(data[0].lat, data[0].lon);
                    getForecast();
                })
            }
        })
    }
})


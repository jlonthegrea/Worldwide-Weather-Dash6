const APIkey = "2ae0fed7d9cace10869d3b92643028e3";
var cityName;

// Getting LAT&LON
function getLatLon() {
    cityName = $('#cityName')[0].value;

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
function getForecast() {

    const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=2ae0fed7d9cace10869d3b92643028e3";
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

    $("#city-name").text(cityName).val + dayjs().format("MM/DD/YYYY");
    $("#temperature").text("Temp: " + data.main.temp + " Fahrenheit");
    $("#wind-speed").text("Wind Speed: " + data.wind.speed + " MPH");
    $("#humidity").text("Humidity: " + data.main.humidity + " %");
}


// Render Future Weather details for 5 day Forecast onto the page 
function renderFutureWeather(data) {
    console.log(data);

    

    // $("#img-0").src (data.list[0].weather[0]);
    $("#day-0").text(data.list[0].dt_txt);
    $("#temp-0").text("Temp: " + data.list[0].main.temp + " Fahrenheit");
    $("#wind-speed-0").text("Wind Speed: " + data.list[0].wind.speed + " MPH");
    $("#hum-0").text("Humidity: " + data.list[0].main.humidity + " %");
    

    // for (var i = 0; i < 5; i++) {
    //     var weatherTmr = {
    //         date: dayjs().format("MM/DD/YYY"),
    //         temperature: data.list.main.temp,
    //         wind_speed: data.wind.speed,
    //         humidity: data.main.humidity

    //     }
    //     var Selector = "#day-" + i;
    //     $(Selector).text (weatherTmr.date);
    //     Selector = "#temp-" + i
    //     $(Selector).text ("Temp: " + weatherTmr.temp + " Fahrenheit");
    //     Selector = "#wind-speed-" + i
    //     $(Selector).text ("Wind Speed: " + weatherTmr.wind_speed + " MPH");
    //     Selector = "#hum-" + i
    //     $(Selector).text ("Humidity: " + weatherTmr.humidity + " %");
    // }
}

// Submit button 
$("#search-button").on("click", function (e) {
    e.preventDefault();
    getLatLon();
    getForecast();
    $(".forecast-panel").addClass("visible");
})


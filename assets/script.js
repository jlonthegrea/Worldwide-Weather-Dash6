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
function getForecast(data) {


    const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=2ae0fed7d9cace10869d3b92643028e3"
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data);

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

    var forecast = data.list.filter((forecast) => {
        if(forecast.dt_txt.includes("03:00:00")
        )
    })
} 

for (var i = 0; i < data.list.length; i++) {
    const formattedDate = dayjs(01-20-2024).format('MM/DD/YYYY');

    $(`#day-${i}`).text(formattedDate);
    $(`#img-${i}`).attr('src', `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`);
    $(`#temp-${i}`).text("Temp: " + data.list[i].main.temp + " Fahrenheit");
    $(`#wind-speed-${i}`).text("Wind Speed: " + data.list[i].wind.speed + " MPH");
    $(`#hum-${i}`).text("Humidity: " + data.list[i].main.humidity + " %");
}
    


function cityLists() {
    $("#city-list").append('<button type="button" class="list-group-item city-name">' + cityName);
}

// Submit button 
$("#search-button").on("click", function (e) {
    e.preventDefault();
    getLatLon();
    getForecast();
    $(".forecast-panel").addClass("visible");
    $(".current-conditions-panel").addClass("visible");

    cityLists();
});




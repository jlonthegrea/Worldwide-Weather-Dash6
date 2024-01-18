const APIkey = "2ae0fed7d9cace10869d3b92643028e3";
var cityName;


function getLatLon() {
    cityName = $('#cityName')[0].value;

    const apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=2ae0fed7d9cace10869d3b92643028e3"

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                getCurrentWeather(data[0].lat, data[0].lon);
                getForecast();
            })
        }
    })

}

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

function getForecast() {

    const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=2ae0fed7d9cace10869d3b92643028e3";


    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);


                // $("#cityName")[0].textContent = cityName + (dayjs().format("MM/DD/YYYY"));
                // $("#city-list").append(cityName);
                // localStorage.setItem(cityName, cityName); Save coordinates in 2nd argument

            })
        }
    })


}


// Current Weather details
function renderCurrentWeather(data) {
    

    $("#temperature").text ("Temp: " + data.main.temp + " Fahrenheit");
    $("#wind-speed").text ("Wind Speed: " + data.main.humidity + "%");
    $("#humidity").text ("Humidity: " + data.main.wind_speed + " MPH");
}




// Future Weather details for 5 day Forecast
function getWeatherTmr(data) {


    for (var i = 0; i < 5; i++) {
        var weatherTmr = {
            date: dayjs().format("MM/DD/YYY"),
            temp: data.daily[i + 1].temp.day.toFixed(1),
            wind_speed: data.daily[i + 1].wind_speed.toFixed(1),
            humidity: data.daily[i + 1].humidity

        }
        var Selector = "#day-" + i;
        $(Selector)[0].textContent = weatherTmr.date;
        Selector = "#temp-" + i
        $(Selector)[0].textContent = "Temp: " + weatherTmr.temp + "Fahrenheit";
        Selector = "#wind-speed-" + i
        $(Selector)[0].textContent = "Wind Speed: " + weatherTmr.wind_speed + "MPH";
        Selector = "#hum-" + i
        $(Selector)[0].textContent = "Humidity: " + weatherTmr.humidity + "%";
    }
}

// Submit button 
$("#search-button").on("click", function (e) {
    e.preventDefault();

    // getWeatherData();
    getLatLon();
})

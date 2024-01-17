var APIkey = "6f5c8c987926cb92d9f35b3ec647c7d9";
var cityName = $('#cityName')[0].value;


function getWeatherData() {
    var apiUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "appid=6f5c8c987926cb92d9f35b3ec647c7d9";

    fetch(apiUrl).then(function(response) {
        if(response.ok){
            response.json().then(function(data){
                $("#cityName")[0].textContent = cityName + (dayjs().format("MM/DD/YYYY"));
                $("#city-list").append(cityName);

                const {lat, lon} = getWeatherData.coord;

                localStorage.setItem(cityName);

                var apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=6f5c8c987926cb92d9f35b3ec647c7d9";

                fetch(apiUrl2).then(function(anotherResponse) {
                    if(anotherResponse.ok) {
                        anotherResponse.json().then(function(anotherData) {
                            getWeatherNow(anotherData);
                        })
                    }
                })

            })
        } else {
            alert("Cannot find city.");
            console.log(alert);
        }
    })

}

// Current Weather details
function getWeatherNow(data) {
    $("temperature")[0].textContent = "Temp: " + data.current.temp.toFixed(1) + "Fahrenheit";
    $("wind-speed")[0].textContent = "Wind Speed: " + data.current.humidity + "%";
    $("humidity")[0].textContent = "Humidity: " + data.current.wind_speed.toFixed(1) + " MPH";
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
        var Selector = "#day-" +i;
        $(Selector)[0].textContent = getWeatherTmr.date;
        Selector = "#temp-" + i
        $(Selector)[0].textContent = "Temp: " + weatherTmr.temp + "Fahrenheit";
        Selector = "#wind-speed-" + i
        $(Selector)[0].textContent = "Wind Speed: " + weatherTmr.wind_speed + "MPH";
        Selector = "#hum-" + i
        $(Selector)[0].textContent = "Humidity: " + weatherTmr.humidity + "%";
    }
}

// Submit button 
$("#search-button").on("click", function(e) {
    e.preventDefault();
    
    getWeatherData();
})

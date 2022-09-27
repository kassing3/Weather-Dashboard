var APIKey = "6a9709b094e0b8eacd34f19884c78078"

var cityEl = document.getElementById("cityEl")
var currentWeatherIconEl = document.getElementById("currentWeatherIconEl")
var currentDateEl= document.getElementById("currentDate")
var currentTempEl = document.getElementById("currentTemp")
var currentWindEl = document.getElementById("currentWind")
var currentHumidityEl = document.getElementById("currentHumidity")

var currentDate = moment().format("MM/DD/YYYY")
currentDateEl.textContent = currentDate;


function getParams() {
    var searchParamsArr = document.location.search.split("&");
    var cityParam = searchParamsArr[0].split("=").pop();

    var locQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityParam + ",US" + "&appid=" + APIKey
    



    fetch(locQueryUrl)
    .then(function(response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
        var lat = data[0].lat;
        var lng = data[0].lon;
        var city = data[0].name;
        var state = data[0].state;

        cityEl.textContent = city + ", " + state

        callCurrentWeatherAPI(lat, lng);
        callFiveDayWeatherAPI(lat, lng);
    });
    
   
    
};

function callCurrentWeatherAPI(lat, lng){
    var currentQueryUrl = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + lng + "&appid=" + APIKey + "&units=imperial"

    fetch(currentQueryUrl)
    .then(function (response){
        return response.json()
    })
    .then(function(data){
        console.log(data)

        var iconURL = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        var currentTemp = data.main.temp
        var currentWind = data.wind.speed
        var currentHumidity = data.main.humidity

        currentWeatherIconEl.setAttribute("src", iconURL);
        currentTempEl.textContent = currentTemp + "\u00B0F"
        currentWindEl.textContent = currentWind + " MPH"
        currentHumidityEl.textContent = currentHumidity + "%"

       
    })

}

function callFiveDayWeatherAPI(lat, lng) {
 var fiveQueryURL = "http://api.openweathermap.org/data/2.5/forecast?" + "lat=" + lat + "&lon=" + lng + "&appid=" + APIKey + "&units=imperial" 
 
 
 fetch(fiveQueryURL)
 .then(function(response){
    return response.json();
 })
 .then(function(data){
    console.log(data);
    
    // for (var i =0; i < 5; i++) {
    //     if (data.list.dt_txt = )
    // } 

 })

}

getParams();
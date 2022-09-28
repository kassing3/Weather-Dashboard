var APIKey = "6a9709b094e0b8eacd34f19884c78078"

var cityEl = document.getElementById("cityEl")
var currentWeatherIconEl = document.getElementById("currentWeatherIconEl")
var currentDateEl= document.getElementById("currentDate")
var currentTempEl = document.getElementById("currentTemp")
var currentWindEl = document.getElementById("currentWind")
var currentHumidityEl = document.getElementById("currentHumidity")
var weatherSection = document.getElementById("weatherSection")
var searchFormEl = document.querySelector("#search-form")


var fiveDayArr = [];

var currentDate = moment().format("MM/DD/YYYY")
currentDateEl.textContent = currentDate;


function getParams() {
    var searchParamsArr = document.location.search.split("&");
    var cityParam = searchParamsArr[0].split("=").pop();
    console.log(cityParam)

    var locQueryUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityParam + ",US" + "&appid=" + APIKey
    
    console.log(locQueryUrl)



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

        var iconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        var currentTemp = data.main.temp
        var currentWind = data.wind.speed
        var currentHumidity = data.main.humidity

        currentWeatherIconEl.setAttribute("src", iconURL);
        currentTempEl.textContent = currentTemp + "\u00B0F"
        currentWindEl.textContent = currentWind + " MPH"
        currentHumidityEl.textContent = currentHumidity + "%"

       
    })

};

function callFiveDayWeatherAPI(lat, lng) {
 var fiveQueryURL = "https://api.openweathermap.org/data/2.5/forecast?" + "lat=" + lat + "&lon=" + lng + "&appid=" + APIKey + "&units=imperial" 
 
 
 fetch(fiveQueryURL)
 .then(function(response){
    return response.json();
 })
 .then(function(data){
    console.log(data);
    
    for (var i =0; i < data.list.length; i = i +8) {
        fiveDayArr.push(data.list[i]); 
    };

    for (var i=0; i < fiveDayArr.length; i++){
         var cardEl = document.createElement("div");
        cardEl.classList.add("card", "col-12", "col-md-2");
       
        var cardHeaderEl = document.createElement("h4");
        cardHeaderEl.classList.add("card-header", "text-center");
        cardHeaderEl.textContent = moment(fiveDayArr[i].dt_txt).format("MM/DD/YYYY")
       

        var weatherIconEl = document.createElement("img")
        var iconURL = "https://openweathermap.org/img/wn/" + fiveDayArr[i].weather[0].icon + "@2x.png"
        weatherIconEl.classList.add("card-img", "fiveDayIcon")
        weatherIconEl.setAttribute("src",iconURL );

        var cardBodyEl = document.createElement("div");
        cardBodyEl.classList.add("card-body", "text-center");

        var tempEl = document.createElement("p");
        tempEl.setAttribute("class", "card-text");
        tempEl.innerHTML = "<strong>Temperature: </strong><br>" + fiveDayArr[i].main.temp + "\u00B0F";

        var humidEl = document.createElement("p");
        humidEl.setAttribute("class", "card-text")
        humidEl.innerHTML = "<strong>Humidity: </strong><br>" + fiveDayArr[i].main.humidity + " MPH";


        var windEl = document.createElement("p");
        windEl.setAttribute("class", "card-text");
        windEl.innerHTML = "<strong>Wind: </strong><br>" + fiveDayArr[i].wind.speed + "%";


        cardBodyEl.append(tempEl, humidEl,windEl );
        cardEl.append(cardHeaderEl,weatherIconEl, cardBodyEl);
        weatherSection.append(cardEl);


    }

    console.log(fiveDayArr);

 })

}


getParams();

function displaySearchSubmit(event) {
    event.preventDefault();
    cityInput =  document.getElementById("search-input").value

     //Set local storage from searches
     searchArr.push(cityInput);
     localStorage.setItem("search", JSON.stringify(searchArr));

    location.assign("./search-results.html?q=" + cityInput + "&appid=" + APIKey)
}


searchFormEl.addEventListener("submit", displaySearchSubmit)


//Pull local storage array to create buttons for previous searches

searchArr = JSON.parse(localStorage.getItem("search"));
console.log(searchArr);


for (var i= 0; i < searchArr.length; i++){
    var prevSearchBtn = document.createElement("button")
    prevSearchBtn.classList.add("btn", "g-col-3", "mx-1", "btn-secondary", "prevSearchBtn")
    prevSearchBtn.textContent = searchArr[i];
    prevSearchEl.append(prevSearchBtn);
}



function prevSearchSubmit(event) {
    
    cityInput =  document.getElementsByClassName("prevSearchBtn")[0].textContent;
    location.reload("./search-results.html?q=" + cityInput + "&appid=" + APIKey)
}

prevSearchEl.addEventListener("click", prevSearchSubmit)

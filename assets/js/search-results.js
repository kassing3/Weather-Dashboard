var APIKey = "6a9709b094e0b8eacd34f19884c78078"

function getParams() {
    var searchParamsArr = document.location.search.split("&");
    var cityParam = searchParamsArr[0].split("=").pop();

    var locQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityParam + ",US&appid=" + APIKey

    fetch(locQueryUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data)

        var lat = data[0].lat;
        var lng = data[0].lon;

        console.log(lat);
        console.log(lng);
        searchAPI(lat, lng);
    })
    

   
}

function searchAPI(lat, lng){
    var locQueryUrl = "api.openweathermap.org/data/2.5/forecast?" + "lat=" + lat + "&lon=" + lng + "&appid=" + APIKey

    fetch(locQueryUrl)
    .then(function (response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
    })

}

getParams();
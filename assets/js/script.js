var APIKey = "6a9709b094e0b8eacd34f19884c78078"


var searchFormEl = document.querySelector("#search-form")


function displaySearchSubmit(event) {
    event.preventDefault();
    cityInput =  document.getElementById("search-input").value

    location.assign("./search-results.html?q=" + cityInput + "&appid=" + APIKey)
}


searchFormEl.addEventListener("submit", displaySearchSubmit)

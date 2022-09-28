var APIKey = "6a9709b094e0b8eacd34f19884c78078"
var searchFormEl = document.querySelector("#search-form")
var prevSearchEl = document.getElementById("prevSearchEl")
var searchArr = []


function searchSubmit(event) {
    event.preventDefault();
    cityInput =  document.getElementById("search-input").value


    //Set local storage from searches
    searchArr.push(cityInput);
    localStorage.setItem("search", JSON.stringify(searchArr));

    location.assign("./search-results.html?q=" + cityInput + "&appid=" + APIKey)
    
}


searchFormEl.addEventListener("submit", searchSubmit)

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
    location.assign("./search-results.html?q=" + cityInput + "&appid=" + APIKey)
}

prevSearchEl.addEventListener("click", prevSearchSubmit)

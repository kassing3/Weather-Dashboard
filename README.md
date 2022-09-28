# Weather-Dashboard

## Description

The purpose of this weather dashboard is to allow users to search by city to view the current weather 5-day forecast.

The biggest challenge I faced was navigating the OpenWeatherMap API documents to understand how to to pull a 5-Day forecast for each day when the data is composed of weather forecasts pulled every three hours. With the help of a learning assistant, I was able to flush out an idea to use a loop to iterate through the data so that the data for each day is separated. For this weather dashboard, I used HTML, CSS, JavaScript, Bootstrap, and OpenWeatherMap APIs to dynamically create the layout of the pages, and save previous city-searches to the local storage based on the following acceptance criteria.

```md
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```
## Usage

Here is the [Deployed Application](https://kassing3.github.io/Weather-Dashboard/) to test out. In the search engine type in a city to, and hit the search button to see that city's weather forecasts. Previously made searches will appear in the "Previously Searched" section to click through to view previously viewed cities.


![Mock Up of App](./assets/img/Mockup%20of%20Weather%20Dashboard.png)
var cityList = document.querySelector("#city-list");
var submitButton = document.querySelector("#submit-button");
var searchBar = document.querySelector("#search-bar");
var formSubmit = document.querySelector("#search-menu");
var clearButton = document.querySelector("#clear-button");

var list = [];
let geocodeLocation = "http://api.openweathermap.org/geo/1.0/direct?q=";
let currentWeather ="https://api.openweathermap.org/data/2.5/weather?q=";
var fiveWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
let APIKey = "d892b80803c13c51aae98dd4ffa32610";


function displayCities() {

    for (var i = 0; i < list.length; i++) {
        var listed = list[i];

        var li = document.createElement("li");
        li.textContent = listed;

        cityList.appendChild(li);
    }
}

function init() {
    var storedCities = JSON.parse(localStorage.getItem("list"));
  
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedCities !== null) {
      list = storedCities;
    }
  
    // This is a helper function that will render todos to the DOM
    displayCities();
  }
  
  function storeTodos() {
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("list", JSON.stringify(list));
  }
  
  // Add submit event to form
  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
  
    var userInput = searchBar.value.trim();
  
    // Return from function early if submitted todoText is blank
    if (userInput === "") {
      return;
    }

    let geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${APIKey}'

    fetch(geoUrl)
    .then(res => res.json())
    .then(geoData => {
      console.log(geoData);
    })
  
    // Add new todoText to todos array, clear the input
    list.push(userInput);
    
  
    // Store updated todos in localStorage, re-render the list
    storeTodos();
    displayCities();

    window.location.reload(true);
  });

  clearButton.addEventListener("click", () => {
    localStorage.removeItem("list");
  })

  init()



  
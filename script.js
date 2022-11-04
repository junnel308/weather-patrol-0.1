var cityList = document.querySelector("#city-list");
var submitButton = document.querySelector("#submit-button");
var searchBar = document.querySelector("#search-bar");
var formSubmit = document.querySelector("#search-menu");
var clearButton = document.querySelector("#clear-button");
let todaysForecast = document.getElementById("todays-forecast");
let todaysForecast1 = document.getElementById("todays-forecast1");
let savedCities = JSON.parse(localStorage.getItem("list")) || [];

var list = [];
let currentWeatherData ='https://api.openweathermap.org/data/2.5/weather?q=';
let currentWeather ='https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=298a7fbb0e1f26ad78c570cfb48a026b';
var fiveWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
let APIKey = '298a7fbb0e1f26ad78c570cfb48a026b';


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

    if(userInput == "") {
      return;
    }


    
    let Url = currentWeatherData + userInput+ '&appid=298a7fbb0e1f26ad78c570cfb48a026b';
    let fiveDayUrl = fiveWeatherURL + userInput + '&appid=298a7fbb0e1f26ad78c570cfb48a026b';

    fetch(Url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      renderCurrentWeather(data);

    })

    fetch(fiveDayUrl)
    .then (res => res.json())
    .then (data => {
      console.log(data)
      renderFiveDayForecast(data);
    })

    
   
    
    // Add new todoText to todos array, clear the input
    if(list.indexOf(userInput) == -1) {
    list.push(userInput);

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    displayCities();
    }
  });

  clearButton.addEventListener("click", () => {
    localStorage.removeItem("list");
  })

  init()

  function renderCurrentWeather (data) {
    console.log(data)
    todaysForecast.innerHTML = "";
    let weatherName = data.name;
    let date = new Date();
    let todaysDate = "(" + (date.getMonth()+1) +"/"+ date.getDay() +"/"+ date.getFullYear() + ")";
    let weatherIcon = data.weather[0].icon;
    let weatherTemp = data.main.temp_max;
    let weatherHumid = data.main.humidity;
    let weatherWind = data.wind.speed;
    

    let weatherNameEl = document.createElement("ul");
    weatherNameEl.textContent = weatherName + " " + todaysDate;
    todaysForecast.appendChild(weatherNameEl);


    let weatherTempEl = document.createElement("p");
    weatherTempEl.textContent ="Temperature:" +" "+ weatherTemp +" "+ "℉";
    todaysForecast.appendChild(weatherTempEl);
    
    let weatherWindEl = document.createElement("p");
    weatherWindEl.textContent = "Wind:" + " " + weatherWind + " " + "MPH";
    todaysForecast.appendChild(weatherWindEl);

    let weatherHumidEl = document.createElement("p");
    weatherHumidEl.textContent = "Humid:" + " " + weatherHumid + " " + "%";
    todaysForecast.appendChild(weatherHumidEl)


  }

  function renderFiveDayForecast(data) {
    let weatherTemp = data.main.temp_max;
    let weatherHumid = data.main.humidity;
    let weatherWind = data.wind.speed;

    let weatherTempEl = document.createElement("p");
    weatherTempEl.textContent ="Temperature:" +" "+ weatherTemp +" "+ "℉";
    todaysForecast1.appendChild(weatherTempEl);
    
    let weatherWindEl = document.createElement("p");
    weatherWindEl.textContent = "Wind:" + " " + weatherWind + " " + "MPH";
    todaysForecast1.appendChild(weatherWindEl);

    let weatherHumidEl = document.createElement("p");
    weatherHumidEl.textContent = "Humid:" + " " + weatherHumid + " " + "%";
    todaysForecast1.appendChild(weatherHumidEl)
  }
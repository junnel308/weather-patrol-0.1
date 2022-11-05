var cityList = document.querySelector("#city-list");
var submitButton = document.querySelector("#submit-button");
var searchBar = document.querySelector("#search-bar");
var formSubmit = document.querySelector("#search-menu");
var clearButton = document.querySelector("#clear-button");
let todaysForecast = document.getElementById("todays-forecast");
let todaysForecast1 = document.getElementById("todays-forecast1");
let todaysForecast2 = document.getElementById("todays-forecast2");
let todaysForecast3 = document.getElementById("todays-forecast3");
let todaysForecast4 = document.getElementById("todays-forecast4");
let todaysForecast5 = document.getElementById("todays-forecast5");
let savedCities = JSON.parse(localStorage.getItem("list")) || [];

var list = [];
let currentWeatherData ='https://api.openweathermap.org/data/2.5/weather?q=';
let currentWeather ='https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=298a7fbb0e1f26ad78c570cfb48a026b';
var fiveWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
let APIKey = '298a7fbb0e1f26ad78c570cfb48a026b';



function displayCities() {
    cityList.innerHTML = "";
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
    .then (futureData => {
      console.log(futureData)
      renderFiveDayForecast(futureData)
      renderFiveDayForecast1(futureData)
      renderFiveDayForecast2(futureData)
      renderFiveDayForecast3(futureData)
      renderFiveDayForecast4(futureData)
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
    let weatherPic = 'https://openweathermap.org/img/wn/' + weatherIcon + '.png';
    let weatherTemp = data.main.temp_max;
    let weatherHumid = data.main.humidity;
    let weatherWind = data.wind.speed;
    
    let weatherIconEl = document.createElement("img");
    weatherIconEl.src = weatherPic;
    todaysForecast.appendChild(weatherIconEl);

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

  function renderFiveDayForecast(futureData) {
    todaysForecast1.innerHTML = "";
    let futureDate = futureData.list[7].dt_txt;
    let formatDate = new Date(futureDate).toLocaleDateString('en-US');
    let futureIcon = 'https://openweathermap.org/img/wn/' + futureData.list[7].weather[0].icon + '.png';
    let futureTemp = futureData.list[7].main.temp_max;
    let futureHumid = futureData.list[7].main.humidity;
    let futureWind = futureData.list[7].wind.speed;

    let futureIconEl = document.createElement("img");
    futureIconEl.src = futureIcon;
    todaysForecast1.appendChild(futureIconEl);

    let futureDateEl = document.createElement("ul");
    futureDateEl.textContent = formatDate;
    todaysForecast1.appendChild(futureDateEl);

    let futureTempEl = document.createElement("p");
    futureTempEl.textContent ="Temperature:" +" "+ futureTemp +" "+ "℉";
    todaysForecast1.appendChild(futureTempEl);
    
    let futureWindEl = document.createElement("p");
    futureWindEl.textContent = "Wind:" + " " + futureWind + " " + "MPH";
    todaysForecast1.appendChild(futureWindEl);

    let futureHumidEl = document.createElement("p");
    futureHumidEl.textContent = "Humid:" + " " + futureHumid + " " + "%";
    todaysForecast1.appendChild(futureHumidEl)


  }

  function renderFiveDayForecast1(futureData) {
    todaysForecast2.innerHTML = "";
    let futureDate = futureData.list[15].dt_txt;
    let formatDate = new Date(futureDate).toLocaleDateString('en-US');
    let futureIcon = 'https://openweathermap.org/img/wn/' + futureData.list[15].weather[0].icon + '.png';
    let futureTemp = futureData.list[15].main.temp_max;
    let futureHumid = futureData.list[15].main.humidity;
    let futureWind = futureData.list[15].wind.speed;

    let futureIconEl = document.createElement("img");
    futureIconEl.src = futureIcon;
    todaysForecast2.appendChild(futureIconEl);

    let futureDateEl = document.createElement("ul");
    futureDateEl.textContent = formatDate;
    todaysForecast2.appendChild(futureDateEl);

    let futureTempEl = document.createElement("p");
    futureTempEl.textContent ="Temperature:" +" "+ futureTemp +" "+ "℉";
    todaysForecast2.appendChild(futureTempEl);
    
    let futureWindEl = document.createElement("p");
    futureWindEl.textContent = "Wind:" + " " + futureWind + " " + "MPH";
    todaysForecast2.appendChild(futureWindEl);

    let futureHumidEl = document.createElement("p");
    futureHumidEl.textContent = "Humid:" + " " + futureHumid + " " + "%";
    todaysForecast2.appendChild(futureHumidEl)
  }

  function renderFiveDayForecast2(futureData) {
    todaysForecast3.innerHTML = "";
    let futureDate = futureData.list[23].dt_txt;
    let formatDate = new Date(futureDate).toLocaleDateString('en-US');
    let futureIcon = 'https://openweathermap.org/img/wn/' + futureData.list[23].weather[0].icon + '.png';
    let futureTemp = futureData.list[23].main.temp_max;
    let futureHumid = futureData.list[23].main.humidity;
    let futureWind = futureData.list[23].wind.speed;

    let futureIconEl = document.createElement("img");
    futureIconEl.src = futureIcon;
    todaysForecast3.appendChild(futureIconEl);

    let futureDateEl = document.createElement("ul");
    futureDateEl.textContent = formatDate;
    todaysForecast3.appendChild(futureDateEl);

    let futureTempEl = document.createElement("p");
    futureTempEl.textContent ="Temperature:" +" "+ futureTemp +" "+ "℉";
    todaysForecast3.appendChild(futureTempEl);
    
    let futureWindEl = document.createElement("p");
    futureWindEl.textContent = "Wind:" + " " + futureWind + " " + "MPH";
    todaysForecast3.appendChild(futureWindEl);

    let futureHumidEl = document.createElement("p");
    futureHumidEl.textContent = "Humid:" + " " + futureHumid + " " + "%";
    todaysForecast3.appendChild(futureHumidEl)
  }

  function renderFiveDayForecast3(futureData) {
    todaysForecast4.innerHTML = "";
    let futureDate = futureData.list[31].dt_txt;
    let formatDate = new Date(futureDate).toLocaleDateString('en-US');
    let futureIcon = 'https://openweathermap.org/img/wn/' + futureData.list[31].weather[0].icon + '.png';
    let futureTemp = futureData.list[31].main.temp_max;
    let futureHumid = futureData.list[31].main.humidity;
    let futureWind = futureData.list[31].wind.speed;

    let futureIconEl = document.createElement("img");
    futureIconEl.src = futureIcon;
    todaysForecast4.appendChild(futureIconEl);

    let futureDateEl = document.createElement("ul");
    futureDateEl.textContent = formatDate;
    todaysForecast4.appendChild(futureDateEl);

    let futureTempEl = document.createElement("p");
    futureTempEl.textContent ="Temperature:" +" "+ futureTemp +" "+ "℉";
    todaysForecast4.appendChild(futureTempEl);
    
    let futureWindEl = document.createElement("p");
    futureWindEl.textContent = "Wind:" + " " + futureWind + " " + "MPH";
    todaysForecast4.appendChild(futureWindEl);

    let futureHumidEl = document.createElement("p");
    futureHumidEl.textContent = "Humid:" + " " + futureHumid + " " + "%";
    todaysForecast4.appendChild(futureHumidEl)
  }

  function renderFiveDayForecast4(futureData) {
    todaysForecast5.innerHTML = "";
    let futureDate = futureData.list[39].dt_txt;
    let formatDate = new Date(futureDate).toLocaleDateString('en-US');
    let futureIcon = 'https://openweathermap.org/img/wn/' + futureData.list[39].weather[0].icon + '.png';
    let futureTemp = futureData.list[39].main.temp_max;
    let futureHumid = futureData.list[39].main.humidity;
    let futureWind = futureData.list[39].wind.speed;

    let futureIconEl = document.createElement("img");
    futureIconEl.src = futureIcon;
    todaysForecast5.appendChild(futureIconEl);

    let futureDateEl = document.createElement("ul");
    futureDateEl.textContent = formatDate;
    todaysForecast5.appendChild(futureDateEl);

    let futureTempEl = document.createElement("p");
    futureTempEl.textContent ="Temperature:" +" "+ futureTemp +" "+ "℉";
    todaysForecast5.appendChild(futureTempEl);
    
    let futureWindEl = document.createElement("p");
    futureWindEl.textContent = "Wind:" + " " + futureWind + " " + "MPH";
    todaysForecast5.appendChild(futureWindEl);

    let futureHumidEl = document.createElement("p");
    futureHumidEl.textContent = "Humid:" + " " + futureHumid + " " + "%";
    todaysForecast5.appendChild(futureHumidEl)
  }
  
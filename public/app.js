const app = function () {

  const lat = 55.94973;
  const lon = -3.19333;
  const mapDiv = document.getElementById('main-map');
  const coords = {lat: lat, lng: lon};
  const zoom = 7;

  const mainMap = new MapWrapper(mapDiv, coords, zoom);
  mainMap.addClickEvent(makeRequest, requestComplete);

}

const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback)
  request.send();
}

const requestComplete = function () {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const weather = JSON.parse(jsonString);
  showWeather(weather);
}

const showWeather = function (weather) {
  const weatherContainer = document.getElementById('weather-info');
  weatherContainer.innerText = '';

  const place = createLi("Place", weather.name);
  const description = createLi("Description", weather.weather[0].main)
  const tempInC = Math.round(weather.main.temp - 273.15);
  const temp = createLi("Temperature (C) ", tempInC);
  const windSpeed = createLi("Wind Speed", weather.wind.speed);


  weatherContainer.appendChild(place);
  weatherContainer.appendChild(description);
  weatherContainer.appendChild(temp);
  weatherContainer.appendChild(windSpeed);
}

const createLi = function (label, text) {
  const li = document.createElement('li');
  li.innerText = `${label}: ${text}`;
  return li;
}


document.addEventListener("DOMContentLoaded", app);

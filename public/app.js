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

  const place = createTableEntry("Place", weather.name);
  const description = createTableEntry("Description", weather.weather[0].main)
  const tempInC = Math.round(weather.main.temp - 273.15);
  const temp = createTableEntry("Temperature (C) ", tempInC);
  const windSpeed = createTableEntry("Wind Speed", weather.wind.speed);


  weatherContainer.appendChild(place);
  weatherContainer.appendChild(description);
  weatherContainer.appendChild(temp);
  weatherContainer.appendChild(windSpeed);
}

const createTableEntry = function (label, text) {
  const tr = document.createElement('tr');
  const tdLabel = document.createElement('td');
  const tdText = document.createElement('td');
  tdLabel.innerText = label;
  tdText.innerText = text;
  tr.appendChild(tdLabel);
  tr.appendChild(tdText);
  return tr;
}


document.addEventListener("DOMContentLoaded", app);

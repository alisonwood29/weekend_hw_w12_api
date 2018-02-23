const app = function () {

  const lat = 35
  const lon = 139
  const mapDiv = document.getElementById('main-map');
  const coords = {lat: lat, lng: lon};
  const zoom = 10

  const mainMap = new MapWapper(mapDiv, coords, zoom);

  url = "http://api.openweathermap.org/data/2.5/weather?lat=" +lat +"&lon="+lon+"&APPID=00fd1ac875bfc90a1a61afc41f7f4f2b";
  makeRequest(url, requestComplete);
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
  console.log(weather);
}

document.addEventListener("DOMContentLoaded", app);

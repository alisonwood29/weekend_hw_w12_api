const MapWrapper = function (container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}

MapWrapper.prototype.addMarker = function (coords) {
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      strokeColor: "blue",
      scale: 10
    }
  });
  // return marker;
}

MapWrapper.prototype.addClickEvent = function (makeRequest, requestComplete) {
  google.maps.event.addListener(this.googleMap, 'click', function (event) {
    const coords = {lat: event.latLng.lat(), lng: event.latLng.lng()};
    this.addMarker(coords);

    url = "http://api.openweathermap.org/data/2.5/weather?lat=" +event.latLng.lat() +"&lon="+ event.latLng.lng()+"&APPID=00fd1ac875bfc90a1a61afc41f7f4f2b";
    makeRequest(url, requestComplete);

  }.bind(this));
};

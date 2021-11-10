// Google map with Directions
// googlemapsAPI Key must be used - replace in index.html
// Directions render when Mode drop down is selected

/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import "./style.css";

var userPosition;

// hard coded example: array for Evans Hall -- soft code later
var entranceCoords = [
  { lat: 35.656028, lng: -97.473868 },
  { lat: 35.65652, lng: -97.47381}
]
// nearestEntrance starts as 1st entrance listed
var nearestEntrance = entranceCoords[0];

// initiates map
function initMap(): void {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 15,
      center: entranceCoords[0],
    }
  );

  directionsRenderer.setMap(map);

  setUserPosition();
  
  // when Mode drop down is selected, render directions
  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  (document.getElementById("mode") as HTMLElement).addEventListener(
    "change",
    onChangeHandler
  );

}

// find and set user's coordinates
function setUserPosition() {
  navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

    userPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  })
};

// distance formula
function getDistance(x1, y1, x2, y2) {
  // use only decimal
  x1 = x1 % 1.1; console.log('x1= ' + x1);
  y1 = y1 % 1.1;
  x2 = x2 % 1.1;
  y2 = y2 % 1.1;
  var distance = Math.sqrt( Math.pow( (x2 - x1) ,2) + Math.pow( (y2 - y1) ,2));
  console.log('distance = ' + distance);
  return distance;
}

// finds the entrance closest to user
function setNearestEntrance() {
  var distance;
  // minDistance starts as distance from user to 1st listed entrance
  var minDistance = getDistance(
    userPosition.lat, userPosition.lng,
    entranceCoords[0].lat, entranceCoords[0].lng);
  console.log('initial minDistance: ' + minDistance);

  // see if other entrances are closer
  for (var i = 1; i < entranceCoords.length; i++) {
    distance = getDistance(
      userPosition.lat, userPosition.lng,
      entranceCoords[i].lat, entranceCoords[i].lng);
    
    if (distance < minDistance) {
      // update min distance
      minDistance = distance;

      // update nearestEntrance
      nearestEntrance = {
        lat: entranceCoords[i].lat,
        lng: entranceCoords[i].lng,
      }
    }
  }
  console.log('nearest entrance: ' + nearestEntrance);
}

// find route from "origin" to "destination"
function calculateAndDisplayRoute(
  directionsService: google.maps.DirectionsService,
  directionsRenderer: google.maps.DirectionsRenderer
) {
  setNearestEntrance();
  directionsService
    .route({
      origin:  new google.maps.LatLng(userPosition.lat, userPosition.lng),
      destination:  new google.maps.LatLng(nearestEntrance.lat, nearestEntrance.lng),
      travelMode: google.maps.TravelMode.WALKING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}
export { initMap };

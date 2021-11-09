
/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import "./style.css";

var userPosition;

function initMap(): void {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 15,
      center: { lat: 35.66168836403472, lng: -97.4740274059297 },
    }
  );

  directionsRenderer.setMap(map);

  setUserPosition();
  
  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  (document.getElementById("mode") as HTMLElement).addEventListener(
    "change",
    onChangeHandler
  );

}

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

function calculateAndDisplayRoute(
  directionsService: google.maps.DirectionsService,
  directionsRenderer: google.maps.DirectionsRenderer
) {
  directionsService
    .route({
      origin:  new google.maps.LatLng(userPosition.lat, userPosition.lng),
      destination:  new google.maps.LatLng(35.654927022361704, -97.47191064451448),
      travelMode: google.maps.TravelMode.WALKING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}
export { initMap };

/*
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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

  (document.getElementById("start") as HTMLElement).addEventListener(
    "change",
    onChangeHandler
  );
  // (document.getElementById("end") as HTMLElement).addEventListener(
  //   "change",
  //   onChangeHandler
  // );
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
      // origin: {
      //   query: (document.getElementById("start") as HTMLInputElement).value,
      // },
      origin:  new google.maps.LatLng(userPosition.lat, userPosition.lng),
      // destination: {
      //   query: (document.getElementById("end") as HTMLInputElement).value,
      // },
      destination:  new google.maps.LatLng(35.654927022361704, -97.47191064451448),
      travelMode: google.maps.TravelMode.WALKING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}
export { initMap };

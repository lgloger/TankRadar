import { getCurrentLocation } from "./getLocation.js";
import { loadStations } from "./getData.js";

let map;

// ====== Get Location ======
const { lat, lng } = await getCurrentLocation();

// Map
async function initMap() {
  // === Icons ===
  var gasStationIcon = L.icon({
    iconUrl: "/assets/icons/orange_dot.png",

    iconSize: [22.5, 22.5],
    iconAnchor: [0, 0],
    popupAnchor: [12.5, -3],
  });

  var userLocationIcon = L.icon({
    iconUrl: "/assets/icons/blue_dot.png",

    iconSize: [22.5, 22.5],
    iconAnchor: [0, 0],
    popupAnchor: [12.5, -3],
  });

  // ====== Map ======
  map = L.map("map", { zoomControl: false }).setView([lat, lng], 15);

  // OSM Layer
  var osm = L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

  osm.addTo(map);

  // User Location Marker
  var userLocation = L.marker([lat, lng], { icon: userLocationIcon });
  userLocation.addTo(map);

  // Set Markers
  const markerList = await loadStations(lat, lng);

  for (let ind = 0; ind < markerList.length; ++ind) {
    const element = markerList[ind];

    let markerLat = element.lat;
    let markerLng = element.lng;
    let markerName = element.brand;
    let markerDieselPrice = element.diesel;

    var marker = L.marker([markerLat, markerLng], { icon: gasStationIcon });
    marker.addTo(map);
    var popup = marker.bindPopup(
      `${markerName} - €${markerDieselPrice} Diesel`,
    );
    popup.addTo(map);
  }
}

initMap();

// ====== FlyTo User Location ======

const getUserLocationBtn = document.getElementById("getUserLocationBtn");
getUserLocationBtn.addEventListener("click", flytoUserLocation);

function flytoUserLocation() {
  if (!map) return;

  map.flyTo([lat, lng], 15, {
    animate: true,
    duration: 1,
  });
}

import { loadStations } from "./getData.js";

let map;

// Get User Location
async function getLocation() {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  return { lat, lng };
}
const { lat, lng } = await getLocation();

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

  // ====== Get Location ======

  // ====== Map ======
  map = L.map("map", { zoomControl: false }).setView([lat, lng], 15);

  // OSM Layer
  var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
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
    console.log(element);

    let markerLat = element.lat;
    let markerLng = element.lng;
    let markerName = element.brand;
    let markerDieselPrice = element.diesel;

    var marker = L.marker([markerLat, markerLng], { icon: gasStationIcon });
    marker.addTo(map);
    var popup = marker.bindPopup(
      `${markerName} - €${markerDieselPrice} Diesel`
    );
    popup.addTo(map);
  }

  // Tile Layer
  var Stadia_AlidadeSmoothDark = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}",
    {
      minZoom: 0,
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: "png",
    }
  );
  Stadia_AlidadeSmoothDark.addTo(map);
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

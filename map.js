import { loadStations } from "./getData.js";

// Get User Location
async function getLocation() {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  return { lat, lng };
}

// Map
async function initMap() {
  const { lat, lng } = await getLocation();

  var map = L.map("map").setView([lat, lng], 15);

  // OSM Layer
  var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

  osm.addTo(map);

  // Set Markers
  const markerList = await loadStations(lat, lng);
  console.log(markerList);

  for (let ind = 0; ind < markerList.length; ++ind) {
    const element = markerList[ind];
    console.log(element);

    let markerLat = element.lat;
    let markerLng = element.lng;
    let markerName = element.brand;
    let markerDieselPrice = element.diesel;

    var marker = L.marker([markerLat, markerLng]);
    marker.addTo(map);
    var popup = marker.bindPopup(`${markerName} - €${markerDieselPrice} Diesel`);
    popup.addTo(map);
  }

  // Tile Layer
  var Stadia_OSMBright = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}",
    {
      minZoom: 0,
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: "png",
    }
  );
  Stadia_OSMBright.addTo(map);
}

initMap();

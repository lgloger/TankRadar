import { getUserLocation } from "./locationManger.js";
import { getStations } from "./dataManger.js";

let map;

// Get Location
const { lat, lng } = await getUserLocation();

async function initMap() {
  var gasStationIcon = L.icon({
    iconUrl: "/assets/icons/gasStation_dot.png",

    iconSize: [22.5, 22.5],
    iconAnchor: [0, 0],
    popupAnchor: [12.5, -3],
  });

  var userLocationIcon = L.icon({
    iconUrl: "/assets/icons/location_dot.png",

    iconSize: [22.5, 22.5],
    iconAnchor: [0, 0],
    popupAnchor: [12.5, -3],
  });

  map = L.map("map", { zoomControl: false }).setView([lat, lng], 15);

  var osm = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}",
    {
      attribution:
        '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: "jpg",
    },
  );

  osm.addTo(map);

  // User Location Marker
  var userLocation = L.marker([lat, lng], { icon: userLocationIcon });
  userLocation.addTo(map);

  // Set Markers
  const markerList = await getStations(lat, lng, 10, false, false);

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

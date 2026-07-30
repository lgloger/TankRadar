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
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
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
      `${markerName} - ${markerDieselPrice}€ Diesel`,
    );
    popup.addTo(map);
  }
}

initMap();

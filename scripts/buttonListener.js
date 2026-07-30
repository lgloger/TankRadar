import { getUserLocation } from "./locationManger.js";
import { getSearchLocation } from "./locationManger.js";
import { getStations } from "./dataManger.js";

import { lastLat, lastLng, lastLocationName } from "./locationManger.js";

const fuelTypeSelect = document.getElementById("fuelTypeValue");
const distanceSelect = document.getElementById("distanceValue");

function showLoading() {
  const listCon = document.getElementById("mainSec");
  listCon.innerHTML = "";

  const loadingAnimation = document.createElement("img");
  loadingAnimation.classList.add("loadingAnimation");
  loadingAnimation.src = "assets/loadingGifs/accordion-loader.gif";

  listCon.appendChild(loadingAnimation);
}

const getLocationBtn = document
  .getElementById(`getLocationBtn`)
  ?.addEventListener("click", async () => {
    showLoading();

    const location = await getUserLocation();

    let lat = location.lat;
    let lng = location.lng;
    let locationName = location.locationName;

    let fuelType = fuelTypeSelect.value;
    let radius = distanceSelect.value;

    getStations(lat, lng, radius, locationName, fuelType);
  });

const headerSearchInput = document.getElementById("headerSearchInput");
headerSearchInput.addEventListener(`keydown`, async function (event) {
  if (event.key === `Enter`) {
    inputSearch();
  }
});

const headerSearchBtn = document
  .getElementById("headerSearchBtn")
  ?.addEventListener("click", async () => {
    inputSearch();
  });

async function inputSearch() {
  showLoading();

  let searchValue = headerSearchInput.value;
  const location = await getSearchLocation(searchValue);
  let lat = location.lat;
  let lng = location.lng;
  let locationName = location.locationName;

  let fuelType = fuelTypeSelect.value;
  let radius = distanceSelect.value;

  getStations(lat, lng, radius, locationName, fuelType);
}

// Load when Filter Value changes
fuelTypeSelect.addEventListener("change", () => {
  searchFilter();
});
distanceSelect.addEventListener("change", () => {
  searchFilter();
});

function searchFilter() {
  showLoading();

  let fuelType = fuelTypeSelect.value;
  let radius = distanceSelect.value;

  getStations(lastLat, lastLng, radius, lastLocationName, fuelType);
}

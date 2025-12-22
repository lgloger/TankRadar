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
const { lat, lng } = await getLocation();

// List

const gasStationList = await loadStations(lat, lng);

for (let ind = 0; ind < gasStationList.length; ++ind) {
  const element = gasStationList[ind];
  console.log(element); // Debug

  function formatPrice(value) {
    if (value === null || value === 0) {
        return "N/A";
    }

    return value.toString().slice(0, -1);
  }

  let gasStationName = element.brand;
  let gasStationDiesel = formatPrice(element.diesel);
  let gasStationE5 = formatPrice(element.e5);
  let gasStationE10 = formatPrice(element.e10);

  let gasStationLocationName = element.name;

  const listContainer = document.getElementById("gasStationItemList");

  listContainer.innerHTML += `<div class="gasStationItem glassEffect">
          <div class="gasStationItemHeader">
            <img
              src="assets/gasStations/${gasStationName}.png"
              onerror="this.onerror=null; this.src='assets/icons/GasStation.svg';"
              alt="Logo"
              class="gasStationLogo"
            />
            <span class="gasStationHeader">${gasStationName}</span>
          </div>
          <div class="gasStationItemTextCon">
            <span class="gasStationText">Diesel: ${gasStationDiesel} €</span>
            <span class="gasStationText">E5: ${gasStationE5} €</span>
            <span class="gasStationText">E10: ${gasStationE10} €</span>
          </div>
          <a href="https://maps.google.com/?q=${gasStationLocationName}" class="gasStationLocation">${gasStationLocationName}</a>
        </div>`;
}

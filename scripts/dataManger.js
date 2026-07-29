let lat = 52.5173885;
let lng = 13.3951309;
let rad = 5;

export async function getStations(
  latitude,
  longitude,
  radius,
  locationName,
  fuelType,
) {
  const WORKER_URL = "https://worker-api.luca-kloger.workers.dev/";

  try {
    let stations = await fetch(
      `${WORKER_URL}?lat=${latitude}&lng=${longitude}&rad=${radius}`,
    );

    let result = await stations.json();
    listStations(result, locationName, fuelType);
  } catch (e) {
    throw e;
  }
}

function listStations(data, locationName, fuelType) {
  const locationText = document.getElementById("locationText");
  locationText.textContent = locationName;
  const listCon = document.getElementById("mainSec");
  listCon.innerHTML = "";

  listCon.innerHTML += `
      <div class="itemCountCon blurEffect">
        <span class="itemCountText">Es wurden ${data.length} Tankstellen gefunden</span>
      </div>`;

  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    let dataFirstPrice = formatFirstPrice(element[fuelType]);
    let dataSecondPrice = formatSecondPrice(element[fuelType]);
    let dataName = element.brand;
    let dataStreet = element.street;
    let dataPostCode = element.postCode;
    let dataPlace = element.place;
    let dataLink = element.name;
    let dataIsOpen = element.isOpen;

    const isClosed = dataIsOpen === false;

    if (dataIsOpen === true) {
      dataIsOpen = "Offen";
    } else if (dataIsOpen === false) {
      dataIsOpen = "Geschlossen";
    }

    listCon.innerHTML += `
        <div class="mainSecItem blurEffect">
          <div class="itemFirstCon">
            <div class="itemPriceCon">
              <div class="itemPriceConValueCon">
                <span class="itemPriceConValueText">${dataFirstPrice}</span>
                <span class="itemPriceConValueSecText">${dataSecondPrice}</span>
              </div>
              <img
                src="assets/images/MTSK_S_logo.png"
                alt="MTSK"
                class="itemPriceConLogo"
              />
            </div>
            <div class="itemFirstConInfoCon">
              <span class="itemFirstConInfoConHeader">${dataName}</span>
              <span class="itemFirstConInfoConDescription"
                >${dataStreet} - ${dataPostCode} ${dataPlace}</span
              >
              <a href="https://maps.google.com/?q=${dataLink}" class="itemFirstConInfoConLink"
                >Navigieren mit Google Maps</a
              >
            </div>
          </div>
          <div class="itemSecCon${isClosed ? " itemSecConRed" : ""}">
            <span class="itemSecConInfoText${isClosed ? " itemSecConInfoTextRed" : ""}">${dataIsOpen}</span>
          </div>
        </div>
    `;
  }
}

function formatFirstPrice(value) {
  if (value === null || value === undefined || value === 0) {
    return "N/A";
  }

  return value.toString().slice(0, -1);
}

function formatSecondPrice(value) {
  if (value === null || value === undefined || value === 0) {
    return "N/A";
  }

  return value.toString().slice(-1);
}

getStations(lat, lng, rad, "der Stadt Berlin", "diesel");

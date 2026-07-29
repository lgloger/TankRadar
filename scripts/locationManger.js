export async function getUserLocation() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    return { lat, lng };
  } catch (e) {
    console.log(`Location Error`);
    throw e;
  }
}

export async function getSearchLocation(searchValue) {
  // Production URL
  //   const search = await fetch(
  //     `https://nominatim.openstreetmap.org/search?q=${searchValue},+Germany&format=jsonv2&addressdetails=1`,
  //   );

  // Developement URL
  const search = await fetch(
    `https://corsproxy.io/?url=${encodeURIComponent(
      `https://nominatim.openstreetmap.org/search?q=${searchValue},+Germany&format=jsonv2&addressdetails=1`,
    )}`,
  );

  const result = await search.json();
  if (!result.length) {
    console.log(`Can't find Search Location`);
  }

  console.log(result);

  const lat = result[0].lat;
  const lng = result[0].lon;

  let addressType = result[0].addresstype;
  if (addressType === "postcode") {
    addressType = "town";
  }
  const name = result[0].address[addressType];
  const locationName = `der Stadt ${name}`;

  return { lat, lng, locationName };
}

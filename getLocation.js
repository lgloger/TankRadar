export async function getCurrentLocation() {
  const LOCALSTORAGE_KEY = "userLocation";
  const LOCALSTORAGE_DURATION = 5 * 60 * 1000;

  // Check Local Storage for Saved Location
  const storedLocation = localStorage.getItem(LOCALSTORAGE_KEY);
  if (storedLocation) {
    try {
      const [lat, lng, timestamp] = JSON.parse(storedLocation);
      if (Date.now() - timestamp < LOCALSTORAGE_DURATION) {
        console.log("Used Local Store Location"); // Debug
        return { lat, lng };
      }
    } catch (e) {
      console.log("Local Storage Error"); // Debug
    }
  }

  // Get User Location
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const timestamp = Date.now();

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify([lat, lng, timestamp]));
    console.log("Local Storage Item set"); // Debug

    return { lat, lng };
  } catch (e) {
    console.log("Geolocation Error"); // Debug
    throw e;
  }
}

export async function loadStations(lat, lng) {
  const WORKER_URL = "https://worker-api.luca-kloger.workers.dev/";

  try {
    const res = await fetch(`${WORKER_URL}?lat=${lat}&lng=${lng}&rad=5`);

    const stations = await res.json();
    
    return stations;
  } catch (err) {
    console.error(err);
  }
}
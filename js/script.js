function fetchISSLocationJSONP(callback) {
  const script = document.createElement('script');
  script.src = `https://api.open-notify.org/iss-now.json?callback=${callback}`;
  document.body.appendChild(script);
}

function handleISSData(data) {
  if (data.message === "success") {
    const issPosition = data.iss_position;
    const timestamp = data.timestamp;

    document.getElementById("latitude").textContent = issPosition.latitude;
    document.getElementById("longitude").textContent = issPosition.longitude;
    document.getElementById("timestamp").textContent = timestamp;
    const readableDate = new Date(timestamp * 1000);
    const options = {
      weekday: "long", // include the day of the week
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    document.getElementById("date-time").textContent =
      readableDate.toLocaleString(undefined, options);
    updateMap(issPosition.latitude, issPosition.longitude);
  } else {
    console.error("Error fetching ISS location: ", data);
    document.getElementById("latitude").textContent = "Data unavailable";
    document.getElementById("longitude").textContent = "Data unavailable";
    document.getElementById("timestamp").textContent = "Data unavailable";
    document.getElementById("date-time").textContent =
      "Data could not be retrieved";
  }
}

function fetchISSLocation() {
  let isDataLoaded = false;

  const loadingTimeout = setTimeout(() => {
    if (!isDataLoaded) {
      document.getElementById("latitude").textContent = "Loading...";
      document.getElementById("longitude").textContent = "Loading...";
      document.getElementById("timestamp").textContent = "Loading...";
      document.getElementById("date-time").textContent = "Fetching data...";
    }
  }, 500);

  fetchISSLocationJSONP('handleISSData');

  setTimeout(() => {
    isDataLoaded = true;
    clearTimeout(loadingTimeout);
  }, 1000);
}

// Initial call and interval setup for fetching ISS location
fetchISSLocation();
let updateIntervalId = setInterval(fetchISSLocation, 5000);

// Listener for update interval changes
document.getElementById("update-interval").addEventListener("change", function () {
  clearInterval(updateIntervalId);
  const newInterval = parseInt(this.value, 10);
  updateIntervalId = setInterval(fetchISSLocation, newInterval);
});

// Map and marker setup
const map = L.map("mapid", {
  center: [0, 0],
  zoom: 1,
  minZoom: 3,
  maxZoom: 17,
}).setView([0, 0], 1);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map);
const issIcon = L.icon({
  iconUrl: "images/satellite.png",
  iconSize: [35, 35],
  iconAnchor: [25, 25],
});
let issMarker = L.marker([0, 0], { icon: issIcon }).addTo(map);
function updateMap(latitude, longitude) {
  const issCoordinates = new L.LatLng(latitude, longitude);
  issMarker.setLatLng(issCoordinates);
  const shouldFollowISS = document.getElementById("follow-iss").checked;
  if (shouldFollowISS) {
    map.panTo(issCoordinates, { animate: true, duration: 0.9 });
  }
}


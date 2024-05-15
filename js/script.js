function fetchISSLocation() {
  let isDataLoaded = false;

  // Set a timeout to display the loading message only if the fetch takes more than 500ms
  const loadingTimeout = setTimeout(() => {
    if (!isDataLoaded) {
      document.getElementById("latitude").textContent = "Loading...";
      document.getElementById("longitude").textContent = "Loading...";
      document.getElementById("timestamp").textContent = "Loading...";
      document.getElementById("date-time").textContent = "Fetching data...";
    }
  }, 500); // Delay loading message

  // Function to fetch ISS data from a given URL
  function fetchFromUrl(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        isDataLoaded = true;
        clearTimeout(loadingTimeout);

        // Update HTML with the ISS data
        document.getElementById("latitude").textContent =
          data.iss_position.latitude;
        document.getElementById("longitude").textContent =
          data.iss_position.longitude;
        document.getElementById("timestamp").textContent = data.timestamp;
        const readableDate = new Date(data.timestamp * 1000);
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
        // Update the map with the new ISS position
        updateMap(data.iss_position.latitude, data.iss_position.longitude);
      });
  }

  // Try fetching from HTTPS first, fall back to HTTP if it fails
  fetchFromUrl("https://api.open-notify.org/iss-now.json").catch(() => {
    console.warn("HTTPS fetch failed, falling back to HTTP");
    fetchFromUrl("http://api.open-notify.org/iss-now.json").catch((error) => {
      console.error("Error fetching ISS location:", error);
      clearTimeout(loadingTimeout);
      document.getElementById("latitude").textContent = "Data unavailable";
      document.getElementById("longitude").textContent = "Data unavailable";
      document.getElementById("timestamp").textContent = "Data unavailable";
      document.getElementById("date-time").textContent =
        "Data could not be retrieved";
    });
  });
}

// Initial call and interval setup for fetching ISS location
fetchISSLocation();
let updateIntervalId = setInterval(fetchISSLocation, 5000);

// Listener for update interval changes
document
  .getElementById("update-interval")
  .addEventListener("change", function () {
    clearInterval(updateIntervalId);
    const newInterval = parseInt(this.value, 10);
    updateIntervalId = setInterval(fetchISSLocation, newInterval);
  });

// Map and marker setup
// Initialize the map with Leaflet on the 'mapid' HTML element
const map = L.map("mapid", {
  center: [0, 0],
  zoom: 1,
  minZoom: 3,
  maxZoom: 17,
}).setView([0, 0], 1);
// Add a tile layer to the map using OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map);
// Define an icon for the ISS using a custom image
const issIcon = L.icon({
  iconUrl: "images/satellite.png",
  iconSize: [35, 35],
  iconAnchor: [25, 25],
});
// Create a marker on the map at coordinates [0, 0] using the custom ISS icon
let issMarker = L.marker([0, 0], { icon: issIcon }).addTo(map);
// Function to update the map with new ISS coordinates
function updateMap(latitude, longitude) {
  const issCoordinates = new L.LatLng(latitude, longitude); // More descriptive variable name
  issMarker.setLatLng(issCoordinates); // Update marker position
  // Check if the 'Follow ISS' checkbox is checked
  const shouldFollowISS = document.getElementById("follow-iss").checked;
  if (shouldFollowISS) {
    map.panTo(issCoordinates, { animate: true, duration: 0.9 }); // Smooth panning
  }
}

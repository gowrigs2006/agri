function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        localStorage.setItem("user_lat", lat);
        localStorage.setItem("user_lon", lon);
        localStorage.setItem("location_type", "gps");

        alert(`📍 Location captured: (${lat.toFixed(2)}, ${lon.toFixed(2)})`);
        showIntentSection();
      },
      () => {
        alert("Couldn't access location. Please use manual entry.");
      }
    );
  } else {
    alert("Geolocation not supported.");
  }
}

function submitManualLocation() {
  const state = document.getElementById("stateSelect").value;
  const district = document.getElementById("districtSelect").value;

  if (!state || !district) {
    alert("Please select both state and district.");
    return;
  }

  // Dummy lat/lon mapping — in real setup, query backend
  const dummyMap = {
    "Kolkata": [22.57, 88.36],
    "Mumbai": [19.07, 72.87]
  };

  const [lat, lon] = dummyMap[district] || [0, 0];

  localStorage.setItem("user_lat", lat);
  localStorage.setItem("user_lon", lon);
  localStorage.setItem("user_state", state);
  localStorage.setItem("user_district", district);
  localStorage.setItem("location_type", "manual");

  alert(`📍 Manual location saved: ${district}, ${state}`);
  showIntentSection();
}

function showIntentSection() {
  document.getElementById("intent-section").style.display = "block";
  document.getElementById("location-section").style.display = "none";
}

function selectIntent(intent) {
  localStorage.setItem("user_intent", intent);

  // Save user profile to backend (optional /register step)
  const userProfile = {
    lat: localStorage.getItem("user_lat"),
    lon: localStorage.getItem("user_lon"),
    state: localStorage.getItem("user_state"),
    district: localStorage.getItem("user_district"),
    intent: intent
  };

  console.log("User profile:", userProfile);
  // Optionally POST to /register

  // Redirect based on intent
  if (intent === "recommend") {
  window.location.href = "crop.html";  // ✅ correct filename
} else {
  window.location.href = "dashboard.html";
}

}
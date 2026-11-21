const rooms = {
  "Library, Level 2": {
    title: "Library · Level 2",
    subtitle: "Silent Study Wing",
    totalSeats: 88,
    wifiDevices: 104,
    staticDevices: 9,
    devicesPerPerson: 1.58,
    walk: "4 min walk",
    tags: ["Quiet", "Outlets", "Vending nearby"],
    reason: "You’ll have a calm 45-minute window before the afternoon rush.",
    forecast: {
      heading: "Good timing.",
      copy: "You have about <b>33 minutes</b> before this floor gets busy. Grab a seat by 2:05 PM.",
      line: "M0 132 C38 126 62 115 94 117 S144 130 182 105 S228 74 268 92 S328 76 361 54 S430 31 470 48 S523 67 557 42 S630 13 720 22",
    },
  },
  "Hawthorne Hall": {
    title: "Hawthorne Hall",
    subtitle: "Atrium tables",
    totalSeats: 42,
    wifiDevices: 52,
    staticDevices: 5,
    devicesPerPerson: 1.27,
    walk: "2 min walk",
    tags: ["Group-friendly", "Coffee nearby"],
    reason: "This spot is lively now and is expected to fill completely by 2 PM.",
    forecast: {
      heading: "Choose another space.",
      copy: "Only a few seats remain, and this atrium reaches capacity in about <b>18 minutes</b>.",
      line: "M0 52 C34 48 58 54 94 42 S143 40 182 30 S232 18 268 24 S322 17 361 12 S431 8 470 6 S525 9 557 3 S636 2 720 2",
    },
  },
  "Student Union": {
    title: "Student Union",
    subtitle: "East Lounge",
    totalSeats: 36,
    wifiDevices: 37,
    staticDevices: 4,
    devicesPerPerson: 1.5,
    walk: "5 min walk",
    tags: ["Food nearby", "Outlets", "Social"],
    reason: "Good option for a quick working session between classes.",
    forecast: {
      heading: "A short window.",
      copy: "The lounge stays comfortable until about <b>2:25 PM</b>, then lunch traffic returns.",
      line: "M0 104 C35 96 63 100 94 94 S145 85 182 86 S231 79 268 84 S322 72 361 64 S425 48 470 55 S525 48 557 38 S631 26 720 24",
    },
  },
  "STEM Center": {
    title: "STEM Center",
    subtitle: "Collaborative Commons",
    totalSeats: 54,
    wifiDevices: 53,
    staticDevices: 6,
    devicesPerPerson: 1.52,
    walk: "7 min walk",
    tags: ["Outlets", "Group-friendly", "Whiteboards"],
    reason: "A quieter-than-usual afternoon is predicted in this building.",
    forecast: {
      heading: "Room to settle in.",
      copy: "This space should stay below <b>70% full</b> for the next two hours.",
      line: "M0 91 C37 85 65 92 94 82 S142 89 182 76 S230 67 268 72 S321 77 361 66 S427 61 470 69 S520 80 557 71 S631 76 720 62",
    },
  },
};

const roomKeys = Object.keys(rooms);
const $ = (selector) => document.querySelector(selector);
const toast = $("#toast");
const verifyDialog = $("#verify-dialog");
const spacesDialog = $("#spaces-dialog");
let currentRoom = "Library, Level 2";
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3200);
}

function getMetrics(room) {
  const activeDevices = Math.max(room.wifiDevices - room.staticDevices, 0);
  const people = Math.max(0, Math.round(activeDevices / room.devicesPerPerson));
  const openSeats = Math.max(room.totalSeats - people, 0);
  const freePercent = Math.round((openSeats / room.totalSeats) * 100);
  return { activeDevices, people, openSeats, freePercent };
}

function getStatus(metrics) {
  if (metrics.freePercent >= 40) return { label: "Lots of space", className: "good" };
  if (metrics.freePercent >= 20) return { label: "Some space", className: "mid" };
  return { label: "Almost full", className: "tight" };
}

function updateMapStatuses() {
  document.querySelectorAll(".building").forEach((building) => {
    const status = getStatus(getMetrics(rooms[building.dataset.location]));
    const label = building.querySelector(".map-status");
    label.textContent = status.label;
    label.className = "map-status " + status.className;
  });
}

function setForecast(key) {
  const forecast = rooms[key].forecast;
  $("#forecast-location").value = key;
  $("#forecast-heading").textContent = forecast.heading;
  $("#forecast-copy").innerHTML = forecast.copy;
  $("#forecast-line").setAttribute("d", forecast.line);
  $("#forecast-area").setAttribute("d", forecast.line + " V150 H0Z");
}

function setMatch(key, options = {}) {
  const room = rooms[key];
  if (!room) return;
  currentRoom = key;
  const metrics = getMetrics(room);
  $("#match-title").textContent = room.title;
  $("#match-subtitle").textContent = room.subtitle;
  $("#match-walk").lastChild.textContent = " " + room.walk;
  $("#capacity-text").textContent = metrics.openSeats;
  $("#capacity-percent").textContent = metrics.freePercent + "% free";
  $("#capacity-bar").style.width = metrics.freePercent + "%";
  $("#people-estimate").textContent = "~" + metrics.people + " people";
  $("#device-calibration").textContent = room.devicesPerPerson.toFixed(2) + " devices/person";
  $("#feature-tags").innerHTML = room.tags.map((tag) => "<span>" + tag + "</span>").join("");
  $("#ai-reason-text").textContent = room.reason;
  $("#campus-select").value = key;
  document.querySelectorAll(".building").forEach((building) => {
    building.classList.toggle("selected", building.dataset.location === key);
  });
  updateMapStatuses();
  if (options.syncForecast !== false) setForecast(key);
}

function renderSpaceList() {
  $("#space-list").innerHTML = roomKeys.map((key) => {
    const room = rooms[key];
    const metrics = getMetrics(room);
    return "<button data-room=\"" + key + "\"><span>" + room.title + "<br><small>" + room.subtitle + "</small></span><span>" + metrics.openSeats + " seats open</span></button>";
  }).join("");
  document.querySelectorAll("#space-list [data-room]").forEach((button) => {
    button.addEventListener("click", () => {
      setMatch(button.dataset.room);
      spacesDialog.close();
      showToast(rooms[button.dataset.room].title + " selected");
    });
  });
}

function searchSpace() {
  const input = $("#ai-search");
  const query = input.value.trim().toLowerCase();
  const result = $("#search-result");
  let best = "Library, Level 2";
  if (query.includes("food") || query.includes("vending") || query.includes("coffee")) best = "Student Union";
  if (query.includes("group") || query.includes("whiteboard") || query.includes("power")) best = "STEM Center";
  if (query.includes("quiet") || query.includes("silent")) best = "Library, Level 2";
  if (query.includes("hall")) best = "Hawthorne Hall";
  setMatch(best);
  const metrics = getMetrics(rooms[best]);
  result.textContent = "Best match: " + rooms[best].title + " — " + metrics.openSeats + " seats open right now.";
  result.classList.add("has-message");
  input.value = "";
}

document.querySelectorAll(".building").forEach((building) => {
  building.addEventListener("click", () => setMatch(building.dataset.location));
});

$("#campus-select").addEventListener("change", (event) => {
  if (event.target.value === "all") {
    renderSpaceList();
    spacesDialog.showModal();
    return;
  }
  setMatch(event.target.value);
});

$("#forecast-location").addEventListener("change", (event) => setMatch(event.target.value));

document.querySelectorAll(".filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const isActive = chip.classList.toggle("active");
    const filter = chip.dataset.filter;
    if (!isActive) {
      showToast("Filter removed");
      return;
    }
    const best = filter === "quiet" ? "Library, Level 2" : filter === "outlets" ? "STEM Center" : "Student Union";
    setMatch(best);
    showToast(chip.textContent.trim() + " spaces prioritized");
  });
});

$("#search-button").addEventListener("click", searchSpace);
$("#ai-search").addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchSpace();
});

$("#route-button").addEventListener("click", () => showToast("Directions to " + rooms[currentRoom].title + " are ready."));
$("#save-button").addEventListener("click", (event) => {
  event.currentTarget.classList.toggle("saved");
  showToast(event.currentTarget.classList.contains("saved") ? "Space saved to your favorites" : "Removed from saved spaces");
});
$("#show-all").addEventListener("click", () => {
  renderSpaceList();
  spacesDialog.showModal();
});
$(".more-btn").addEventListener("click", () => {
  const next = roomKeys[(roomKeys.indexOf(currentRoom) + 1) % roomKeys.length];
  setMatch(next);
  showToast("Showing another good match");
});
$(".notification").addEventListener("click", () => showToast("No new alerts. Your saved spaces are available."));
$(".avatar").addEventListener("click", () => showToast("Profile controls are part of the full product."));

$("#verify-fab").addEventListener("click", () => verifyDialog.showModal());
document.querySelectorAll(".dialog-close").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});
[verifyDialog, spacesDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
});
document.querySelectorAll("[data-check]").forEach((option) => {
  option.addEventListener("click", () => {
    const room = rooms[currentRoom];
    const occupancy = { empty: 0.35, half: 0.6, full: 0.9 }[option.dataset.check];
    const observedPeople = Math.round(room.totalSeats * occupancy);
    room.wifiDevices = Math.round(observedPeople * room.devicesPerPerson) + room.staticDevices;
    verifyDialog.close();
    setMatch(currentRoom);
    showToast("Thank you! Your check-in recalibrated this room and added 25 campus points.");
  });
});

// Simulated router telemetry for the demo. Static devices stay excluded before every people estimate.
setInterval(() => {
  Object.values(rooms).forEach((room) => {
    room.wifiDevices = Math.max(room.staticDevices + 3, room.wifiDevices + (Math.random() > 0.55 ? 1 : -1));
  });
  setMatch(currentRoom);
}, 18000);

setMatch(currentRoom);

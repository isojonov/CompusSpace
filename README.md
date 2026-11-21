# CampuSpase

**CampuSpase** is a real-time campus space finder that helps university students locate open study rooms and predict seat availability before they walk across campus.

* **Track:** Smart Campus and City Tech
* **Pitch Deck:** [CampuSpase Pitch Deck (PDF)](CampuSpase%20Pitch%20Deck%20.pdf) — 5-page presentation covering the problem, solution, calibration architecture, working prototype screenshots, and impact.

## How to Run Locally

No build step, server, or package installation is required:

1. Clone or download this repository.
2. Open `index.html` directly in any modern web browser (Chrome, Firefox, Safari, Edge).

## Features & Working Flows

* **Live Campus Map & Room Selector:** Click any building on the North Campus map (`Library`, `Hawthorne Hall`, `Student Union`, `STEM Center`) or use the dropdown to inspect live capacity.
* **Natural-Language & Tag Search:** Search for specific needs (e.g., *"quiet room with outlets"*, *"food"*, *"whiteboard"*) or toggle quick amenity filters.
* **Calibrated People Estimation:** Translates raw router telemetry into real human occupancy rather than raw device counts.
* **Crowd Forecast:** Displays an interactive occupancy curve to warn students how many minutes remain before a room fills up.
* **Student Check-In Loop:** Tap **"+ Verify a space"** to submit live crowd feedback (`Plenty of space`, `Half-full`, `Nearly full`), which immediately recalibrates the room's device-to-person baseline.

## How the Estimate Works

Because a single student often connects multiple devices (laptop, phone, tablet) and rooms contain stationary hardware, CampuSpase calculates occupancy using:

$$
\text{Estimated People} = \frac{\text{Connected Wi-Fi Devices} - \text{Static Room Devices}}{\text{Devices per Person}}
$$

In this prototype (`app.js`), room telemetry updates automatically every 18 seconds to simulate live router feeds without collecting any personal or device identifiers.

## Tools, APIs, Templates & AI Assistants Used

* **Core Stack:** HTML5, CSS3 (`styles.css`, `overrides.css`), and Vanilla JavaScript (`app.js`).
* **External APIs / Assets:** [Google Fonts](https://fonts.google.com/) (`Fraunces`, `DM Sans`, `DM Mono`) and custom inline SVG graphics.
* **Data:** Simulated room-level Wi-Fi telemetry and interactive crowdsourced check-ins.
* **Templates:** None (custom UI and CSS architecture).
* **AI Assistants:** Gemini and GPT assisted with code implementation, documentation, and pitch structuring.
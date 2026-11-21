# CampuSpase

CampuSpase helps students find a study space before it fills up. It turns room-level Wi-Fi counts into an estimated number of people, removes known static devices, and lets students correct the estimate with a quick check-in.

## Run locally

Open `index.html` in a browser. No build step or package installation is required.

## Pitch preparation

Use [PITCH.md](PITCH.md) for the five-slide story, a three-minute speaking plan, the exact demo route, and short jury answers.

## Working demo flows

- Choose a building on the map or from the building menu.
- Search for a quiet, powered, food-adjacent, group, or whiteboard-friendly space.
- Compare each demo room's open-seat count, people estimate, and forecast.
- Open the demo-space list and switch rooms.
- Verify a room as empty, half-full, or nearly full. The displayed Wi-Fi estimate recalibrates immediately.

## How the estimate works

Each demo room has a Wi-Fi device count, a static-device allowance, and a calibrated devices-per-person ratio:

`estimated people = (connected Wi-Fi devices - static room devices) / devices per person`

The prototype keeps these values in `app.js` and simulates small router changes every 18 seconds. It contains no real student, device, or location data.

## Production integration path

Replace the simulated room data with a backend endpoint that returns aggregated room-level estimates. Keep raw network identifiers on the server, maintain a reviewed list of static IoT devices, train each room's ratio from opt-in manual counts, and expose only occupancy, confidence, amenities, and short-term forecasts to the client.

## Hackathon disclosure

- Built with: HTML, CSS, and vanilla JavaScript.
- Data source: simulated room-level Wi-Fi telemetry and manual verification input.
- External UI dependency: Google Fonts loaded from the page.
- Templates: none.
- AI assistance: OpenAI Codex assisted with implementation. Add any other tools your team used before submitting.

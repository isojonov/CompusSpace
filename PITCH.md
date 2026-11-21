# CampuSpase pitch

## Slide 1 — The problem

### Students waste time looking for a place to study

At busy times, a library room can look free online but be full when a student arrives. Wi-Fi logs do not solve this on their own because one student may have a phone, laptop, and tablet connected at once.

**Example:** A student has 20 minutes before class and needs a quiet desk with power. They should know where to go before walking across campus.

**Speaker notes — 30 seconds**

“Students lose time walking from room to room only to find every seat taken. Router data helps, but devices are not people. CampuSpase turns that noisy signal into a simple answer: where should I study right now?”

## Slide 2 — The solution

### CampuSpase finds the best available study space

- Live map of rooms and available seats
- Natural-language search for quiet rooms, power outlets, food, or group work
- Forecast that warns when a room will fill up
- Student check-in that improves the estimate

**Speaker notes — 30 seconds**

“CampuSpase is a mobile-first campus space finder. A student can type ‘quiet room with outlets’, compare the best rooms, and get a short forecast before heading there.”

## Slide 3 — How the estimate works

### Wi-Fi devices become a calibrated people estimate

```
Connected Wi-Fi devices
          ↓
Remove static devices such as printers and smartboards
          ↓
Apply the room’s devices-per-person calibration
          ↓
Estimated people, free seats, and crowd forecast
          ↑
Student check-ins recalibrate the room
```

The demo simulates anonymized, room-level telemetry. It never uses a student's identity or device identifier.

**Speaker notes — 45 seconds**

“Our core idea solves the one-student-is-not-one-device problem. For every room, we remove known static devices, then divide the remaining connected devices by a calibrated devices-per-person ratio. A student check-in can correct the estimate instantly. This makes the demo useful today with simulated data and ready for aggregated Wi-Fi feeds later.”

## Slide 4 — Working demo

### A student can finish the main task in seconds

1. Select a building or search for an amenity.
2. See estimated people, open seats, and a crowd forecast.
3. Choose the best match or verify the space on site.

**Demo path:** Search “quiet room with outlets” → choose Library Level 2 → show the 33-minute forecast → tap “Verify a space”.

**Speaker notes — 60 seconds**

“I will show the main task from start to finish. I search for a quiet room with outlets. CampuSpase recommends Library Level 2, shows the walk time, open seats, and the number of estimated people. The forecast says how long the room should stay comfortable. Finally, a student can verify whether the room is empty, half-full, or nearly full, improving the next estimate.”

## Slide 5 — Impact and next steps

### Start with a useful prototype, then connect campus data

**Now:** A responsive working demo with four simulated spaces, amenity search, live updates, forecasts, and check-ins.

**Next:**

- Collect one week of opt-in manual counts for room calibration.
- Connect anonymized, aggregated Wi-Fi occupancy from university IT.
- Add indoor floor plans and more campus locations.

**Speaker notes — 15 seconds**

“CampuSpase already demonstrates the full user journey. The next step is a small calibration study and an aggregated feed from university IT. The result is less wasted time for students and better use of campus space.”

## Three-minute timing

| Segment | Time |
| --- | ---: |
| Problem | 0:30 |
| Solution | 0:30 |
| How it works | 0:45 |
| Live demo | 1:00 |
| Impact and close | 0:15 |

## Likely jury questions

**How do you protect privacy?**

“The product only needs an aggregated room-level count. Raw device identifiers remain outside the client, and the frontend receives only estimated occupancy and confidence.”

**What if Wi-Fi data is inaccurate?**

“We remove static devices, calibrate by room type with manual counts, and let students verify occupancy. The model improves as those signals accumulate.”

**What makes this different from a room booking app?**

“Bookings tell students what was reserved. CampuSpase shows what is actually usable right now and predicts whether it will still be usable when they arrive.”

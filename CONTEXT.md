# Midnight Booking — project context

Source brief: [Past midnight Trip / B.com App](https://docs.google.com/presentation/d/1VNL_SkIbTZ3tnOZr1MpIiXkfFEjZVG_lFncRIJuTC-g/edit) (Google Slides).

## The problem

Travellers who open the app **between 00:00 and 06:00 local time** usually want a room for *the night they are still in* — they land late, finish a long drive, or decide on the spot. For them "tonight" is the calendar date that just ended.

Almosafer, like most OTAs, treats the device's calendar date as "today". At 01:30 on Fri 23 Oct the earliest check-in is **Fri 23**, and Thu 22 is greyed out. So the traveller has two bad options:

- book **Fri 23 → Sat 24**, paying for a night they don't need and possibly not being allowed in until the afternoon, or
- leave the app and book on Trip.com or Booking.com, which already support same-night bookings after midnight.

## Who it's for

- Mostly **1-night stays** with an **early-morning check-in**, booked for the same day
- Business travellers, late arrivals, spontaneous trips
- Common in the GCC (KSA, UAE, Kuwait): late flights, Hajj/Umrah travel, last-minute domestic trips

## Why now

- **Demand we don't capture yet.** The segment is real and keeps coming back. The "tomorrow" date logic blocks it.
- **Competitive parity.** Trip.com and Booking.com already offer this (see the reference slides in the brief).
- **Mobile-first.** A UI that knows the local time, plus a well-timed nudge, can surface same-night inventory when it matters.
- **Managed risk.** Only high-quality properties with a clean relocation history are eligible. That protects the guest experience while we open the segment step by step.

## Design principles (from the brief)

1. The UI and the booking logic follow the **local timezone**, so nobody is confused about which night they are booking.
2. **Same-night availability shows up at the right moment**, through a smart nudge rather than a hidden setting.
3. Only **eligible properties** are offered for same-night check-in.

## Funnel touchpoints in scope

| # | Screen | Midnight question |
|---|---|---|
| 1 | Property search | How do we tell the traveller "tonight" is still bookable? What should the default dates be? Should "Search nearby properties for tonight" become the main entry point? |
| 1.2 | Date picker | Should yesterday's date be selectable after midnight? How do we label it ("Tonight", "Thu 22 · arriving now")? |
| 2 | Results | Which properties are eligible, and how do we show it (badge, filter, sort, separate section)? |
| 3 | Hotel details / rooms | How do we make the check-in date, the check-in time and the "night of" wording clear? Which rates are eligible? |
| 4–5 | Guest details / pay | Should we ask for arrival time? How do we reassure the guest before they pay, and what does the confirmation say? |

## Base prototype

`midnight-booking-prototype/`: iOS, English, built on the design system. It reproduces **today's production behaviour**.

- The **Local time** control in the control bar switches between `Thu 6:51 PM` and `Fri 1:30 AM`, and the status bar follows it.
- At 1:30 AM the dates default to 23–24 Oct and 22 Oct can't be picked. This is the pain point.
- The current rule is a single function, `earliestCheckIn()` in `src/logic.js`. That's where midnight variants will plug in.
- Production screenshots are in `reference/`, numbered to match the screens.

## Open questions

- **Window and timezone:** is it exactly 00:00–06:00? Is it based on the device's time or the destination's (e.g. a traveller in Riyadh booking Dubai)?
- **Eligibility data:** do we know at search/results time which properties are eligible, or only on the hotel page?
- **Stay semantics:** check-in Thu 22 at 01:30 and check-out Fri 23 at 12:00 means a stay of about 10 hours. How should we word and price "1 night"?
- **Baseline data:** how many searches come in between 00:00 and 06:00, and how many bounce off the date picker (Amplitude)?

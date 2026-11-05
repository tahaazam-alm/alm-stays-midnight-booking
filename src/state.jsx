// Flow state shared across the funnel: the search, the chosen hotel/room/rate, and the guest form.
import { createContext, useContext, useMemo, useState } from 'react'
import { clockFor, clockLabel, defaultDates, addDays, nightOf, nights, startOfDay, deviceClock } from './logic.js'
import './custom/StatusClock.css'
import './custom/SheetScrim.css'
import { HOTELS } from './data.js'

const StayContext = createContext(null)

/**
 * Instant check-in explorations (A, B): dates when the traveller opts in or out of checking in now.
 * In: check in tonight; a 1-night search becomes "check out today at the hotel's checkout time", a longer one keeps its end.
 * Out: back to production — check in today (12–3 PM), at least 1 night.
 */
export function checkInNowDates(now, { checkIn, checkOut }, on) {
  const today = startOfDay(now)
  if (on) return { checkIn: nightOf(now), checkOut: checkOut && nights(checkIn, checkOut) > 1 ? checkOut : today }
  return { checkIn: today, checkOut: checkOut && checkOut > today ? checkOut : addDays(today, 1) }
}
export const useStay = () => useContext(StayContext)

export function StayProvider({ children }) {
  // The provider sits inside the shell's keyed viewport, so Restart remounts it; scenario controls change in place.
  const now = clockFor('midnight') // always past midnight
  // Both explorations start as production and only open tonight once the traveller opts in (search.checkInNow).
  const variant = 'b' // Exploration switch removed; B · check-in now toggle is the prototype now ('base' / 'a' paths kept in code)
  const homeDest = { name: 'FIVE Palm Jumeirah Dubai', region: 'United Arab Emirates, Dubai', hotelId: 'five' }
  const [search, setSearch] = useState(() => ({
    dest: homeDest,
    ...defaultDates(now),
    rooms: [{ adults: 2, children: 1, ages: [5] }],
    checkInNow: false,
  }))
  const [booking, setBooking] = useState({ hotel: HOTELS[0], room: null, rate: null })
  // Picking a destination in another time zone (London) makes the traveller abroad: see awayTime and the status bar
  const value = useMemo(() => ({
    now,
    variant,
    search,
    nowOn: variant !== 'base' && search.checkInNow,
    // Destination in another time zone: the check-in now row says what time it is there
    awayTime: search.dest.tzBehind ? now : null,
    updateSearch: (patch) => setSearch((s) => ({ ...s, ...patch })),
    setCheckInNow: (on) => setSearch((s) => ({ ...s, checkInNow: on, ...checkInNowDates(now, s, on) })),
    booking,
    setBooking,
  }), [now, variant, search, booking])

  return (
    <StayContext.Provider value={value}>
      {/* Feeds the scenario clock into the status bar (see custom/StatusClock.css) */}
      <div style={{ display: 'contents', '--proto-clock': `"${clockLabel(deviceClock(now, search.dest))}"` }}>{children}</div>
    </StayContext.Provider>
  )
}

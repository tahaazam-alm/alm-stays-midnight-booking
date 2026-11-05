// Business rules for the stays funnel, kept as plain functions so developers can read them.

export const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** The device clock for each scenario in the control bar. */
export function clockFor(scenario) {
  return scenario === 'midnight' ? new Date(2026, 9, 23, 1, 30) : new Date(2026, 9, 22, 18, 51)
}

/** Riyadh → London: the phone runs on Riyadh time (UTC+3), London is on BST (UTC+1) until 25 Oct 2026, so 2 hours behind. */
export const LONDON = { name: 'London', region: 'United Kingdom', tzBehind: 2 }
export const deviceClock = (destNow, dest) => (dest.tzBehind ? new Date(+destNow + dest.tzBehind * 36e5) : destNow)

export const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
export const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
export const sameDay = (a, b) => !!a && !!b && +startOfDay(a) === +startOfDay(b)
export const nights = (a, b) => Math.round((startOfDay(b) - startOfDay(a)) / 864e5)

/** Hour before which "tonight" still means the previous calendar date (brief: 00:00–06:00). */
export const MIDNIGHT_WINDOW_END = 6

/** The night the traveller is in right now: before 06:00 that is yesterday's date. */
export const nightOf = (now) => (now.getHours() < MIDNIGHT_WINDOW_END ? addDays(startOfDay(now), -1) : startOfDay(now))

/** True between 00:00 and 06:00 local time. */
export const isPastMidnight = (now) => now.getHours() < MIDNIGHT_WINDOW_END

/**
 * Earliest bookable check-in.
 * - CURRENT PRODUCTION RULE (`instant` false): the device's calendar date. After midnight this is
 *   already "tomorrow" for a guest who hasn't slept yet — the gap the Midnight Booking project closes.
 * - INSTANT CHECK-IN (`instant` true): the night the traveller is in, so Thu 22 stays open at 01:30 Fri.
 */
export const earliestCheckIn = (now, instant = false) => (instant ? nightOf(now) : startOfDay(now))

/** Default search dates: earliest check-in, 1 night. */
export const defaultDates = (now, instant = false) => {
  const ci = earliestCheckIn(now, instant)
  return { checkIn: ci, checkOut: addDays(ci, 1) }
}

/** Whether a stay starting on `checkIn` can be checked into right away. Any length of stay qualifies. */
export const isInstantCheckIn = (checkIn, now) => sameDay(checkIn, nightOf(now))

/** City name for "It's 1:30 AM in Dubai": a hotel's region ends in its city; a city search is the city itself. */
export const destCity = (dest) => (dest.region.includes(',') ? dest.region.split(', ').pop() : dest.name)

export const clockLabel = (d) => `${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')}`
export const timeLabel = (d) => `${clockLabel(d)} ${d.getHours() < 12 ? 'AM' : 'PM'}`
export const fmtFull = (d) => `${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}`
export const fmtShort = (d) => `${d.getDate()} ${MON[d.getMonth()]}`
export const fmtRange = (a, b) => `${fmtShort(a)} - ${fmtShort(b)}`
export const fmtFullRange = (a, b) => `${fmtFull(a)} - ${fmtFull(b)}`

/** "Thu 22 – Fri 23 Oct (1 night)" */
export function rangeSummary(a, b) {
  const n = nights(a, b)
  const sameMonth = a.getMonth() === b.getMonth()
  const left = `${WD[a.getDay()]} ${a.getDate()}${sameMonth ? '' : ` ${MON[a.getMonth()]}`}`
  return { dates: `${left} – ${WD[b.getDay()]} ${b.getDate()} ${MON[b.getMonth()]}`, nights: `(${n} night${n === 1 ? '' : 's'})` }
}

const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`
export const guestCount = (rooms) => rooms.reduce((s, r) => s + r.adults + r.children, 0)
export function guestsLabel(rooms) {
  const a = rooms.reduce((s, r) => s + r.adults, 0)
  const c = rooms.reduce((s, r) => s + r.children, 0)
  return [plural(rooms.length, 'Room'), plural(a, 'Adult'), c ? plural(c, 'Child', 'Children') : null].filter(Boolean).join(', ')
}

export const money = (n, dp = 0) => `AED ${n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp })}`

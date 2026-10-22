// Business rules for the stays funnel, kept as plain functions so developers can read them.

export const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** The device clock for each scenario in the control bar. */
export function clockFor(scenario) {
  return scenario === 'midnight' ? new Date(2026, 9, 23, 1, 30) : new Date(2026, 9, 22, 18, 51)
}

export const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
export const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
export const sameDay = (a, b) => !!a && !!b && +startOfDay(a) === +startOfDay(b)
export const nights = (a, b) => Math.round((startOfDay(b) - startOfDay(a)) / 864e5)

/**
 * Earliest bookable check-in. CURRENT PRODUCTION RULE: the device's calendar date.
 * After midnight this is already "tomorrow" for a guest who hasn't slept yet —
 * the gap the Midnight Booking project closes.
 */
export const earliestCheckIn = (now) => startOfDay(now)

/** Default search dates: earliest check-in, 1 night. */
export const defaultDates = (now) => {
  const ci = earliestCheckIn(now)
  return { checkIn: ci, checkOut: addDays(ci, 1) }
}

export const clockLabel = (d) => `${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')}`
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

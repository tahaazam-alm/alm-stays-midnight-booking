// Business rules for the stays funnel, kept as plain functions so developers can read them.

export const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const AR_MON = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
const AR_WD = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
const AR_WD_SHORT = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']

// The formatters below follow the prototype's language. The shell calls setFmtLang() on every render,
// before the screens render, so dates and counts switch with the Language control. Digits stay Latin.
let fmtLang = 'en'
export const setFmtLang = (lang) => { fmtLang = lang }
const ar = () => fmtLang === 'ar'
export const monNames = () => (ar() ? AR_MON : MON)
export const monthNames = () => (ar() ? AR_MON : MONTH)
export const wdNames = () => (ar() ? AR_WD : WD)
export const wdShortNames = () => (ar() ? AR_WD_SHORT : WD)

/** Arabic counted nouns: 1 and 2 have their own words, 3–10 take the plural, 11+ the singular accusative. */
export const arCount = (n, [one, two, few, many]) => (n === 1 ? one : n === 2 ? two : n >= 3 && n <= 10 ? `${n} ${few}` : `${n} ${many}`)
export const AR_NOUNS = {
  night: ['ليلة واحدة', 'ليلتان', 'ليالٍ', 'ليلة'],
  day: ['يوم واحد', 'يومان', 'أيام', 'يومًا'],
  room: ['غرفة واحدة', 'غرفتان', 'غرف', 'غرفة'],
  adult: ['بالغ واحد', 'بالغان', 'بالغين', 'بالغًا'],
  child: ['طفل واحد', 'طفلان', 'أطفال', 'طفلًا'],
  guest: ['ضيف واحد', 'ضيفان', 'ضيوف', 'ضيفًا'],
  year: ['سنة واحدة', 'سنتان', 'سنوات', 'سنة'],
}

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
export const timeLabel = (d) => `${clockLabel(d)} ${d.getHours() < 12 ? (ar() ? 'ص' : 'AM') : (ar() ? 'م' : 'PM')}`
export const fmtFull = (d) => `${d.getDate()} ${monNames()[d.getMonth()]} ${d.getFullYear()}`
export const fmtShort = (d) => `${d.getDate()} ${monNames()[d.getMonth()]}`
/** "Fri 23 Oct" */
export const fmtDay = (d) => `${wdNames()[d.getDay()]} ${d.getDate()} ${monNames()[d.getMonth()]}`
export const fmtRange = (a, b) => `${fmtShort(a)} - ${fmtShort(b)}`
export const fmtFullRange = (a, b) => `${fmtFull(a)} - ${fmtFull(b)}`

/** "Thu 22 – Fri 23 Oct (1 night)" */
export function rangeSummary(a, b) {
  const n = nights(a, b)
  const sameMonth = a.getMonth() === b.getMonth()
  const W = wdNames(), M = monNames()
  const left = `${W[a.getDay()]} ${a.getDate()}${sameMonth ? '' : ` ${M[a.getMonth()]}`}`
  return { dates: `${left} – ${W[b.getDay()]} ${b.getDate()} ${M[b.getMonth()]}`, nights: `(${ar() ? arCount(n, AR_NOUNS.night) : `${n} night${n === 1 ? '' : 's'}`})` }
}

const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`
export const guestCount = (rooms) => rooms.reduce((s, r) => s + r.adults + r.children, 0)
export function guestsLabel(rooms) {
  const a = rooms.reduce((s, r) => s + r.adults, 0)
  const c = rooms.reduce((s, r) => s + r.children, 0)
  if (ar()) return [arCount(rooms.length, AR_NOUNS.room), arCount(a, AR_NOUNS.adult), c ? arCount(c, AR_NOUNS.child) : null].filter(Boolean).join('، ')
  return [plural(rooms.length, 'Room'), plural(a, 'Adult'), c ? plural(c, 'Child', 'Children') : null].filter(Boolean).join(', ')
}

export const money = (n, dp = 0) => `\u20C1 ${n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp })}`

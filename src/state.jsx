// Flow state shared across the funnel: the search, the chosen hotel/room/rate, and the guest form.
import { createContext, useContext, useMemo, useState } from 'react'
import { useProto } from './shell/PrototypeShell.jsx'
import { clockFor, clockLabel, defaultDates } from './logic.js'
import './custom/StatusClock.css'
import { HOTELS } from './data.js'

const StayContext = createContext(null)
export const useStay = () => useContext(StayContext)

export function StayProvider({ children }) {
  const { controls } = useProto()
  // The provider sits inside the shell's keyed viewport, so Restart / a scenario change remounts it.
  const now = clockFor(controls.clock)
  const [search, setSearch] = useState(() => ({
    dest: { name: 'FIVE Palm Jumeirah Dubai', region: 'United Arab Emirates, Dubai', hotelId: 'five' },
    ...defaultDates(now),
    rooms: [{ adults: 2, children: 1, ages: [5] }],
  }))
  const [booking, setBooking] = useState({ hotel: HOTELS[0], room: null, rate: null })

  const value = useMemo(() => ({
    now,
    search,
    updateSearch: (patch) => setSearch((s) => ({ ...s, ...patch })),
    booking,
    setBooking,
  }), [now, search, booking])

  return (
    <StayContext.Provider value={value}>
      {/* Feeds the scenario clock into the status bar (see custom/StatusClock.css) */}
      <div style={{ display: 'contents', '--proto-clock': `"${clockLabel(now)}"` }}>{children}</div>
    </StayContext.Provider>
  )
}

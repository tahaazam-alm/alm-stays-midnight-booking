import { useEffect, useState } from 'react'
import config from '../prototype.config.js'
import { PrototypeShell } from './shell/PrototypeShell.jsx'
import { Navigator } from './shell/navigation.jsx'
import { StayProvider } from './state.jsx'
import MotionSpecs from './specs/MotionSpecs.jsx'
import Search from './screens/Search.jsx'
import Results from './screens/Results.jsx'
import Hotel from './screens/Hotel.jsx'
import GuestDetails from './screens/GuestDetails.jsx'
import Pay from './screens/Pay.jsx'
import Home from './screens/Home.jsx'
import Trips from './screens/Trips.jsx'
import BookingDetails from './screens/BookingDetails.jsx'
import ManageBooking from './screens/ManageBooking.jsx'
import PropertyDetails from './screens/PropertyDetails.jsx'

// Every screen of the prototype, keyed by name. Numbers match the reference screenshots in /reference.
const screens = {
  search: Search, //       1 (+ 1.1 destination, 1.2 dates, 1.3 guests sheets)
  results: Results, //     2
  hotel: Hotel, //         3
  guest: GuestDetails, //  4
  pay: Pay, //             5
  // After booking
  home: Home, //           7 · home with the upcoming trip (the booking confirmed sheet opens over it after Pay)
  trips: Trips, //         8 · My Trips tab
  details: BookingDetails, // 9 · Your booking
  manage: ManageBooking, // 10 · Manage booking
  property: PropertyDetails, // 11 · Property details (from the hotel row on Your booking)
}

// #specs shows the developers' animation specs page instead of the phone
const readRoute = () => (window.location.hash === '#specs' ? 'specs' : 'proto')

// The way into the specs page, listed in Prototype settings
let specsEntry
const SPECS_ENTRY = (go) => (specsEntry ||= { label: 'Animation specs', open: () => go('specs') })

export default function App() {
  const [route, setRoute] = useState(readRoute)
  useEffect(() => { const on = () => setRoute(readRoute()); window.addEventListener('hashchange', on); return () => window.removeEventListener('hashchange', on) }, [])
  const go = (r) => { setRoute(r); try { window.history.replaceState(null, '', r === 'proto' ? '#' : `#${r}`) } catch { /* sandboxed frame: state alone is enough */ } }
  const specs = route === 'specs'
  return (
    <PrototypeShell config={config} board={specs ? <MotionSpecs /> : null}
      boardEntry={SPECS_ENTRY(go)}
      boardLink={<button type="button" className="proto-bar__restart" onClick={() => go('proto')}>Back to prototype</button>}>
      <StayProvider>
        <Navigator screens={screens} initial="search" />
      </StayProvider>
    </PrototypeShell>
  )
}

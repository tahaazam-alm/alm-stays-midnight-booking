import config from '../prototype.config.js'
import { PrototypeShell } from './shell/PrototypeShell.jsx'
import { Navigator } from './shell/navigation.jsx'
import { StayProvider } from './state.jsx'
import Search from './screens/Search.jsx'
import Results from './screens/Results.jsx'
import Hotel from './screens/Hotel.jsx'
import GuestDetails from './screens/GuestDetails.jsx'
import Pay from './screens/Pay.jsx'

// Every screen of the prototype, keyed by name. Numbers match the reference screenshots in /reference.
const screens = {
  search: Search, //       1 (+ 1.1 destination, 1.2 dates, 1.3 guests sheets)
  results: Results, //     2
  hotel: Hotel, //         3
  guest: GuestDetails, //  4
  pay: Pay, //             5
}

export default function App() {
  return (
    <PrototypeShell config={config}>
      <StayProvider>
        <Navigator screens={screens} initial="search" />
      </StayProvider>
    </PrototypeShell>
  )
}

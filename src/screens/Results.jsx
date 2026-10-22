// 2 · Search results (SRP)
import { useState } from 'react'
import { Navbar, Snackbar } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import { HOTELS } from '../data.js'
import { fmtRange, guestCount, nights } from '../logic.js'
import { HotelCard } from '../custom/HotelCard.jsx'
import { AiSearchBar, MapPill } from '../custom/ResultsExtras.jsx'
import * as I from '../icons.js'
import '../custom/type.css'
import './Results.css'

export default function Results() {
  const nav = useNav()
  const t = useCopy()
  const { search, setBooking } = useStay()
  const [toast, setToast] = useState('')
  const soon = () => setToast(t('notBuilt'))
  const n = nights(search.checkIn, search.checkOut)
  // A hotel search puts that hotel first, as in the app
  const list = [...HOTELS].sort((a, b) => (b.id === search.dest.hotelId) - (a.id === search.dest.hotelId))

  return (
    <div className="screen results">
      <div className="screen__nav">
        <Navbar
          toolbar={{
            variant: 'stays', location: search.dest.name, guests: guestCount(search.rooms),
            dates: fmtRange(search.checkIn, search.checkOut),
            onBack: () => nav.back(), onItinerary: () => nav.back(), onCurrency: soon,
          }}
          chips={[
            { icon: <Icon svg={I.sort} />, label: 'Sort by', onClick: soon },
            { icon: <Icon svg={I.sliders} />, label: 'Filters', onClick: soon },
            { label: 'Popular locations', dropdown: true, onClick: soon },
            { label: 'Star rating', dropdown: true, onClick: soon },
          ]}
        />
      </div>
      <div className="screen__body results__body">
        <AiSearchBar placeholder={t('aiPlaceholder')} onClick={soon} />
        <p className="t-caption t-subtext t-reset results__count">{t('propertiesFound', '7,519', 'Dubai')}</p>
        {list.map((h) => (
          <HotelCard key={h.id} hotel={h} nightsLabel={t('totalFor', n)} onSelect={() => { setBooking({ hotel: h, room: null, rate: null }); nav.push('hotel') }} />
        ))}
      </div>
      <MapPill onClick={soon} />
      <Snackbar message={toast} show={!!toast} onClose={() => setToast('')} />
    </div>
  )
}

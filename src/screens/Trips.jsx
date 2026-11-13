// 8 · My Trips: the confirmed booking under Upcoming; its card opens the booking.
import { useState } from 'react'
import { Navbar, Snackbar } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { useCopy } from '../copy.js'
import { useStay } from '../state.jsx'
import { TripStack } from '../custom/TripStack.jsx'
import { MainTabs } from '../custom/MainTabs.jsx'
import '../custom/type.css'
import './Funnel.css'
import './AfterBooking.css'

export default function Trips() {
  const nav = useNav()
  const t = useCopy()
  const { booked } = useStay()
  const [tab, setTab] = useState(0)
  const [toast, setToast] = useState('')

  return (
    <div className="screen funnel after">
      <div className="screen__nav"><Navbar toolbar={{ title: t('myTrips') }} segmentedControl={{ items: [t('upcoming'), t('past')], value: tab, onChange: setTab }} /></div>
      <div className="screen__body funnel__body after__tabbed">
        {tab === 0 && booked ? (
          <TripStack onOpen={() => nav.push('details')} onSoon={() => setToast(t('notBuilt'))} />
        ) : <p className="t-body t-subtext t-reset funnel__center after__empty">{t(tab === 0 ? 'noUpcomingTrips' : 'noPastTrips')}</p>}
      </div>
      <MainTabs value={2} onOther={() => setToast(t('notBuilt'))} />
      <Snackbar message={toast} show={!!toast} onClose={() => setToast('')} />
    </div>
  )
}

// 7 · Home after booking (opens with the booking confirmed sheet over it right after Pay):
// greeting and points, the product launcher, and the upcoming trip. The trip card opens the booking, the My Trips tab the trips list.
import { useEffect, useState } from 'react'
import { Navbar, AlmosaferLogo, Snackbar } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useCopy } from '../copy.js'
import { useStay } from '../state.jsx'
import { HomeServices } from '../custom/HomeServices.jsx'
import { TripStack } from '../custom/TripStack.jsx'
import { MainTabs } from '../custom/MainTabs.jsx'
import { ConfirmedSheet } from './Confirmed.jsx'
import * as I from '../icons.js'
import '../custom/type.css'
import './Funnel.css'
import './AfterBooking.css'

export default function Home() {
  const nav = useNav()
  const t = useCopy()
  const { booked } = useStay() // nothing booked yet (came back from the search): no upcoming trip
  const [toast, setToast] = useState('')
  const soon = () => setToast(t('notBuilt'))
  // Straight from Pay: the confirmation sheet slides up over Home; its X leaves the traveller here
  const [confirmed, setConfirmed] = useState(false)
  useEffect(() => { if (nav.params?.confirmed) setConfirmed(true) }, [])

  return (
    <div className="screen funnel after">
      {/* Status bar only: Home has no toolbar */}
      <div className="screen__nav home__status"><Navbar /></div>
      <div className="screen__body home">
        <div className="home__top">
          <div className="home__hello">
            <span className="home__logo"><AlmosaferLogo type="logomark" width={20} /></span>
            <div className="home__hello-text">
              <h1 className="t-subtitle t-reset">{t('hiName')}</h1>
              <p className="t-caption t-reset">{t('exploreNext')}</p>
            </div>
            <button type="button" className="home__points t-link" onClick={soon}>
              <span className="t-body-semi"><Icon svg={I.wallet} size={20} />1,200</span>
              <span className="t-caption-semi">{t('almosaferPoints')}</span>
            </button>
          </div>
          <HomeServices
            main={[
              { icon: I.svcFlights, label: t('svcFlights'), onClick: soon },
              { icon: I.svcStays, label: t('svcStays'), onClick: () => nav.push('search') },
              { icon: I.svcActivities, label: t('svcActivities'), onClick: soon },
            ]}
            more={[
              { icon: I.svcTransfers, label: t('svcTransfers'), onClick: soon },
              { icon: I.svcTrain, label: t('svcTrain'), onClick: soon },
              { icon: I.svcSixFlags, label: t('svcSixFlags'), onClick: soon },
              { icon: I.svcMore, label: t('svcMore'), onClick: soon },
            ]} />
        </div>
        {booked && <section className="home__trip">
          <div className="section-head">
            <h2 className="t-title t-reset">{t('upcomingTrip')}</h2>
            <button type="button" className="section-head__link t-subtitle t-link" onClick={() => nav.replace('trips')}>{t('viewAllTrips')}</button>
          </div>
          <TripStack onOpen={() => nav.push('details')} onSoon={soon} />
        </section>}
      </div>
      <MainTabs value={0} onOther={soon} />
      {booked && <ConfirmedSheet open={confirmed} onClose={() => setConfirmed(false)} onSoon={soon} />}
      <Snackbar message={toast} show={!!toast} onClose={() => setToast('')} />
    </div>
  )
}

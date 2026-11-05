// 3 · Hotel details + available rooms
import { useState } from 'react'
import { Navbar, SegmentedControl, Chip, Snackbar } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import { HOTELS, ROOMS } from '../data.js'
import { fmtRange, fmtShort, guestCount, nights, WD } from '../logic.js'
import { ReviewPanel, ReviewSnippets, MapLandmarks, StayField } from '../custom/HotelOverview.jsx'
import { RoomCard } from '../custom/RoomCard.jsx'
import { NightTip, MoonBanner } from '../custom/NightBanner.jsx'
import * as I from '../icons.js'
import '../custom/type.css'
import './Hotel.css'

export default function Hotel() {
  const nav = useNav()
  const t = useCopy()
  const { search, booking, setBooking, nowOn } = useStay()
  const under = nowOn // settled: banner under the fields
  const [tab, setTab] = useState(0)
  const [toast, setToast] = useState('')
  const soon = () => setToast(t('notBuilt'))
  // Hotels without their own detail content borrow FIVE's (base prototype)
  const hotel = { ...HOTELS[0], ...booking.hotel }
  const n = nights(search.checkIn, search.checkOut)

  return (
    <div className="screen hotel">
      <div className="hotel__hero">
        <img src={hotel.image} alt="" />
        <span className="hotel__count t-caption"><Icon svg={I.image} size={14} />1/146</span>
        <div className="hotel__nav">
          <Navbar toolbar={{ onBack: () => nav.back(), rightActions: [
            { icon: <Icon svg={I.share} />, onClick: soon, 'aria-label': 'Share' },
            { icon: <Icon svg={I.heart} />, onClick: soon, 'aria-label': 'Save' },
          ] }} />
        </div>
      </div>
      <div className="screen__body hotel__body">
        <div>
          <h1 className="t-title t-reset">{hotel.name}</h1>
          <p className="t-caption t-subtext t-reset">{hotel.stars} Star Resort • {hotel.address}</p>
        </div>
        <ReviewPanel hotel={hotel} />
        <section className="hotel__section">
          <h2 className="t-subtitle t-reset">{t('recentReviews')}</h2>
          <ReviewSnippets reviews={hotel.recentReviews} />
        </section>
        <MapLandmarks hotel={hotel} />
        <SegmentedControl items={[t('availableRooms'), t('propertyDetails')]} value={tab} onChange={setTab} />
        {tab === 0 ? (
          <>
            <div className="hotel__fields">
              <StayField icon={I.calendar} label={!under && nowOn ? t('nowWindowRange', fmtShort(search.checkOut)) : fmtRange(search.checkIn, search.checkOut)} onClick={() => nav.popTo('search')} />
              <StayField icon={I.usersTwo} label={`${guestCount(search.rooms)} Guests`} onClick={() => nav.popTo('search')} />
            </div>
            {under && <MoonBanner className="hotel__now-banner" text={t('nowRoomsTitle')} description={t('nowRoomsBody')} />}
            <div className="hotel__pills">
              <Chip label="Breakfast included" onClick={soon} />
              <Chip label="Bedding Preference" onClick={soon} />
            </div>
            {ROOMS.map((room, i) => (
              <RoomCard key={room.id} room={room} open={i === 0} nightsLabel={t('totalForShort', n)}
                onSelect={(rate) => { setBooking({ hotel, room, rate }); nav.push('guest') }} />
            ))}
          </>
        ) : (
          <p className="t-body t-subtext">{t('notBuilt')}</p>
        )}
      </div>
      <Snackbar message={toast} show={!!toast} onClose={() => setToast('')} />
    </div>
  )
}

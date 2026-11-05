// CUSTOM: not in the design system — booking recap card at the top of Guest Details / Confirm and Pay.
// Always shows the stay dates. `now` (checking in now) adds the check-in info under them:
// 'strip' puts it in a tinted strip along the card's foot, 'line' as the tag under the date,
// 'top' as a navy strip across the card's head, 'quiet' as a plain moon + text line under the date (no highlight).
import { fmtFullRange, guestCount } from '../logic.js'
import { useCopy } from '../copy.js'
import { NightTag } from './NightBanner.jsx'
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import './BookingSummary.css'

export function BookingSummary({ hotel, search, now }) {
  const t = useCopy()
  const g = guestCount(search.rooms)
  const out = search.checkOut
  return (
    <div className="booking-summary">
      {now === 'top' && <div className="booking-summary__top t-caption-semi"><Icon svg={I.lightning} size={12} />{t('instantBetween')}</div>}
      <div className="booking-summary__main">
        <img className="booking-summary__thumb" src={hotel.image} alt="" />
        <div className="booking-summary__text">
          <h3 className="t-subtitle t-reset">{t.d(hotel.name)}</h3>
          <p className="t-body t-reset">{fmtFullRange(search.checkIn, out)}</p>
          {now === 'quiet' && <span className="booking-summary__quiet t-caption"><Icon svg={I.night} size={16} />{t('tonightBetween')}</span>}
          {now === 'line' && <span className="booking-summary__now"><NightTag label={t('instantBetween')} /></span>}
          <p className="t-caption t-subtext t-reset">{t('roomsGuests', search.rooms.length, g)}</p>
        </div>
      </div>
      {now === 'strip' && <div className="booking-summary__strip"><NightTag label={t('instantBetween')} /></div>}
    </div>
  )
}

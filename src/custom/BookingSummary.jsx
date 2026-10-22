// CUSTOM: not in the design system — booking recap card at the top of Guest Details / Confirm and Pay.
import { fmtFullRange, guestCount } from '../logic.js'
import './BookingSummary.css'

export function BookingSummary({ hotel, search }) {
  const g = guestCount(search.rooms)
  return (
    <div className="booking-summary">
      <img className="booking-summary__thumb" src={hotel.image} alt="" />
      <div className="booking-summary__text">
        <h3 className="t-subtitle t-reset">{hotel.name}</h3>
        <p className="t-body t-reset">{fmtFullRange(search.checkIn, search.checkOut)}</p>
        <p className="t-caption t-subtext t-reset">{search.rooms.length} Room{search.rooms.length > 1 ? 's' : ''} | {g} Guests</p>
        <button type="button" className="t-body-semi t-link booking-summary__link">Review your booking</button>
      </div>
    </div>
  )
}

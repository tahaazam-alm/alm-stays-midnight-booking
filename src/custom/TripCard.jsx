// CUSTOM: not in the design system — trip card for Home and My Trips: destination photo with the city and dates over it,
// and the hotel name and booking status underneath on a blurred continuation of the photo.
// `tonight` adds the "Check-in tonight" tag over the photo's top start corner, in line with the city.
import { Tag } from 'design-system'
import './TripCard.css'

export function TripCard({ image, status, city, dates, tonight, title, onSelect }) {
  return (
    <button type="button" className="trip-card" style={{ '--trip-card-image': `url(${image})` }} onClick={onSelect}>
      <span className="trip-card__photo">
        {tonight && <span className="trip-card__tonight t-caption-semi">{tonight}</span>}
        <span className="trip-card__city t-headline">{city}</span>
        <span className="t-caption">{dates}</span>
      </span>
      <span className="trip-card__info">
        <span className="trip-card__title t-title">{title}</span>
        <span className="trip-card__status"><Tag label={status} variant="success" /></span>
      </span>
    </button>
  )
}

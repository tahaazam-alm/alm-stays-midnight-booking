// CUSTOM: not in the design system — property cards (results list + recent searches). No hotel card in the library yet.
import { Price } from 'design-system'
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import { money } from '../logic.js'
import './HotelCard.css'

export function Score({ hotel, count = true }) {
  return (
    <div className="score">
      <span className="score__chip t-body-semi"><Icon svg={I.star} size={16} />{hotel.score.toFixed(1)}</span>
      <span className="t-body-semi">{hotel.scoreLabel}</span>
      {count && <span className="t-caption">({hotel.reviews.toLocaleString('en-US')} ratings)</span>}
    </div>
  )
}

export function HotelCard({ hotel, nightsLabel, onSelect }) {
  const drop = hotel.was ? Math.round((1 - hotel.price / hotel.was) * 100) : 0
  return (
    <article className="hotel-card" onClick={onSelect}>
      <div className="hotel-card__media">
        <img src={hotel.image} alt="" />
        <span className="hotel-card__fav"><Icon svg={I.heart} size={24} /></span>
      </div>
      <div className="hotel-card__body">
        <h3 className="t-title t-reset">{hotel.name}</h3>
        <p className="t-body t-subtext t-reset">{hotel.type} • {hotel.address}</p>
        <Score hotel={hotel} />
        <div className="hotel-card__price">
          {drop > 0 && <span className="t-body-semi hotel-card__drop">Price has dropped by {drop}%</span>}
          <Price price={money(hotel.price)} slashPrice={hotel.was ? hotel.was.toLocaleString('en-US') : undefined} size="default" />
          <span className="t-caption">{nightsLabel}</span>
        </div>
      </div>
    </article>
  )
}

export function RecentCard({ hotel, dates, place, onSelect }) {
  return (
    <article className="recent-card" onClick={onSelect}>
      <div className="recent-card__media"><img src={hotel.image} alt="" /><span className="hotel-card__fav"><Icon svg={I.heart} size={22} /></span></div>
      <div className="recent-card__body">
        <h3 className="t-subtitle t-reset recent-card__name">{hotel.name}</h3>
        <p className="t-caption t-subtext t-reset recent-card__meta">{hotel.type} • {hotel.address}</p>
        <Score hotel={hotel} count={false} />
        <p className="t-caption t-subtext t-reset recent-card__when">{dates}<br />{place}</p>
      </div>
    </article>
  )
}

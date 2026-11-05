// CUSTOM: not in the design system — property cards (results list + recent searches). No hotel card in the library yet.
import { Price } from 'design-system'
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import { money } from '../logic.js'
import { NightTag } from './NightBanner.jsx'
import { useCopy } from '../copy.js'
import './HotelCard.css'

export function Score({ hotel, count = true }) {
  const t = useCopy()
  return (
    <div className="score">
      <span className="score__chip t-body-semi"><Icon svg={I.star} size={16} />{hotel.score.toFixed(1)}</span>
      <span className="t-body-semi">{t.d(hotel.scoreLabel)}</span>
      {count && <span className="t-caption">{t('ratings', hotel.reviews.toLocaleString('en-US'))}</span>}
    </div>
  )
}

// `instant`: show the navy "Instant check-in available" tag on the photo (check-in now explorations).
export function HotelCard({ hotel, nightsLabel, instant, instantLabel, onSelect }) {
  const t = useCopy()
  const drop = hotel.was ? Math.round((1 - hotel.price / hotel.was) * 100) : 0
  return (
    <article className="hotel-card" onClick={onSelect}>
      <div className="hotel-card__media">
        <img src={hotel.image} alt="" />
        <span className="hotel-card__fav"><Icon svg={I.heart} size={24} /></span>
        {instant && <span className="hotel-card__overlay"><NightTag label={instantLabel} /></span>}
      </div>
      <div className="hotel-card__body">
        <h3 className="t-title t-reset">{t.d(hotel.name)}</h3>
        <p className="t-body t-subtext t-reset">{t.d(hotel.type)} • {t.d(hotel.address)}</p>
        <Score hotel={hotel} />
        <div className="hotel-card__price">
          {drop > 0 && <span className="t-body-semi hotel-card__drop">{t('priceDropped', drop)}</span>}
          <Price price={money(hotel.price)} slashPrice={hotel.was ? hotel.was.toLocaleString('en-US') : undefined} size="default" />
          <span className="t-caption">{nightsLabel}</span>
        </div>
      </div>
    </article>
  )
}

export function RecentCard({ hotel, dates, place, onSelect }) {
  const t = useCopy()
  return (
    <article className="recent-card" onClick={onSelect}>
      <div className="recent-card__media"><img src={hotel.image} alt="" /><span className="hotel-card__fav"><Icon svg={I.heart} size={22} /></span></div>
      <div className="recent-card__body">
        <h3 className="t-subtitle t-reset recent-card__name">{t.d(hotel.name)}</h3>
        <p className="t-caption t-subtext t-reset recent-card__meta">{t.d(hotel.type)} • {t.d(hotel.address)}</p>
        <Score hotel={hotel} count={false} />
        <p className="t-caption t-subtext t-reset recent-card__when">{dates}<br />{place}</p>
      </div>
    </article>
  )
}

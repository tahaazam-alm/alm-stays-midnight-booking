// CUSTOM: not in the design system — an upcoming trip on Home and My Trips: the trip card with the
// "Enhance your trip" add-ons and the activities card hanging off it on a connecting line.
import { Cell, Price } from 'design-system'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import { fmtFullRange, destCity, money } from '../logic.js'
import { Icon } from '../shell/Icon.jsx'
import { TripCard } from './TripCard.jsx'
import * as I from '../icons.js'
import balloon from '../assets/activities-balloon.png'
import './type.css'
import './TripStack.css'

export function TripStack({ onOpen, onSoon }) {
  const t = useCopy()
  const { booked } = useStay()
  const city = t.d(destCity(booked.search.dest))
  const addOns = [[I.addonTransfer, 'addonTransfer', 66, 45]]
  return (
    <div className="trip-stack">
      <TripCard image={booked.hotel.image} status={t('confirmed')} city={city}
        dates={fmtFullRange(booked.checkIn, booked.checkOut)} tonight={booked.tonight && t('tonightTag')}
        title={t.d(booked.hotel.name)} onSelect={onOpen} />
      <div className="trip-stack__card">
        <h3 className="trip-stack__eyebrow t-caption t-subtext t-reset">{t('enhanceTrip')}</h3>
        {addOns.map(([icon, k, was, price]) => (
          <button type="button" key={k} className="trip-stack__addon" onClick={onSoon}>
            <img src={icon} alt="" />
            <span className="trip-stack__text">
              <span className="t-subtitle">{t(k)}</span>
              <span className="t-caption t-subtext">{t(`${k}Body`)}</span>
              <Price dir={t.dir} size="small" price={money(price)} slashPrice={money(was)} />
            </span>
            <Icon svg={I.chevronRight} size={20} />
          </button>
        ))}
      </div>
      <div className="trip-stack__card trip-stack__card--row">
        <Cell dir={t.dir} visual="image" iconSrc={balloon} label={t('findActivities', city)} subtext={t('findActivitiesBody')} showSeparator={false} onClick={onSoon} />
      </div>
    </div>
  )
}

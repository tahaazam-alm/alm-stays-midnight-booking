// CUSTOM: not in the design system — room type + rate options on the hotel details page.
import { useState } from 'react'
import { LegacyButton, Price, Separator } from 'design-system'
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import { money } from '../logic.js'
import './RoomCard.css'

export function RoomCard({ room, nightsLabel, open: initialOpen = false, onSelect }) {
  const [open, setOpen] = useState(initialOpen)
  const from = Math.min(...room.rates.map((r) => r.price))
  return (
    <article className="room-card">
      <div className="room-card__head">
        <h3 className="t-subtitle t-reset">{room.name}</h3>
        <div className="room-card__info">
          <div className="room-card__img"><img src={room.image} alt="" /></div>
          <ul className="room-card__specs t-body">
            <li><Icon svg={I.resize} size={18} />{room.size}</li>
            <li><Icon svg={I.bed} size={18} />{room.beds}</li>
            <li><Icon svg={I.usersTwo} size={18} />{room.fits}</li>
            <li><button type="button" className="t-body-semi t-link room-card__link">View room details</button></li>
          </ul>
        </div>
      </div>
      {open ? (
        <>
          <button type="button" className="room-card__toggle t-subtitle t-link" onClick={() => setOpen(false)}>
            Hide options <span className="room-card__chev is-open"><Icon svg={I.chevronDown} size={16} /></span>
          </button>
          {room.rates.map((rate) => (
            <div key={rate.id} className="room-card__rate">
              <Separator />
              <div className="room-card__rate-head"><span className="t-subtitle">{rate.board}</span><span className="t-caption t-subtext">View details ›</span></div>
              <ul className="room-card__perks t-body">
                <li className={rate.refundable ? 'is-good' : ''}><Icon svg={I.noRefund} size={18} />{rate.refundable ? 'Free cancellation' : 'Non-refundable'}</li>
                {rate.perk && <li className="is-good"><Icon svg={I.coffee} size={18} />{rate.perk}</li>}
                <li><Icon svg={I.reward} size={18} />Earn rewards (Shukran)</li>
              </ul>
              <div className="room-card__buy">
                <div><Price price={money(rate.price)} size="default" /><div className="t-caption t-subtext">{nightsLabel}</div></div>
                <LegacyButton variant="primary" size="small" label="Select" onClick={() => onSelect(rate)} />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="room-card__collapsed">
          <div><div className="t-caption t-subtext">Starting from</div><Price price={money(from)} size="default" /></div>
          <button type="button" className="room-card__toggle t-subtitle t-link" onClick={() => setOpen(true)}>
            View options <span className="room-card__chev"><Icon svg={I.chevronDown} size={16} /></span>
          </button>
        </div>
      )}
    </article>
  )
}

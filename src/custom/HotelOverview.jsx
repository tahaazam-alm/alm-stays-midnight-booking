// CUSTOM: not in the design system — hotel details building blocks: review score panel, review snippets,
// map + landmarks, and the "Explore other dates" strip.
import { LinearProgressIndicator, Tag } from 'design-system'
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import './HotelOverview.css'

export function ReviewPanel({ hotel }) {
  return (
    <div className="review-panel">
      <div className="review-panel__score">
        <div className="t-headline review-panel__big">{hotel.score.toFixed(1)} <Icon svg={I.star} size={22} /></div>
        <div className="t-caption t-subtext">Based on {hotel.reviews.toLocaleString('en-US')} reviews</div>
        <p className="t-caption t-reset">{hotel.blurb}</p>
        <button type="button" className="t-caption-semi t-link review-panel__link">See all reviews</button>
      </div>
      <div className="review-panel__subs">
        {(hotel.subScores || []).map(([k, v]) => (
          <div key={k} className="review-panel__sub">
            <div className="review-panel__row t-caption"><span>{k}</span><span className="t-caption-semi">{v}</span></div>
            <LinearProgressIndicator value={v * 10} aria-label={k} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ReviewSnippets({ reviews = [] }) {
  return (
    <div className="h-scroll">
      {reviews.map(([text, who, when]) => (
        <div key={text} className="snippet">
          <p className="t-caption t-reset">{text}</p>
          <p className="t-caption t-reset"><b>{who}</b> <span className="t-subtext">• {when}</span></p>
        </div>
      ))}
    </div>
  )
}

export function MapLandmarks({ hotel }) {
  return (
    <div className="map-card">
      <div className="map-card__map" aria-label="Map">
        <span className="map-card__pin t-caption-semi"><Icon svg={I.pin} size={20} />Your stay</span>
      </div>
      <div className="map-card__body">
        <p className="t-body t-reset">Landmarks around your hotel</p>
        <div className="h-scroll">
          {(hotel.landmarks || []).map(([kind, name, km]) => (
            <div key={name} className="landmark">
              <Tag label={kind} variant="success" />
              <span className="t-body-semi">{name}</span>
              <span className="t-caption t-subtext">{km}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** options: [{ label, sub, selected }] */
export function DateStrip({ options, onPick }) {
  return (
    <div className="h-scroll date-strip">
      {options.map((o) => (
        <button key={o.sub} type="button" className={`date-strip__opt ${o.selected ? 'is-on' : ''}`} onClick={() => onPick?.(o)}>
          {o.selected ? <span className="t-caption t-subtext">Your Dates</span> : <Icon svg={I.search} size={18} />}
          {o.label && <span className="t-body-semi">{o.label}</span>}
          <span className="t-caption">{o.sub}</span>
        </button>
      ))}
    </div>
  )
}

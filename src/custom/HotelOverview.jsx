// CUSTOM: not in the design system — hotel details building blocks: review score panel, review snippets,
// map + landmarks, the "Explore other dates" strip, and the dates / guests fields above the rooms.
import { LinearProgressIndicator, Tag } from 'design-system'
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import MapArt from './MapArt.jsx'
import { useCopy } from '../copy.js'
import './HotelOverview.css'

export function ReviewPanel({ hotel }) {
  const t = useCopy()
  return (
    <div className="review-panel">
      <div className="review-panel__score">
        <div className="t-headline review-panel__big">{hotel.score.toFixed(1)} <Icon svg={I.star} size={22} /></div>
        <div className="t-caption t-subtext">{t('basedOn', hotel.reviews.toLocaleString('en-US'))}</div>
        <p className="t-caption t-reset">{t.d(hotel.blurb)}</p>
        <button type="button" className="t-caption-semi t-link review-panel__link">{t('seeAllReviews')}</button>
      </div>
      <div className="review-panel__subs">
        {(hotel.subScores || []).map(([k, v]) => (
          <div key={k} className="review-panel__sub">
            <div className="review-panel__row t-caption"><span>{t.d(k)}</span><span className="t-caption-semi">{v.toFixed(1)}</span></div>
            <LinearProgressIndicator value={v * 10} aria-label={t.d(k)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ReviewSnippets({ reviews = [] }) {
  const t = useCopy()
  return (
    <div className="h-scroll">
      {reviews.map(([text, who, when]) => (
        <div key={text} className="snippet">
          <p className="t-caption t-reset">{t.d(text)}</p>
          <p className="t-caption t-reset"><b>{t.d(who)}</b> <span className="t-subtext">• {t.d(when)}</span></p>
        </div>
      ))}
    </div>
  )
}

export function MapLandmarks({ hotel }) {
  const t = useCopy()
  const landmarks = (hotel.landmarks || []).map((l) => l.map(t.d))
  return (
    <div className="map-card">
      <MapArt landmark={landmarks[0]} image={hotel.image} stayLabel={t('yourStay')} />
      <div className="map-card__body">
        <p className="t-body t-reset">{t('landmarksAround')}</p>
        <div className="h-scroll">
          {landmarks.map(([kind, name, km]) => (
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
  const t = useCopy()
  return (
    <div className="h-scroll date-strip">
      {options.map((o) => (
        <button key={o.sub} type="button" className={`date-strip__opt ${o.selected ? 'is-on' : ''}`} onClick={() => onPick?.(o)}>
          {o.selected ? <span className="t-caption t-subtext">{t('yourDates')}</span> : <Icon svg={I.search} size={18} />}
          {o.label && <span className="t-body-semi">{o.label}</span>}
          <span className="t-caption">{o.sub}</span>
        </button>
      ))}
    </div>
  )
}

/** Half-width, square-cornered field (dates or guests) that reopens the search */
export function StayField({ icon, label, onClick }) {
  return (
    <button type="button" className="stay-field t-body" onClick={onClick}>
      <Icon svg={icon} size={20} /><span className="stay-field__label">{label}</span>
    </button>
  )
}

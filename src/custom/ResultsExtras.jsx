// CUSTOM: not in the design system — the AI search entry ("Powered by AI") and the floating Map pill on results.
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import './ResultsExtras.css'

export function AiSearchBar({ placeholder, onClick }) {
  return (
    <button type="button" className="ai-search" onClick={onClick}>
      <Icon svg={I.search} size={20} />
      <span className="t-body ai-search__ph">{placeholder}</span>
      <span className="t-caption ai-search__tag">Powered by AI ✦</span>
    </button>
  )
}

export function MapPill({ onClick }) {
  return (
    <div className="map-pill-dock">
      <button type="button" className="map-pill t-subtitle" onClick={onClick}>
        <Icon svg={I.map} size={20} />Map
      </button>
    </div>
  )
}

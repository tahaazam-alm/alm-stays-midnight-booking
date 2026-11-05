// CUSTOM: not in the design system — the AI search entry ("Powered by AI") and the floating Map pill on results.
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import { useCopy } from '../copy.js'
import './ResultsExtras.css'

export function AiSearchBar({ placeholder, onClick }) {
  const t = useCopy()
  return (
    <button type="button" className="ai-search" onClick={onClick}>
      <Icon svg={I.search} size={20} />
      <span className="t-body ai-search__ph">{placeholder}</span>
      <span className="t-caption ai-search__tag">{t('poweredByAi')}</span>
    </button>
  )
}

export function MapPill({ onClick }) {
  const t = useCopy()
  return (
    <div className="map-pill-dock">
      <button type="button" className="map-pill t-subtitle" onClick={onClick}>
        <Icon svg={I.map} size={20} />{t('map')}
      </button>
    </div>
  )
}

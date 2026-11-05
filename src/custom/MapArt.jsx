// CUSTOM: not in the design system — a static, non-interactive illustrated map for the hotel's landmarks card.
// It's drawn, not a real map, so it works for every destination without a map provider or network.
// Shows: the nearest landmark as a floating card, an expand button, a grey landmark pin and the "Your stay" pin.
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import './MapArt.css'

export default function MapArt({ landmark, image, stayLabel }) {
  return (
    <div className="map-art" aria-label="Map">
      <svg className="map-art__svg" viewBox="0 0 360 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect className="map-art__land" width="360" height="150" />
        {/* sea along the start side, with a palm-shaped island and a bay */}
        <path className="map-art__water" d="M0 0H210C190 30 205 55 185 80C170 100 190 125 175 150H0Z" />
        <path className="map-art__water" d="M250 110C270 100 300 108 312 124C322 138 318 150 318 150H246C238 138 238 118 250 110Z" />
        <g className="map-art__island">
          <path d="M70 70H175" strokeWidth="10" />
          {[-34, -20, -7, 7, 20, 34].map((dy, i) => <path key={i} d={`M80 70Q${110 + i * 4} ${70 + dy * 0.4} ${150 - i * 6} ${70 + dy * 1.5}`} strokeWidth="6" />)}
          <path d="M60 30A58 58 0 0 0 60 112" strokeWidth="5" fill="none" />
        </g>
        {/* parks */}
        <ellipse className="map-art__park" cx="236" cy="42" rx="16" ry="10" />
        <rect className="map-art__park" x="290" y="62" width="34" height="22" rx="4" />
        {/* roads: casing first, then the road on top */}
        {['casing', 'road'].map((k) => (
          <g key={k} className={`map-art__${k}`}>
            <path d="M175 70H360" strokeWidth={k === 'road' ? 6 : 8} />
            <path d="M272 0V150" strokeWidth={k === 'road' ? 7 : 9} />
            <path d="M214 0C222 40 230 100 226 150" strokeWidth={k === 'road' ? 3 : 4.5} />
            <path d="M226 112H360" strokeWidth={k === 'road' ? 3 : 4.5} />
            <path d="M300 0V150M330 0V150M272 28H360" strokeWidth={k === 'road' ? 2 : 3.5} />
            <circle cx="272" cy="70" r="12" fill="none" strokeWidth={k === 'road' ? 4 : 6} />
          </g>
        ))}
      </svg>

      {landmark && (
        <div className="map-art__card">
          {image && <img src={image} alt="" />}
          <span className="map-art__card-text">
            <span className="t-body-semi">{landmark[1]}</span>
            <span className="t-caption t-subtext">{landmark[2]}</span>
          </span>
        </div>
      )}
      <span className="map-art__expand"><Icon svg={I.resize} size={20} /></span>
      <span className="map-art__pin map-art__pin--landmark"><Icon svg={I.pin} size={18} /></span>
      <span className="map-art__stay">
        <span className="map-art__pin map-art__pin--stay"><Icon svg={I.pin} size={20} /></span>
        <span className="map-art__label t-caption-semi">{stayLabel}</span>
      </span>
    </div>
  )
}

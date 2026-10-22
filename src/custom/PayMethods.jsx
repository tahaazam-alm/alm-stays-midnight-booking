// CUSTOM: not in the design system — payment method tiles on Confirm and Pay.
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import './PayMethods.css'

const METHODS = [
  { id: 'apple', label: 'Apple Pay', logo: I.applePay },
  { id: 'card', label: 'Card', icon: I.card },
  { id: 'tamara', label: 'Tamara', logo: I.tamara, badge: 'Pay in 12' },
  { id: 'tabby', label: 'Tabby', logo: I.tabby, badge: 'Pay in 12' },
]

export function PayMethods({ value, onChange }) {
  return (
    <div className="pay-methods" role="radiogroup">
      {METHODS.map((m) => (
        <button key={m.id} type="button" role="radio" aria-checked={value === m.id} className={`pay-method ${value === m.id ? 'is-on' : ''}`} onClick={() => onChange(m.id)}>
          {m.badge && <span className="pay-method__badge t-meta-semi">{m.badge}</span>}
          {m.logo ? <img className="pay-method__logo" src={m.logo} alt="" /> : <Icon svg={m.icon} size={28} />}
          <span className="t-caption">{m.label}</span>
        </button>
      ))}
    </div>
  )
}

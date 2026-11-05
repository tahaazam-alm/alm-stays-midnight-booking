// CUSTOM: not in the design system — illustrated hero at the top of the "How it works?" sheet:
// aqua gradient band with an eyebrow, a title and the hotel-at-night illustration. The sheet's close button sits over it.
import art from '../assets/midnight-hotel.png'
import './HowHero.css'

export default function HowHero({ eyebrow, title }) {
  return (
    <div className="how-hero">
      <div className="how-hero__text">
        <span className="t-caption t-subtext how-hero__eyebrow">{eyebrow}</span>
        <h2 className="t-title t-reset">{title}</h2>
      </div>
      <img className="how-hero__art" src={art} alt="" />
    </div>
  )
}

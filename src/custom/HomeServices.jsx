// CUSTOM: not in the design system — Home's product launcher: three large tiles (Flights, Stays, Activities)
// and a row of smaller shortcuts under them.
import './type.css'
import './HomeServices.css'

export function HomeServices({ main, more }) {
  return (
    <div className="home-services">
      <div className="home-services__main">
        {main.map((s) => (
          <button type="button" key={s.label} className="home-services__tile t-body-semi" onClick={s.onClick}>
            <img src={s.icon} alt="" />{s.label}
          </button>
        ))}
      </div>
      <div className="home-services__more">
        {more.map((s) => (
          <button type="button" key={s.label} className="home-services__shortcut t-caption-semi" onClick={s.onClick}>
            <img src={s.icon} alt="" />{s.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// 11 · Property details: opens from the hotel row on Your booking. Where the property is, the stay and room booked, and its policies.
import { useState } from 'react'
import { Navbar, Cell, Snackbar } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import MapArt from '../custom/MapArt.jsx'
import { money, fmtFull, fmtShort, addDays, nights, guestsLabel } from '../logic.js'
import * as I from '../icons.js'
import '../custom/type.css'
import './Funnel.css'
import './AfterBooking.css'

export default function PropertyDetails() {
  const nav = useNav()
  const t = useCopy()
  const { booked } = useStay()
  const [toast, setToast] = useState('')
  const soon = () => setToast(t('notBuilt'))
  const { hotel, room, rate, search } = booked
  const weekday = (d) => d.toLocaleDateString(t.dir === 'rtl' ? 'ar' : 'en', { weekday: 'long' })
  const day = (d) => `${weekday(d)}${t.dir === 'rtl' ? '،' : ','} ${fmtShort(d)}`
  const link = (icon, label) => (
    <button type="button" className="after__link prop__link t-body t-link" onClick={soon}><Icon svg={icon} size={20} />{label}</button>
  )
  const more = <button type="button" className="after__link prop__more t-body-semi t-link" onClick={soon}>{t('showMore')}</button>

  return (
    <div className="screen funnel after">
      <div className="screen__nav"><Navbar toolbar={{ title: t('propertyDetailsTitle'), onBack: () => nav.back() }} /></div>
      <div className="screen__body funnel__body">
        <section className="funnel__section">
          <h1 className="t-title t-reset">{t.d(hotel.name)}</h1>
          <span className="prop__stars">{Array.from({ length: hotel.stars }, (_, i) => <Icon key={i} svg={I.star} size={16} />)}</span>
          <div className="prop__links">
            {link(I.phone, t('contactProperty'))}
            {link(I.pin, t.d(search.dest.name))}
          </div>
          <div className="prop__map"><MapArt stayLabel={t('yourStay')} /></div>
          <p className="t-body t-reset">{t('mapNote')}</p>
        </section>

        <ul className="funnel__card prop__rows t-body">
          <li><Icon svg={I.bed} /><span className="prop__val">{t('nightsCount', Math.max(1, nights(search.checkIn, booked.checkOut)))}</span></li>
          <li><Icon svg={I.calendarStart} /><span className="prop__val">{day(booked.checkIn)}{booked.tonight && <b className="t-body-semi"> {t('windowTimes')}</b>}</span></li>
          <li><Icon svg={I.calendarEnd} /><span className="prop__val">{day(booked.checkOut)}</span></li>
          <li><Icon svg={I.user} /><span className="prop__val">{t.d('Taha')} {t.d('Azam')}</span></li>
        </ul>

        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('roomDetails')}</h2>
          <ul className="funnel__card prop__rows t-body">
            <li><Icon svg={I.usersTwo} /><span className="prop__val">{guestsLabel(search.rooms)}</span></li>
            {room && <li><Icon svg={I.bed} /><span className="prop__val">{t.d(room.beds)}</span></li>}
            {rate && <li><Icon svg={I.check} /><span className="prop__val">{t.d(rate.board)}</span></li>}
          </ul>
        </section>

        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('cancelPolicy')}</h2>
          <div className="funnel__card prop__text">
            <b className="t-body-semi prop__dashed">{t('notRefundable')}</b>
            <p className="t-body t-reset">{t('cancelWindowEnded', fmtFull(addDays(booked.checkIn, -1)))}</p>
          </div>
        </section>

        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('feesExtras')}</h2>
          <div className="funnel__card prop__text">
            <b className="t-body-semi">{t('mandatoryFees')}</b>
            <p className="t-body t-reset">{t('feesIntro')}</p>
            <ul className="t-body prop__bullets"><li>{t('cityTax', money(20, 2))}</li></ul>
            {more}
          </div>
        </section>

        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('policies')}</h2>
          <div className="funnel__card prop__text">
            <b className="t-body-semi">{t('checkInPolicy')}</b>
            <p className="t-body t-reset">{t('checkInFrom', booked.tonight ? t('windowTimes') : t('standardCheckIn'))}</p>
            <p className="t-body t-reset">{t('checkOutUntil')}</p>
            {more}
          </div>
        </section>

        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('moreInfo')}</h2>
          <div>
            <Cell dir={t.dir} visual="icon" icon={<Icon svg={I.card} />} label={t('paymentBreakdown')} subtext={t('totalInclVat', money(booked.total, 2))} onClick={soon} />
            <Cell dir={t.dir} visual="icon" icon={<Icon svg={I.headset} />} label={t('needHelp')} showSeparator={false} onClick={soon} />
          </div>
        </section>
      </div>
      <Snackbar message={toast} show={!!toast} onClose={() => setToast('')} />
    </div>
  )
}

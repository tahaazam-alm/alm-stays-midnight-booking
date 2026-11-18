// 1 · Property search (+ 1.1 destination, 1.2 dates, 1.3 guests sheets)
import { useEffect, useState } from 'react'
import { moonFilled } from '../custom/moonFilled.js'
import { Navbar, LegacyButton, Snackbar } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { ProtoSettings, useProto } from '../shell/PrototypeShell.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import { HOTELS } from '../data.js'
import { fmtFull, earliestCheckIn, fmtRange, isPastMidnight, timeLabel, destCity, sameDay } from '../logic.js'
import { StayForm } from '../custom/StayForm.jsx'
import { RecentCard } from '../custom/HotelCard.jsx'
import { NightTip } from '../custom/NightBanner.jsx'
import { RollValue } from '../custom/RollValue.jsx'
import { DestinationSheet, DatesSheet, GuestsSheet, HowItWorksSheet } from './SearchSheets.jsx'
import * as I from '../icons.js'
import '../custom/type.css'
import './Search.css'

export default function Search() {
  const nav = useNav()
  const t = useCopy()
  const { now, variant, search, nowOn, awayTime, updateSearch, setCheckInNow: commitNow, shownCheckIn } = useStay()
  const { controls } = useProto()
  // Tonight toggle · Ask check-out: turning it on opens the calendar with tonight selected instead of changing the dates here
  const [startNow, setStartNow] = useState(false)
  // Tonight toggle · Empty check-out: turning it on clears check-out on the widget; the empty cell (and Search) opens the calendar to pick it
  const [needOut, setNeedOut] = useState(false)
  const [lit, setLit] = useState(false) // toggled on in this visit: play the date shimmer and time the moon to it
  const [leaving, setLeaving] = useState(false) // just toggled off: the moon tucks away before the plain date returns
  useEffect(() => { if (!leaving) return; const id = setTimeout(() => setLeaving(false), 450); return () => clearTimeout(id) }, [leaving])
  const setCheckInNow = (on) => {
    setLit(on)
    setLeaving(!on && nowOn)
    if (on && controls.tonightToggle === 'calendar') { setStartNow(true); setSheet('dates') }
    else { commitNow(on); setNeedOut(on && controls.tonightToggle === 'empty') }
  }
  const emptyOut = needOut && nowOn && controls.tonightToggle === 'empty'
  const openDates = () => { if (emptyOut) setStartNow(true); setSheet('dates') }
  // Opted in: check-in reads as tonight's window, check-out keeps its date
  // Offer checking in now past midnight while check-in is still today (production's earliest date)
  const offerNow = variant !== 'base' && isPastMidnight(now) && !nowOn && sameDay(search.checkIn, now)
  const city = destCity(search.dest)
  // B · row in widget: the toggle sits in the widget as its own row instead of the navy banner.
  // Navy on select: the same row with an info button and the window as subtext, navy once on.
  const navyRow = false // settled on the row in the widget
  const nowRow = variant === 'b' && (offerNow || nowOn)
    ? navyRow
      ? { navy: true, title: t(nowOn ? 'tonightOnShort' : 'tonightShort'), subtext: t('tonightWindow'), note: awayTime && t('tipNowBody', timeLabel(awayTime), t.d(city)), onInfo: () => setHow(true), infoLabel: t('howItWorks'), checked: nowOn, onChange: setCheckInNow }
      : { title: t('tonightTitle'), note: awayTime && t('tipNowBody', timeLabel(awayTime), t.d(city)), linkLabel: t('howItWorks'), onLink: () => setHow(true), checked: nowOn, onChange: setCheckInNow }
    : null
  // Opted in: check-in reads as tonight's window (row: today's date, the stay starts tonight), check-out keeps its date
  // Tonight transition · Shimmer + reveal: the row arrives after load with a band of light, nothing is tinted, and a moon marks the check-in date once on
  const shimmer = ['reveal', 'shimmer'].includes(controls.tonightMotion) && !!nowRow && !nowRow.navy
  const moonDate = fmtFull(nowOn ? earliestCheckIn(now) : search.checkIn)
  const checkInField = nowOn || (leaving && shimmer) ? { value: !nowRow ? t('nowWindow') : shimmer
    ? <span className={`stay-form__in ${lit ? 'is-lit' : ''} ${leaving && !nowOn ? 'is-leaving' : ''}`} data-text={moonDate}><span className="stay-form__date">{moonDate}</span><span className="stay-form__moon"><Icon svg={moonFilled} size={20} /></span></span>
    : fmtFull(earliestCheckIn(now)) } : undefined
  // Tonight toggle · Subtle tooltip: check-out rolls to the same day here, and a small tip under it says so and offers Change (the calendar)
  const subtle = controls.tonightToggle === 'tip' && !!nowRow
  const sameDayOut = subtle && nowOn && sameDay(search.checkOut, now)
  const checkOutField = emptyOut ? { variant: 'empty', state: 'active', label: t('selectCheckoutWidget'), value: undefined }
    : subtle ? { value: <RollValue value={fmtFull(search.checkOut)} /> } : undefined
  const datesTip = subtle ? (
    <div className={`stay-search__same ${sameDayOut ? 'is-shown' : ''}`} inert={!sameDayOut || undefined}><div>
      <NightTip arrow="bottom" className="night-tip--ask" title={t('sameDayNote')} actionLabel={t('sameDayChange')} onAction={() => setSheet('dates')} />
    </div></div>
  ) : nowRow ? null : variant === 'b'
    // B: a banner (no caret) with a toggle
    ? (offerNow || nowOn) && (
      <NightTip arrow="none" title={t('wantNowTitle')} body={t('nowWindowNote')}
        toggle={{ checked: nowOn, onChange: setCheckInNow }} />
    )
    : offerNow
      ? <NightTip title={t('needNowTitle')} body={t('tipNowBody', timeLabel(now), t.d(city))} actionLabel={t('needNowAction')} onAction={() => setCheckInNow(true)} />
      : nowOn && <NightTip title={t('tipOnTitle')} body={t('tipOnBody')} linkLabel={t('removeNow')} onLink={() => setCheckInNow(false)} />
  const [sheet, setSheet] = useState(null) // 'dest' | 'dates' | 'guests'
  const [toast, setToast] = useState('')
  const { settingsCard } = useProto()
  const [how, setHow] = useState(false) // How it works? sheet, over the widget or the calendar
  const close = () => { setSheet(null); setStartNow(false) }
  const [settings, setSettings] = useState(false) // prototype settings, opened from the gear next to the title (narrow windows only; wide ones show the settings card beside the phone)

  return (
    <div className="screen stay-search">
      <div className="screen__nav">
        <Navbar toolbar={{ title: t('propertySearch'), subtitle: t('propertySearchSub'), onBack: () => nav.reset('home'),
          rightActions: settingsCard ? [] : [{ icon: <Icon svg={I.gear} />, onClick: () => setSettings(true), 'aria-label': t('settings') }] }} />
      </div>
      <div className="screen__body stay-search__body">
        <StayForm search={search} checkInField={checkInField} checkOutField={checkOutField} datesTip={datesTip} nowRow={nowRow} nowReveal={shimmer && controls.tonightMotion} nowOn={nowOn && !nowRow} onDest={() => setSheet('dest')} onDates={openDates} onGuests={() => setSheet('guests')}>
          <LegacyButton variant="primary" label={t('searchStays')} leadingIcon={<Icon svg={I.search} />} onClick={() => (emptyOut ? openDates() : nav.push('results'))} />
          <button type="button" className="stay-search__nearby t-body-semi t-link" onClick={() => setToast(t('notBuilt'))}>
            <Icon svg={I.navArrow} size={18} />{t('nearbyTonight')}
          </button>
        </StayForm>

        <section>
          <div className="section-head">
            <h2 className="t-title t-reset">{t('recentSearches')}</h2>
            <button type="button" className="section-head__link t-subtitle t-link">{t('clear')}</button>
          </div>
          <div className="stay-search__recents">
            {HOTELS.slice(0, 3).map((h) => (
              <RecentCard key={h.id} hotel={h} dates={fmtRange(shownCheckIn, search.checkOut)} place={t.d('Riyadh, Saudi Arabia')}
                onSelect={() => { updateSearch({ dest: { name: h.name, region: 'Saudi Arabia, Riyadh', hotelId: h.id } }); nav.push('results') }} />
            ))}
          </div>
        </section>
      </div>

      <DestinationSheet open={sheet === 'dest'} onClose={close} onPick={(dest) => { updateSearch({ dest }); close() }} />
      <DatesSheet open={sheet === 'dates'} startNow={startNow} clearOut={emptyOut} onClose={close} onHowItWorks={() => setHow(true)} onConfirm={(checkIn, checkOut, checkInNow = false, datesPicked = false) => { updateSearch({ checkIn, checkOut, checkInNow, datesPicked }); setNeedOut(false); close() }} />
      <GuestsSheet open={sheet === 'guests'} onClose={close} onApply={(rooms) => { updateSearch({ rooms }); close() }} />
      <HowItWorksSheet open={how} onClose={() => setHow(false)} />
      <ProtoSettings open={settings} onClose={() => setSettings(false)} />
      <Snackbar message={toast} show={!!toast} onClose={() => setToast('')} />
    </div>
  )
}

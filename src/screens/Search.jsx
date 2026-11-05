// 1 · Property search (+ 1.1 destination, 1.2 dates, 1.3 guests sheets)
import { useState } from 'react'
import { Navbar, LegacyButton, Snackbar } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { ProtoSettings } from '../shell/PrototypeShell.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import { HOTELS } from '../data.js'
import { fmtFull, earliestCheckIn, fmtRange, isPastMidnight, timeLabel, destCity, sameDay } from '../logic.js'
import { StayForm } from '../custom/StayForm.jsx'
import { RecentCard } from '../custom/HotelCard.jsx'
import { NightTip } from '../custom/NightBanner.jsx'
import { DestinationSheet, DatesSheet, GuestsSheet, HowItWorksSheet } from './SearchSheets.jsx'
import * as I from '../icons.js'
import '../custom/type.css'
import './Search.css'

export default function Search() {
  const nav = useNav()
  const t = useCopy()
  const { now, variant, search, nowOn, awayTime, updateSearch, setCheckInNow } = useStay()
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
  const checkInField = nowOn ? { value: nowRow ? fmtFull(earliestCheckIn(now)) : t('nowWindow') } : undefined
  const datesTip = nowRow ? null : variant === 'b'
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
  const [how, setHow] = useState(false) // How it works? sheet, over the widget or the calendar
  const close = () => setSheet(null)
  const [settings, setSettings] = useState(false) // prototype settings, opened from the gear next to the title

  return (
    <div className="screen stay-search">
      <div className="screen__nav">
        <Navbar toolbar={{ title: t('propertySearch'), subtitle: t('propertySearchSub'), onBack: () => setToast(t('notBuilt')),
          rightActions: [{ icon: <Icon svg={I.gear} />, onClick: () => setSettings(true), 'aria-label': t('settings') }] }} />
      </div>
      <div className="screen__body stay-search__body">
        <StayForm search={search} checkInField={checkInField} datesTip={datesTip} nowRow={nowRow} nowOn={nowOn && !nowRow} onDest={() => setSheet('dest')} onDates={() => setSheet('dates')} onGuests={() => setSheet('guests')}>
          <LegacyButton variant="primary" label={t('searchStays')} leadingIcon={<Icon svg={I.search} />} onClick={() => nav.push('results')} />
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
              <RecentCard key={h.id} hotel={h} dates={fmtRange(search.checkIn, search.checkOut)} place={t.d('Riyadh, Saudi Arabia')}
                onSelect={() => { updateSearch({ dest: { name: h.name, region: 'Saudi Arabia, Riyadh', hotelId: h.id } }); nav.push('results') }} />
            ))}
          </div>
        </section>
      </div>

      <DestinationSheet open={sheet === 'dest'} onClose={close} onPick={(dest) => { updateSearch({ dest }); close() }} />
      <DatesSheet open={sheet === 'dates'} onClose={close} onHowItWorks={() => setHow(true)} onConfirm={(checkIn, checkOut, checkInNow = false) => { updateSearch({ checkIn, checkOut, checkInNow }); close() }} />
      <GuestsSheet open={sheet === 'guests'} onClose={close} onApply={(rooms) => { updateSearch({ rooms }); close() }} />
      <HowItWorksSheet open={how} onClose={() => setHow(false)} />
      <ProtoSettings open={settings} onClose={() => setSettings(false)} />
      <Snackbar message={toast} show={!!toast} onClose={() => setToast('')} />
    </div>
  )
}

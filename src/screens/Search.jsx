// 1 · Property search (+ 1.1 destination, 1.2 dates, 1.3 guests sheets)
import { useState } from 'react'
import { Navbar, LegacyButton, Snackbar } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import { HOTELS } from '../data.js'
import { fmtRange } from '../logic.js'
import { StayForm } from '../custom/StayForm.jsx'
import { RecentCard } from '../custom/HotelCard.jsx'
import { DestinationSheet, DatesSheet, GuestsSheet } from './SearchSheets.jsx'
import * as I from '../icons.js'
import '../custom/type.css'
import './Search.css'

export default function Search() {
  const nav = useNav()
  const t = useCopy()
  const { search, updateSearch } = useStay()
  const [sheet, setSheet] = useState(null) // 'dest' | 'dates' | 'guests'
  const [toast, setToast] = useState('')
  const close = () => setSheet(null)

  return (
    <div className="screen stay-search">
      <div className="screen__nav">
        <Navbar toolbar={{ title: t('propertySearch'), subtitle: t('propertySearchSub'), onBack: () => setToast(t('notBuilt')) }} />
      </div>
      <div className="screen__body stay-search__body">
        <StayForm search={search} onDest={() => setSheet('dest')} onDates={() => setSheet('dates')} onGuests={() => setSheet('guests')}>
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
              <RecentCard key={h.id} hotel={h} dates={fmtRange(search.checkIn, search.checkOut)} place="Dubai, United Arab Emirates"
                onSelect={() => { updateSearch({ dest: { name: h.name, region: 'United Arab Emirates, Dubai', hotelId: h.id } }); nav.push('results') }} />
            ))}
          </div>
        </section>
      </div>

      <DestinationSheet open={sheet === 'dest'} onClose={close} onPick={(dest) => { updateSearch({ dest }); close() }} />
      <DatesSheet open={sheet === 'dates'} onClose={close} onConfirm={(checkIn, checkOut) => { updateSearch({ checkIn, checkOut }); close() }} />
      <GuestsSheet open={sheet === 'guests'} onClose={close} onApply={(rooms) => { updateSearch({ rooms }); close() }} />
      <Snackbar message={toast} show={!!toast} onClose={() => setToast('')} />
    </div>
  )
}

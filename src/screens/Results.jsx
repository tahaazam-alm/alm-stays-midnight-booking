// 2 · Search results (SRP)
import { useEffect, useRef, useState } from 'react'
import { Navbar, Snackbar } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import { HOTELS } from '../data.js'
import { fmtRange, guestCount, nights, destCity } from '../logic.js'
import { HotelCard } from '../custom/HotelCard.jsx'
import { AiSearchBar, MapPill } from '../custom/ResultsExtras.jsx'
import { NightTip, MoonBanner } from '../custom/NightBanner.jsx'
import { NightBand } from '../custom/NightBand.jsx'
import * as I from '../icons.js'
import '../custom/type.css'
import './Results.css'


export default function Results() {
  const nav = useNav()
  const t = useCopy()
  const { variant, search, nowOn, setBooking } = useStay()
  // Results banner: the rounded banner that pins under the header, or a navy band that is part of the sticky header
  const band = variant === 'b' && nowOn // settled: navy band
  const [toast, setToast] = useState('')
  // B: the banner starts under the AI search and pins under the header; the filter chips tuck away while scrolling down and return on the way up
  const ref = useRef(null)
  const navRef = useRef(null)
  useEffect(() => {
    const el = navRef.current
    if (!el) return
    // The header's height changes as the chips tuck, so the pinned banner follows it
    const ro = new ResizeObserver(() => ref.current?.style.setProperty('--results-nav-h', `${el.offsetHeight}px`))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  // Once the banner pins, one blur runs behind the header and banner together
  const [pinned, setPinned] = useState(false)
  useEffect(() => {
    const scroller = ref.current?.closest('.proto-screen')
    if (!scroller || variant !== 'b' || !nowOn || band) return setPinned(false)
    const onScroll = () => {
      const b = ref.current?.querySelector('.results__banner')
      setPinned(!!b && b.getBoundingClientRect().top <= navRef.current.getBoundingClientRect().bottom + 1 && scroller.scrollTop > 0)
    }
    onScroll()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [variant, nowOn, band])
  const [tucked, setTucked] = useState(false)
  useEffect(() => {
    const scroller = ref.current?.closest('.proto-screen')
    if (!scroller || variant !== 'b') return
    // Collapsing the chips shifts the page by their height, so going back up needs more travel than that shift
    let state = false, edge = scroller.scrollTop // lowest point while shown, highest while tucked
    const onScroll = () => {
      const y = scroller.scrollTop
      edge = state ? Math.max(edge, y) : Math.min(edge, y)
      const next = state ? !(edge - y > 64 || y < 40) : y - edge > 16 && y > 40
      if (next !== state) { state = next; edge = y; setTucked(next) }
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [variant])
  const soon = () => setToast(t('notBuilt'))
  const n = nights(search.checkIn, search.checkOut)
  // A hotel search puts that hotel first, as in the app
  const list = [...HOTELS].filter((h) => !nowOn || h.instant).sort((a, b) => (b.id === search.dest.hotelId) - (a.id === search.dest.hotelId))

  return (
    <div ref={ref} className={`screen results ${tucked ? 'results--tucked' : ''} ${pinned ? 'results--pinned' : ''} ${band ? 'results--band' : ''}`}>
      <div ref={navRef} className="screen__nav">
        <Navbar
          toolbar={{
            variant: 'stays', location: t.d(search.dest.name), guests: guestCount(search.rooms),
            dates: fmtRange(search.checkIn, search.checkOut),
            onBack: () => nav.back(), onItinerary: () => nav.back(), onCurrency: soon,
          }}
          chips={[
            { icon: <Icon svg={I.sort} />, label: t('sortBy'), onClick: soon },
            { icon: <Icon svg={I.sliders} />, label: t('filters'), onClick: soon },
            { label: t('popularLocations'), dropdown: true, onClick: soon },
            { label: t('starRating'), dropdown: true, onClick: soon },
          ]}
        />
        {band && <NightBand text={t('nowResultsBand')} />}
      </div>
      <div className="screen__body results__body">
        <AiSearchBar placeholder={t('aiPlaceholder')} onClick={soon} />
        {variant === 'b' && nowOn && !band && (
          <MoonBanner className="results__banner" text={t('nowResultsLine')} />
        )}
        {variant === 'a' && nowOn && <NightTip arrow="none" pulse title={t('nowResultsTitle')} body={t('nowResultsBody', t.d(destCity(search.dest)))} />}
        <p className="t-caption t-subtext t-reset results__count">{t('propertiesFound', nowOn ? '1,284' : '7,519', t.d('Dubai'))}</p>
        {list.map((h) => (
          <HotelCard key={h.id} hotel={h} nightsLabel={t('totalFor', n)} onSelect={() => { setBooking({ hotel: h, room: null, rate: null }); nav.push('hotel') }} />
        ))}
      </div>
      <MapPill onClick={soon} />
      <Snackbar message={toast} show={!!toast} onClose={() => setToast('')} />
    </div>
  )
}

// SPECS, not product UI: a developer reference for the check-in tonight motion on the search widget.
// Each row plays the real animation (the same classes and CSS as src/custom/StayForm.css) beside its values, so the page cannot drift from the build.
// English only, like the rest of the prototype chrome: it documents code, so its text stays out of src/copy.js.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { WidgetField, Separator, SegmentedControl } from 'design-system'
import { NowToggleRow } from '../custom/NowToggleRow.jsx'
import { moonFilled } from '../custom/moonFilled.js'
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import { useCopy } from '../copy.js'
import { useProto } from '../shell/PrototypeShell.jsx'
import { fmtFull } from '../logic.js'
import '../custom/StayForm.css'
import './MotionSpecs.css'

const SPEEDS = [['1×', 1], ['0.5×', 0.5], ['0.2×', 0.2]]
const EASE = 'cubic-bezier(.65, 0, .35, 1)'

// The widget's date row (and, with `row`, the check in tonight row) built from the same parts as StayForm
function Widget({ value, row, on }) {
  const t = useCopy()
  const { dir } = useProto()
  return (
    <div className={`stay-form ${on ? 'stay-form--now-on' : ''}`}>
      <div className="stay-form__night night-tint">
        <div className="stay-form__dates">
          <WidgetField variant="populated" label={t('checkIn')} value={value} icon={<Icon svg={I.calendar} />} />
          <span className="stay-form__arrow"><Icon svg={dir === 'rtl' ? I.chevronLeft : I.chevronRight} size={20} /></span>
          <WidgetField variant="empty" state="active" label={t('selectCheckoutWidget')} />
        </div>
        {row && (
          <div className={`stay-form__reveal is-shown ${row === 'band' ? 'is-band' : ''}`}><div>
            <Separator className="stay-form__sep" />
            <NowToggleRow className="stay-form__now" title={t('tonightTitle')} linkLabel={t('howItWorks')} onLink={() => {}} checked={!!on} onChange={() => {}} />
          </div></div>
        )}
      </div>
    </div>
  )
}

// The check-in value once tonight is on: the date, then the moon hanging off its end
function DateMoon({ cls = '', moon = true }) {
  const date = fmtFull(new Date())
  return (
    <span className={`stay-form__in ${cls}`} data-text={date}>
      <span className="stay-form__date">{date}</span>
      {moon && <span className="stay-form__moon"><Icon svg={moonFilled} size={20} /></span>}
    </span>
  )
}

const CellDemo = () => <Widget value={fmtFull(new Date())} row="band" />
const TextDemo = () => <Widget on value={<DateMoon cls="is-lit" moon={false} />} />
const MoonInDemo = () => <Widget on value={<DateMoon cls="is-lit mspec-solo" />} />
const AllDemo = () => <Widget on row="on" value={<DateMoon cls="is-lit" />} />
function MoonOutDemo() {
  const [leaving, setLeaving] = useState(false) // rests for a beat with the moon in place, then tucks it away
  useEffect(() => { const id = setTimeout(() => setLeaving(true), 700); return () => clearTimeout(id) }, [])
  return <Widget value={<DateMoon cls={leaving ? 'is-leaving' : ''} />} />
}

const c = (s) => <code>{s}</code>
const ROWS = [
  { id: 1, name: 'Cell shimmer', what: 'A soft band of aqua light crosses the Check in tonight row once.', View: CellDemo,
    layout: [
      ['Band', <>45% of the row’s width, full row height, drawn as {c('::after')} on the row’s wrapper</>],
      ['Fill', <>{c('linear-gradient(100deg, transparent, --color-aqua-30 50%, transparent)')}</>],
      ['Blend', <>{c('mix-blend-mode: multiply')}; the wrapper clips it ({c('overflow: hidden')})</>],
      ['Dark theme', <>{c('--color-aqua-100')} at 28% in the same gradient, with {c('mix-blend-mode: normal')}</>],
    ],
    specs: [
      ['Trigger', 'Search screen loads with the toggle off. Plays once per visit.'],
      ['Delay', c('700ms')], ['Duration', c('600ms')], ['Easing', c(EASE)],
      ['Travel', <>{c('translate: -100% 0')} → {c('225% 0')} (of the band’s own width): from off the start edge to off the end edge</>],
      ['Opacity', <>{c('0')} → {c('1')} by 15%, holds to 80%, → {c('0')} at 100%</>],
      ['Smear at 50%', <>{c('scale: 1.6 1')} and {c('filter: blur(2px)')}, easing in and back out</>],
      ['Fill mode', c('both')],
    ] },
  { id: 2, name: 'Text shimmer and glow', what: 'An aqua highlight slides through the check-in date’s letters, with a soft glow travelling behind it.', View: TextDemo,
    layout: [
      ['Highlight', <>Two backgrounds clipped to the text ({c('background-clip: text')}): the highlight gradient on top, the text colour underneath</>],
      ['Gradient', <>{c('background-size: 250% 100%')}; solid {c('--color-aqua-100')} in the middle third of its width, fading to transparent at {c('±--spread')}</>],
      ['Glow', <>A {c('::before')} copy of the date ({c('content: attr(data-text)')}) behind the text, same gradient, {c('filter: blur(3px)')}</>],
      ['Weight', 'The date is set in body bold while tonight is on'],
    ],
    specs: [
      ['Trigger', 'Toggle turned on.'],
      ['Delay', c('0ms')], ['Duration', <>{c('500ms')} for both layers</>], ['Easing', c(EASE)],
      ['Travel', <>{c('background-position: 100% center')} → {c('0% center')}</>],
      ['Highlight spread', <>{c('22px')} → {c('38px')} at 50% → {c('22px')} (half-width; an animated {c('@property')} length)</>],
      ['Glow spread', <>{c('26px')} → {c('44px')} at 50% → {c('26px')}</>],
      ['Glow blur', <>{c('3px')} → {c('4px')} at 50% → {c('3px')}</>],
      ['Glow opacity', <>{c('0')} → {c('1')} by 15%, holds to 80%, → {c('0')} at 100%</>],
      ['Fill mode', c('backwards')],
    ] },
  { id: 3, name: 'Moon enter', what: 'The moon arrives after the date as the highlight leaves the last digit.', View: MoonInDemo,
    layout: [
      ['Icon', <>Filled moon, {c('20px')}, {c('--color-aqua-100')}</>],
      ['Position', <>Out of flow, {c('--space-sm')} after the end of the date, centred on the text line. The arrow and check-out cell do not move</>],
    ],
    specs: [
      ['Trigger', 'Toggle turned on (runs with the text shimmer).'],
      ['Delay', c('200ms')], ['Duration', c('300ms')], ['Easing', c('cubic-bezier(.23, 1, .32, 1)')],
      ['From', <>{c('opacity: 0')}, {c('filter: blur(2px)')}, {c('translateX(-1 × --space-sm)')} (towards the date)</>],
      ['To', 'Fully visible, sharp, in place'],
      ['Fill mode', c('both')],
    ] },
  { id: 4, name: 'Moon exit', what: 'The moon lifts a touch, then drops out of sight behind a line at its own bottom edge. It is cut off by the edge, not faded.', View: MoonOutDemo,
    layout: [
      ['Pocket edge', <>The moon’s holder clips its bottom only: {c('clip-path: inset(-8px -8px 15.5% -8px)')}. The drawn moon ends 15.5% above the icon box, so the edge sits on the moon’s baseline</>],
      ['Moving part', 'The icon inside the holder; the holder itself stays still'],
    ],
    specs: [
      ['Trigger', 'Toggle turned off.'],
      ['Delay', c('0ms')], ['Duration', <>{c('400ms')}; the date and moon are swapped for the plain date at {c('450ms')}</>], ['Easing', c(EASE)],
      ['0 – 22%', <>Lift: {c('translateY(-2px)')}, no stretch, no blur</>],
      ['65%', <>Smear: {c('scale: .94 1.18')}, {c('filter: blur(1px)')}</>],
      ['100%', <>{c('translateY(100%)')} (its own height down), stretch and blur back to none</>],
      ['Fill mode', c('both')],
    ] },
  { id: 5, name: 'Toggle on, together', what: 'What the traveller sees when the toggle is turned on: rows 2 and 3 on one clock.', View: AllDemo,
    layout: [
      ['Check-out', 'Empties to “Select check-out” in the same frame; it does not animate'],
      ['Row', 'No tint once on: the moon is the only mark'],
    ],
    specs: [
      ['0ms', 'Text highlight and glow start'],
      ['200ms', 'Moon starts to enter'],
      ['250ms', 'Highlight and glow at their widest and fastest'],
      ['500ms', 'Highlight, glow and moon all finish'],
      ['Reduced motion', <>No animation: the date and moon simply appear, and the moon simply disappears ({c('prefers-reduced-motion: reduce')})</>],
      ['Arabic', 'Everything mirrors: the band and highlight run right to left and the moon sits on the other side of the date'],
    ] },
]

function Stage({ rate, children }) {
  const ref = useRef(null)
  // Every render: the exit animation starts on a later render than the mount
  useLayoutEffect(() => { ref.current?.getAnimations({ subtree: true }).forEach((a) => { a.playbackRate = rate }) })
  return <div className="mspec__stage" ref={ref}>{children}</div>
}

export default function MotionSpecs() {
  const [speed, setSpeed] = useState(0)
  const [plays, setPlays] = useState({})
  const [round, setRound] = useState(0)
  const replay = (id) => setPlays((p) => ({ ...p, [id]: (p[id] || 0) + 1 }))
  return (
    <div className="mspec">
      <header className="mspec__head" dir="ltr">
        <div>
          <h1 className="t-headline t-reset">Animation specs</h1>
          <p className="t-body t-subtext t-reset">Check in tonight on the search widget. The demos run the build’s own CSS (src/custom/StayForm.css).</p>
        </div>
        <div className="mspec__controls">
          <label className="t-caption-semi t-subtext">Speed<SegmentedControl dir="ltr" items={SPEEDS.map(([l]) => l)} value={speed} onChange={(i) => { setSpeed(i); setRound((r) => r + 1) }} /></label>
          <button type="button" className="mspec__btn t-body-semi t-link" onClick={() => setRound((r) => r + 1)}>Replay all</button>
        </div>
      </header>
      <table className="mspec__table">
        <thead dir="ltr"><tr className="t-caption-semi t-subtext"><th scope="col">Animation and layout</th><th scope="col">Specs</th></tr></thead>
        <tbody>
          {ROWS.map(({ id, name, what, View, layout, specs }) => (
            <tr key={id}>
              <td><div className="mspec__demo">
                <div className="mspec__title" dir="ltr">
                  <h2 className="t-title t-reset"><span className="mspec__id">{id}</span>{name}</h2>
                  <button type="button" className="mspec__btn t-body-semi t-link" onClick={() => replay(id)}>Replay</button>
                </div>
                <Stage rate={SPEEDS[speed][1]}><View key={`${round}-${plays[id] || 0}`} /></Stage>
                <dl className="mspec__list mspec__list--layout t-caption" dir="ltr">
                  {layout.map(([k, v]) => <div key={k}><dt className="t-caption-semi">{k}</dt><dd>{v}</dd></div>)}
                </dl>
              </div></td>
              <td dir="ltr"><div className="mspec__specs">
                <p className="t-body t-reset">{what}</p>
                <dl className="mspec__list t-body">
                  {specs.map(([k, v]) => <div key={k}><dt className="t-body-semi">{k}</dt><dd>{v}</dd></div>)}
                </dl>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

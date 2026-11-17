// EXPLORATION, not product UI: the page chrome shared by the explorations boards (speed, language, replay, a grid of live cards).
import { useState } from 'react'
import { SegmentedControl, Toggle } from 'design-system'
import { useProto } from '../shell/PrototypeShell.jsx'
import './TonightBoard.css'

const SPEEDS = [['1×', 1], ['Half', 2], ['Slow', 5]]

/** `items`: { id, name, tag, View, idea, motion, refs: [[label, url]], replay, tall, toggle: { label, prop } }.
    `toggle` adds a switch (on at first) beside Replay; its value reaches the View as `prop`, and flipping it replays the card. */
export default function Board({ title, sub, items, resetLabel = 'Reset all' }) {
  const { lang, setLang } = useProto()
  const [speed, setSpeed] = useState(0)
  const [round, setRound] = useState(0)
  const [plays, setPlays] = useState({})
  const [offs, setOffs] = useState({})
  return (
    <div className="tx-board" style={{ '--tx-speed': SPEEDS[speed][1] }}>
      <header className="tx-board__head" dir="ltr">
        <div>
          <h1 className="t-headline t-reset">{title}</h1>
          <p className="t-body t-subtext t-reset">{sub}</p>
        </div>
        <div className="tx-board__controls">
          <label className="t-caption-semi t-subtext">Speed<SegmentedControl dir="ltr" items={SPEEDS.map(([l]) => l)} value={speed} onChange={setSpeed} /></label>
          <label className="t-caption-semi t-subtext">Language<SegmentedControl dir="ltr" items={['English', 'العربية']} value={lang === 'ar' ? 1 : 0} onChange={(i) => setLang(i ? 'ar' : 'en')} /></label>
          <button type="button" className="tx-board__reset t-body-semi t-link" onClick={() => setRound((r) => r + 1)}>{resetLabel}</button>
        </div>
      </header>
      <div className="tx-board__grid" key={round}>
        {items.map(({ id, name, tag, View, idea, motion, refs, replay, tall, toggle }) => (
          <article key={id} className="tx-board__item">
            <header dir="ltr">
              <h2 className="t-title t-reset"><span className="tx-board__id">{id}</span>{name}{tag && <span className="tx-board__tag t-caption-semi">{tag}</span>}
                {toggle && <span className="tx-board__opt"><Toggle label={toggle.label} checked={!offs[id]} onChange={(e) => setOffs((o) => ({ ...o, [id]: !e.target.checked }))} /></span>}
                {replay && <button type="button" className="tx-board__replay t-body-semi t-link" onClick={() => setPlays((p) => ({ ...p, [id]: (p[id] || 0) + 1 }))}>Replay</button>}</h2>
              <p className="t-body t-reset">{idea}</p>
            </header>
            <div className={`tx-board__stage ${tall ? 'tx-board__stage--tall' : ''}`}><View key={`${plays[id] || 0}${offs[id] ? 'x' : ''}`} {...(toggle ? { [toggle.prop]: !offs[id] } : {})} /></div>
            <footer className="t-caption t-subtext" dir="ltr">
              <p className="t-reset"><b>Motion</b> {motion}</p>
              {refs.length > 0 && <p className="t-reset"><b>Seen in</b> {refs.map(([label, url], i) => <span key={url}>{i > 0 && ' · '}<a href={url} target="_blank" rel="noreferrer">{label}</a></span>)}</p>}
            </footer>
          </article>
        ))}
      </div>
    </div>
  )
}

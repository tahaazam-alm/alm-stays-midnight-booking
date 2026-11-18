// Prototype chrome: control bar + device frame + DesignSystemProvider.
// Not part of the product UI — devs can ignore everything under src/shell/.
import { BottomSheet, SegmentedControl, Button } from 'design-system'
import { Icon } from './Icon.jsx'
import chevronRight from '@ds-icons/line-icons/chevronRight.svg?raw'
import { createContext, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { DesignSystemProvider } from 'design-system'
import { setFmtLang } from '../logic.js'

const ProtoContext = createContext(null)

/** platform, lang, dir, controls (scenario toggle values), config, restartKey */
export const useProto = () => useContext(ProtoContext)

const PLATFORM_LABELS = { ios: 'iOS', android: 'Android', desktop: 'Desktop', 'mobile-web': 'Mobile web' }
const LANG_LABELS = { en: 'EN', ar: 'AR' }
const THEME_OPTS = [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]

// iPhone 17 Pro, in points. The frame keeps this exact size and scales down to fit short windows.
const DEVICE = { phone: [402, 874], browser: [402, 874] }

// The settings card sits in the top right corner beside the phone; it shows when the space next to the phone is at least this wide.
// Otherwise the gear next to the search title opens the same settings as a sheet.
const CARD_ROOM = 224

/** [scale, side]: the scale factor that fits a w×h box inside el (never above 1), and the free space left on each side of it. */
function useFitScale(ref, size) {
  const [scale, setScale] = useState(1)
  const [side, setSide] = useState(0)
  useLayoutEffect(() => {
    if (!size || !ref.current) { setScale(1); return }
    const el = ref.current
    const fit = () => {
      const cs = getComputedStyle(el)
      const w = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
      const h = el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
      const k = Math.min(1, w / size[0], h / size[1])
      setScale(k); setSide((el.clientWidth - size[0] * k) / 2)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, size])
  return [scale, side]
}

const initialControls = (config) =>
  Object.fromEntries((config.controls || []).map((c) => [c.id, c.default ?? c.options[0].value]))

function Toggle({ label, options, value, onChange }) {
  return (
    <div className="proto-toggle">
      <span className="proto-toggle__label">{label}</span>
      <div className="proto-toggle__group" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={o.value === value}
            disabled={o.upcoming}
            className="proto-toggle__opt"
            onClick={() => onChange(o.value)}
            title={o.upcoming ? 'Upcoming — not built yet' : undefined}
          >
            {o.label}
            {o.upcoming && <span className="proto-toggle__soon">Upcoming</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

// `board`: a full-width page shown instead of the phone (design explorations); `boardLink` is its switch in the bar
export function PrototypeShell({ config, children, board, boardLink, boardEntry }) {
  const [platform, setPlatform] = useState(config.platform)
  const [lang, setLang] = useState(config.lang)
  const [theme, setTheme] = useState(config.theme || 'light')
  const [controls, setControls] = useState(() => initialControls(config))
  const [restartKey, setRestartKey] = useState(0)

  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  setFmtLang(lang) // dates and counts in src/logic.js follow the language
  const dsPlatform = platform === 'android' ? 'android' : 'ios'
  const frame = platform === 'desktop' ? 'desktop' : platform === 'mobile-web' ? 'browser' : 'phone'

  // DS tokens only flip on :root, so the theme is set on <html>. Always explicit, so the OS setting can't flip it.
  useLayoutEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

  const stageRef = useRef(null)
  const size = DEVICE[frame]
  const [scale, side] = useFitScale(stageRef, size)

  const restart = () => setRestartKey((k) => k + 1)
  const settingsCard = !board && side >= CARD_ROOM
  // Scenario controls update in place, so the current screen stays put; Restart is separate
  const setControl = (id, v) => setControls((c) => ({ ...c, [id]: v }))

  const value = useMemo(
    () => ({ platform, lang, dir, theme, controls, setControl, config, restart, restartKey, setLang, setTheme, settingsCard, boardEntry }),
    [platform, lang, dir, theme, controls, config, restartKey, settingsCard, boardEntry],
  )

  const platformOpts = Object.entries(config.platforms).map(([k, live]) => ({
    value: k, label: PLATFORM_LABELS[k], upcoming: !live,
  }))
  const langOpts = Object.entries(config.langs).map(([k, live]) => ({
    value: k, label: LANG_LABELS[k], upcoming: !live,
  }))

  return (
    <ProtoContext.Provider value={value}>
      <div className={`proto proto--${frame}`}>
        <header className="proto-bar">
          <strong className="proto-bar__name">{config.name}</strong>
          {!board && !settingsCard && <button type="button" className="proto-bar__restart" onClick={restart}>Restart</button>}
          {board && boardLink}
        </header>
        {board && (
          <DesignSystemProvider platform={dsPlatform} dir={dir}>
            <main className="proto-board" dir={dir} lang={lang}>{board}</main>
          </DesignSystemProvider>
        )}

        {settingsCard && (
          <DesignSystemProvider platform={dsPlatform} dir="ltr">
            <aside className="proto-card" dir="ltr" lang="en" aria-label={SHEET_COPY.title}>
              <h2 className="t-body-semi t-reset">{SHEET_COPY.title}</h2>
              <SettingsBody />
            </aside>
          </DesignSystemProvider>
        )}

        <main className="proto-stage" ref={stageRef} hidden={!!board}>
          <div
            className="proto-fit"
            style={size ? { width: size[0] * scale, height: size[1] * scale } : undefined}
          >
            <div
              className={`proto-device proto-device--${frame}`}
              dir={dir}
              lang={lang}
              style={size ? { width: size[0], height: size[1], transform: `scale(${scale})` } : undefined}
            >
              <DesignSystemProvider platform={dsPlatform} dir={dir}>
                <div className="proto-viewport" key={restartKey}>
                  {children}
                </div>
              </DesignSystemProvider>
            </div>
          </div>
        </main>
      </div>
    </ProtoContext.Provider>
  )
}

// Prototype settings: scenario options (unless `hidden` in prototype.config.js), the language, the theme and Restart.
// Shown as a card at the top corner of the page; in a narrow window the card has no room, so the gear next to the
// search title opens the same thing as a sheet inside the phone.
const LANG_ITEMS = [['en', 'English'], ['ar', 'العربية']]
// The settings are prototype chrome, so they stay in English and left-to-right whatever the prototype's language is
const SHEET_COPY = { title: 'Prototype settings', language: 'Language', theme: 'Theme', themes: ['Light', 'Dark'], restart: 'Restart prototype' }
function SettingsBody({ onDone }) {
  const { config, controls, setControl, lang, setLang, theme, setTheme, restart, boardEntry, platform } = useProto()
  const [langNote, setLangNote] = useState(false)
  const w = SHEET_COPY
  const lbl = (x) => x.label
  const list = (config.controls || []).filter((c) => !c.hidden && (!c.when || Object.entries(c.when).every(([k, v]) => [].concat(v).includes(controls[k]))))
  const pickLang = (i) => {
    const [code] = LANG_ITEMS[i]
    if (!config.langs[code]) return setLangNote(true) // not translated yet: stay put and say so
    setLangNote(false); setLang(code)
  }
  return (
    <DesignSystemProvider platform={platform === 'android' ? 'android' : 'ios'} dir="ltr">
    <div className="proto-sheet__body" dir="ltr" lang="en">
      {list.map((c) => (
        <section key={c.id} className="proto-sheet__group">
          <h3 className="t-caption-semi t-subtext t-reset">{lbl(c)}</h3>
          <SegmentedControl items={c.options.map(lbl)} value={Math.max(0, c.options.findIndex((o) => o.value === controls[c.id]))}
            onChange={(i) => setControl(c.id, c.options[i].value)} />
        </section>
      ))}
      <section className="proto-sheet__group">
        <h3 className="t-caption-semi t-subtext t-reset">{w.language}</h3>
        <SegmentedControl items={LANG_ITEMS.map(([, l]) => l)} value={LANG_ITEMS.findIndex(([c]) => c === lang)} onChange={pickLang} />
        {langNote && <p className="t-caption t-subtext t-reset">Arabic isn’t translated yet, so the prototype stays in English.</p>}
      </section>
      <section className="proto-sheet__group">
        <h3 className="t-caption-semi t-subtext t-reset">{w.theme}</h3>
        <SegmentedControl items={w.themes} value={theme === 'dark' ? 1 : 0} onChange={(i) => setTheme(i === 1 ? 'dark' : 'light')} />
      </section>
      {boardEntry && (
        <button type="button" className="proto-sheet__link t-body" onClick={() => { onDone?.(); boardEntry.open() }}>
          {boardEntry.label}<Icon svg={chevronRight} size={20} />
        </button>
      )}
      <hr className="proto-sheet__rule" />
      <Button variant="secondary" size="small" label={w.restart} onClick={() => { onDone?.(); restart() }} />
    </div>
    </DesignSystemProvider>
  )
}
export function ProtoSettings({ open, onClose }) {
  const { platform, dir } = useProto()
  return (
    <BottomSheet open={open} size="medium" platform={platform} dir={dir} title={SHEET_COPY.title} onClose={onClose} className="proto-sheet">
      <SettingsBody onDone={onClose} />
    </BottomSheet>
  )
}

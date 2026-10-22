// Prototype chrome: control bar + device frame + DesignSystemProvider.
// Not part of the product UI — devs can ignore everything under src/shell/.
import { createContext, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { DesignSystemProvider } from 'design-system'

const ProtoContext = createContext(null)

/** platform, lang, dir, controls (scenario toggle values), config, restartKey */
export const useProto = () => useContext(ProtoContext)

const PLATFORM_LABELS = { ios: 'iOS', android: 'Android', desktop: 'Desktop', 'mobile-web': 'Mobile web' }
const LANG_LABELS = { en: 'EN', ar: 'AR' }
const THEME_OPTS = [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]

// iPhone 17 Pro, in points. The frame keeps this exact size and scales down to fit short windows.
const DEVICE = { phone: [402, 874], browser: [402, 874] }

/** Scale factor that fits a w×h box inside el (never above 1). */
function useFitScale(ref, size) {
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    if (!size || !ref.current) { setScale(1); return }
    const el = ref.current
    const fit = () => {
      const cs = getComputedStyle(el)
      const w = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
      const h = el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
      setScale(Math.min(1, w / size[0], h / size[1]))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, size])
  return scale
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

export function PrototypeShell({ config, children }) {
  const [platform, setPlatform] = useState(config.platform)
  const [lang, setLang] = useState(config.lang)
  const [theme, setTheme] = useState(config.theme || 'light')
  const [controls, setControls] = useState(() => initialControls(config))
  const [restartKey, setRestartKey] = useState(0)

  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const dsPlatform = platform === 'android' ? 'android' : 'ios'
  const frame = platform === 'desktop' ? 'desktop' : platform === 'mobile-web' ? 'browser' : 'phone'

  // DS tokens only flip on :root, so the theme is set on <html>. Always explicit, so the OS setting can't flip it.
  useLayoutEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

  const stageRef = useRef(null)
  const size = DEVICE[frame]
  const scale = useFitScale(stageRef, size)

  const restart = () => setRestartKey((k) => k + 1)
  const setControl = (id, v) => {
    setControls((c) => ({ ...c, [id]: v }))
    restart()
  }

  const value = useMemo(
    () => ({ platform, lang, dir, theme, controls, setControl, config, restart, restartKey }),
    [platform, lang, dir, theme, controls, config, restartKey],
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
          <Toggle label="Platform" options={platformOpts} value={platform} onChange={(v) => { setPlatform(v); restart() }} />
          <Toggle label="Language" options={langOpts} value={lang} onChange={setLang} />
          <Toggle label="Theme" options={THEME_OPTS} value={theme} onChange={setTheme} />
          {(config.controls || []).map((c) => (
            <Toggle key={c.id} label={c.label} options={c.options} value={controls[c.id]} onChange={(v) => setControl(c.id, v)} />
          ))}
          <button type="button" className="proto-bar__restart" onClick={restart}>Restart</button>
        </header>

        <main className="proto-stage" ref={stageRef}>
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

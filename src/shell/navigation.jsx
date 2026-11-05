// Minimal stack navigator for prototypes.
//   const nav = useNav()
//   nav.push('results', { from, to })   // slide in from the end edge
//   nav.back()                            // slide back
//   nav.popTo('rides')                    // back to an earlier screen in the stack
//   nav.replace('home') / nav.reset('home')
//   nav.params                            // params of the current screen
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const NavContext = createContext(null)
export const useNav = () => useContext(NavContext)

let seq = 0
const entry = (name, params = {}) => ({ name, params, key: ++seq })

export function Navigator({ screens, initial, initialParams }) {
  const [stack, setStack] = useState(() => [entry(initial, initialParams)])
  const [direction, setDirection] = useState('none')

  const push = useCallback((name, params) => { setDirection('forward'); setStack((s) => [...s, entry(name, params)]) }, [])
  const back = useCallback(() => { setDirection('back'); setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)) }, [])
  const replace = useCallback((name, params) => { setDirection('none'); setStack((s) => [...s.slice(0, -1), entry(name, params)]) }, [])
  const reset = useCallback((name = initial, params) => { setDirection('back'); setStack([entry(name, params)]) }, [initial])
  const popTo = useCallback((name) => {
    setDirection('back')
    setStack((s) => { const i = s.map((e) => e.name).lastIndexOf(name); return i >= 0 ? s.slice(0, i + 1) : s })
  }, [])

  const top = stack[stack.length - 1]
  // Tell the shell when we're on the first screen, so the settings gear shows only there
  const Screen = screens[top.name]
  if (!Screen) throw new Error(`No screen registered as "${top.name}" in App.jsx`)

  const value = useMemo(
    () => ({ push, back, popTo, replace, reset, params: top.params, current: top.name, canGoBack: stack.length > 1 }),
    [push, back, popTo, replace, reset, top, stack.length],
  )

  return (
    <NavContext.Provider value={value}>
      <div className={`proto-screen proto-screen--${direction}`} key={top.key}>
        <Screen {...top.params} />
      </div>
    </NavContext.Provider>
  )
}

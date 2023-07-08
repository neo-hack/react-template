import './App.css'

import { useCallback, useState } from 'react'

import { ReactComponent as ReactLogo } from './assets/react.svg?react'
import { DarkIcon, LightIcon } from '@/components/Icons'
import RouterViewer from '@/routes'

const App = () => {
  const [theme, setTheme] = useState<'night' | 'light'>('night')
  const handleTheme = useCallback(() => {
    setTheme(prev => (prev === 'night' ? 'light' : 'night'))
    const html = document.querySelector('html')
    const prev = html?.getAttribute('data-theme')
    html.setAttribute('data-theme', prev === 'night' ? 'light' : 'night')
  }, [])
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-0 sticky top-0 z-30 flex h-16 w-full items-center justify-between bg-opacity-90 px-8 text-primary-content backdrop-blur transition-all duration-100">
        <ReactLogo className="w-4" />
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn border-none bg-transparent">
            {theme === 'light' ? <LightIcon /> : <DarkIcon />}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
          >
            <li onClick={handleTheme}>
              <a className="text-slate-400">
                <LightIcon /> Light
              </a>
            </li>
            <li onClick={handleTheme}>
              <a className="text-slate-400">
                <DarkIcon /> Dark
              </a>
            </li>
          </ul>
        </div>
      </div>
      <RouterViewer />
    </div>
  )
}

export default App

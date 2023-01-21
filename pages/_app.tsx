import localFont from '@next/font/local'

import {LazyMotion, domAnimation} from 'framer-motion'
import type {AppProps} from 'next/app'

import {AppProviders} from '../context/app-providers'

import '@daren/theme/dist/darenui.css'

import '../styles/tailwind.css'
import '../styles/app.css'
import '../styles/prose.css'
import '../styles/components.css'

const cal = localFont({
  src: '../public/fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal',
})

const App = ({Component, pageProps}: AppProps) => {
  return (
    <AppProviders>
      <LazyMotion features={domAnimation}>
        <main className={`${cal.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      </LazyMotion>
    </AppProviders>
  )
}

export default App

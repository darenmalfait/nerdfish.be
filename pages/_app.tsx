import { Inter as interFont, Lora as loraFont } from '@next/font/google'

import { LazyMotion, domAnimation } from 'framer-motion'
import type { AppProps } from 'next/app'

import { AppProviders } from '../context/app-providers'

const inter = interFont({
  variable: '--font-inter',
  subsets: ['latin'],
})

const lora = loraFont({
  variable: '--font-lora',
  subsets: ['latin'],
})

import '@daren/theme/dist/darenui.css'

import '../styles/tailwind.css'
import '../styles/app.css'
import '../styles/prose.css'
import '../styles/components.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProviders>
      <LazyMotion features={domAnimation}>
        <main className={`${inter.variable} ${lora.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      </LazyMotion>
    </AppProviders>
  )
}

export default App

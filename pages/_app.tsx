import { Inter as interFont, Lora as loraFont } from '@next/font/google'

import { LazyMotion, domAnimation } from 'framer-motion'
import type { AppProps } from 'next/app'

import { AppProviders } from '../context/app-providers'

export const inter = interFont({
  subsets: ['latin'],
})

export const lora = loraFont({
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
        <main>
          <Component {...pageProps} />
        </main>
      </LazyMotion>
    </AppProviders>
  )
}

export default App

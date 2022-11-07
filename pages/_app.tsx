import { AppProviders } from 'context/app-providers'
import { LazyMotion, domAnimation } from 'framer-motion'
import type { AppProps } from 'next/app'

import '@daren/theme/dist/darenui.css'

import '../styles/tailwind.css'
import '../styles/app.css'
import '../styles/prose.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProviders>
      <LazyMotion features={domAnimation}>
        <Component {...pageProps} />
      </LazyMotion>
    </AppProviders>
  )
}

export default App

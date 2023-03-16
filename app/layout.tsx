import {Inter as interFont} from '@next/font/google'

import {AppProviders} from '~/context/app-providers'

import '~/styles/tailwind.css'
import '~/styles/app.css'
import '~/styles/prose.css'
import '~/styles/components.css'
import '@nerdfish/theme/dist/nerdfishui.css'

const inter = interFont({
  variable: '--font-inter',
  subsets: ['latin'],
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}

import { AnimatePresence, m } from 'framer-motion'
import * as React from 'react'

import { CookiebarAdvanced } from './cookiebar-advanced'
import { CookiebarBasic } from './cookiebar-basic'

import { useCookie } from '~/hooks/use-cookie'
import { useHasMounted } from '~/hooks/use-mounted'
import { track } from '~/lib/gtm'
import type { CookieConsent } from '~/types/sanity'

enum CookieType {
  Consents = 'gdpr-consents',
  Tracking = 'gdpr-tracking',
  Advertisement = 'gdpr-advertisement',
}

const bar = {
  show: {
    y: '0%',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hide: {
    y: '150%',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const item = {
  show: {
    opacity: '100%',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hide: {
    opacity: '0%',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

interface CookieBarProps extends CookieConsent {}

function Cookiebar({
  enabled,
  tracking,
  advertisement,
  message,
}: CookieBarProps) {
  const [customize, setCustomize] = React.useState(false)
  const hasMounted = useHasMounted()
  const [acceptedConsent, setAcceptedConsent] = useCookie(CookieType.Consents)

  const onAcceptAll = React.useCallback(() => {
    const consents: { [key in CookieType]?: boolean } = {}

    if (tracking?.enabled) consents[CookieType.Tracking] = true
    if (advertisement?.enabled) consents[CookieType.Advertisement] = true

    setAcceptedConsent(JSON.stringify(consents), { days: 365 })
    track('accepted-consent')
  }, [advertisement?.enabled, setAcceptedConsent, tracking?.enabled])

  const onSave = React.useCallback(
    consents => {
      setAcceptedConsent(JSON.stringify(consents), { days: 365 })
      track('accepted-consent')
    },
    [setAcceptedConsent],
  )

  const onToggleCustomize = React.useCallback(() => {
    setCustomize(vb => !vb)
  }, [])

  if (!enabled || !hasMounted) {
    return null
  }

  return (
    <AnimatePresence>
      {!acceptedConsent && (
        <m.div
          className="overflow-auto fixed bottom-0 z-50 py-4 px-6 w-full max-h-screen rounded-xl shadow-2xl transition md:right-4 md:bottom-4 md:w-full lg:right-8 lg:bottom-8 lg:w-auto text-primary bg-secondary"
          initial="hide"
          animate="show"
          exit="hide"
          variants={bar}
          role="dialog"
          aria-live="polite"
          layout
        >
          {!customize && (
            <m.div initial="hide" animate="show" variants={item}>
              <CookiebarBasic
                onCustomize={onToggleCustomize}
                onAccept={onAcceptAll}
                message={message}
              />
            </m.div>
          )}
          {customize && (
            <m.div initial="hide" animate="show" variants={item}>
              <CookiebarAdvanced
                onAccept={onAcceptAll}
                onSave={onSave}
                onBack={onToggleCustomize}
                message={message}
                tracking={tracking}
                advertisement={advertisement}
              />
            </m.div>
          )}
        </m.div>
      )}
    </AnimatePresence>
  )
}

export { Cookiebar, CookieType }

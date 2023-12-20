'use client'

import * as React from 'react'

import {env} from '~/env.mjs'

/**
 * Function to clean the recaptcha_[language] script injected by the recaptcha.js
 */
function cleanGstaticRecaptchaScript() {
  const script = document.querySelector(
    `script[src^='https://www.gstatic.com/recaptcha/releases']`,
  )

  if (script) {
    script.remove()
  }
}

function cleanGoogleRecaptcha(scriptId: string) {
  // remove badge
  const nodeBadge = document.querySelector('.grecaptcha-badge')
  if (nodeBadge?.parentNode) {
    document.body.removeChild(nodeBadge.parentNode)
  }

  // remove script
  const script = document.querySelector(`#${scriptId}`)
  if (script) {
    script.remove()
  }

  cleanGstaticRecaptchaScript()
}

interface RecaptchaProps {
  execute: any
}

export function useRecaptcha(): RecaptchaProps {
  const [greCaptchaInstance, setGreCaptchaInstance] = React.useState<null | {
    execute: any
  }>(null)

  React.useEffect(() => {
    if (!env.NEXT_PUBLIC_RECAPTCHA_SITEKEY) {
      console.error('Error: RECAPTCHA_SITEKEY is not set')
      return
    }

    const loadScriptByURL = (id: string, url: string) => {
      const isScriptExist = document.getElementById(id)

      if (!isScriptExist) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        script.id = id

        document.body.appendChild(script)

        script.onload = () => {
          if (!(window as any).grecaptcha) {
            console.error('Error: grecaptcha is not defined')

            return
          }

          const grecaptcha = (window as any).grecaptcha

          grecaptcha.ready(() => {
            setGreCaptchaInstance(grecaptcha)
          })
        }
      }
    }

    const scriptId = 'recaptcha-key'

    // load the script by passing the URL
    loadScriptByURL(
      scriptId,
      `https://www.google.com/recaptcha/api.js?render=${env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}`,
    )

    return () => {
      cleanGoogleRecaptcha(scriptId)
    }
  }, [])

  const execute = React.useCallback(async () => {
    if (!greCaptchaInstance?.execute) {
      console.error('Error: grecaptcha is not defined')
    }

    return greCaptchaInstance?.execute(env.NEXT_PUBLIC_RECAPTCHA_SITEKEY, {
      action: 'submit',
    })
  }, [greCaptchaInstance])

  return {execute}
}

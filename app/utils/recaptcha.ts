import * as React from 'react'

interface RecaptchaProps {
  execute: any
}

export function useRecaptcha(): RecaptchaProps {
  const [greCaptchaInstance, setGreCaptchaInstance] = React.useState<null | {
    execute: any
  }>(null)

  React.useEffect(() => {
    const loadScriptByURL = (id: string, url: string) => {
      const isScriptExist = document.getElementById(id)

      if (!isScriptExist) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        script.id = id

        document.body.appendChild(script)

        script.onload = () => {
          if (!window || !(window as any).grecaptcha) {
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

    // load the script by passing the URL
    loadScriptByURL(
      'recaptcha-key',
      `https://www.google.com/recaptcha/api.js?render=${window?.ENV?.RECAPTCHA_SITEKEY}`,
    )
  }, [])

  const execute = React.useCallback(async () => {
    if (!greCaptchaInstance || !greCaptchaInstance.execute) {
      console.error('Error: grecaptcha is not defined')
    }

    const token = await greCaptchaInstance?.execute(
      window?.ENV?.RECAPTCHA_SITEKEY,
      {
        action: 'submit',
      },
    )

    return token
  }, [greCaptchaInstance])

  return { execute }
}

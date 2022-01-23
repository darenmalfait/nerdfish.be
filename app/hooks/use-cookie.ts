import * as React from 'react'

interface CookieOptions {
  days?: number
  path?: string
}

export function setCookie(
  name: string,
  value: string | boolean,
  options: CookieOptions = {},
): void {
  const optionsWithDefaults = {
    days: 7,
    path: `/`,
    ...options,
  }

  const expires = new Date(
    Date.now() + optionsWithDefaults.days * 864e5,
  ).toUTCString()

  if (typeof document !== `undefined`) {
    document.cookie = `${name}=${encodeURIComponent(
      value,
    )}; expires=${expires}; path=${optionsWithDefaults.path}`
  }
}

export function getCookie(name: string) {
  if (typeof document !== `undefined`) {
    return document.cookie.split(`; `).reduce((r, v) => {
      const parts = v.split(`=`)
      return parts[0] === name ? decodeURIComponent(parts[1] as string) : r
    }, ``)
  }

  return null
}

export function useCookie(
  key: string,
  initialValue?: string,
): [string, (value: string, options: CookieOptions) => void] {
  const [item, setItem] = React.useState(() => getCookie(key) || initialValue)

  const updateItem = (value: string, options?: CookieOptions) => {
    setItem(value)
    setCookie(key, value, options)
  }

  return [item as string, updateItem]
}

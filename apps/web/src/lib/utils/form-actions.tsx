import * as React from 'react'

function useFetcher<T>(defaultValue?: T) {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'done'>(
    'idle',
  )
  const [error, setError] = React.useState<Error | null>(null)
  const [data, setData] = React.useState<T | undefined>(defaultValue)

  const submit = React.useCallback(
    async (
      url: RequestInfo | URL,
      options:
        | (RequestInit & {
            onSuccess?: (result?: T) => void
            onError?: (error: string, code?: number) => void
          })
        | undefined,
    ) => {
      try {
        setStatus('loading')
        setError(null)

        const response = await fetch(url, options ?? {})

        if (!response.ok) {
          setStatus('idle')

          options?.onError?.(response.statusText, response.status)
          return setError(new Error(response.statusText))
        }

        const text = await response.text()
        if (!text) {
          setStatus('done')
          return options?.onSuccess?.()
        }

        const result = JSON.parse(text) as T

        setData(result)
        setStatus('done')
        return options?.onSuccess?.(result)
      } catch (e: any) {
        setStatus('idle')
        setError(e.message)
        options?.onError?.(e.message)
      }
    },
    [],
  )

  return {status, data, error, submit, setData}
}

export {useFetcher}

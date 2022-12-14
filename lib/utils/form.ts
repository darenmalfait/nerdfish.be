import * as React from 'react'

type State = 'idle' | 'loading' | 'submitting'
type FormMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

type Options = {
  method?: FormMethod
  action: string
  headers?: HeadersInit
}

const defaultOptions = {
  method: 'post' as FormMethod,
  headers: {
    'Content-Type': 'application/json',
  },
  action: '',
}

async function handleFormSubmit(
  data: Record<string, unknown>,
  {action, method, ...options}: Options = defaultOptions,
) {
  const response = await fetch(action, {
    ...defaultOptions,
    ...options,
    method: method?.toUpperCase() ?? defaultOptions.method.toUpperCase(),
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },

    body: JSON.stringify(data),
  })

  return response.json()
}

function getFormValues(form: HTMLFormElement) {
  return Object.values(form).reduce((obj, field) => {
    if (!field.name) return obj
    obj[field.name] = field.value
    return obj
  }, {})
}

function useSubmit<T>() {
  const [state, setState] = React.useState<State>('idle')
  const [result, setResult] = React.useState<T | null>(null)

  const submit = React.useCallback(
    async (
      data: Record<string, unknown>,
      options: Options = defaultOptions,
    ) => {
      setState('submitting')

      const response = await handleFormSubmit(data, options)

      setState('idle')

      setResult(response)
    },
    [],
  )

  return {state, submit, result, getFormValues}
}

export {handleFormSubmit, useSubmit}
export type {State}

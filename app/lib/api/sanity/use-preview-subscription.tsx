import type { GroqStore } from '@sanity/groq-store'
import * as React from 'react'

import { config } from './sanity'

interface SubscriptionOptions<R = any> {
  enabled?: boolean
  params?: Record<string, unknown>
  initialData?: R
}

function usePreviewSubscription(
  query: string,
  subscriptionOptions: SubscriptionOptions,
) {
  const { enabled, params, initialData } = subscriptionOptions
  const [data, setData] = React.useState(initialData)

  React.useEffect(() => {
    let sub: any
    let store: GroqStore | undefined

    async function createStore() {
      const {
        default: { groqStore },
      } = await import('@sanity/groq-store')

      const { projectId, dataset, token } = config

      store = groqStore({
        projectId,
        dataset,
        token,
        listen: true,
        overlayDrafts: true,
        documentLimit: 1000,
      })

      store.subscribe(
        query,
        params ?? {}, // Params
        (err, result) => {
          if (err) {
            console.error('Oh no, an error:', err)
            return
          }
          setData(result)
        },
      )
    }

    if (enabled) {
      createStore()
    }

    return () => {
      if (sub?.unsubscribe()) sub.unsubscribe()
      if (store) store.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data }
}

export { usePreviewSubscription }

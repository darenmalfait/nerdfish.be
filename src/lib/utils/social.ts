import {type z} from 'zod'

import {type ogImageSchema} from '../types/og'
import {getDomainUrl} from './misc'

function generateOGImageUrl({
  cardType = 'primary',
  ...props
}: z.infer<typeof ogImageSchema> & {
  cardType?: string | null
}) {
  const url = getDomainUrl()

  const ogUrl =
    cardType === 'secondary'
      ? new URL(`${url}/api/og/secondary`)
      : new URL(`${url}/api/og/primary`)
  Object.entries(props).forEach(([key, value]) => {
    ogUrl.searchParams.set(key, value ?? '')
  })

  return ogUrl.toString()
}

export {generateOGImageUrl}

import * as React from 'react'

import { OptimizedImage } from '../elements/optimized-image'

type AvatarProps = {
  src: string
}

function Avatar({ src }: AvatarProps) {
  return (
    <div className="overflow-hidden h-0 rounded-full border-4 border-primary-900 aspect-w-1 aspect-h-1">
      <OptimizedImage src={src} alt="avatar" />
    </div>
  )
}

export { Avatar }

import { H2 } from '@daren/ui-components'
import * as Icons from '@heroicons/react/24/solid'
import * as React from 'react'

export interface FeatureCardProps {
  title: string
  description: string
  icon?: keyof typeof Icons
}

const dynamicHeroIcon = (name: keyof typeof Icons) => Icons[name]

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const Icon = icon && dynamicHeroIcon(icon)

  return (
    <div className="flex relative flex-col items-start py-12 px-8 w-full h-full rounded-lg lg:px-12 bg-secondary">
      {Icon && <Icon className="mb-8 h-8 text-primary" />}
      <H2
        as="h3"
        className="flex flex-none items-end mb-4 text-xl font-medium text-primary"
      >
        {title}
      </H2>
      <p className="flex-auto max-w-sm text-xl text-secondary">{description}</p>
    </div>
  )
}

export { FeatureCard }

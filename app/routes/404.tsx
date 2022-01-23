import * as React from 'react'

import notFoundImage from '~/assets/images/cat-on-box.png'

import { Hero } from '~/components/layout'

export function meta() {
  return { title: "Ain't nothing here" }
}

export default function NotFoundPage() {
  return (
    <main>
      <Hero
        image={notFoundImage}
        title="404, you're lost"
        subTitle="The page you're looking for doesn't exist"
      />
    </main>
  )
}

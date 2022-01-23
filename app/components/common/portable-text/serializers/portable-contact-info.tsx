import * as React from 'react'

import type { Serialized } from './serializers.types'

import { ContactInfo, ContactInfoProps } from '~/components/common'
import { Container } from '~/components/layout'

function PortableContactInfo({ node }: Serialized<ContactInfoProps>) {
  return (
    <Container size="default">
      <ContactInfo {...node} />
    </Container>
  )
}

export { PortableContactInfo }

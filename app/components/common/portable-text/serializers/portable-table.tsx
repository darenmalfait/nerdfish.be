import type { PortableTextEntry } from '@sanity/block-content-to-react'
import * as React from 'react'

import type { Serialized } from './serializers.types'

import { PortableText } from '../portable-text'

import { Table } from '~/components/elements'
import { Container } from '~/components/layout'
import type { SanityCta, SanityTable } from '~/types/sanity'

interface PortableTableProps {
  title?: string
  table?: SanityTable
  cta?: SanityCta
  content?: PortableTextEntry[]
}

function PortableTable({
  node: { title, table, cta, content },
}: Serialized<PortableTableProps>) {
  return (
    <Container size="default">
      <Table title={title} table={table} cta={cta}>
        {content && <PortableText blocks={content} />}
      </Table>
    </Container>
  )
}

export { PortableTable }

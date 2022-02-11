import BlockContent from '@sanity/block-content-to-react'
import * as React from 'react'

import { MarkLink } from './mark-link'

import { PortableButton } from './portable-button'
import { PortableCode } from './portable-code'
import { PortableContactForm } from './portable-contact-form'
import { PortableContactInfo } from './portable-contact-info'
import { PortableImg } from './portable-img'
import { PortableTable } from './portable-table'
import { PortableVideoEmbed } from './portable-video-embed'

import { Blockquote } from '~/components/elements'
import { Container } from '~/components/layout'

const portableTextSerializers: any = {
  container: ({ children }: any) => children,

  types: {
    advancedTable: PortableTable,
    code: PortableCode,
    button: PortableButton,
    companyInfo: PortableContactInfo,
    contactForm: PortableContactForm,
    figure: PortableImg,
    figureWithOptions: PortableImg,
    videoEmbed: PortableVideoEmbed,
    block: (props: any) => {
      const {
        node: { style },
      } = props

      if (style === 'blockquote') {
        return <Blockquote>{props.children}</Blockquote>
      }

      const element = (BlockContent as any).defaultSerializers.types.block(
        props,
      )

      return (
        <Container
          as={element.type}
          className="prose dark:prose-invert prose-light"
          {...element.props}
        />
      )
    },
  },
  list: (props: any) => {
    const listItemType = props.type === 'bullet' ? 'ul' : 'ol'

    return (
      <Container
        as={listItemType}
        className="prose dark:prose-invert prose-light"
        {...props}
      />
    )
  },
  marks: {
    link: MarkLink,
  },
  ignoreUnknownTypes: true,
}

export { portableTextSerializers }

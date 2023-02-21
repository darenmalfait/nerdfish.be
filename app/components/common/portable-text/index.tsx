import type {ExtractProps} from '@daren/ui-components'
import {TinaMarkdown} from 'tinacms/dist/rich-text'

import {Link} from '../link'
import {PortableButton} from './portable-button'
import {PortableCode} from './portable-code'
import {PortableContactForm} from './portable-contact-form'
import {PortableImage} from './portable-image'

function PortableText(props: ExtractProps<typeof TinaMarkdown>) {
  return (
    <TinaMarkdown
      {...props}
      components={
        {
          Button: PortableButton,
          ContactForm: PortableContactForm,
          code_block: PortableCode,
          img: PortableImage,
          image: PortableImage,
          a: Link,
        } as any
      }
    />
  )
}

export {PortableText}

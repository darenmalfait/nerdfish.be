import type { ExtractProps } from '@daren/ui-components'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import { PortableButton } from './portable-button'
import { PortableCode } from './portable-code'
import { PortableContactForm } from './portable-contact-form'

function PortableText(props: ExtractProps<typeof TinaMarkdown>) {
  return (
    <TinaMarkdown
      {...props}
      components={
        {
          Button: PortableButton,
          ContactForm: PortableContactForm,
          code_block: PortableCode,
        } as any
      }
    />
  )
}

export { PortableText }

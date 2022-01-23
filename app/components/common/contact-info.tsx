import * as React from 'react'
import Obfuscate from 'react-obfuscate'

export interface ContactInfoProps {
  address?: string
  email?: string
  name?: string
  phone?: string
}

function ContactInfo({ address, email, name, phone }: ContactInfoProps) {
  return (
    <div className="prose dark:prose-invert">
      {name && (
        <div>
          <strong>{name}</strong>
        </div>
      )}
      {address && (
        <div>
          <strong>a.</strong> {address}
        </div>
      )}
      {email && (
        <div>
          <strong>e.</strong> <Obfuscate email={email} />
        </div>
      )}
      {phone && (
        <div>
          <strong>t.</strong> <Obfuscate tel={phone} />
        </div>
      )}
    </div>
  )
}

export { ContactInfo }
